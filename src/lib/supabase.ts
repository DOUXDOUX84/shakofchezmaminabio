import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://csfpfatfknjzednaypbx.supabase.co';

export const supabase = createClient(
  supabaseUrl,
  import.meta.env.VITE_SUPABASE_API_KEY || ''
);