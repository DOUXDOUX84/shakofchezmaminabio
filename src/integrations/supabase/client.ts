import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://csfpfatfknjzednaypbx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzZnBmYXRma25qemVkbmF5cGJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyNjE2MTIsImV4cCI6MjA1MDgzNzYxMn0.3iaaUtdONsdSkrkdNrtjVJNxv3JdPPf8O-t9fplcgSs";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);