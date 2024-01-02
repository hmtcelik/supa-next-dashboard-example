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

export async function POST(req: Request) {
  await Session.protectRoute();

  const Body = await req.json();

  const { data: user, error } = await supaAdmin.auth.admin.inviteUserByEmail(
    Body.email,
    {
      data: {
        role: Body.role,
      },
      redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN}/login`,
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return Response.json({
    user,
    error,
  });
}
