import { cookies } from "next/headers";
import { db } from "./db";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "./session";

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const session = verifySessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
  if (!session) return null;

  return db.adminUser.findFirst({
    where: { id: session.sub, username: session.username, active: true },
    select: { id: true, username: true, name: true, role: true },
  });
}
