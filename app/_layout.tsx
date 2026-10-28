import { useEffect, useState } from 'react';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '@/lib/supabase';

export default function Layout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!supabase) { setReady(true); return; }
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace('/login');
      setReady(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace('/login');
      setReady(true);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (!ready) return null;
  return <><StatusBar style="dark" /><Stack screenOptions={{ headerShown: false }} /></>;
}
