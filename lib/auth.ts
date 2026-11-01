import bcrypt from "bcryptjs";
import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "dd_admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

/**
 * Secret used to sign the dashboard session cookie.
 * Set ADMIN_SESSION_SECRET to a long random string in production. If it is
 * missing, we derive a secret from the admin password hash itself — that still
 * works, but changing the password then invalidates all sessions (which is
 * arguably a feature). Never expose either value to the browser.
 */
function getSessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD_HASH || ""
  );
}

function sign(payload: string): string {
  const secret = getSessionSecret();
  return createHmac("sha256", secret).update(payload).digest("hex");
}

/** Check a plaintext password against the bcrypt hash in ADMIN_PASSWORD_HASH. */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) return false;
  try {
    return await bcrypt.compare(password, hash);
  } catch {
    return false;
  }
}

/** True when an admin password hash is configured at all. */
export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD_HASH);
}

/** Create a signed session cookie value valid for 12 hours. */
export function createSessionValue(): string {
  const expiry = Date.now() + SESSION_TTL_MS;
  const payload = `v1.${expiry}`;
  return `${payload}.${sign(payload)}`;
}

/** Validate a session cookie value (signature + expiry). */
export function isSessionValid(value: string | undefined): boolean {
  if (!value) return false;
  const parts = value.split(".");
  if (parts.length !== 3) return false;
  const payload = `${parts[0]}.${parts[1]}`;
  const expiry = Number(parts[1]);
  if (!Number.isFinite(expiry) || Date.now() > expiry) return false;
  const expected = sign(payload);
  const given = parts[2];
  if (given.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(given), Buffer.from(expected));
  } catch {
    return false;
  }
}
