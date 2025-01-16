import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://csfpfatfknjzednaypbx.supabase.co';

export const supabase = createClient(
  supabaseUrl,
  process.env.SUPABASE_API_KEY || ''
);