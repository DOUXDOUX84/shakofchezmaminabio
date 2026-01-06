import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ohejeaaptzknnwgwimdy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oZWplYWFwdHprbm53Z3dpbWR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2OTY1MzMsImV4cCI6MjA4MzI3MjUzM30.D8jOsv7NVpAMXlEzLM7NRkWApr7GkoEKW354W0x6pIo";

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