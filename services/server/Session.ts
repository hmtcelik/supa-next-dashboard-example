import { Database } from "@/types/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supaAdmin } from "./Client";

const protectRoute = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/login");
  }
};

const protectAdminRoute = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session && session.user.role === "superuser") {
    return;
  }

  redirect("/login");
};

const get = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return session;
  }

  return null;
};

const verifyToken = async (token: string) => {
  const user = await supaAdmin.auth.getUser(token);

  if (user.error !== null) {
    return null;
  }

  return user;
};

export default { protectRoute, protectAdminRoute, get, verifyToken };