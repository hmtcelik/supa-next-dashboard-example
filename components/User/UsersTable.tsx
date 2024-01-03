"use client";

import { Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import DeletePopup from "../DeletePopup";
import { deleteUserFromId, getAllUsers, getCurrentUser } from "@/services/User";

const UsersTable = ({ message }: { message: string }) => {
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuperUser, setIsSuperUser] = useState<boolean>(false);

  const getUsers = () => {
    setIsLoading(true);
    getAllUsers()
      .then((res) => {
        setData(res.users);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteUser = (id: string) => {
    deleteUserFromId(id).then(() => {
      // remove user from state so it doesn't need to be fetched again
      setData(data.filter((user) => user.id !== id));
    });
  };

  const handleCurrentUser = () => {
    getCurrentUser().then((session: Session | null) => {
      if (session) {
        setIsSuperUser(session.user.role === "superuser");
      }
    });
  };

  useEffect(() => {
    getUsers();
    handleCurrentUser();
  }, []);

  if (isLoading) {
    return (
      <div
        className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border rounded-lg overflow-hidden dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Last Signed In
                    </th>
                    {isSuperUser && (
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                      >
                        Action
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {data.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {user.last_sign_in_at || "Never"}
                      </td>
                      {isSuperUser && (
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          <button
                            type="button"
                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          >
                            <DeletePopup onClick={() => deleteUser(user.id)} />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {error?.message && (
        <div className="flex items-center justify-start mt-6">
          <p className="text-red-500">{error.message}</p>
        </div>
      )}
    </>
  );
};

export default UsersTable;
