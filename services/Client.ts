'use server'

import { Database } from "@/types/database-generated.types";
import { createClient } from "@supabase/supabase-js";

const createSupaAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceKey = process.env.SUPA_SERVICE_KEY || "";

  return createClient(supabaseUrl, serviceKey);
};

const createSupaClient = ()  => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const annonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  return createClient<Database>(supabaseUrl, annonKey);
}

export { createSupaAdminClient, createSupaClient };