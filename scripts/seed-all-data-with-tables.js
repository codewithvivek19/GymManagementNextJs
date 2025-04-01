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

// Sample images for different entities
const mealPlanImages = [
  'https://placehold.co/600x400/jpeg?text=Weight+Loss+Meal+Plan',
  'https://placehold.co/600x400/jpeg?text=Muscle+Gain+Meal+Plan',
  'https://placehold.co/600x400/jpeg?text=Maintenance+Meal+Plan',
  'https://placehold.co/600x400/jpeg?text=Vegetarian+Meal+Plan'
];

const trainerImages = [
  'https://placehold.co/600x800/jpeg?text=Trainer+1',
  'https://placehold.co/600x800/jpeg?text=Trainer+2',
  'https://placehold.co/600x800/jpeg?text=Trainer+3'
];

const membershipImages = [
  'https://placehold.co/600x400/jpeg?text=Basic+Membership',
  'https://placehold.co/600x400/jpeg?text=Premium+Membership',
  'https://placehold.co/600x400/jpeg?text=Elite+Membership'
];

// Sample data for meal plans
const mealPlansData = [
  {
    title: 'Weight Loss Meal Plan',
    description: 'A calorie-deficit meal plan designed to promote healthy weight loss with Indian cuisine options.',
    category: 'weight_loss',
    calories: 1800,
    image_url: mealPlanImages[0],
    proteinPercentage: "40%", 
    carbsPercentage: "20%", 
    fatsPercentage: "40%",
    meals: JSON.stringify([
      {
        name: 'Breakfast',
        time: '8:00 AM',
        description: 'Vegetable oats upma with sprouts and a small cup of chai (no sugar)',
        calories: 300
      },
      {
        name: 'Lunch',
        time: '12:30 PM',
        description: 'Roti with paneer bhurji and cucumber raita',
        calories: 450
      },
      {
        name: 'Snack',
        time: '3:30 PM',
        description: 'Roasted chana with a small apple',
        calories: 200
      },
      {
        name: 'Dinner',
        time: '7:00 PM',
        description: 'Grilled fish or tofu curry with steamed brown rice',
        calories: 550
      },
      {
        name: 'Evening Snack',
        time: '9:00 PM',
        description: 'Herbal tea with 2-3 almonds',
        calories: 100
      }
    ])
  },
  {
    title: 'Muscle Gain Meal Plan',
    description: 'A protein-rich meal plan designed to support muscle growth and recovery.',
    category: 'muscle_gain',
    calories: 3000,
    image_url: mealPlanImages[1],
    proteinPercentage: "35%", 
    carbsPercentage: "45%", 
    fatsPercentage: "20%",
    meals: JSON.stringify([
      {
        name: 'Breakfast',
        time: '7:00 AM',
        description: 'Protein oatmeal with banana and peanut butter',
        calories: 500
      },
      {
        name: 'Mid-Morning Snack',
        time: '10:00 AM',
        description: 'Protein shake with a serving of almonds',
        calories: 350
      },
      {
        name: 'Lunch',
        time: '1:00 PM',
        description: 'Grilled steak with brown rice and vegetables',
        calories: 700
      },
      {
        name: 'Post-Workout',
        time: '4:00 PM',
        description: 'Protein shake with a banana',
        calories: 300
      },
      {
        name: 'Dinner',
        time: '7:00 PM',
        description: 'Grilled chicken, sweet potato, and broccoli',
        calories: 650
      },
      {
        name: 'Before Bed',
        time: '10:00 PM',
        description: 'Cottage cheese with a tablespoon of flaxseeds',
        calories: 200
      }
    ])
  },
  {
    title: 'Maintenance Meal Plan',
    description: 'A balanced meal plan designed to maintain current weight and support overall health.',
    category: 'maintenance',
    calories: 2200,
    image_url: mealPlanImages[2],
    proteinPercentage: "25%", 
    carbsPercentage: "50%", 
    fatsPercentage: "25%",
    meals: JSON.stringify([
      {
        name: 'Breakfast',
        time: '7:30 AM',
        description: 'Whole grain toast with avocado and eggs',
        calories: 400
      },
      {
        name: 'Lunch',
        time: '12:00 PM',
        description: 'Turkey wrap with vegetables and hummus',
        calories: 550
      },
      {
        name: 'Snack',
        time: '3:00 PM',
        description: 'Greek yogurt with mixed berries',
        calories: 200
      },
      {
        name: 'Dinner',
        time: '6:30 PM',
        description: 'Grilled fish with quinoa and roasted vegetables',
        calories: 600
      },
      {
        name: 'Evening Snack',
        time: '9:00 PM',
        description: 'Small bowl of air-popped popcorn',
        calories: 150
      }
    ])
  },
  {
    title: 'Vegetarian Meal Plan',
    description: 'A plant-based meal plan rich in nutrients and protein alternatives.',
    category: 'vegetarian',
    calories: 2000,
    image_url: mealPlanImages[3],
    proteinPercentage: "25%", 
    carbsPercentage: "50%", 
    fatsPercentage: "25%",
    meals: JSON.stringify([
      {
        name: 'Breakfast',
        time: '8:00 AM',
        description: 'Vegetable omelette with whole grain toast',
        calories: 350
      },
      {
        name: 'Lunch',
        time: '12:30 PM',
        description: 'Lentil soup with a side salad',
        calories: 450
      },
      {
        name: 'Snack',
        time: '3:30 PM',
        description: 'Hummus with carrot and cucumber sticks',
        calories: 200
      },
      {
        name: 'Dinner',
        time: '7:00 PM',
        description: 'Tofu stir-fry with mixed vegetables and brown rice',
        calories: 550
      },
      {
        name: 'Evening Snack',
        time: '9:00 PM',
        description: 'Small bowl of mixed nuts and dried fruits',
        calories: 150
      }
    ])
  }
];

