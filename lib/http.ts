import { NextResponse } from "next/server";

export class HttpError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

export function sameOrigin(request: Request) {
  const expected = process.env.APP_URL || (process.env.NODE_ENV !== "production" ? "http://127.0.0.1:8124" : "");
  if (!expected || request.headers.get("origin") !== expected) throw new HttpError(403, "This request could not be verified. Refresh the page and try again.");
}

export async function body(request: Request): Promise<Record<string, unknown>> {
  if (!request.headers.get("content-type")?.startsWith("application/json")) throw new HttpError(415, "JSON content is required.");
  const reader = request.body?.getReader();
  if (!reader) throw new HttpError(400, "The request is empty.");
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 49152) { await reader.cancel(); throw new HttpError(413, "The request is too large."); }
      chunks.push(value);
    }
    const value = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid object");
    return value;
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(400, "The request could not be read.");
  } finally { reader.releaseLock(); }
}

export function textField(value: unknown, label: string, min: number, max: number) {
  if (typeof value !== "string" || value.trim().length < min || value.trim().length > max || /\u0000/.test(value)) throw new HttpError(400, `${label} must contain ${min} to ${max} characters.`);
  return value.trim();
}

export function emailField(value: unknown) {
  const email = textField(value, "Email", 3, 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new HttpError(400, "Enter a valid email address.");
  return email;
}

export function respondError(error: unknown) {
  if (error instanceof HttpError) return NextResponse.json({ error: error.message }, { status: error.status });
  console.error("Portfolio request failed:", error instanceof Error ? error.message : "Unknown error");
  return NextResponse.json({ error: "Unable to save your request right now. Please try again shortly." }, { status: 503 });
}

const state = globalThis as typeof globalThis & { portfolioLimits?: Map<string, { count: number; until: number }> };
export function rateLimit(request: Request, scope: string, maximum: number, minutes: number) {
  const limits = state.portfolioLimits ||= new Map();
  const now = Date.now();
  for (const [key, value] of limits) if (value.until < now) limits.delete(key);
  const key = `${scope}:${request.headers.get("x-real-ip") || "local"}`;
  const current = limits.get(key) || { count: 0, until: now + minutes * 60000 };
  if (current.count >= maximum || limits.size >= 10000) throw new HttpError(429, "Too many attempts. Please try again later.");
  current.count++;
  limits.set(key, current);
}
