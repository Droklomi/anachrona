'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const AuthContext = createContext({ user: undefined, profile: null });

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [profile, setProfile] = useState(null);

  const fetchProfile = async (userId) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (data) {
      setProfile(data);
    } else {
      const { data: newProfile } = await supabase
        .from('profiles')
        .insert([{ id: userId, is_premium: false }])
        .select()
        .single();
      setProfile(newProfile);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) fetchProfile(u.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) fetchProfile(u.id);
      else setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []); // eslint-disable-line

  return (
    <AuthContext.Provider value={{ user, profile }}>
      {children}
    </AuthContext.Provider>
  );
}
