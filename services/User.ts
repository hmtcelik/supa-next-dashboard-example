'use server'

import { WelcomeEmailTemplate } from "@/utils/templates/EmailTemplate";
import { createSupaAdminClient, } from "./Client";
import sendEmail from "./Email";
import { getSession } from "./Session";
import { User } from "@supabase/supabase-js";

const getAllUsers = async () => {
  const currentSession = await getSession();

  const { data: users, error } = await createSupaAdminClient().auth.admin.listUsers();

  if (currentSession?.user.role !== "superuser") {
    // should be getting with from db but this is a demo so we'll just filter
    const filteredData = users.users.filter(
      (user) => user.role !== "superuser"
    );
    users.users = filteredData;
  }

  if (error){
    throw new Error(error.message);
  }
  return users
};

type UserRatio = {
  role: string,
  ratio: number
}

const getUserRoleRatio = async () => {
  const { data: users, error } = await createSupaAdminClient().auth.admin.listUsers();

  if (error){
    throw new Error(error.message);
  }

  // find user hundred percentage ratio (%60) based on roles
  // example: [{role: "admin", ratio: 60}, {role: "user", ratio: 40}]
  const userRoles = ["superuser", "admin"];
  const userRatio :UserRatio[] = [];
  let total = 0;
  
  users.users.forEach((user:User) => {
    if (!user.role) return;
    if (userRoles.includes(user.role)) total++;
  });
  
  userRoles.forEach((role) => {
    const ratio = Math.round((users.users.filter((user) => user.role === role).length /    total) * 100);
    userRatio.push({ role, ratio });
  });

  return {
    labels: userRatio.map((role) => role.role),
    data: userRatio.map((role) => role.ratio),
  };

}

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

  const { data: user, error } = await supaAdminClient.auth.admin.createUser(
    {
      email,
      role,
      password,
      email_confirm: true,
    }
  );

  if (error){
    throw new Error(error.message);
  }

  const message = await WelcomeEmailTemplate(email, password);

  sendEmail(email, "Welcome to Supa-Admin", message);

  return true
};

export { createUser, deleteUserFromId, getAllUsers, getCurrentUser, getUserRoleRatio };

