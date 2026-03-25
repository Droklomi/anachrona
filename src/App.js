import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import VillesPage from './VillesPage';
import GaleriePage from './GaleriePage';
import CataloguePage from './CataloguePage';
import MythologiePage from './MythologiePage';
import UchroniesPage from './UchroniesPage';
import LoginPage from './LoginPage';
import UniversePage from './UniversePage';
import ShufflePage from './ShufflePage';

function PrivateRoute({ user, profile, children }) {
  if (user === undefined) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
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
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CataloguePage user={user} profile={profile} />} />
        <Route path="/catalogue" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/galerie" element={<GaleriePage user={user} profile={profile} />} />
        <Route path="/univers/:universeId" element={<UniversePage user={user} profile={profile} />} />
        <Route path="/shuffle" element={<ShufflePage user={user} profile={profile} />} />
        <Route path="/mythologie" element={<MythologiePage user={user} profile={profile} />} />
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
