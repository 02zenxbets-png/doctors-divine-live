#!/usr/bin/env node
/**
 * Generate a bcrypt hash for the dashboard admin password.
 *
 * Usage:
 *   npm run hash-password -- "YourStrongPasswordHere"
 *   (or: node scripts/generate-hash.mjs "YourStrongPasswordHere")
 *
 * Copy the printed hash into the ADMIN_PASSWORD_HASH env var in Vercel.
 * The password itself must NEVER be pasted into any file, chat, or repo —
 * only the hash goes into the env var.
 *
 * If the password is forgotten later, there is no recovery: generate a new
 * hash for a new password and update the env var in Vercel, then redeploy.
 */
import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password) {
  console.error('Usage: npm run hash-password -- "YourStrongPasswordHere"');
  process.exit(1);
}
if (password.length < 8) {
  console.error("Password kam se kam 8 characters ka rakhein.");
  process.exit(1);
}
const hash = bcrypt.hashSync(password, 12);
console.log("\nADMIN_PASSWORD_HASH value (copy this into Vercel, not the password):\n");
console.log(hash);
console.log("\nDone. Ise kisi file me save mat karein — sirf Vercel ke env var me daalein.\n");
