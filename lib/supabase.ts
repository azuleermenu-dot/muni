import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !publishableKey) {
  console.warn('MUNI: Supabase environment variables are missing. Add them to your local .env file.');
}

export const supabase = url && publishableKey
  ? createClient<Database>(url, publishableKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  : null;

export function requireSupabase() {
  if (!supabase) throw new Error('Supabase is not configured. Copy .env.example to .env and add your MUNI project credentials.');
  return supabase;
}
