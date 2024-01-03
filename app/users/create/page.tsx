import UserCreateForm from "@/components/UserCreateForm";
import { protectAdminRoute } from "@/services/Session";

// read ?message query param here
const UserCreatePage = async () => {
  await protectAdminRoute();

  return (
    <div>
      <h1 className="text-2xl mb-10 dark:text-white">Create a New User</h1>
      <UserCreateForm />
    </div>
  );
};

export default UserCreatePage;
