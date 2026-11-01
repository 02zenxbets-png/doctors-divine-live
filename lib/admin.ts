import { cookies } from "next/headers";
import { ADMIN_COOKIE, isSessionValid } from "@/lib/auth";

/** True when the request carries a valid admin session cookie. */
export function isAdminRequest(): boolean {
  try {
    const value = cookies().get(ADMIN_COOKIE)?.value;
    return isSessionValid(value);
  } catch {
    return false;
  }
}
