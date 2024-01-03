"use client";

import { Database } from "@/types/database-generated.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutButton = () => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  return (
    <div
      onClick={() =>
        supabase.auth
          .signOut()
          .then(() => {
            router.push("/login");
          })
          .catch((error) => {
            console.log(error);
          })
      }
      className="border border-red-800 flex cursor-pointer items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-red-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:bg-gray-800 dark:text-red-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
    >
      Log out
    </div>
  );
};

export default LogoutButton;
