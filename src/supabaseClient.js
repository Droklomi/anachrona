import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://cabkgczjoalvdscqttny.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhYmtnY3pqb2FsdmRzY3F0dG55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NDE1NTcsImV4cCI6MjA4ODMxNzU1N30.FN-X8P3ij3Qc3q2c26rHNVnPnLFN1Y4tEWnH4_rbzic';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
