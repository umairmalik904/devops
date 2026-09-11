import type { Metadata } from "next";
import { isAdmin } from "../../lib/auth";
import { Admin } from "./admin";
export const metadata: Metadata = { title: "Portfolio administration", robots: { index:false, follow:false } };
export const dynamic = "force-dynamic";
export default async function AdminPage() { return <Admin authenticated={await isAdmin()} />; }
