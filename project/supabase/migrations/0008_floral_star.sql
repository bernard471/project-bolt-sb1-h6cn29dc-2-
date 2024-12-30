/*
  # Lab Categories and Tasks Setup

  1. New Tables
    - lab_categories: Categorizes different types of labs
    - lab_tasks: Defines individual tasks within labs
  
  2. Changes to Existing Tables
    - labs: Added category_id, estimated_time, max_points, and success_criteria columns
  
  3. Security
    - Enabled RLS on all tables
    - Added appropriate policies for authenticated users
*/

-- Create lab categories table first
CREATE TABLE IF NOT EXISTS lab_categories (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  description text,
  icon text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on lab categories
DO $$
BEGIN
  ALTER TABLE lab_categories ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN others THEN NULL;
END $$;

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Lab categories are viewable by everyone" ON lab_categories;

-- Create policy for lab categories
CREATE POLICY "Lab categories are viewable by everyone"
  ON lab_categories FOR SELECT
  TO authenticated
  USING (true);

-- Insert lab categories
INSERT INTO lab_categories (name, description) VALUES
  ('Network Security', 'Network security and traffic analysis labs'),
  ('Web Security', 'Web application security testing labs'),
  ('Digital Forensics', 'Digital forensics and incident response labs'),
  ('Penetration Testing', 'Ethical hacking and penetration testing labs'),
  ('Malware Analysis', 'Malware analysis and reverse engineering labs'),
  ('Cryptography', 'Cryptographic implementation and analysis labs')
ON CONFLICT (name) DO NOTHING;

-- Add new columns to labs table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'labs' AND column_name = 'category_id') THEN
        ALTER TABLE labs ADD COLUMN category_id integer REFERENCES lab_categories(id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'labs' AND column_name = 'estimated_time') THEN
        ALTER TABLE labs ADD COLUMN estimated_time integer NOT NULL DEFAULT 60;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'labs' AND column_name = 'max_points') THEN
        ALTER TABLE labs ADD COLUMN max_points integer NOT NULL DEFAULT 100;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'labs' AND column_name = 'success_criteria') THEN
        ALTER TABLE labs ADD COLUMN success_criteria text[];
    END IF;
END $$;

-- Insert initial labs data
INSERT INTO labs (
    title, 
    description, 
    difficulty, 
    duration, 
    points, 
    category_id, 
    estimated_time, 
    max_points, 
    success_criteria, 
    tools, 
    prerequisites
) 
SELECT 
    'Network Traffic Analysis Basics',
    'Learn to analyze network traffic using Wireshark and identify common protocols and patterns.',
    'Easy',
    '45 mins',
    100,
    c.id,
    45,
    100,
    ARRAY['Identify HTTP, DNS, and HTTPS traffic', 'Create display filters', 'Export specific packets'],
    ARRAY['Wireshark'],
    ARRAY['Basic Networking']
FROM lab_categories c 
WHERE c.name = 'Network Security'
AND NOT EXISTS (
    SELECT 1 FROM labs WHERE title = 'Network Traffic Analysis Basics'
);

-- Web Security Lab
INSERT INTO labs (
    title, 
    description, 
    difficulty, 
    duration, 
    points, 
    category_id, 
    estimated_time, 
    max_points, 
    success_criteria, 
    tools, 
    prerequisites
)
SELECT 
    'SQL Injection Fundamentals',
    'Learn to identify and exploit basic SQL injection vulnerabilities in web applications.',
    'Easy',
    '60 mins',
    150,
    c.id,
    60,
    150,
    ARRAY['Identify injectable parameters', 'Extract database version', 'List database tables'],
    ARRAY['Burp Suite'],
    ARRAY['Web Technologies']
FROM lab_categories c 
WHERE c.name = 'Web Security'
AND NOT EXISTS (
    SELECT 1 FROM labs WHERE title = 'SQL Injection Fundamentals'
);

-- Digital Forensics Lab
INSERT INTO labs (
    title, 
    description, 
    difficulty, 
    duration, 
    points, 
    category_id, 
    estimated_time, 
    max_points, 
    success_criteria, 
    tools, 
    prerequisites
)
SELECT 
    'Memory Forensics Investigation',
    'Analyze memory dumps to identify malicious processes and artifacts.',
    'Medium',
    '90 mins',
    200,
    c.id,
    90,
    200,
    ARRAY['Identify running processes', 'Extract network connections', 'Recover encryption keys'],
    ARRAY['Volatility'],
    ARRAY['Linux Fundamentals']
FROM lab_categories c 
WHERE c.name = 'Digital Forensics'
AND NOT EXISTS (
    SELECT 1 FROM labs WHERE title = 'Memory Forensics Investigation'
);

-- Create lab tasks table if it doesn't exist
CREATE TABLE IF NOT EXISTS lab_tasks (
    id serial PRIMARY KEY,
    lab_id integer REFERENCES labs(id) ON DELETE CASCADE,
    title text NOT NULL,
    description text NOT NULL,
    sequence_number integer NOT NULL,
    points integer NOT NULL DEFAULT 0,
    hints text[],
    validation_type text NOT NULL,
    validation_criteria jsonb NOT NULL,
    created_at timestamptz DEFAULT now(),
    UNIQUE(lab_id, sequence_number)
);

-- Enable RLS on lab tasks
DO $$
BEGIN
  ALTER TABLE lab_tasks ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN others THEN NULL;
END $$;

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Lab tasks are viewable by everyone" ON lab_tasks;

-- Create policy for lab tasks
CREATE POLICY "Lab tasks are viewable by everyone"
  ON lab_tasks FOR SELECT
  TO authenticated
  USING (true);

-- Insert initial lab tasks
INSERT INTO lab_tasks (
    lab_id, 
    title, 
    description, 
    sequence_number, 
    points, 
    validation_type, 
    validation_criteria
)
SELECT 
    l.id,
    'Capture Live Traffic',
    'Start Wireshark and capture live network traffic from your interface.',
    1,
    20,
    'command',
    '{"command": "tshark -i any -c 100"}'::jsonb
FROM labs l
WHERE l.title = 'Network Traffic Analysis Basics'
AND NOT EXISTS (
    SELECT 1 FROM lab_tasks 
    WHERE lab_id = l.id AND sequence_number = 1
);