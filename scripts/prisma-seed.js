const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting to seed database...');

    // Clear existing data
    console.log('Clearing existing data...');
    await prisma.schedule.deleteMany({});
    await prisma.trainer.deleteMany({});
    await prisma.mealPlan.deleteMany({});
    await prisma.membership.deleteMany({});
    
    // Add trainers
    console.log('Adding trainers...');
    const trainers = [
      {
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        specialization: 'Strength Training',
        experience: 8,
        bio: 'Certified strength and conditioning specialist with expertise in powerlifting and bodybuilding. Dedicated to helping clients achieve their strength goals safely and effectively.',
        image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      },
      {
        name: 'Priya Singh',
        email: 'priya.singh@example.com',
        specialization: 'Yoga & Flexibility',
        experience: 10,
        bio: 'Certified yoga instructor with a decade of experience teaching various styles including Hatha, Vinyasa, and Yin. Focused on mindfulness and holistic wellness.',
        image_url: 'https://images.unsplash.com/photo-1581734984638-da67bf47f79d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3',
      },
      {
        name: 'Vikram Patel',
        email: 'vikram.patel@example.com',
        specialization: 'Functional Training',
        experience: 6,
        bio: 'Specializes in functional movement patterns and HIIT workouts. Passionate about helping clients improve mobility, stability, and everyday performance.',
        image_url: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      },
      {
        name: 'Meera Joshi',
        email: 'meera.joshi@example.com',
        specialization: 'Nutrition & Weight Management',
        experience: 7,
        bio: 'Certified nutritionist and trainer with expertise in sustainable weight management strategies. Creates personalized plans for different dietary needs and goals.',
        image_url: 'https://images.unsplash.com/photo-1535324492437-d8dea70a38a7?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3',
      },
    ];
    
    const createdTrainers = [];
    
    for (const trainer of trainers) {
      try {
        const createdTrainer = await prisma.trainer.create({
          data: trainer
        });
        createdTrainers.push(createdTrainer);
        console.log(`Created trainer: ${trainer.name}`);
      } catch (err) {
        console.error(`Error creating trainer ${trainer.name}:`, err);
      }
    }
    
    // Add meal plans
    console.log('Adding meal plans...');
    const mealPlans = [
      {
        title: 'Low Carb Indian Diet',
        description: 'A low-carbohydrate approach focused on traditional Indian ingredients',
        category: 'weight_loss',
        calories: 1800,
        protein: 35,
        carbs: 25,
        fat: 40,
        image_url: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
        meals: [
          { name: 'Breakfast', description: 'Paneer bhurji with mixed vegetables' },
          { name: 'Snack', description: 'Roasted chana and almonds' },
          { name: 'Lunch', description: 'Grilled chicken tikka with cucumber raita' },
          { name: 'Snack', description: 'Coconut and mint chaas' },
          { name: 'Dinner', description: 'Tandoori fish with palak paneer' }
        ]
      },
      {
        title: 'Balanced Vegetarian Plan',
        description: 'Nutritionally complete vegetarian diet with adequate protein',
        category: 'vegetarian',
        calories: 2000,
        protein: 25,
        carbs: 50,
        fat: 25,
        image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3',
        meals: [
          { name: 'Breakfast', description: 'Besan chilla with paneer stuffing and mint chutney' },
          { name: 'Snack', description: 'Greek yogurt with mixed berries and honey' },
          { name: 'Lunch', description: 'Rajma chawal with mixed vegetable salad' },
          { name: 'Snack', description: 'Sprouts bhel with lemon and chaat masala' },
          { name: 'Dinner', description: 'Tofu and vegetable tikka masala with multigrain roti' }
        ]
      },
      {
        title: 'High Protein Muscle Gain',
        description: 'Calorie surplus diet for serious muscle building',
        category: 'muscle_gain',
        calories: 3100,
        protein: 40,
        carbs: 40,
        fat: 20,
        image_url: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3',
        meals: [
          { name: 'Breakfast', description: 'Masala oats with eggs and mixed nuts' },
          { name: 'Snack', description: 'Protein shake with banana and peanut butter' },
          { name: 'Lunch', description: 'Chicken biryani with raita and salad' },
          { name: 'Snack', description: 'Paneer tikka with mint chutney' },
          { name: 'Dinner', description: 'Lamb curry with brown rice and vegetables' }
        ]
      },
      {
        title: 'Balanced Maintenance',
        description: 'Well-rounded nutrition plan for maintaining current physique',
        category: 'maintenance',
        calories: 2400,
        protein: 30,
        carbs: 45,
        fat: 25,
        image_url: 'https://images.unsplash.com/photo-1620708176789-ce543fd6c78a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3',
        meals: [
          { name: 'Breakfast', description: 'Vegetable uttapam with coconut chutney' },
          { name: 'Snack', description: 'Apple with nut butter' },
          { name: 'Lunch', description: 'Roti with mixed vegetable sabzi and dal' },
          { name: 'Snack', description: 'Yogurt with honey and fruits' },
          { name: 'Dinner', description: 'Grilled fish with quinoa pulao and salad' }
        ]
      },
    ];
    
    for (const plan of mealPlans) {
      try {
        const mealArray = JSON.stringify(plan.meals);
        
        const { meals, ...planData } = plan;
        
        await prisma.mealPlan.create({
          data: {
            ...planData,
            meals: mealArray
          }
        });
        console.log(`Created meal plan: ${plan.title}`);
      } catch (err) {
        console.error(`Error creating meal plan ${plan.title}:`, err);
      }
    }
    
    // Add memberships
    console.log('Adding memberships...');
    const memberships = [
      {
        name: 'Basic',
        description: 'Access to gym facilities during regular hours',
        price: 1999,
        duration: '1 month',
        features: ['Gym access', 'Locker use', 'Free water'],
        is_popular: false
      },
      {
        name: 'Standard',
        description: 'Full access including classes and extended hours',
        price: 3499,
        duration: '1 month',
        features: ['Gym access', 'Locker use', 'Free water', 'Group classes', 'Extended hours'],
        is_popular: true
      },
      {
        name: 'Premium',
        description: 'Complete access with additional premium benefits',
        price: 5999,
        duration: '1 month',
        features: [
          'Gym access',
          'Locker use',
          'Free water',
          'Group classes',
          'Extended hours',
          '1 personal training session',
          'Nutrition guidance',
          'Spa access'
        ],
        is_popular: false
      },
      {
        name: 'Annual Standard',
        description: 'Standard membership with annual discount',
        price: 32999,
        duration: '12 months',
        features: [
          'Gym access',
          'Locker use',
          'Free water',
          'Group classes',
          'Extended hours',
          'Free guest passes',
          '10% off on merchandise'
        ],
        is_popular: false
      }
    ];
    
    for (const membership of memberships) {
      try {
        await prisma.membership.create({
          data: membership
        });
        console.log(`Created membership: ${membership.name}`);
      } catch (err) {
        console.error(`Error creating membership ${membership.name}:`, err);
      }
    }
    
    // Add schedules
    console.log('Adding schedules...');
    // Use the first trainer for the schedules
    const schedules = [
      {
        name: 'Morning HIIT',
        description: 'High-intensity interval training to kickstart your day',
        day: 'Monday',
        time: '06:00',
        duration: 60,
        location: 'Studio A',
        max_participants: 20,
        trainer_id: createdTrainers[0].id,
      },
      {
        name: 'Yoga Flow',
        description: 'Fluid yoga movements for flexibility and relaxation',
        day: 'Monday',
        time: '09:00',
        duration: 60,
        location: 'Studio B',
        max_participants: 15,
        trainer_id: createdTrainers[1].id,
      },
      {
        name: 'Functional Training',
        description: 'Improve everyday movement patterns and strength',
        day: 'Tuesday',
        time: '06:00',
        duration: 60,
        location: 'Studio A',
        max_participants: 20,
        trainer_id: createdTrainers[2].id,
      },
      {
        name: 'Pilates',
        description: 'Core strength and flexibility training',
        day: 'Tuesday',
        time: '09:00',
        duration: 60,
        location: 'Studio B',
        max_participants: 15,
        trainer_id: createdTrainers[1].id,
      },
      {
        name: 'Morning HIIT',
        description: 'High-intensity interval training to kickstart your day',
        day: 'Wednesday',
        time: '06:00',
        duration: 60,
        location: 'Studio A',
        max_participants: 20,
        trainer_id: createdTrainers[0].id,
      },
      {
        name: 'Strength Circuit',
        description: 'Circuit training focused on building strength',
        day: 'Wednesday',
        time: '12:00',
        duration: 60,
        location: 'Main Floor',
        max_participants: 12,
        trainer_id: createdTrainers[0].id,
      },
      {
        name: 'Nutrition Workshop',
        description: 'Learn about proper nutrition for your fitness goals',
        day: 'Thursday',
        time: '18:00',
        duration: 90,
        location: 'Conference Room',
        max_participants: 25,
        trainer_id: createdTrainers[3].id,
      },
    ];
    
    for (const schedule of schedules) {
      try {
        await prisma.schedule.create({
          data: schedule
        });
        console.log(`Created schedule: ${schedule.name} on ${schedule.day}`);
      } catch (err) {
        console.error(`Error creating schedule ${schedule.name} on ${schedule.day}:`, err);
      }
    }
    
    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 