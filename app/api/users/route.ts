import { supaAdmin } from "@/services/server/Client";
import Session from "@/services/server/Session";

export async function GET() {
  await Session.protectRoute();
  const currentSession = await Session.get();

  const { data: users, error } = await supaAdmin.auth.admin.listUsers();

  if (currentSession?.user.role !== "superuser") {
    // should be getting with from db but this is a demo so we'll just filter
    const filteredData = users.users.filter(
      (user) => user.role !== "superuser"
    );
    users.users = filteredData;

    return Response.json({
      users,
      error,
    });
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

  return Response.json({
    user,
    error,
  });
}
