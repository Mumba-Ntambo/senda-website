/* Plain module, deliberately not "use server": a file with that
   directive may only export async functions, so the initial state
   object cannot live alongside the action. */

export type ContactFields = {
  name: string;
  email: string;
  company: string;
  /* Which services the enquiry is about. Plural because a project
     often needs more than one — an app and its backend is a normal
     ask, not an edge case. */
  services: string[];
  message: string;
};

export type ContactState = {
  status: "idle" | "invalid" | "unconfigured" | "sent";
  message: string;
  fieldErrors: Partial<Record<keyof ContactFields, string>>;
};

export const contactInitialState: ContactState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
