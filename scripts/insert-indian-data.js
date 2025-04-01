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

async function insertDummyData() {
  try {
    console.log('Starting to insert Indian-based dummy data...');
    
    // Insert trainers one by one
    console.log('Inserting trainers data...');
    const trainersData = [
      {
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        specialization: 'Strength Training',
        experience: 6,
        bio: 'Former national-level athlete with expertise in strength and conditioning. Specializes in Olympic lifting and functional training.',
        image_url: 'https://randomuser.me/api/portraits/men/44.jpg'
      },
      {
        name: 'Priya Singh',
        email: 'priya.singh@example.com',
        specialization: 'Yoga & Flexibility',
        experience: 8,
        bio: 'Internationally certified yoga instructor with focus on Hatha and Ashtanga yoga. Helps clients improve flexibility and mindfulness.',
        image_url: 'https://randomuser.me/api/portraits/women/33.jpg'
      },
      {
        name: 'Vikram Patel',
        email: 'vikram.patel@example.com',
        specialization: 'HIIT & Functional Training',
        experience: 5,
        bio: 'Specializes in high-intensity interval training and functional fitness programs for busy professionals.',
        image_url: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ];
    
    let trainersResult = [];
    for (const trainer of trainersData) {
      try {
        const { data, error } = await supabase
          .from('trainers')
          .insert(trainer)
          .select();
        
        if (error) {
          console.error('Error inserting trainer:', error);
          console.error('Trainer data:', trainer);
        } else {
          console.log('Successfully inserted trainer:', data[0].name);
          trainersResult.push(data[0]);
        }
      } catch (err) {
        console.error('Exception inserting trainer:', err);
      }
    }
    
    // Insert meal plans one by one
    console.log('\nInserting meal plans data...');
    const mealPlansData = [
      {
        title: 'Indian Weight Loss Meal Plan',
        description: 'A calorie-deficit meal plan with traditional Indian foods to promote healthy weight loss.',
        category: 'Weight Loss',
        calories: 1800,
        protein: 80,
        carbs: 150,
        fat: 60,
        image_url: 'https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=1000',
        meals: JSON.stringify([
          'Breakfast: Vegetable upma with sprouts and green tea',
          'Mid-morning: Buttermilk with roasted chana',
          'Lunch: 2 rotis with paneer bhurji and cucumber raita',
          'Evening snack: Fruit chaat with a sprinkle of chaat masala',
          'Dinner: Grilled fish/tofu curry with brown rice and stir-fried vegetables'
        ])
      },
      {
        title: 'Indian Muscle Gain Plan',
        description: 'High-protein Indian meal plan designed for muscle building and recovery.',
        category: 'Muscle Gain',
        calories: 3000,
        protein: 150,
        carbs: 300,
        fat: 100,
        image_url: 'https://images.unsplash.com/photo-1542556398-95fb5b9c1c99?q=80&w=1000',
        meals: JSON.stringify([
          'Breakfast: Paneer paratha with curd and protein shake',
          'Mid-morning: Egg bhurji with whole grain toast',
          'Lunch: Chicken/chickpea curry with jeera rice and vegetable salad',
          'Post-workout: Banana lassi with whey protein',
          'Dinner: Tandoori chicken/soya chunks with dal and mixed vegetable sabzi',
          'Before bed: Greek yogurt with almonds'
        ])
      },
      {
        title: 'Vegetarian Indian Diet',
        description: 'Plant-based Indian diet rich in protein and essential nutrients.',
        category: 'Vegetarian',
        calories: 2200,
        protein: 90,
        carbs: 250,
        fat: 75,
        image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1000',
        meals: JSON.stringify([
          'Breakfast: Moong dal cheela with mint chutney',
          'Mid-morning: Sprouts sundal',
          'Lunch: Rajma curry with brown rice and beet raita',
          'Evening snack: Multigrain dhokla with green chutney',
          'Dinner: Palak paneer with missi roti and cucumber salad'
        ])
      }
    ];
    
    for (const mealPlan of mealPlansData) {
      try {
        const { data, error } = await supabase
          .from('meal_plans')
          .insert(mealPlan)
          .select();
        
        if (error) {
          console.error('Error inserting meal plan:', error);
          console.error('Meal plan data:', mealPlan);
        } else {
          console.log('Successfully inserted meal plan:', data[0].title);
        }
      } catch (err) {
        console.error('Exception inserting meal plan:', err);
      }
    }
    
    // Insert memberships one by one
    console.log('\nInserting memberships data...');
    const membershipsData = [
      {
        name: 'Basic Plan',
        description: 'Affordable fitness option with essential gym facilities.',
        price: 1999,
        duration: '1 Month',
        features: JSON.stringify([
          'Access to gym equipment during non-peak hours',
          'Locker room access',
          'One fitness assessment'
        ]),
        is_popular: false
      },
      {
        name: 'Gold Plan',
        description: 'Our most popular plan with a balance of amenities and value.',
        price: 3499,
        duration: '3 Months',
        features: JSON.stringify([
          'Full 24/7 gym access',
          '2 personal training sessions per month',
          'Access to group classes',
          'Fitness tracking app access',
          'Nutritional guidance'
        ]),
        is_popular: true
      },
      {
        name: 'Premium Plan',
        description: 'Luxury fitness experience with top-tier amenities and services.',
        price: 5999,
        duration: '6 Months',
        features: JSON.stringify([
          'Premium 24/7 gym access',
          '4 personal training sessions per month',
          'Unlimited group classes',
          'Swimming pool access',
          'Sauna and steam room',
          'Personalized nutrition plan',
          'Quarterly body composition analysis'
        ]),
        is_popular: false
      }
    ];
    
    for (const membership of membershipsData) {
      try {
        const { data, error } = await supabase
          .from('memberships')
          .insert(membership)
          .select();
        
        if (error) {
          console.error('Error inserting membership:', error);
          console.error('Membership data:', membership);
        } else {
          console.log('Successfully inserted membership:', data[0].name);
        }
      } catch (err) {
        console.error('Exception inserting membership:', err);
      }
    }
    
    // Insert schedules one by one
    console.log('\nInserting schedules data...');
    const schedulesData = [
      {
        name: 'Morning Yoga',
        description: 'Start your day with energizing yoga poses and meditation.',
        day: 'Monday',
        time: '7:00 AM',
        duration: 60,
        location: 'Studio 1',
        max_participants: 15
      },
      {
        name: 'Bollywood Dance Fitness',
        description: 'High-energy dance workout with popular Bollywood songs.',
        day: 'Tuesday',
        time: '6:00 PM',
        duration: 45,
        location: 'Studio 2',
        max_participants: 20
      },
      {
        name: 'HIIT Circuit',
        description: 'High-intensity interval training to burn calories and build strength.',
        day: 'Wednesday',
        time: '5:30 PM',
        duration: 45,
        location: 'Functional Zone',
        max_participants: 12
      },
      {
        name: 'Power Lifting',
        description: 'Focused session on improving strength through compound lifts.',
        day: 'Thursday',
        time: '6:30 PM',
        duration: 60,
        location: 'Weight Area',
        max_participants: 8
      },
      {
        name: 'Weekend Warrior',
        description: 'Full-body workout to kickstart your weekend.',
        day: 'Saturday',
        time: '10:00 AM',
        duration: 75,
        location: 'Main Gym Floor',
        max_participants: 15
      }
    ];
    
    for (const schedule of schedulesData) {
      try {
        const { data, error } = await supabase
          .from('schedules')
          .insert(schedule)
          .select();
        
        if (error) {
          console.error('Error inserting schedule:', error);
          console.error('Schedule data:', schedule);
        } else {
          console.log('Successfully inserted schedule:', data[0].name);
        }
      } catch (err) {
        console.error('Exception inserting schedule:', err);
      }
    }
    
    console.log('\nAll dummy data insertion completed. Check logs above for any errors.');
    
  } catch (err) {
    console.error('Error in insertDummyData function:', err);
  }
}

insertDummyData(); 