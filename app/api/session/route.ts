import Session from "@/services/server/Session";

export async function GET() {
  const session = await Session.get();

  if (!session) {
    throw new Error("No session found");
  }

  return Response.json({
    session,
  });
}
