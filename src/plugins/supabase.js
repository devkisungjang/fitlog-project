// src/plugins/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://klsapatkszuaoccelaua.supabase.co"; // Supabase URL
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtsc2FwYXRrc3p1YW9jY2VsYXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM0MzU1MjcsImV4cCI6MjAzOTAxMTUyN30.IagaStRPsv05z6qNr5A2uZjnfd6crS8_y75B2hUjLIQ"; // Supabase anon key
export const supabase = createClient(supabaseUrl, supabaseKey);
