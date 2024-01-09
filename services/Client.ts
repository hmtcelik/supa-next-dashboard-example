"use server";

import { Database } from "@/types/database-generated.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";

const createSupaAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceKey = process.env.SUPA_SERVICE_KEY || "";

  return createClient(supabaseUrl, serviceKey);
};

const createSupaClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const annonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  return createClient<Database>(supabaseUrl, annonKey);
};

const createSupaServerClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceKey = process.env.SUPA_SERVICE_KEY || "";

  return createClient(supabaseUrl, serviceKey);
};

const StoragePath =
  "https://ssshexeyjxuvwphruzlh.supabase.co/storage/v1/object/public";

const createSupaClientClient = () => {
  return createClientComponentClient<Database>({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    options: {
      global: {
        fetch: createFetch({
          cache: "no-store",
        }),
      },
    },
  });
};

const createFetch =
  (options: Pick<RequestInit, "next" | "cache">) =>
  (url: RequestInfo | URL, init?: RequestInit) => {
    return fetch(url, {
      ...init,
      ...options,
    });
  };

export {
  createSupaAdminClient,
  createSupaClient,
  createSupaServerClient,
  createSupaClientClient,
};
