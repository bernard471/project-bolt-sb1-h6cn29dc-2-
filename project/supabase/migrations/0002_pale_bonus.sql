/*
  # Core Application Schema

  1. New Tables
    - `courses` - Course information and metadata
    - `chapters` - Course chapters and content
    - `labs` - Hands-on lab exercises
    - `lab_submissions` - User lab submissions and results
    
  2. Security
    - Enable RLS on all tables
    - Add policies for data access
*/

-- Courses
CREATE TABLE IF NOT EXISTS courses (
  id serial PRIMARY KEY,
  title text NOT NULL,
  description text,
  level text NOT NULL,
  duration text NOT NULL,
  topics text[] NOT NULL DEFAULT '{}',
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Courses are viewable by everyone"
  ON courses FOR SELECT
  TO authenticated
  USING (true);

-- Chapters
CREATE TABLE IF NOT EXISTS chapters (
  id serial PRIMARY KEY,
  course_id integer REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text,
  duration text NOT NULL,
  sequence_number integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(course_id, sequence_number)
);

ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Chapters are viewable by everyone"
  ON chapters FOR SELECT
  TO authenticated
  USING (true);

-- Labs
CREATE TABLE IF NOT EXISTS labs (
  id serial PRIMARY KEY,
  title text NOT NULL,
  description text,
  difficulty text NOT NULL,
  duration text NOT NULL,
  points integer NOT NULL DEFAULT 0,
  topics text[] NOT NULL DEFAULT '{}',
  prerequisites text[] NOT NULL DEFAULT '{}',
  tools text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE labs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Labs are viewable by everyone"
  ON labs FOR SELECT
  TO authenticated
  USING (true);

-- Lab Submissions
CREATE TABLE IF NOT EXISTS lab_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  lab_id integer REFERENCES labs(id) ON DELETE CASCADE,
  solution text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  points_earned integer,
  feedback text,
  submitted_at timestamptz DEFAULT now(),
  evaluated_at timestamptz,
  UNIQUE(user_id, lab_id)
);

ALTER TABLE lab_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own submissions"
  ON lab_submissions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create submissions"
  ON lab_submissions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_chapters_course_id ON chapters(course_id);
CREATE INDEX IF NOT EXISTS idx_lab_submissions_user_id ON lab_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_lab_submissions_lab_id ON lab_submissions(lab_id);