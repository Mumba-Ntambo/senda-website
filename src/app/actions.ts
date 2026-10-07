"use server";

import { brand } from "@/content/shared";
import type { ContactFields, ContactState } from "@/shared/contact";

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

/* Delivery seam — deliberately not implemented.
   No email provider is provisioned for this project yet, so rather
   than pretend a submission was sent, this reports the gap. Run
   `/marketplace` to add a provider, then send `submission` from
   here and return { status: "sent" }. */
async function deliver(submission: ContactFields): Promise<ContactState> {
  const provider = process.env.CONTACT_PROVIDER;

  if (!provider) {
    return {
      status: "unconfigured",
      message:
        `This form is not connected yet, so your message was not sent. Nothing was stored. Please email ${brand.contactEmail} instead.`,
      fieldErrors: {},
    };
  }

  throw new Error(
    `CONTACT_PROVIDER="${provider}" is set, but no delivery is implemented ` +
      `for it. Fields ready to send: ${Object.keys(submission).join(", ")}.`,
  );
}
