/*
  # Initial Schema Setup for Upwork Clone

  1. New Tables
    - `users`: Store user profiles (both clients and freelancers)
    - `jobs`: Store job postings
    - `proposals`: Store job proposals
    - `skills`: Store available skills
    - `user_skills`: Junction table for user-skill relationships
    - `job_skills`: Junction table for job-skill relationships

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone_number text,
  country text NOT NULL,
  user_type text NOT NULL CHECK (user_type IN ('client', 'freelancer')),
  hourly_rate decimal CHECK (hourly_rate > 0),
  title text,
  bio text,
  availability text CHECK (availability IN ('FULL_TIME', 'PART_TIME', 'CONTRACT')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Jobs Table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  budget decimal NOT NULL CHECK (budget > 0),
  experience_level text NOT NULL CHECK (experience_level IN ('ENTRY', 'INTERMEDIATE', 'EXPERT')),
  status text NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
  client_id uuid NOT NULL REFERENCES users(id),
  freelancer_id uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- User Skills Junction Table
CREATE TABLE IF NOT EXISTS user_skills (
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  skill_id uuid REFERENCES skills(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, skill_id)
);

-- Job Skills Junction Table
CREATE TABLE IF NOT EXISTS job_skills (
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE,
  skill_id uuid REFERENCES skills(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (job_id, skill_id)
);

-- Proposals Table
CREATE TABLE IF NOT EXISTS proposals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  freelancer_id uuid NOT NULL REFERENCES users(id),
  cover_letter text NOT NULL,
  proposed_rate decimal NOT NULL CHECK (proposed_rate > 0),
  status text NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ACCEPTED', 'REJECTED')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users Policies
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Jobs Policies
CREATE POLICY "Anyone can view open jobs"
  ON jobs FOR SELECT
  TO authenticated
  USING (status = 'OPEN');

CREATE POLICY "Clients can create jobs"
  ON jobs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Clients can update their own jobs"
  ON jobs FOR UPDATE
  TO authenticated
  USING (auth.uid() = client_id);

-- Skills Policies
CREATE POLICY "Anyone can view skills"
  ON skills FOR SELECT
  TO authenticated
  USING (true);

-- User Skills Policies
CREATE POLICY "Users can manage their own skills"
  ON user_skills FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Job Skills Policies
CREATE POLICY "Anyone can view job skills"
  ON job_skills FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Clients can manage job skills"
  ON job_skills FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM jobs WHERE jobs.id = job_id AND jobs.client_id = auth.uid()
  ));

-- Proposals Policies
CREATE POLICY "Freelancers can create proposals"
  ON proposals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = freelancer_id);

CREATE POLICY "Users can view relevant proposals"
  ON proposals FOR SELECT
  TO authenticated
  USING (
    auth.uid() = freelancer_id OR
    EXISTS (
      SELECT 1 FROM jobs WHERE jobs.id = job_id AND jobs.client_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_client_id ON jobs(client_id);
CREATE INDEX IF NOT EXISTS idx_proposals_job_id ON proposals(job_id);
CREATE INDEX IF NOT EXISTS idx_proposals_freelancer_id ON proposals(freelancer_id);
CREATE INDEX IF NOT EXISTS idx_user_skills_user_id ON user_skills(user_id);
CREATE INDEX IF NOT EXISTS idx_job_skills_job_id ON job_skills(job_id);