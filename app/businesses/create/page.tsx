import BusinessCreateForm from "@/components/Business/BusinessCreateForm";
import { protectRoute } from "@/services/Session";

// read ?message query param here
const UserCreatePage = async () => {
  await protectRoute();

  return (
    <div>
      <h1 className="text-2xl mb-10 dark:text-white">Create a New Business</h1>
      <BusinessCreateForm />
    </div>
  );
};

export default UserCreatePage;
