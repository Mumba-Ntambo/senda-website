"use server";

import { brand } from "@/content/shared";
import type { ContactFields, ContactState } from "@/shared/contact";
import { serverSupabase, supabaseConfigured } from "@/shared/supabase";

const SENT = "Thank you. Your message has been sent and we will come back to you.";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const read = (key: keyof ContactFields) =>
    String(formData.get(key) ?? "").trim();

  const submission: ContactFields = {
    name: read("name"),
    email: read("email"),
    company: read("company"),
    /* getAll, not get: every ticked box posts under the same name and
       `get` would silently keep only the first. */
    services: formData
      .getAll("services")
      .map((value) => String(value).trim())
      .filter(Boolean),
    message: read("message"),
  };

  /* The hidden trap field was filled in, so this is a bot. It is told
     the message was sent, so it has no reason to try another way. */
  if (String(formData.get("website") ?? "").trim()) {
    return { status: "sent", message: SENT, fieldErrors: {} };
  }

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (!submission.name) fieldErrors.name = "Tell us your name.";
  if (!submission.email) fieldErrors.email = "We need an address to reply to.";
  else if (!EMAIL.test(submission.email))
    fieldErrors.email = "That does not look like an email address.";
  if (!submission.message) fieldErrors.message = "Let us know what you need.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "invalid", message: "", fieldErrors };
  }

  return deliver(submission);
}

/* Saved to the enquiries table, where the admin dashboard reads them.
   The insert runs as an anonymous visitor: row-level security lets
   anyone add an enquiry and lets no one but an admin read one. */
async function deliver(submission: ContactFields): Promise<ContactState> {
  const fallback: ContactState = {
    status: "unconfigured",
    message: `Your message could not be sent from this form. Please email ${brand.contactEmail} instead.`,
    fieldErrors: {},
  };

  if (!supabaseConfigured) return fallback;

  const { error } = await serverSupabase().from("enquiries").insert({
    name: submission.name.slice(0, 200),
    email: submission.email.slice(0, 320),
    company: submission.company.slice(0, 200),
    services: submission.services.slice(0, 12),
    message: submission.message.slice(0, 5000),
  });

  if (error) return fallback;

  return {
    status: "sent",
    message: SENT,
    fieldErrors: {},
  };
}
