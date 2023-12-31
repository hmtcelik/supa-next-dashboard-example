import { supaAdmin } from "@/services/server/Client";
import Session from "@/services/server/Session";

export async function GET() {
  await Session.protectRoute();

  const { data: users, error } = await supaAdmin.auth.admin.listUsers();

  if (error) {
    throw new Error(error.message);
  }

  return Response.json({
    users,
    error,
  });
}
