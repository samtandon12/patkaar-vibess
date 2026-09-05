// PATKAAR VIBESS - SUPABASE CLIENT INTEGRATION

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-patkaar-vibess.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-anon-key-patkaar-vibess-12345';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
