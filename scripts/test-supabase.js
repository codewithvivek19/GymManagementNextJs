const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function testSupabase() {
  console.log('Testing Supabase connection...');
  
  // Log environment variables (partial for security)
  console.log('URL available:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('Key available:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  console.log('URL prefix:', process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 15) + '...');
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  
  // Test tables existence
  const tables = ['trainers', 'meal_plans', 'schedules', 'memberships'];
  
  for (const table of tables) {
    console.log(`\nTesting table: ${table}`);
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      if (error) {
        console.error(`Error accessing table ${table}:`, error);
      } else {
        console.log(`Table ${table} accessible, found ${data?.length || 0} records`);
      }
    } catch (err) {
      console.error(`Exception accessing table ${table}:`, err);
    }
  }
}

testSupabase()
  .catch(err => console.error('Test failed:', err))
  .finally(() => console.log('Test complete')); 