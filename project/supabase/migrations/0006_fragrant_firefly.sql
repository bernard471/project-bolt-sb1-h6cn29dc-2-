/*
  # Fix Mentor User Relationships

  1. Changes
    - Drop and recreate mentors table with proper user relationship
    - Add proper indexes and constraints
    - Update RLS policies
  
  2. Security
    - Enable RLS
    - Add policies for viewing and updating mentor profiles
*/

-- Drop existing mentors table if it exists
DROP TABLE IF EXISTS mentors CASCADE;

-- Create mentors table with proper user relationship
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
  CONSTRAINT unique_mentor_user UNIQUE (user_id)
);

-- Enable RLS
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;

-- Create policies
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

-- Create indexes
CREATE INDEX idx_mentors_user_id ON mentors(user_id);
CREATE INDEX idx_mentors_rating ON mentors(rating);
CREATE INDEX idx_mentors_is_verified ON mentors(is_verified);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_mentors_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_mentors_updated_at
  BEFORE UPDATE ON mentors
  FOR EACH ROW
  EXECUTE FUNCTION update_mentors_updated_at();

-- Create view to join mentor and user data
CREATE OR REPLACE VIEW mentor_profiles AS
SELECT 
  m.*,
  u.raw_user_meta_data->>'display_name' as display_name,
  u.raw_user_meta_data->>'avatar_url' as avatar_url
FROM mentors m
JOIN auth.users u ON m.user_id = u.id;

-- Grant access to the view
GRANT SELECT ON mentor_profiles TO authenticated;