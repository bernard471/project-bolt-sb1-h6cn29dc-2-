/*
  # Enhanced Mentorship Features

  1. New Tables
    - `video_meetings`: Stores video conference details
    - `session_payments`: Tracks payment information
    - `crypto_payments`: Handles cryptocurrency payments
    - `notifications`: User notifications system

  2. Changes
    - Added payment tracking
    - Video conference integration
    - Notification system

  3. Security
    - RLS policies for all new tables
    - User-specific access controls
*/

-- Video Meetings
CREATE TABLE IF NOT EXISTS video_meetings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES mentorship_sessions(id) ON DELETE CASCADE,
  platform text NOT NULL CHECK (platform IN ('zoom', 'meet')),
  meeting_id text NOT NULL,
  join_url text NOT NULL,
  password text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE video_meetings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own video meetings"
  ON video_meetings FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT CASE 
        WHEN auth.uid() = mentors.user_id THEN mentors.user_id
        ELSE mentorship_sessions.mentee_id
      END
      FROM mentorship_sessions
      JOIN mentors ON mentorship_sessions.mentor_id = mentors.id
      WHERE mentorship_sessions.id = session_id
    )
  );

-- Session Payments
CREATE TABLE IF NOT EXISTS session_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES mentorship_sessions(id) ON DELETE CASCADE,
  amount numeric(10,2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  status text NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  payment_method text NOT NULL,
  payment_details jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE session_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own payments"
  ON session_payments FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT CASE 
        WHEN auth.uid() = mentors.user_id THEN mentors.user_id
        ELSE mentorship_sessions.mentee_id
      END
      FROM mentorship_sessions
      JOIN mentors ON mentorship_sessions.mentor_id = mentors.id
      WHERE mentorship_sessions.id = session_id
    )
  );

-- Crypto Payments
CREATE TABLE IF NOT EXISTS crypto_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES mentorship_sessions(id) ON DELETE CASCADE,
  amount numeric(10,2) NOT NULL,
  currency text NOT NULL,
  wallet_address text NOT NULL,
  transaction_hash text,
  status text NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE crypto_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own crypto payments"
  ON crypto_payments FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT CASE 
        WHEN auth.uid() = mentors.user_id THEN mentors.user_id
        ELSE mentorship_sessions.mentee_id
      END
      FROM mentorship_sessions
      JOIN mentors ON mentorship_sessions.mentor_id = mentors.id
      WHERE mentorship_sessions.id = session_id
    )
  );

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('session', 'message', 'payment')),
  message text NOT NULL,
  read boolean DEFAULT false,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_video_meetings_session_id ON video_meetings(session_id);
CREATE INDEX IF NOT EXISTS idx_session_payments_session_id ON session_payments(session_id);
CREATE INDEX IF NOT EXISTS idx_crypto_payments_session_id ON crypto_payments(session_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);