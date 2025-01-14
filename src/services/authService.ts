import { supabase } from '../lib/supabase';
import type { SignUpData } from '../types/auth';

export async function signUp(data: SignUpData) {
  const { email, password, phone_number, first_name, last_name, country, user_type } = data;
  
  // Create auth user first
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name,
        last_name,
        phone_number,
        country,
        user_type
      }
    }
  });

  if (authError) throw authError;
  if (!authData.user) throw new Error('Failed to create user');

  // Create user profile
  const { error: profileError } = await supabase
    .from('users')
    .insert([{
      id: authData.user.id,
      first_name,
      last_name,
      email,
      phone_number,
      country,
      user_type
    }]);

  if (profileError) throw profileError;

  return authData;
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });

  if (error) throw error;
  return data;
}

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  
  if (!session?.user) return null;

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single();

  return profile;
}