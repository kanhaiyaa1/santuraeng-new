import { createClient } from '@supabase/supabase-js';

// Placeholder values let the app build before real credentials are added to .env.local.
// Calls made against these placeholders will fail at runtime until real values are set.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
