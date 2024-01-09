"use server";

import { Tables } from "@/types/database-generated.types";
import { randomUUID } from "crypto";
import {
  createSupaClient,
  createSupaClientClient,
  createSupaServerClient,
} from "./Client";

const getAllBusinesses = async () => {
  const supabase = createSupaClientClient();
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

const getBusinessRatiosGivenMonth = async (monthIdx: number) => {
  // NOTE: this is a view in the database
  // -- CREATE view business_ratio as SELECT COUNT(*) total, (created_at::date) as createdDate FROM business GROUP BY created_at::date;

  let startDate = new Date(new Date().getFullYear(), monthIdx, 1);
  let endDate;
  if (monthIdx === 11) {
    endDate = new Date(new Date().getFullYear() + 1, 0, 1);
  } else {
    endDate = new Date(new Date().getFullYear(), monthIdx + 1, 1);
  }

  const supabase = createSupaClientClient();
  const { data: ratios, error } = await supabase
    .from("business_ratio")
    .select("*")
    .gte("createddate", startDate.toISOString())
    .lt("createddate", endDate.toISOString())
    .returns<Tables<"business_ratio">[]>();

  if (error) {
    throw new Error(error.message);
  }

  const results: {
    totals: number[];
    dates: string[];
  } = {
    totals: [],
    dates: [],
  };

  ratios.forEach((ratio) => {
    if (ratio.createddate) {
      results.totals.push(ratio?.total || 0);
      results.dates.push(ratio?.createddate);
    }
  });

  return results;
};

export {
  createBusiness,
  deleteBusinessFromId,
  getAllBusinesses,
  getBusinessRatiosGivenMonth,
};
