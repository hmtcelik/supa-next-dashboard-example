'use server'

import { Tables } from "@/types/database-generated.types";
import { createSupaClient } from "./Client";

const getAllBusinesses = async () => {

  const supabase = createSupaClient();
  const { data: businesses, error } = await supabase.from("business").select("*").returns<Tables<'business'>[]>();

  if (error){
    throw new Error(error.message);
  }

  return businesses
};

const deleteBusinessFromId = async (id: number) => {
  const supabase = createSupaClient();
  const { error } = await supabase.from("business").delete().match({ id });

  if (error) {
    throw new Error(error.message);
  }

  return null;
};

const createBusiness = async (fromData: FormData) => {
  const supabase = createSupaClient();

  const name = fromData.get("name") as string;
  const file = fromData.get("file") as File;

  // upload to storage
  const { data: storage, error: storageError } = await supabase.storage.from("business").upload(file.name, file);

  if (storageError){
    console.error(storageError);
    throw new Error(storageError.message);
  }

  const { data: business, error } = await supabase.from("business").insert({ name, file_path: storage.path }).select().returns<Tables<'business'>>();

  if (error){
    console.log(error)
    await supabase.storage.from("business").remove([storage.path]);
    throw new Error(error.message);
  }

  return business
}

export { createBusiness, deleteBusinessFromId, getAllBusinesses };
