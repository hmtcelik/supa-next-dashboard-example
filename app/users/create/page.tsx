import UserCreateForm from "@/components/UserCreateForm";
import Session from "@/services/server/Session";

const UserCreatePage = async () => {
  await Session.protectAdminRoute();

  return (
    <div>
      <h1 className="text-2xl mb-10 dark:text-white">Create a New User</h1>
      <UserCreateForm />
    </div>
  );
};

export default UserCreatePage;
