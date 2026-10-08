import type { Metadata } from "next";

import { Admin } from "@/components/admin/Admin";

/* Not for search engines, and not linked from anywhere on the site. */
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <Admin />;
}
