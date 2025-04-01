-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create meal_plans table
CREATE TABLE IF NOT EXISTS meal_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  calories INTEGER,
  image_url TEXT,
  meals JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create trainers table
CREATE TABLE IF NOT EXISTS trainers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  specialization TEXT,
  experience INTEGER,
  bio TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create memberships table
CREATE TABLE IF NOT EXISTS memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration TEXT,
  features JSONB,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create schedules table
CREATE TABLE IF NOT EXISTS schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_name TEXT NOT NULL,
  day TEXT NOT NULL,
  time TEXT NOT NULL,
  trainer TEXT,
  description TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create users table (for extended user profiles)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create RLS policies for each table
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy for meal_plans (anyone can read, only authenticated users can edit)
CREATE POLICY "Allow public read access" ON meal_plans FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON meal_plans FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON meal_plans FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON meal_plans FOR DELETE USING (auth.role() = 'authenticated');

-- Create policy for trainers (anyone can read, only authenticated users can edit)
CREATE POLICY "Allow public read access" ON trainers FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON trainers FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON trainers FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON trainers FOR DELETE USING (auth.role() = 'authenticated');

-- Create policy for memberships (anyone can read, only authenticated users can edit)
CREATE POLICY "Allow public read access" ON memberships FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON memberships FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON memberships FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON memberships FOR DELETE USING (auth.role() = 'authenticated');

-- Create policy for schedules (anyone can read, only authenticated users can edit)
CREATE POLICY "Allow public read access" ON schedules FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON schedules FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON schedules FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON schedules FOR DELETE USING (auth.role() = 'authenticated');

-- Create policy for users (only authenticated users can view their own data)
CREATE POLICY "Allow users to view their own data" ON users
  FOR SELECT USING (auth.uid() = auth_id);
CREATE POLICY "Allow users to update their own data" ON users
  FOR UPDATE USING (auth.uid() = auth_id);
CREATE POLICY "Allow users to insert their own data" ON users
  FOR INSERT WITH CHECK (auth.uid() = auth_id); 