import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Homepage from './Homepage';
import VillesPage from './VillesPage';
import GaleriePage from './GaleriePage';
import UchroniesPage from './UchroniesPage';
import LoginPage from './LoginPage';

function PrivateRoute({ user, profile, children }) {
  if (user === undefined) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const [user, setUser] = useState(undefined);
  const [profile, setProfile] = useState(null);

  const fetchProfile = async (userId) => {
  console.log('fetchProfile appelé pour:', userId);
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  console.log('data:', data, 'error:', error);

  if (data) {
    setProfile(data);
  } else {
    const { data: newProfile, error: insertError } = await supabase
      .from('profiles')
      .insert([{ id: userId, is_premium: false }])
      .select()
      .single();
    console.log('newProfile:', newProfile, 'insertError:', insertError);
    setProfile(newProfile);
  }
}

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
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage user={user} profile={profile} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/galerie" element={<GaleriePage user={user} profile={profile} />} />
        <Route path="/villes" element={
          <PrivateRoute user={user} profile={profile}>
            <VillesPage user={user} profile={profile} />
          </PrivateRoute>
        } />
        <Route path="/uchronies" element={
          <PrivateRoute user={user} profile={profile}>
            <UchroniesPage user={user} profile={profile} />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
