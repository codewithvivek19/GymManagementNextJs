require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Read SQL script content
const sqlScript = fs.readFileSync(path.join(__dirname, 'create-tables.sql'), 'utf8');

// Split SQL into individual statements
const statements = sqlScript
  .split(';')
  .map(statement => statement.trim())
  .filter(statement => statement.length > 0);

// Execute each SQL statement
async function executeStatements() {
  console.log('Creating tables in Supabase...');
  
  for (const statement of statements) {
    try {
      console.log(`Executing SQL statement: ${statement.substring(0, 50)}...`);
      const { error } = await supabase.rpc('exec_sql', { sql_string: statement });
      
      if (error) {
        console.error('Error executing SQL statement:', error);
        // Attempt with direct query if RPC fails
        const { error: queryError } = await supabase.from('_temp_migration').select('*').limit(1);
        if (queryError) {
          console.error('Alternative query failed:', queryError);
        }
      }
    } catch (error) {
      console.error('Error executing statement:', error);
    }
  }
  
  console.log('SQL execution completed. Attempting to seed data...');
  
  // Import and run the seed script
  try {
    const seedScript = require('./seed-all-data-with-tables');
    console.log('Seed script imported successfully');
  } catch (error) {
    console.error('Error running seed script:', error);
  }
}

// Start database setup
executeStatements().catch(error => {
  console.error('Setup process failed:', error);
});

console.log('NOTICE: If this script fails to create tables through the API, you need to:');
console.log('1. Log in to the Supabase dashboard');
console.log('2. Go to the SQL Editor');
console.log('3. Copy and paste the contents of scripts/create-tables.sql');
console.log('4. Execute the SQL statements manually');
console.log('5. Then run: node scripts/seed-all-data-with-tables.js'); 