"use client";

import { createBusiness } from "@/services/Business";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const BusinessCreateForm = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setError(new Error("Please select an image"));
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);

    setIsLoading(true);
    createBusiness(formData)
      .then((res) => {
        router.push("/businesses?message=User%20Created%20Successfully!");
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        <div>
          <label
            htmlFor="input-label"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="input-label"
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-700 dark:border-gray-500 dark:text-gray-400 dark:focus:ring-gray-600"
            placeholder="some business"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 dark:text-white">
            Image
          </label>
          <label className="block">
            <span className="sr-only">Choose an image</span>
            <input
              type="file"
              className="block w-full text-sm text-gray-500
                        file:me-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-600 file:text-white
                        hover:file:bg-blue-700
                        file:disabled:opacity-50 file:disabled:pointer-events-none
                        dark:file:bg-blue-500
                        dark:hover:file:bg-blue-400
                        "
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
          </label>
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
            {isLoading ? "Creating..." : "+ Create Business"}
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

export default BusinessCreateForm;
