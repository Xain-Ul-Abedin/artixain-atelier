'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '../lib/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  tier: 'Patron' | 'Connoisseur' | 'Master Atelier';
  wristCircumferenceCm?: number;
  ordersCount: number;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  signInWithEmail: (email: string) => Promise<{ success: boolean; error?: string }>;
  signInAsDemo: (name?: string) => void;
  signOut: () => Promise<void>;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Check active session from Supabase
    async function getInitialSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          setProfile({
            id: session.user.id,
            email: session.user.email ?? 'patron@artixain.com',
            name: session.user.user_metadata?.full_name ?? session.user.email?.split('@')[0] ?? 'Artixain Patron',
            tier: 'Connoisseur',
            wristCircumferenceCm: 16.5,
            ordersCount: 2
          });
        } else {
          // Check localStorage for demo user
          const cachedDemo = localStorage.getItem('artixain_demo_user');
          if (cachedDemo) {
            const parsed = JSON.parse(cachedDemo);
            setProfile(parsed);
          }
        }
      } catch (err) {
        console.error('Failed to get Supabase session', err);
      } finally {
        setIsLoading(false);
      }
    }

    getInitialSession();

    // Listen to Supabase auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        setProfile({
          id: session.user.id,
          email: session.user.email ?? '',
          name: session.user.user_metadata?.full_name ?? session.user.email?.split('@')[0] ?? 'Artixain Patron',
          tier: 'Connoisseur',
          wristCircumferenceCm: 16.5,
          ordersCount: 2
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const signInWithEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/profile` : undefined
        }
      });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Authentication failed' };
    }
  };

  const signInAsDemo = (name = 'Elena Rostova') => {
    const demoProf: UserProfile = {
      id: 'demo-usr-artixain-01',
      email: 'elena.rostova@artixain.com',
      name,
      tier: 'Master Atelier',
      wristCircumferenceCm: 16.0,
      ordersCount: 3
    };
    setProfile(demoProf);
    localStorage.setItem('artixain_demo_user', JSON.stringify(demoProf));
    setIsAuthModalOpen(false);
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error(err);
    }
    setUser(null);
    setSession(null);
    setProfile(null);
    localStorage.removeItem('artixain_demo_user');
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isLoading,
        signInWithEmail,
        signInAsDemo,
        signOut,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
