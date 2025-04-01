const { execSync } = require('child_process');
const readline = require('readline');
const path = require('path');
require('dotenv').config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper to ask questions
function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Run shell commands
function runCommand(command, options = {}) {
  try {
    console.log(`Running: ${command}`);
    execSync(command, { stdio: 'inherit', ...options });
    return true;
  } catch (error) {
    console.error(`Command failed: ${command}`);
    console.error(error.message);
    return false;
  }
}

// Main migration function
async function migrateToSupabase() {
  try {
    console.log('🚀 Starting migration to Supabase');
    
    // Check environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('❌ Missing Supabase environment variables in .env file');
      console.log('Please make sure you have NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env file');
      return;
    }

    if (!process.env.DATABASE_URL || !process.env.DIRECT_URL) {
      console.error('❌ Missing Prisma database connection environment variables in .env file');
      console.log('Please make sure you have DATABASE_URL and DIRECT_URL in your .env file');
      return;
    }

    // Step 1: Generate Prisma client
    console.log('\n📝 Step 1: Generating Prisma client...');
    if (!runCommand('npx prisma generate')) {
      return;
    }
    
    // Step the user through the migration process
    console.log('\n📝 Step 2: Running database migrations');
    const shouldMigrate = await ask('Do you want to run Prisma migrations? (yes/no): ');
    
    if (shouldMigrate.toLowerCase() === 'yes') {
      const migrationName = await ask('Enter a name for the migration (e.g., initial-setup): ');
      if (!runCommand(`npx prisma migrate dev --name ${migrationName}`)) {
        return;
      }
    }
    
    // Step 3: Seed the database
    console.log('\n📝 Step 3: Seeding the database with initial data');
    const shouldSeed = await ask('Do you want to seed the database with initial data? (yes/no): ');
    
    if (shouldSeed.toLowerCase() === 'yes') {
      if (!runCommand('node scripts/seed-all-data-with-tables.js')) {
        return;
      }
    }
    
    console.log('\n✅ Migration completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Verify data in Supabase dashboard');
    console.log('2. Check that your frontend components are correctly connected to the database');
    console.log('3. Test all CRUD operations in your admin dashboard');
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    rl.close();
  }
}

// Run the migration
migrateToSupabase(); 