// Sample data for trainers
const trainersData = [
  {
    name: 'Arjun Sharma',
    email: 'arjun.sharma@example.com',
    specialization: 'Strength Training',
    experience: 8,
    bio: 'Former national-level athlete with expertise in strength and conditioning. Certified from National Institute of Sports, Patiala.',
    image_url: trainerImages[0]
  },
  {
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    specialization: 'Yoga & Flexibility',
    experience: 6,
    bio: 'Internationally certified yoga instructor with focus on functional mobility and mind-body connection.',
    image_url: trainerImages[1]
  },
  {
    name: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    specialization: 'HIIT & Functional Training',
    experience: 5,
    bio: 'Specializes in high-intensity interval training and functional fitness programs for busy professionals.',
    image_url: trainerImages[2]
  }
];

// Sample data for memberships
const membershipsData = [
  {
    title: 'Basic Plan',
    description: 'Essential gym access with basic amenities for fitness enthusiasts.',
    price: 1999,
    duration: '1 month',
    features: JSON.stringify([
      'Access to gym equipment',
      'Locker room access',
      'Free drinking water',
      'Access during standard hours (6 AM - 10 PM)'
    ]),
    image_url: membershipImages[0]
  },
  {
    title: 'Premium Plan',
    description: 'Enhanced gym experience with additional perks and services.',
    price: 3499,
    duration: '1 month',
    features: JSON.stringify([
      'All Basic Plan features',
      'Unlimited group classes',
      '1 personal training session per month',
      'Towel service',
      'Extended hours access (5 AM - 11 PM)'
    ]),
    image_url: membershipImages[1]
  },
  {
    title: 'Elite Plan',
    description: 'VIP gym experience with comprehensive services and exclusive perks.',
    price: 5999,
    duration: '1 month',
    features: JSON.stringify([
      'All Premium Plan features',
      '3 personal training sessions per month',
      'Nutrition consultation',
      'Body composition analysis',
      '1 guest pass per week',
      '24/7 gym access'
    ]),
    image_url: membershipImages[2]
  },
  {
    title: 'Quarterly Premium',
    description: 'Premium plan with 3-month commitment and savings.',
    price: 9499,
    duration: '3 months',
    features: JSON.stringify([
      'All Premium Plan features',
      '10% savings compared to monthly',
      'Nutrition plan included'
    ]),
    image_url: membershipImages[1]
  }
];

