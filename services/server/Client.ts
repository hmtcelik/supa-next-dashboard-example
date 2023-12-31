import { createClient } from "@supabase/supabase-js";

const createSupaAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceKey = process.env.SUPA_SERVICE_KEY || "";

  return createClient(supabaseUrl, serviceKey);
};

export default { createSupaAdminClient };

export const supaAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPA_SERVICE_KEY || ""
);
