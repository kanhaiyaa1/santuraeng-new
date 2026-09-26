import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Placeholder values let the app build even if .env.local hasn't been created yet.
// Calls made against these placeholders will fail at runtime until real values are set.
// Accepts either the legacy anon key or Supabase's newer publishable key, since hosting
// integrations (e.g. the Vercel <-> Supabase integration) may inject either name.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'placeholder-anon-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
