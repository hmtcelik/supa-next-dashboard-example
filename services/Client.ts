import { createClient } from "@supabase/supabase-js";

const createSupaClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const annonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  return createClient(supabaseUrl, annonKey);
};

export default { createSupaClient };
