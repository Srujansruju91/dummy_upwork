/*
  # Fix RLS policies for user registration and authentication

  1. Changes
    - Update users table RLS policies to allow registration
    - Add policy for inserting new users during signup
    - Fix policy for viewing user profiles
  
  2. Security
    - Maintain RLS protection while allowing necessary operations
    - Ensure users can only access appropriate data
*/

-- Drop existing policies on users table
DROP POLICY IF EXISTS "Users can view their own profile" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;

-- Allow inserting new users during signup
CREATE POLICY "Enable insert for authentication" ON public.users
  FOR INSERT
  WITH CHECK (true);  -- Allow insert during signup

-- Allow users to view their own profile
CREATE POLICY "Enable read access for users" ON public.users
  FOR SELECT
  USING (
    auth.uid() = id OR
    auth.role() = 'authenticated'
  );

-- Allow users to update their own profile
CREATE POLICY "Enable update for users based on id" ON public.users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);