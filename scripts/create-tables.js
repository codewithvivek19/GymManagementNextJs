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

async function createTables() {
  console.log('Starting to create tables in Supabase...');

  try {
    // Create meal_plans table
    const { error: mealPlansError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'meal_plans',
      columns: `
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title TEXT NOT NULL,
        description TEXT,
        category TEXT NOT NULL,
        calories INTEGER,
        image_url TEXT,
        meals JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      `
    });
    
    if (mealPlansError) {
      console.error('Error creating meal_plans table:', mealPlansError);
    } else {
      console.log('Created meal_plans table successfully');
    }

    // Create trainers table
    const { error: trainersError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'trainers',
      columns: `
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        specialization TEXT,
        experience INTEGER,
        bio TEXT,
        image_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      `
    });
    
    if (trainersError) {
      console.error('Error creating trainers table:', trainersError);
    } else {
      console.log('Created trainers table successfully');
    }

    // Create memberships table
    const { error: membershipsError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'memberships',
      columns: `
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title TEXT NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        duration TEXT,
        features JSONB,
        image_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      `
    });
    
    if (membershipsError) {
      console.error('Error creating memberships table:', membershipsError);
    } else {
      console.log('Created memberships table successfully');
    }

    // Create schedules table
    const { error: schedulesError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'schedules',
      columns: `
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        class_name TEXT NOT NULL,
        day TEXT NOT NULL,
        time TEXT NOT NULL,
        trainer TEXT,
        description TEXT,
        location TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      `
    });
    
    if (schedulesError) {
      console.error('Error creating schedules table:', schedulesError);
    } else {
      console.log('Created schedules table successfully');
    }

    // Create users table (for extended user profiles)
    const { error: usersError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'users',
      columns: `
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        auth_id UUID UNIQUE,
        email TEXT UNIQUE NOT NULL,
        name TEXT,
        role TEXT DEFAULT 'user',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      `
    });
    
    if (usersError) {
      console.error('Error creating users table:', usersError);
    } else {
      console.log('Created users table successfully');
    }

    console.log('Table creation process completed');

  } catch (error) {
    console.error('Error in create tables process:', error);
  }
}

// Execute the function
createTables()
  .catch(err => {
    console.error('Failed to create tables:', err);
  }); 