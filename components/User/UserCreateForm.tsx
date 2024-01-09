"use client";

import { createUser } from "@/services/User";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const UserCreateForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submitUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    createUser(email, role)
      .then((res) => {
        router.push("/users?message=User%20Created%20Successfully!");
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={submitUser}>
      <div className="flex flex-col gap-5">
        <div>
          <label
            htmlFor="input-label"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="input-label"
            className="py-3 px-4 block w-full border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-700 dark:border-gray-500 dark:text-gray-400 dark:focus:ring-gray-600"
            placeholder="you@site.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="input-label"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            Role
          </label>
          <select
            className="py-3 px-4 block w-full border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-700 dark:border-gray-500 dark:text-gray-400 dark:focus:ring-gray-600"
            defaultValue="admin"
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="admin">Admin</option>
            <option value="superuser">Superuser</option>
          </select>
        </div>

        <div className="flex justify-end gap-5">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-600 text-white hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white-600"
            onClick={() => router.push("/users")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            {isLoading ? "Creating..." : "+ Create User"}
          </button>
        </div>
        {error && (
          <div className="text-red-700 rounded relative">
            <span className="block sm:inline">{error.message}</span>
          </div>
        )}
      </div>
    </form>
  );
};

export default UserCreateForm;
