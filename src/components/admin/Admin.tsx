"use client";

import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";

import Link from "next/link";
import type { Session } from "@supabase/supabase-js";

import { Applications } from "@/components/admin/Applications";
import { Enquiries } from "@/components/admin/Enquiries";
import { Jobs } from "@/components/admin/Jobs";
import { useContent } from "@/shared/ContentProvider";
import { Logo } from "@/shared/Logo";
import { browserSupabase, supabaseConfigured } from "@/shared/supabase";
import styles from "@/styles/Admin.module.css";

/* The dashboard's sections. To add one, write its component and list
   it here — the tabs and the routing between them follow. */
const sections: { key: string; label: string; render: () => ReactNode }[] = [
  { key: "enquiries", label: "Enquiries", render: () => <Enquiries /> },
  { key: "jobs", label: "Job postings", render: () => <Jobs /> },
  {
    key: "applications",
    label: "Applications",
    render: () => <Applications />,
  },
];

type Access = "checking" | "signed-out" | "not-admin" | "admin";

export function Admin() {
  const {
    content: { site },
  } = useContent();
  const [session, setSession] = useState<Session | null>(null);
  const [access, setAccess] = useState<Access>("checking");
  const [section, setSection] = useState(sections[0].key);

  useEffect(() => {
    if (!supabaseConfigured) return;
    const supabase = browserSupabase();

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (!data.session) setAccess("signed-out");
    });
    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      if (!next) setAccess("signed-out");
    });
    return () => data.subscription.unsubscribe();
  }, []);

  /* Signing in proves who someone is, not that they may be here. The
     database decides that: a signed-in user sees their own row in
     `admins` only if they have one. The same rule guards every table,
     so this check is for the interface — it is not the security. */
  const userId = session?.user.id;
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    browserSupabase()
      .from("admins")
      .select("user_id")
      .eq("user_id", userId)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) setAccess(data ? "admin" : "not-admin");
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const signOut = () => browserSupabase().auth.signOut();

  const shell = (children: ReactNode, signedIn = false) => (
    <div className={styles.page}>
      <header className={styles.bar}>
        <Link className={styles.brand} href="/" aria-label={site.name}>
          <Logo name={site.name} />
        </Link>
        <span className={styles.badge}>Admin</span>
        {signedIn ? (
          <div className={styles.account}>
            <span className={styles.email}>{session?.user.email}</span>
            <button className={styles.ghost} type="button" onClick={signOut}>
              Sign out
            </button>
          </div>
        ) : null}
      </header>
      {children}
    </div>
  );

  if (!supabaseConfigured) {
    return shell(
      <main className={styles.center}>
        <div className={styles.card}>
          <h1 className={styles.cardTitle}>Not connected yet</h1>
          <p className={styles.note}>
            The dashboard needs its database. Set NEXT_PUBLIC_SUPABASE_URL and
            NEXT_PUBLIC_SUPABASE_ANON_KEY for this site, then reload.
          </p>
        </div>
      </main>,
    );
  }

  if (access === "checking") {
    return shell(
      <main className={styles.center}>
        <p className={styles.note}>Loading…</p>
      </main>,
    );
  }

  if (access === "signed-out") return shell(<SignIn />);

  if (access === "not-admin") {
    return shell(
      <main className={styles.center}>
        <div className={styles.card}>
          <h1 className={styles.cardTitle}>No access</h1>
          <p className={styles.note}>
            {session?.user.email} is signed in but is not an admin of this
            site.
          </p>
          <button className={styles.primary} type="button" onClick={signOut}>
            Sign out
          </button>
        </div>
      </main>,
    );
  }

  return shell(
    <>
      <nav className={styles.tabs} aria-label="Dashboard sections">
        {sections.map((item) => (
          <button
            className={styles.tab}
            type="button"
            aria-current={item.key === section ? "page" : undefined}
            onClick={() => setSection(item.key)}
            key={item.key}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <main className={styles.main}>
        {sections.find((item) => item.key === section)?.render()}
      </main>
    </>,
    true,
  );
}

function SignIn() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setError("");

    const { error } = await browserSupabase().auth.signInWithPassword({
      email: String(form.get("email") ?? "").trim(),
      password: String(form.get("password") ?? ""),
    });

    setBusy(false);
    /* One message for every failure, so the form does not reveal
       whether an address has an account. */
    if (error) setError("That email and password did not work.");
  }

  return (
    <main className={styles.center}>
      <form className={styles.card} onSubmit={submit}>
        <h1 className={styles.cardTitle}>Sign in</h1>

        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input
            className={styles.input}
            type="email"
            name="email"
            autoComplete="username"
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Password</span>
          <input
            className={styles.input}
            type="password"
            name="password"
            autoComplete="current-password"
            required
          />
        </label>

        <p className={styles.error} role="alert">
          {error}
        </p>

        <button className={styles.primary} type="submit" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
