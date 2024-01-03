'use server'

import { createClient } from "@supabase/supabase-js";

const createSupaAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceKey = process.env.SUPA_SERVICE_KEY || "";

  return createClient(supabaseUrl, serviceKey);
};

export { createSupaAdminClient };
