"use server";

import { WelcomeEmailTemplate } from "@/utils/templates/EmailTemplate";
import { createSupaAdminClient, createSupaClientClient } from "./Client";
import sendEmail from "./Email";
import { getSession } from "./Session";
import { User } from "@supabase/supabase-js";
import { Tables } from "@/types/database-generated.types";

const getAllUsers = async () => {
  const currentSession = await getSession();

  const { data: users, error } =
    await createSupaAdminClient().auth.admin.listUsers();

  if (currentSession?.user.role !== "superuser") {
    // should be getting with from db but this is a demo so we'll just filter
    const filteredData = users.users.filter(
      (user) => user.role !== "superuser"
    );
    users.users = filteredData;
  }

  if (error) {
    throw new Error(error.message);
  }
  return users;
};

type UserRatio = {
  roles: string[];
  totals: number[];
};

const getUserRoleRatio = async () => {
  // NOTE: created this view with this query:
  // -- create view user_role_ratio as select count(*) as total, role from "auth"."users"  where role in ('superuser', 'admin') group by role

  const supabase = createSupaClientClient();

  const { data: userRatio, error } = await supabase
    .from("user_role_ratio")
    .select("*")
    .returns<Tables<"user_role_ratio">[]>();

  if (error) {
    throw new Error(error.message);
  }

  const ratio: UserRatio = {
    roles: [],
    totals: [],
  };

  userRatio.forEach((user) => {
    if (user?.role) {
      ratio.roles.push(user.role);
      ratio.totals.push(user?.total || 0);
    }
  });

  return ratio;
};

const deleteUserFromId = async (id: string) => {
  const { error } = await createSupaAdminClient().auth.admin.deleteUser(id);

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return null;
};

const getCurrentUser = async () => {
  const session = await getSession();

  return session ? session : null;
};

const createUser = async (email: string, role: string) => {
  const supaAdminClient = createSupaAdminClient();

  const password = Math.random().toString(36).slice(-10);

  const { data: user, error } = await supaAdminClient.auth.admin.createUser({
    email,
    role,
    password,
    email_confirm: true,
  });

  if (error) {
    throw new Error(error.message);
  }

  const message = await WelcomeEmailTemplate(email, password);

  sendEmail(email, "Welcome to Supa-Admin", message);

  return true;
};

export {
  createUser,
  deleteUserFromId,
  getAllUsers,
  getCurrentUser,
  getUserRoleRatio,
};
