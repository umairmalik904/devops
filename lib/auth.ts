import { createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { HttpError } from "./http";

const derive = promisify(scrypt);
export const cookieName = "umairops_session";
export const sessionSeconds = 8 * 60 * 60;

function signingKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32 || !process.env.ADMIN_PASSWORD_HASH) throw new HttpError(503, "Admin access is temporarily unavailable.");
  return `${secret}:${process.env.ADMIN_PASSWORD_HASH}`;
}

export async function checkPassword(email: string, password: string) {
  const encoded = process.env.ADMIN_PASSWORD_HASH;
  if (!encoded) throw new HttpError(503, "Admin access is temporarily unavailable.");
  const [salt, hash] = encoded.split(":");
  if (!salt || !/^[a-f0-9]{128}$/.test(hash || "")) throw new HttpError(503, "Admin access is temporarily unavailable.");
  const expected = Buffer.from(hash, "hex");
  const actual = await derive(password, salt, 64) as Buffer;
  return timingSafeEqual(actual, expected) && email === process.env.ADMIN_EMAIL;
}

export function createSession() {
  const payload = Buffer.from(JSON.stringify({ expires: Date.now() + sessionSeconds * 1000, nonce: randomBytes(16).toString("hex") })).toString("base64url");
  return `${payload}.${createHmac("sha256", signingKey()).update(payload).digest("base64url")}`;
}

export async function isAdmin() {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token || token.length > 1024) return false;
  try {
    const [payload, signature, extra] = token.split(".");
    if (!payload || !signature || extra) return false;
    const expected = createHmac("sha256", signingKey()).update(payload).digest();
    const actual = Buffer.from(signature, "base64url");
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return false;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return Number.isFinite(data.expires) && data.expires > Date.now() && data.expires <= Date.now() + sessionSeconds * 1000;
  } catch { return false; }
}

export async function requireAdmin() {
  if (!await isAdmin()) throw new HttpError(401, "Your session has expired. Sign in again to continue.");
}

export function cookieSettings() {
  return { httpOnly: true, secure: (process.env.APP_URL || "").startsWith("https://"), sameSite: "strict" as const, path: "/", maxAge: sessionSeconds };
}
