import { supabase, isSupabaseConfigured } from './supabase';
import { UserProfile } from '@/types';

const LOCAL_STORAGE_USER_KEY = 'shopwitholly_user';

export async function signInWithGoogle(): Promise<{ user?: UserProfile; error?: string; redirected?: boolean }> {
  if (isSupabaseConfigured) {
    try {
      const redirectUrl = typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined;
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        return { error: error.message };
      }

      if (data?.url) {
        window.location.href = data.url;
        return { redirected: true };
      }
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : 'Google OAuth failed' };
    }
  }

  // Simulated Google Sign-In for instant local development if Supabase/Google keys are not yet configured
  const mockUser: UserProfile = {
    id: 'google-user-' + Math.random().toString(36).substring(7),
    email: 'olivia.sterling@gmail.com',
    name: 'Olivia Sterling',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    provider: 'google',
  };

  saveUserLocally(mockUser);
  return { user: mockUser };
}

export async function signOutUser(): Promise<void> {
  if (isSupabaseConfigured) {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Supabase sign out error:', e);
    }
  }
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  }
}

export function saveUserLocally(user: UserProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
}

export function getCurrentUser(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
