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
    description: 'A calorie-deficit meal plan designed to promote healthy weight loss.',
    category: 'weight_loss',
    calories: 1800,
    image_url: mealPlanImages[0],
    meals: JSON.stringify([
      {
        name: 'Breakfast',
        time: '8:00 AM',
        description: 'Greek yogurt with berries and a tablespoon of honey',
        calories: 300
      },
      {
        name: 'Lunch',
        time: '12:30 PM',
        description: 'Grilled chicken salad with olive oil dressing',
        calories: 450
      },
      {
        name: 'Snack',
        time: '3:30 PM',
        description: 'Apple with a tablespoon of almond butter',
        calories: 200
      },
      {
        name: 'Dinner',
        time: '7:00 PM',
        description: 'Baked salmon with steamed vegetables',
        calories: 550
      },
      {
        name: 'Evening Snack',
        time: '9:00 PM',
        description: 'Herbal tea with a small handful of nuts',
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
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    specialization: 'Weight Loss',
    experience: 5,
    bio: 'Alex specializes in helping clients achieve their weight loss goals through a combination of HIIT and strength training. With 5 years of experience, Alex has helped hundreds of clients transform their bodies and lives.',
    image_url: trainerImages[0]
  },
  {
    name: 'Sam Rodriguez',
    email: 'sam.rodriguez@example.com',
    specialization: 'Bodybuilding',
    experience: 8,
    bio: 'Sam is a competitive bodybuilder with 8 years of experience in personal training. Specializing in muscle hypertrophy and strength training, Sam helps clients build muscle mass and improve overall physique.',
    image_url: trainerImages[1]
  },
  {
    name: 'Jamie Smith',
    email: 'jamie.smith@example.com',
    specialization: 'Functional Fitness',
    experience: 6,
    bio: 'Jamie focuses on functional fitness and mobility training. With 6 years of experience, Jamie helps clients improve their everyday movement patterns and prevent injuries while building strength and endurance.',
    image_url: trainerImages[2]
  }
];

// Sample data for memberships
const membershipsData = [
  {
    title: 'Basic Membership',
    description: 'Access to gym facilities and basic equipment.',
    price: 29.99,
    duration: 'Monthly',
    features: JSON.stringify([
      'Access to gym during standard hours (6 AM - 10 PM)',
      'Use of basic equipment',
      'Locker room access'
    ]),
    image_url: membershipImages[0]
  },
  {
    title: 'Premium Membership',
    description: 'Full access to gym facilities, classes, and one personal training session per month.',
    price: 59.99,
    duration: 'Monthly',
    features: JSON.stringify([
      'Access to gym 24/7',
      'Use of all equipment',
      'Unlimited group classes',
      '1 personal training session per month',
      'Locker room access with towel service'
    ]),
    image_url: membershipImages[1]
  },
  {
    title: 'Elite Membership',
    description: 'Comprehensive access to all facilities and services, including weekly personal training sessions.',
    price: 99.99,
    duration: 'Monthly',
    features: JSON.stringify([
      'Access to gym 24/7',
      'Priority booking for classes',
      'Unlimited group classes',
      '4 personal training sessions per month',
      'Nutritional consultation',
      'Locker room access with premium amenities',
      'Free guest passes (2 per month)'
    ]),
    image_url: membershipImages[2]
  }
];

// Sample data for class schedules
const schedulesData = [
  {
    class_name: 'Yoga Flow',
    day: 'Monday',
    time: '8:00 AM - 9:00 AM',
    trainer: 'Jamie Smith',
    description: 'A gentle flow yoga class suitable for all levels.',
    location: 'Studio 1'
  },
  {
    class_name: 'HIIT Workout',
    day: 'Monday',
    time: '6:00 PM - 7:00 PM',
    trainer: 'Alex Johnson',
    description: 'High-intensity interval training to maximize calorie burn.',
    location: 'Main Floor'
  },
  {
    class_name: 'Strength Training',
    day: 'Tuesday',
    time: '10:00 AM - 11:00 AM',
    trainer: 'Sam Rodriguez',
    description: 'Focus on building strength and muscle mass with compound exercises.',
    location: 'Weight Room'
  },
  {
    class_name: 'Spin Class',
    day: 'Tuesday',
    time: '5:30 PM - 6:30 PM',
    trainer: 'Alex Johnson',
    description: 'High-energy indoor cycling class to improve cardiovascular fitness.',
    location: 'Spin Studio'
  },
  {
    class_name: 'Pilates',
    day: 'Wednesday',
    time: '9:00 AM - 10:00 AM',
    trainer: 'Jamie Smith',
    description: 'Core-focused exercises to improve strength, flexibility, and posture.',
    location: 'Studio 2'
  },
  {
    class_name: 'Bodybuilding',
    day: 'Wednesday',
    time: '7:00 PM - 8:00 PM',
    trainer: 'Sam Rodriguez',
    description: 'Advanced muscle-building techniques for experienced lifters.',
    location: 'Weight Room'
  },
  {
    class_name: 'Cardio Kickboxing',
    day: 'Thursday',
    time: '12:00 PM - 1:00 PM',
    trainer: 'Alex Johnson',
    description: 'Combine martial arts techniques with fast-paced cardio for a fun workout.',
    location: 'Main Floor'
  },
  {
    class_name: 'Functional Training',
    day: 'Thursday',
    time: '6:00 PM - 7:00 PM',
    trainer: 'Jamie Smith',
    description: 'Movement-based exercises to improve everyday activities and prevent injuries.',
    location: 'Studio 1'
  },
  {
    class_name: 'Power Lifting',
    day: 'Friday',
    time: '11:00 AM - 12:00 PM',
    trainer: 'Sam Rodriguez',
    description: 'Focus on the three main compound lifts: squat, bench press, and deadlift.',
    location: 'Weight Room'
  },
  {
    class_name: 'Zumba',
    day: 'Friday',
    time: '5:00 PM - 6:00 PM',
    trainer: 'Jamie Smith',
    description: 'Dance-based fitness class with Latin-inspired movements.',
    location: 'Studio 2'
  },
  {
    class_name: 'Weekend Warrior',
    day: 'Saturday',
    time: '10:00 AM - 11:30 AM',
    trainer: 'Alex Johnson',
    description: 'A challenging full-body workout to kickstart your weekend.',
    location: 'Main Floor'
  },
  {
    class_name: 'Recovery Yoga',
    day: 'Sunday',
    time: '9:00 AM - 10:00 AM',
    trainer: 'Jamie Smith',
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

// Helper function to check if table exists and has data
async function checkTableExists(tableName) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);

    if (error && error.code === '42P01') {
      console.log(`Table '${tableName}' does not exist. Please create it first.`);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Error checking table ${tableName}:`, error);
    return false;
  }
}

// Seed function for meal plans
async function seedMealPlans() {
  if (!(await checkTableExists('meal_plans'))) return;

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
  if (!(await checkTableExists('trainers'))) return;

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
  if (!(await checkTableExists('memberships'))) return;

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
  if (!(await checkTableExists('schedules'))) return;

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
  if (!(await checkTableExists('users'))) return;

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