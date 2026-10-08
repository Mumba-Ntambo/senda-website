import { brand } from "@/content/shared";

/* The standard rejection, written once: the server sends it as it is,
   and the dashboard can open the same words as a draft to edit. */
export function rejectionMessage(application: {
  name: string;
  role_title: string;
}) {
  return {
    subject: `Your application for ${application.role_title} at ${brand.name}`,
    body: [
      `Dear ${application.name},`,
      `Thank you for applying for the ${application.role_title} role at ${brand.name}, and for the time you put into your application.`,
      "We have reviewed it carefully and, on this occasion, we will not be taking it further.",
      "We will keep your application on file, and we will be in touch if a role that suits your experience opens up.",
      "We wish you the very best in your search.",
      `Kind regards,\n${brand.name}`,
    ].join("\n\n"),
  };
}
