import { brand } from "@/content/shared";

/* The stages an applicant is written to about. "new" is not one: the
   apply form has already told them the application arrived. */
export type MailKind = "reviewing" | "shortlisted" | "rejected";

/* Where each email's send time is recorded on the application. */
export const SENT_COLUMN = {
  reviewing: "reviewing_sent_at",
  shortlisted: "shortlisted_sent_at",
  rejected: "rejection_sent_at",
} as const satisfies Record<MailKind, string>;

export const isMailKind = (value: unknown): value is MailKind =>
  typeof value === "string" && value in SENT_COLUMN;

/* The standard email for each stage, written once: the server sends it
   as it is, and the dashboard can open the same words as a draft to
   edit. */
export function applicantMessage(
  kind: MailKind,
  application: { name: string; role_title: string },
) {
  const role = application.role_title;

  const subject = {
    reviewing: `We are reviewing your application for ${role} at ${brand.name}`,
    shortlisted: `Next step in your application for ${role} at ${brand.name}`,
    rejected: `Your application for ${role} at ${brand.name}`,
  }[kind];

  const middle = {
    reviewing: [
      `Thank you for applying for the ${role} role at ${brand.name}. We have received your application and it is now being reviewed.`,
      "There is nothing more you need to do for now. We will be in touch as soon as we have a decision on the next step.",
    ],
    shortlisted: [
      `Thank you for applying for the ${role} role at ${brand.name}.`,
      "We have reviewed your application and would like to take it to the next stage.",
      "We will be in touch shortly to arrange a conversation. If there are days or times that suit you best over the coming week, reply to this email and let us know.",
    ],
    rejected: [
      `Thank you for applying for the ${role} role at ${brand.name}, and for the time you put into your application.`,
      "We have reviewed it carefully and, on this occasion, we will not be taking it further.",
      "We will keep your application on file, and we will be in touch if a role that suits your experience opens up.",
      "We wish you the very best in your search.",
    ],
  }[kind];

  return {
    subject,
    body: [
      `Dear ${application.name},`,
      ...middle,
      `Kind regards,\n${brand.name}`,
    ].join("\n\n"),
  };
}
