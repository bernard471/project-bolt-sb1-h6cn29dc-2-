/*
  # Fix Mentors Table Relationships

  1. Changes
    - Drop existing mentors table if it exists
    - Create new mentors table with proper foreign key relationship to auth.users
    - Add RLS policies for mentors table
    - Add indexes for better query performance

  2. Security
    - Enable RLS on mentors table
    - Add policies for viewing and updating mentor profiles
*/

-- Drop existing table if it exists
DROP TABLE IF EXISTS mentors CASCADE;

-- Create mentors table with proper relationships
CREATE TABLE mentors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  expertise text[] NOT NULL DEFAULT '{}',
  years_of_experience integer NOT NULL DEFAULT 0,
  bio text,
  hourly_rate numeric(10,2) NOT NULL DEFAULT 0,
  availability text[] NOT NULL DEFAULT '{}',
  rating numeric(3,2) NOT NULL DEFAULT 0,
  total_sessions integer NOT NULL DEFAULT 0,
  is_verified boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Mentors are viewable by everyone"
  ON mentors FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own mentor profile"
  ON mentors FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mentor profile"
  ON mentors FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_mentors_user_id ON mentors(user_id);
CREATE INDEX idx_mentors_rating ON mentors(rating);
CREATE INDEX idx_mentors_is_verified ON mentors(is_verified);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_mentors_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_mentors_updated_at
  BEFORE UPDATE ON mentors
  FOR EACH ROW
  EXECUTE FUNCTION update_mentors_updated_at();