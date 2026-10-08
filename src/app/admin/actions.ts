"use server";

import nodemailer from "nodemailer";

import { brand } from "@/content/shared";
import { rejectionMessage } from "@/shared/rejection";
import { adminSupabase, supabaseConfigured } from "@/shared/supabase";

export type RejectionResult =
  | { ok: true; sentAt: string }
  | { ok: false; message: string };

/* The mailbox the site sends from. Both are secrets of the deployment,
   never of the repository; the password is a Google app password, not
   the account's own. */
const mailUser = process.env.GMAIL_USER;
const mailPassword = process.env.GMAIL_APP_PASSWORD;

/* Emails the standard rejection to one applicant.

   A server function can be called by anyone who can reach the site, so
   it trusts nothing it is handed. The caller's own session is used to
   touch the database, and row-level security only lets an admin change
   an application; for anyone else the claim below matches no row and no
   email is sent. The address written to is the one on the record, never
   one supplied by the caller. */
export async function sendRejection(
  applicationId: string,
  accessToken: string,
): Promise<RejectionResult> {
  if (typeof applicationId !== "string" || typeof accessToken !== "string") {
    return { ok: false, message: "That request was not understood." };
  }

  if (!supabaseConfigured || !mailUser || !mailPassword) {
    return {
      ok: false,
      message:
        "Sending email is not set up yet: GMAIL_USER and GMAIL_APP_PASSWORD are missing from the site's environment.",
    };
  }

  const supabase = adminSupabase(accessToken);
  const sentAt = new Date().toISOString();

  /* Claimed before sending, not marked after: two clicks, or two
     admins, cannot both get past this line for the same application. */
  const { data, error } = await supabase
    .from("applications")
    .update({ rejection_sent_at: sentAt })
    .eq("id", applicationId)
    .eq("status", "rejected")
    .is("rejection_sent_at", null)
    .select("name, email, role_title");

  if (error) return { ok: false, message: error.message };

  const application = data?.[0];
  if (!application) {
    return {
      ok: false,
      message:
        "No email was sent. The application is not marked rejected, has already been emailed, or you are not signed in as an admin.",
    };
  }

  const { subject, body } = rejectionMessage(application);

  try {
    await nodemailer
      .createTransport({
        service: "gmail",
        auth: { user: mailUser, pass: mailPassword },
      })
      .sendMail({
        from: { name: brand.name, address: mailUser },
        to: application.email,
        subject,
        text: body,
      });
  } catch {
    /* Nothing went out, so the claim is given back and it can be tried
       again. */
    await supabase
      .from("applications")
      .update({ rejection_sent_at: null })
      .eq("id", applicationId);

    return {
      ok: false,
      message: `The email to ${application.email} could not be sent. Nothing was sent; try again.`,
    };
  }

  return { ok: true, sentAt };
}
