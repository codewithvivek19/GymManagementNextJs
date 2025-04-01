import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import supabase from '@/lib/supabase';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  
  let data = null;
  let error = null;
  
  try {
    console.log(`API: Fetching ${type} data...`);
    
    switch (type) {
      case 'trainers':
        data = await getTrainers();
        break;
      case 'meal-plans':
        data = await getMealPlans();
        break;
      case 'schedules':
        data = await getSchedules();
        break;
      case 'memberships':
        data = await getMemberships();
        break;
      default:
        error = 'Invalid data type requested';
    }
    
    if (data) {
      console.log(`API: Successfully fetched ${type} data`);
      return NextResponse.json({ data });
    } else {
      console.error(`API: Failed to fetch ${type} data:`, error);
      return NextResponse.json({ error: error || 'Failed to fetch data' }, { status: 500 });
    }
  } catch (err) {
    console.error(`API: Error fetching ${type} data:`, err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Data fetching functions
async function getTrainers() {
  try {
    // Try Prisma first
    try {
      console.log('Fetching trainers from Prisma...');
      const trainers = await prisma.trainer.findMany({
        orderBy: {
          name: 'asc',
        },
      });
      console.log('Trainers fetched successfully from Prisma:', trainers.length);
      return trainers;
    } catch (prismaError) {
      console.error('Error fetching trainers from Prisma:', prismaError);
      
      // Fall back to Supabase
      console.log('Falling back to Supabase for trainers...');
      const { data, error } = await supabase
        .from('trainers')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching trainers from Supabase:', error);
        return null;
      }
      
      console.log('Trainers fetched successfully from Supabase:', data?.length || 0);
      return data;
    }
  } catch (error) {
    console.error('Error in getTrainers:', error);
    return null;
  }
}

async function getMealPlans() {
  try {
    // Try Prisma first
    try {
      console.log('Fetching meal plans from Prisma...');
      const mealPlans = await prisma.mealPlan.findMany({
        orderBy: {
          category: 'asc',
        },
      });
      
      console.log('Meal plans fetched successfully from Prisma:', mealPlans.length);
      
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
    } catch (prismaError) {
      console.error('Error fetching meal plans from Prisma:', prismaError);
      
      // Fall back to Supabase
      console.log('Falling back to Supabase for meal plans...');
      const { data, error } = await supabase
        .from('meal_plans')
        .select('*')
        .order('category');
      
      if (error) {
        console.error('Error fetching meal plans from Supabase:', error);
        return null;
      }
      
      // Parse the meals field for each meal plan
      if (data && data.length > 0) {
        data.forEach(plan => {
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
      
      console.log('Meal plans fetched successfully from Supabase:', data?.length || 0);
      return data;
    }
  } catch (error) {
    console.error('Error in getMealPlans:', error);
    return null;
  }
}

async function getSchedules() {
  try {
    // Try Prisma first
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
      console.log('Schedules fetched successfully from Prisma:', schedules.length);
      return schedules;
    } catch (prismaError) {
      console.error('Error fetching schedules from Prisma:', prismaError);
      
      // Fall back to Supabase
      console.log('Falling back to Supabase for schedules...');
      const { data, error } = await supabase
        .from('schedules')
        .select('*')
        .order('day');
      
      if (error) {
        console.error('Error fetching schedules from Supabase:', error);
        return null;
      }
      
      console.log('Schedules fetched successfully from Supabase:', data?.length || 0);
      return data;
    }
  } catch (error) {
    console.error('Error in getSchedules:', error);
    return null;
  }
}

async function getMemberships() {
  try {
    // Try Prisma first
    try {
      console.log('Fetching memberships from Prisma...');
      const memberships = await prisma.membership.findMany({
        orderBy: {
          price: 'asc',
        },
      });
      console.log('Memberships fetched successfully from Prisma:', memberships.length);
      return memberships;
    } catch (prismaError) {
      console.error('Error fetching memberships from Prisma:', prismaError);
      
      // Fall back to Supabase
      console.log('Falling back to Supabase for memberships...');
      const { data, error } = await supabase
        .from('memberships')
        .select('*')
        .order('price');
      
      if (error) {
        console.error('Error fetching memberships from Supabase:', error);
        return null;
      }
      
      console.log('Memberships fetched successfully from Supabase:', data?.length || 0);
      return data;
    }
  } catch (error) {
    console.error('Error in getMemberships:', error);
    return null;
  }
} 