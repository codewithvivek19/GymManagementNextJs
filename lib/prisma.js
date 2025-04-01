import { PrismaClient } from '@prisma/client';

// This is to avoid multiple instances of Prisma Client in development
const globalForPrisma = global;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Helper functions for data access

export async function getTrainersFromPrisma() {
  try {
    console.log('Fetching trainers from Prisma...');
    const trainers = await prisma.trainer.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    console.log('Trainers fetched successfully:', trainers.length);
    return trainers;
  } catch (error) {
    console.error('Error fetching trainers from Prisma:', error);
    return null;
  }
}

export async function getMealPlansFromPrisma() {
  try {
    console.log('Fetching meal plans from Prisma...');
    const mealPlans = await prisma.mealPlan.findMany({
      orderBy: {
        category: 'asc',
      },
    });
    
    console.log('Meal plans fetched successfully:', mealPlans.length);
    
    // Parse the meals field for each meal plan
    if (mealPlans && mealPlans.length > 0) {
      mealPlans.forEach(plan => {
        try {
          if (typeof plan.meals === 'string') {
            plan.meals = JSON.parse(plan.meals);
          }
        } catch (err) {
          console.error(`Error parsing meals for plan ${plan.title}:`, err);
          plan.meals = [];
        }
      });
    }
    
    return mealPlans;
  } catch (error) {
    console.error('Error fetching meal plans from Prisma:', error);
    return null;
  }
}

export async function getSchedulesFromPrisma() {
  try {
    console.log('Fetching schedules from Prisma...');
    const schedules = await prisma.schedule.findMany({
      include: {
        trainer: true,
      },
      orderBy: {
        day: 'asc',
      },
    });
    console.log('Schedules fetched successfully:', schedules.length);
    return schedules;
  } catch (error) {
    console.error('Error fetching schedules from Prisma:', error);
    return null;
  }
}

export async function getMembershipsFromPrisma() {
  try {
    console.log('Fetching memberships from Prisma...');
    const memberships = await prisma.membership.findMany({
      orderBy: {
        price: 'asc',
      },
    });
    console.log('Memberships fetched successfully:', memberships.length);
    return memberships;
  } catch (error) {
    console.error('Error fetching memberships from Prisma:', error);
    return null;
  }
}

export default prisma; 