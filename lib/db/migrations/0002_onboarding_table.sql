-- Create the onboarding_data table for storing user onboarding information
CREATE TABLE IF NOT EXISTS onboarding_data (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  challenges TEXT NOT NULL,
  goals TEXT NOT NULL,
  interests TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index on user_id for faster lookups
CREATE INDEX idx_onboarding_data_user_id ON onboarding_data(user_id);

-- Add comment to table for documentation
COMMENT ON TABLE onboarding_data IS 'Stores user preferences and information from the onboarding flow';

-- Down migration (uncomment to use for rollback)
-- DROP TABLE IF EXISTS onboarding_data; 