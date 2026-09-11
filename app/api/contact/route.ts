import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { body, emailField, HttpError, rateLimit, respondError, sameOrigin, textField } from "../../../lib/http";
import { updateDatabase } from "../../../lib/store";

export async function POST(request: Request) {
  try {
    sameOrigin(request); rateLimit(request, "contact", 5, 60);
    const data = await body(request);
    if (data.website) return NextResponse.json({ ok: true });
    const message = { id: randomUUID(), name: textField(data.name, "Name", 2, 120), email: emailField(data.email), subject: textField(data.subject, "Subject", 3, 160), message: textField(data.message, "Message", 20, 5000), receivedAt: new Date().toISOString() };
    await updateDatabase(db => { if (db.messages.length >= 1000) throw new HttpError(503, "Please contact Umair directly at umair@umairops.com."); db.messages.unshift(message); });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) { return respondError(error); }
}
