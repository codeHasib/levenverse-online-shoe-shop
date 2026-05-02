import { auth } from "@/lib/auth";

export const checkAdmin = async (req) => {
  const session = await auth.getSession(req);

  if (!session) {
    throw new Error("Unauthorized: No session");
  }

  if (session.data.user.name !== "ADMIN") {
    throw new Error("Forbidden: Not admin");
  }

  return session;
};
