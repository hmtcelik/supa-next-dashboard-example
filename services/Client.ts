import { createClient } from "@supabase/supabase-js";

const createSupaClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceKey = process.env.SUPA_SERVICE_KEY || "";

  return createClient(supabaseUrl, serviceKey);
};

export default { createSupaClient };
