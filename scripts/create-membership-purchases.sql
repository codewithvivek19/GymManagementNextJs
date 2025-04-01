-- Create membership_purchases table
CREATE TABLE IF NOT EXISTS membership_purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  membership_id UUID REFERENCES memberships(id),
  purchase_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  amount_paid INTEGER NOT NULL,
  payment_method TEXT DEFAULT 'Credit Card',
  status TEXT DEFAULT 'active', -- 'active', 'expired', 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id
CREATE INDEX IF NOT EXISTS idx_membership_purchases_user_id ON membership_purchases(user_id);

-- Create index on membership_id
CREATE INDEX IF NOT EXISTS idx_membership_purchases_membership_id ON membership_purchases(membership_id);

-- Create RLS policies
ALTER TABLE membership_purchases ENABLE ROW LEVEL SECURITY;

-- Policy for selecting
CREATE POLICY select_membership_purchases ON membership_purchases
  FOR SELECT USING (
    -- Users can see their own purchases
    (auth.uid()::text = user_id)
    -- Admins can see all purchases
    OR (
      auth.role() = 'authenticated' AND 
      EXISTS (
        SELECT 1 FROM trainers 
        WHERE trainers.email = auth.email() 
        AND trainers.specialization = 'Admin'
      )
    )
);

-- Policy for inserting
CREATE POLICY insert_membership_purchases ON membership_purchases
  FOR INSERT WITH CHECK (
    -- Users can only insert their own purchases
    (auth.uid()::text = user_id)
    -- Admins can insert any purchase
    OR (
      auth.role() = 'authenticated' AND 
      EXISTS (
        SELECT 1 FROM trainers 
        WHERE trainers.email = auth.email() 
        AND trainers.specialization = 'Admin'
      )
    )
);

-- Policy for updating
CREATE POLICY update_membership_purchases ON membership_purchases
  FOR UPDATE USING (
    -- Admins can update any purchase
    auth.role() = 'authenticated' AND 
    EXISTS (
      SELECT 1 FROM trainers 
      WHERE trainers.email = auth.email() 
      AND trainers.specialization = 'Admin'
    )
  );

-- Policy for deleting
CREATE POLICY delete_membership_purchases ON membership_purchases
  FOR DELETE USING (
    -- Admins can delete any purchase
    auth.role() = 'authenticated' AND 
    EXISTS (
      SELECT 1 FROM trainers 
      WHERE trainers.email = auth.email() 
      AND trainers.specialization = 'Admin'
    )
  );

-- Grant permissions to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON membership_purchases TO authenticated;

-- Allow anon to insert (for guest purchases)
GRANT INSERT ON membership_purchases TO anon; 