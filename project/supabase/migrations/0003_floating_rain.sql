/*
  # Mentorship Platform Schema

  1. New Tables
    - `mentors`
      - Stores mentor profiles and expertise
    - `mentorship_sessions`
      - Tracks mentorship sessions between mentors and mentees
    - `mentorship_requests`
      - Handles session requests from mentees to mentors

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Mentors table
CREATE TABLE IF NOT EXISTS mentors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
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

ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Mentors are viewable by everyone"
  ON mentors FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own mentor profile"
  ON mentors FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Mentorship Sessions table
CREATE TABLE IF NOT EXISTS mentorship_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id uuid REFERENCES mentors(id) ON DELETE CASCADE,
  mentee_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending',
  scheduled_for timestamptz NOT NULL,
  duration integer NOT NULL, -- in minutes
  topic text NOT NULL,
  notes text,
  rating integer,
  feedback text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE mentorship_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sessions"
  ON mentorship_sessions FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id FROM mentors WHERE id = mentor_id
      UNION
      SELECT mentee_id
    )
  );

-- Mentorship Requests table
CREATE TABLE IF NOT EXISTS mentorship_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id uuid REFERENCES mentors(id) ON DELETE CASCADE,
  mentee_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  topic text NOT NULL,
  message text NOT NULL,
  preferred_time text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE mentorship_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own requests"
  ON mentorship_requests FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id FROM mentors WHERE id = mentor_id
      UNION
      SELECT mentee_id
    )
  );

CREATE POLICY "Mentees can create requests"
  ON mentorship_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = mentee_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_mentors_user_id ON mentors(user_id);
CREATE INDEX IF NOT EXISTS idx_mentorship_sessions_mentor_id ON mentorship_sessions(mentor_id);
CREATE INDEX IF NOT EXISTS idx_mentorship_sessions_mentee_id ON mentorship_sessions(mentee_id);
CREATE INDEX IF NOT EXISTS idx_mentorship_requests_mentor_id ON mentorship_requests(mentor_id);
CREATE INDEX IF NOT EXISTS idx_mentorship_requests_mentee_id ON mentorship_requests(mentee_id);