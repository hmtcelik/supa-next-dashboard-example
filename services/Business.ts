"use server";

import { Tables } from "@/types/database-generated.types";
import { randomUUID } from "crypto";
import { createSupaClient, createSupaServerClient } from "./Client";

const getAllBusinesses = async () => {
  const supabase = createSupaServerClient();
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
