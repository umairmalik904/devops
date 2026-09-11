import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { requireAdmin } from "../../../../lib/auth";
import { body, HttpError, respondError, sameOrigin, textField } from "../../../../lib/http";
import { readDatabase, updateDatabase } from "../../../../lib/store";
import { projectInput } from "../../../../lib/validation";

export async function GET() {
  try { await requireAdmin(); return NextResponse.json((await readDatabase()).projects, { headers: { "Cache-Control": "no-store" } }); }
  catch (error) { return respondError(error); }
}

export async function POST(request: Request) {
  try {
    sameOrigin(request); await requireAdmin();
    const data = await body(request);
    const title = textField(data.title, "Title", 3, 120);
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70) || "engineering-work";
    const project = projectInput(data, `${slug}-${randomUUID().slice(0, 8)}`);
    await updateDatabase(db => { if (db.projects.length >= 100) throw new HttpError(400, "The portfolio supports up to 100 case studies."); db.projects.push(project); });
    return NextResponse.json(project, { status: 201 });
  } catch (error) { return respondError(error); }
}

export async function PUT(request: Request) {
  try {
    sameOrigin(request); await requireAdmin();
    const data = await body(request);
    const project = projectInput(data, textField(data.id, "Project ID", 1, 120));
    await updateDatabase(db => { const i = db.projects.findIndex(p => p.id === project.id); if (i < 0) throw new HttpError(404, "This project no longer exists."); db.projects[i] = project; });
    return NextResponse.json(project);
  } catch (error) { return respondError(error); }
}

export async function DELETE(request: Request) {
  try {
    sameOrigin(request); await requireAdmin();
    const id = textField((await body(request)).id, "Project ID", 1, 120);
    await updateDatabase(db => { const i = db.projects.findIndex(p => p.id === id); if (i < 0) throw new HttpError(404, "This project no longer exists."); db.projects.splice(i, 1); });
    return NextResponse.json({ ok: true });
  } catch (error) { return respondError(error); }
}
