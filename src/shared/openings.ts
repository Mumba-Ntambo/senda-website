import { serverSupabase, supabaseConfigured } from "@/shared/supabase";
import type { Opening } from "@/shared/types";

/* How long a published change takes to reach the careers page, in
   seconds. Short enough that posting a role feels immediate, long
   enough that a busy page is not a query per visitor. */
const REVALIDATE = 60;

const COLUMNS =
  "id, title, type, location, area, summary, closes_on, description, work_mode, compensation";

type Row = {
  id: string;
  title: string;
  type: string;
  location: string;
  area: string;
  summary: string;
  closes_on: string | null;
  description: string;
  work_mode: string;
  compensation: string;
};

const toOpening = (row: Row): Opening => ({
  id: row.id,
  title: row.title,
  type: row.type,
  location: row.location,
  summary: row.summary,
  ...(row.area ? { area: row.area } : {}),
  ...(row.closes_on ? { closesOn: row.closes_on } : {}),
  ...(row.description ? { description: row.description } : {}),
  ...(row.work_mode ? { workMode: row.work_mode } : {}),
  ...(row.compensation ? { compensation: row.compensation } : {}),
});

/* The published, still-open roles, newest first. Row-level security
   does the filtering — an anonymous read cannot see anything else. */
export async function publishedOpenings(): Promise<Opening[]> {
  if (!supabaseConfigured) return [];

  const { data, error } = await serverSupabase(REVALIDATE)
    .from("openings")
    .select(COLUMNS)
    .order("created_at", { ascending: false });

  /* A careers page with no roles is better than a careers page that
     will not load because the database was briefly unreachable. */
  if (error || !data) return [];

  return (data as Row[]).map(toOpening);
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/* One published role, or null if it is not on the site — unknown id,
   a draft, or past its closing date all look the same from outside. */
export async function publishedOpening(id: string): Promise<Opening | null> {
  /* Anything that is not an id never reaches the database. */
  if (!supabaseConfigured || !UUID.test(id)) return null;

  const { data, error } = await serverSupabase(REVALIDATE)
    .from("openings")
    .select(COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return toOpening(data as Row);
}
