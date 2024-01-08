"use server";

import { Tables } from "@/types/database-generated.types";
import { randomUUID } from "crypto";
import { createFetch, createSupaClient, createSupaServerClient } from "./Client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types";

const getAllBusinesses = async () => {
  const supabase = createClientComponentClient<Database>(
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      options: {
        global:{
          fetch: createFetch(
            {
              cache:"no-store"
            }
          )
        }
      },
    }
  );
  const { data: businesses, error } = await supabase
    .from("business")
    .select("*")
    .returns<Tables<"business">[]>();

  if (error) {
    throw new Error(error.message);
  }

  return businesses;
};

const deleteBusinessFromId = async (id: number) => {
  const supabase = createSupaClient();
  const { error } = await supabase.from("business").delete().match({ id });

  if (error) {
    throw new Error(error.message);
  }

  return null;
};

const createBusiness = async (formData: FormData) => {
  const supabase = createSupaClient();

  const name = formData.get("name") as string;
  const file = formData.get("file") as File;
  const filename = `${randomUUID()}-${file.name}`;

  // upload to storage
  const { data: storage, error: storageError } = await supabase.storage
    .from("business")
    .upload(filename, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (storageError) {
    throw new Error(storageError.message);
  }

  const { data: business, error } = await supabase
    .from("business")
    .insert({ name, file_path: filename })
    .select()
    .returns<Tables<"business">>();

  if (error) {
    await supabase.storage.from("business").remove([storage.path]);
    throw new Error(error.message);
  }

  return business;
};

export { createBusiness, deleteBusinessFromId, getAllBusinesses };
