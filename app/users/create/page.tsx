import React from "react";

const UserCreatePage = () => {
  return (
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
          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-700 dark:border-gray-500 dark:text-gray-400 dark:focus:ring-gray-600"
          placeholder="you@site.com"
        />
      </div>
      <div>
        <label
          htmlFor="input-label"
          className="block text-sm font-medium mb-2 dark:text-white"
        >
          Role
        </label>
        <select className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-700 dark:border-gray-500 dark:text-gray-400 dark:focus:ring-gray-600">
          <option>Admin</option>
          <option>Superuser</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          + Create User
        </button>
      </div>
    </div>
  );
};

export default UserCreatePage;
