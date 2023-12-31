import { supaAdmin } from "@/services/server/Client";
import Session from "@/services/server/Session";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await Session.protectAdminRoute();

  const { data, error } = await supaAdmin.auth.admin.deleteUser(params.id);

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return Response.json({
    data,
    error,
  });
}