// Sample data for class schedules
const schedulesData = [
  {
    class_name: 'Yoga Flow',
    day: 'Monday',
    time: '8:00 AM - 9:00 AM',
    trainer: 'Rahul Verma',
    description: 'A gentle flow yoga class suitable for all levels.',
    location: 'Studio 1'
  },
  {
    class_name: 'HIIT Workout',
    day: 'Monday',
    time: '6:00 PM - 7:00 PM',
    trainer: 'Arjun Sharma',
    description: 'High-intensity interval training to maximize calorie burn.',
    location: 'Main Floor'
  },
  {
    class_name: 'Strength Training',
    day: 'Tuesday',
    time: '10:00 AM - 11:00 AM',
    trainer: 'Arjun Sharma',
    description: 'Focus on building strength and muscle mass with compound exercises.',
    location: 'Weight Room'
  },
  {
    class_name: 'Spin Class',
    day: 'Tuesday',
    time: '5:30 PM - 6:30 PM',
    trainer: 'Arjun Sharma',
    description: 'High-energy indoor cycling class to improve cardiovascular fitness.',
    location: 'Spin Studio'
  },
  {
    class_name: 'Pilates',
    day: 'Wednesday',
    time: '9:00 AM - 10:00 AM',
    trainer: 'Priya Patel',
    description: 'Core-focused exercises to improve strength, flexibility, and posture.',
    location: 'Studio 2'
  },
  {
    class_name: 'Bodybuilding',
    day: 'Wednesday',
    time: '7:00 PM - 8:00 PM',
    trainer: 'Arjun Sharma',
    description: 'Advanced muscle-building techniques for experienced lifters.',
    location: 'Weight Room'
  },
  {
    class_name: 'Cardio Kickboxing',
    day: 'Thursday',
    time: '12:00 PM - 1:00 PM',
    trainer: 'Arjun Sharma',
    description: 'Combine martial arts techniques with fast-paced cardio for a fun workout.',
    location: 'Main Floor'
  },
  {
    class_name: 'Functional Training',
    day: 'Thursday',
    time: '6:00 PM - 7:00 PM',
    trainer: 'Priya Patel',
    description: 'Movement-based exercises to improve everyday activities and prevent injuries.',
    location: 'Studio 1'
  },
  {
    class_name: 'Power Lifting',
    day: 'Friday',
    time: '11:00 AM - 12:00 PM',
    trainer: 'Arjun Sharma',
    description: 'Focus on the three main compound lifts: squat, bench press, and deadlift.',
    location: 'Weight Room'
  },
  {
    class_name: 'Zumba',
    day: 'Friday',
    time: '5:00 PM - 6:00 PM',
    trainer: 'Priya Patel',
    description: 'Dance-based fitness class with Latin-inspired movements.',
    location: 'Studio 2'
  },
  {
    class_name: 'Weekend Warrior',
    day: 'Saturday',
    time: '10:00 AM - 11:30 AM',
    trainer: 'Arjun Sharma',
    description: 'A challenging full-body workout to kickstart your weekend.',
    location: 'Main Floor'
  },
  {
    class_name: 'Recovery Yoga',
    day: 'Sunday',
    time: '9:00 AM - 10:00 AM',
    trainer: 'Priya Patel',
    description: 'Gentle stretching and relaxation to recover from the week\'s workouts.',
    location: 'Studio 1'
  }
];

// Sample users data
const usersData = [
  {
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin'
  },
  {
    email: 'demo@example.com',
    name: 'Demo User',
    role: 'user'
  }
];

// SQL for creating tables
const createTablesSql = `
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
  "proteinPercentage" TEXT,
  "carbsPercentage" TEXT,
  "fatsPercentage" TEXT,
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
`;

// Create tables via SQL
async function createTables() {
  console.log('Creating tables in Supabase...');
  try {
    const { error } = await supabase.rpc('pgSQL', { query: createTablesSql });
    if (error) {
      console.error('Error creating tables:', error);
      console.log('You may need to run the SQL script manually in the Supabase SQL editor:');
      console.log(createTablesSql);
      return false;
    }
    console.log('Tables created successfully!');
    return true;
  } catch (error) {
    console.error('Error creating tables:', error);
    console.log('You may need to run the SQL script manually in the Supabase SQL editor:');
    console.log(createTablesSql);
    return false;
  }
}

