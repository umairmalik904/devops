import { access, mkdir } from "node:fs/promises";
import { constants } from "node:fs";
import { NextResponse } from "next/server";
import { readDatabase, storageDirectory } from "../../../lib/store";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    await mkdir(storageDirectory, { recursive: true, mode: 0o700 });
    await access(storageDirectory, constants.W_OK);
    await readDatabase();
    if (!process.env.ADMIN_PASSWORD_HASH || !process.env.SESSION_SECRET || !process.env.APP_URL) throw new Error("Configuration missing");
    return NextResponse.json({ status: "ok" }, { headers: { "Cache-Control": "no-store" } });
  } catch { return NextResponse.json({ status: "unavailable" }, { status: 503 }); }
}
