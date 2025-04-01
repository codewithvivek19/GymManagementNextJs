require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkConnection() {
  try {
    // Test connection by fetching data
    console.log('Testing connection to Supabase...');
    
    // Check meal_plans
    console.log('Checking meal_plans table...');
    const { data: mealPlansData, error: mealPlansError } = await supabase
      .from('meal_plans')
      .select('*')
      .limit(1);
    
    if (mealPlansError) {
      console.error('Error connecting to meal_plans table:', mealPlansError);
    } else {
      console.log('Successfully connected to meal_plans table!');
      console.log('Data:', mealPlansData);
    }
    
    // Check trainers
    console.log('\nChecking trainers table...');
    const { data: trainersData, error: trainersError } = await supabase
      .from('trainers')
      .select('*')
      .limit(1);
    
    if (trainersError) {
      console.error('Error connecting to trainers table:', trainersError);
    } else {
      console.log('Successfully connected to trainers table!');
      console.log('Data:', trainersData);
    }
    
    // Check memberships
    console.log('\nChecking memberships table...');
    const { data: membershipsData, error: membershipsError } = await supabase
      .from('memberships')
      .select('*')
      .limit(1);
    
    if (membershipsError) {
      console.error('Error connecting to memberships table:', membershipsError);
    } else {
      console.log('Successfully connected to memberships table!');
      console.log('Data:', membershipsData);
    }
    
    // Check schedules
    console.log('\nChecking schedules table...');
    const { data: schedulesData, error: schedulesError } = await supabase
      .from('schedules')
      .select('*')
      .limit(1);
    
    if (schedulesError) {
      console.error('Error connecting to schedules table:', schedulesError);
    } else {
      console.log('Successfully connected to schedules table!');
      console.log('Data:', schedulesData);
    }

  } catch (err) {
    console.error('Error checking connection:', err);
  }
}

checkConnection(); 