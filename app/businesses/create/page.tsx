import BusinessCreateForm from "@/components/Business/BusinessCreateForm";
import UserCreateForm from "@/components/User/UserCreateForm";
import { protectAdminRoute } from "@/services/Session";

// read ?message query param here
const UserCreatePage = async () => {
  await protectAdminRoute();

  return (
    <div>
      <h1 className="text-2xl mb-10 dark:text-white">Create a New Business</h1>
      <BusinessCreateForm />
    </div>
  );
};

export default UserCreatePage;