// Seed function for meal plans
async function seedMealPlans() {
  try {
    // Check if table already has data
    const { data: existingData, error: checkError } = await supabase
      .from('meal_plans')
      .select('id')
      .limit(1);

    if (checkError) throw checkError;

    // If data exists and we don't want to overwrite, exit
    if (existingData && existingData.length > 0) {
      console.log('Meal plans data already exists. Skipping seed.');
      return;
    }

    // Insert meal plans
    const { error: insertError } = await supabase
      .from('meal_plans')
      .insert(mealPlansData);

    if (insertError) throw insertError;

    console.log('Meal plans seeded successfully!');
  } catch (error) {
    console.error('Error seeding meal plans:', error);
  }
}

// Seed function for trainers
async function seedTrainers() {
  try {
    // Check if table already has data
    const { data: existingData, error: checkError } = await supabase
      .from('trainers')
      .select('id')
      .limit(1);

    if (checkError) throw checkError;

    // If data exists and we don't want to overwrite, exit
    if (existingData && existingData.length > 0) {
      console.log('Trainers data already exists. Skipping seed.');
      return;
    }

    // Insert trainers
    const { error: insertError } = await supabase
      .from('trainers')
      .insert(trainersData);

    if (insertError) throw insertError;

    console.log('Trainers seeded successfully!');
  } catch (error) {
    console.error('Error seeding trainers:', error);
  }
}

// Seed function for memberships
async function seedMemberships() {
  try {
    // Check if table already has data
    const { data: existingData, error: checkError } = await supabase
      .from('memberships')
      .select('id')
      .limit(1);

    if (checkError) throw checkError;

    // If data exists and we don't want to overwrite, exit
    if (existingData && existingData.length > 0) {
      console.log('Memberships data already exists. Skipping seed.');
      return;
    }

    // Insert memberships
    const { error: insertError } = await supabase
      .from('memberships')
      .insert(membershipsData);

    if (insertError) throw insertError;

    console.log('Memberships seeded successfully!');
  } catch (error) {
    console.error('Error seeding memberships:', error);
  }
}

// Seed function for schedules
async function seedSchedules() {
  try {
    // Check if table already has data
    const { data: existingData, error: checkError } = await supabase
      .from('schedules')
      .select('id')
      .limit(1);

    if (checkError) throw checkError;

    // If data exists and we don't want to overwrite, exit
    if (existingData && existingData.length > 0) {
      console.log('Schedules data already exists. Skipping seed.');
      return;
    }

    // Insert schedules
    const { error: insertError } = await supabase
      .from('schedules')
      .insert(schedulesData);

    if (insertError) throw insertError;

    console.log('Schedules seeded successfully!');
  } catch (error) {
    console.error('Error seeding schedules:', error);
  }
}

// Seed function for users
async function seedUsers() {
  try {
    // Check if table already has data
    const { data: existingData, error: checkError } = await supabase
      .from('users')
      .select('id')
      .limit(1);

    if (checkError) throw checkError;

    // If data exists and we don't want to overwrite, exit
    if (existingData && existingData.length > 0) {
      console.log('Users data already exists. Skipping seed.');
      return;
    }

    // Insert users
    const { error: insertError } = await supabase
      .from('users')
      .insert(usersData);

    if (insertError) throw insertError;

    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

// Main function to seed all data
async function seedAllData() {
  console.log('Starting to seed all data to Supabase...');

  // First create tables
  const tablesCreated = await createTables();
  if (!tablesCreated) {
    console.log('Could not create tables automatically. You may need to create them manually using the SQL script.');
    console.log('Continue with seeding data anyway? (Tables must exist for this to work)');
  }

  // Seed meal plans
  await seedMealPlans();

  // Seed trainers
  await seedTrainers();

  // Seed memberships
  await seedMemberships();

  // Seed schedules
  await seedSchedules();

  // Seed users
  await seedUsers();

  console.log('All data seeding complete!');
}

// Run the seeding process
seedAllData()
  .catch(error => {
    console.error('Seeding process failed:', error);
  })
  .finally(() => {
    console.log('Seeding process completed');
  }); 