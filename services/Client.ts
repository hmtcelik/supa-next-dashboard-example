import { createClient } from "@supabase/supabase-js";

const createSupaClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceKey = process.env.SUPA_SERVICE_KEY || "";

  return createClient(
    supabaseUrl,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzc2hleGV5anh1dndwaHJ1emxoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzg0NjIwNCwiZXhwIjoyMDE5NDIyMjA0fQ.eTEBL1obLjjHRAOWtpzK1ERgXcKz2Usks1-4_IQb_co"
  );
};

export default { createSupaClient };
