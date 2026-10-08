import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

/* Both values are public by design — they ship to the browser for the
   admin page. Row-level security in supabase/schema.sql is what
   protects the data, not secrecy of the key. */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/* False until the project is connected. Everything that talks to the
   backend checks this first, so the site still builds and runs — the
   contact form says it is not connected, the careers page lists no
   roles, the admin page explains what is missing. */
export const supabaseConfigured = Boolean(url && key);

/* For server code. No session: it only ever acts as an anonymous
   visitor, sending an enquiry or reading published roles. */
export function serverSupabase(revalidate?: number): SupabaseClient {
  if (!url || !key) throw new Error("Supabase is not configured.");

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    /* The client calls fetch itself, so the cache lifetime has to be
       passed through here for a page that reads with it to be
       regenerated on a timer rather than frozen at build. */
    ...(revalidate === undefined
      ? {}
      : {
          global: {
            fetch: (input: RequestInfo | URL, init?: RequestInit) =>
              fetch(input, { ...init, next: { revalidate } }),
          },
        }),
  });
}

/* For server code acting for a signed-in admin. It carries that
   person's own session, so row-level security decides what it may do
   exactly as it does in their browser; the server gains no power of its
   own. */
export function adminSupabase(accessToken: string): SupabaseClient {
  if (!url || !key) throw new Error("Supabase is not configured.");

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  });
}

/* For the admin page, in the browser. One instance, so the session it
   keeps in localStorage is shared by everything on the page. */
let browser: SupabaseClient | undefined;

export function browserSupabase(): SupabaseClient {
  if (!url || !key) throw new Error("Supabase is not configured.");
  browser ??= createClient(url, key);
  return browser;
}
