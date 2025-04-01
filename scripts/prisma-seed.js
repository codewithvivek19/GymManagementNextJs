const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting to seed data using Prisma...');
    
    // Clear existing data (optional)
    console.log('Clearing existing data...');
    await prisma.schedule.deleteMany({});
    await prisma.trainer.deleteMany({});
    await prisma.mealPlan.deleteMany({});
    await prisma.membership.deleteMany({});
    
    // Insert trainers
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
    
    const trainers = [];
    for (const trainer of trainersData) {
      try {
        const result = await prisma.trainer.create({
          data: trainer
        });
        trainers.push(result);
        console.log(`Created trainer: ${result.name}`);
      } catch (error) {
        console.error('Error inserting trainer:', error);
      }
    }
    
    // Insert meal plans
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
        meals: [
          'Breakfast: Vegetable upma with sprouts and green tea',
          'Mid-morning: Buttermilk with roasted chana',
          'Lunch: 2 rotis with paneer bhurji and cucumber raita',
          'Evening snack: Fruit chaat with a sprinkle of chaat masala',
          'Dinner: Grilled fish/tofu curry with brown rice and stir-fried vegetables'
        ]
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
        meals: [
          'Breakfast: Paneer paratha with curd and protein shake',
          'Mid-morning: Egg bhurji with whole grain toast',
          'Lunch: Chicken/chickpea curry with jeera rice and vegetable salad',
          'Post-workout: Banana lassi with whey protein',
          'Dinner: Tandoori chicken/soya chunks with dal and mixed vegetable sabzi',
          'Before bed: Greek yogurt with almonds'
        ]
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
        meals: [
          'Breakfast: Moong dal cheela with mint chutney',
          'Mid-morning: Sprouts sundal',
          'Lunch: Rajma curry with brown rice and beet raita',
          'Evening snack: Multigrain dhokla with green chutney',
          'Dinner: Palak paneer with missi roti and cucumber salad'
        ]
      }
    ];
    
    for (const mealPlan of mealPlansData) {
      try {
        const result = await prisma.mealPlan.create({
          data: mealPlan
        });
        console.log(`Created meal plan: ${result.title}`);
      } catch (error) {
        console.error('Error inserting meal plan:', error);
      }
    }
    
    // Insert memberships
    console.log('\nInserting memberships data...');
    const membershipsData = [
      {
        name: 'Basic Plan',
        description: 'Affordable fitness option with essential gym facilities.',
        price: 1999,
        duration: '1 Month',
        features: [
          'Access to gym equipment during non-peak hours',
          'Locker room access',
          'One fitness assessment'
        ],
        is_popular: false
      },
      {
        name: 'Gold Plan',
        description: 'Our most popular plan with a balance of amenities and value.',
        price: 3499,
        duration: '3 Months',
        features: [
          'Full 24/7 gym access',
          '2 personal training sessions per month',
          'Access to group classes',
          'Fitness tracking app access',
          'Nutritional guidance'
        ],
        is_popular: true
      },
      {
        name: 'Premium Plan',
        description: 'Luxury fitness experience with top-tier amenities and services.',
        price: 5999,
        duration: '6 Months',
        features: [
          'Premium 24/7 gym access',
          '4 personal training sessions per month',
          'Unlimited group classes',
          'Swimming pool access',
          'Sauna and steam room',
          'Personalized nutrition plan',
          'Quarterly body composition analysis'
        ],
        is_popular: false
      }
    ];
    
    for (const membership of membershipsData) {
      try {
        const result = await prisma.membership.create({
          data: membership
        });
        console.log(`Created membership: ${result.name}`);
      } catch (error) {
        console.error('Error inserting membership:', error);
      }
    }
    
    // Insert schedules
    console.log('\nInserting schedules data...');
    const schedulesData = [
      {
        name: 'Morning Yoga',
        description: 'Start your day with energizing yoga poses and meditation.',
        day: 'Monday',
        time: '7:00 AM',
        duration: 60,
        location: 'Studio 1',
        trainer_id: trainers.length > 1 ? trainers[1].id : undefined,
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
        trainer_id: trainers.length > 2 ? trainers[2].id : undefined,
        max_participants: 12
      },
      {
        name: 'Power Lifting',
        description: 'Focused session on improving strength through compound lifts.',
        day: 'Thursday',
        time: '6:30 PM',
        duration: 60,
        location: 'Weight Area',
        trainer_id: trainers.length > 0 ? trainers[0].id : undefined,
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
        const result = await prisma.schedule.create({
          data: schedule
        });
        console.log(`Created schedule: ${result.name} (${result.day})`);
      } catch (error) {
        console.error('Error inserting schedule:', error);
      }
    }
    
    console.log('\nAll data seeding completed successfully!');
  } catch (error) {
    console.error('Error in main seed function:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 