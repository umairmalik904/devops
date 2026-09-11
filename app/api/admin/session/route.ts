import { NextResponse } from "next/server";
import { checkPassword, cookieName, cookieSettings, createSession } from "../../../../lib/auth";
import { body, emailField, HttpError, rateLimit, respondError, sameOrigin, textField } from "../../../../lib/http";

export async function POST(request: Request) {
  try {
    sameOrigin(request);
    rateLimit(request, "login", 8, 15);
    const data = await body(request);
    if (!await checkPassword(emailField(data.email), textField(data.password, "Password", 1, 256))) throw new HttpError(401, "The email or password is incorrect.");
    const response = NextResponse.json({ ok: true });
    response.cookies.set(cookieName, createSession(), cookieSettings());
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) { return respondError(error); }
}

export async function DELETE(request: Request) {
  try {
    sameOrigin(request);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(cookieName, "", { ...cookieSettings(), maxAge: 0 });
    return response;
  } catch (error) { return respondError(error); }
}
