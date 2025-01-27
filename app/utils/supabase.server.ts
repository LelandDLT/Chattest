import { createClient } from "@supabase/supabase-js";
import type { Database } from "~/types/database";

export const createServerClient = () => {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
  }
  
  return createClient<Database>(supabaseUrl, supabaseKey);
};
