import { NextResponse } from "next/server";
import { requireAdmin } from "../../../../lib/auth";
import { body, HttpError, respondError, sameOrigin, textField } from "../../../../lib/http";
import { readDatabase, updateDatabase } from "../../../../lib/store";

export async function GET() {
  try { await requireAdmin(); return NextResponse.json((await readDatabase()).messages, { headers: { "Cache-Control": "no-store" } }); }
  catch (error) { return respondError(error); }
}
export async function DELETE(request: Request) {
  try {
    sameOrigin(request); await requireAdmin();
    const id = textField((await body(request)).id, "Message ID", 1, 100);
    await updateDatabase(db => { const index = db.messages.findIndex(m => m.id === id); if (index < 0) throw new HttpError(404, "This message no longer exists."); db.messages.splice(index, 1); });
    return NextResponse.json({ ok: true });
  } catch (error) { return respondError(error); }
}
