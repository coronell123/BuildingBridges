-- Create a backup of the users table before making changes
CREATE TABLE IF NOT EXISTS users_backup AS SELECT * FROM users;

-- Create the new user_role enum type
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('ADMIN', 'STUDENT', 'MENTOR');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- Add temporary column with the new enum type
ALTER TABLE users ADD COLUMN role_new user_role;

-- Migrate existing data to the new column
UPDATE users 
SET role_new = CASE
    WHEN role = 'admin' THEN 'ADMIN'::user_role
    WHEN role = 'owner' THEN 'ADMIN'::user_role
    ELSE 'STUDENT'::user_role
END;

-- Drop the old column and rename the new one
ALTER TABLE users DROP COLUMN role;
ALTER TABLE users RENAME COLUMN role_new TO role;

-- Set not null constraint and default value
ALTER TABLE users ALTER COLUMN role SET NOT NULL;
ALTER TABLE users ALTER COLUMN role SET DEFAULT 'STUDENT'::user_role;

-- Down migration (in case we need to rollback)
-- CREATE OR REPLACE FUNCTION rollback_user_roles() RETURNS void AS $$
-- BEGIN
--   ALTER TABLE users ADD COLUMN role_old varchar(20);
--   
--   UPDATE users 
--   SET role_old = CASE
--     WHEN role::text = 'ADMIN' THEN 'admin'
--     ELSE 'member'
--   END;
--   
--   ALTER TABLE users DROP COLUMN role;
--   ALTER TABLE users RENAME COLUMN role_old TO role;
--   
--   ALTER TABLE users ALTER COLUMN role SET NOT NULL;
--   ALTER TABLE users ALTER COLUMN role SET DEFAULT 'member';
--   
--   DROP TYPE user_role;
-- END;
-- $$ LANGUAGE plpgsql; 