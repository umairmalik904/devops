import type { MetadataRoute } from "next";
import { publishedProjects } from "../lib/store";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await publishedProjects();
  return [{ url: "https://umairops.com", changeFrequency: "monthly", priority: 1 }, { url: "https://umairops.com/contact", changeFrequency: "yearly", priority: .7 }, ...projects.map(project => ({ url: `https://umairops.com/work/${project.id}`, changeFrequency: "monthly" as const, priority: .8 }))];
}
