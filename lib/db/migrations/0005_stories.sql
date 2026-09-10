CREATE TABLE IF NOT EXISTS stories (
  id serial PRIMARY KEY,
  session_id text NOT NULL,
  title text NOT NULL,
  summary text NOT NULL,
  timeline jsonb NOT NULL,
  quotes jsonb NOT NULL,
  empowerment_message text NOT NULL,
  raw_conversation jsonb NOT NULL,
  consent_given boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending_review',
  created_at timestamp NOT NULL DEFAULT now()
);

