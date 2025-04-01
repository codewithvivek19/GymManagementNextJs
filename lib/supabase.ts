import { createClient } from "@supabase/supabase-js"

// Use environment variables for Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 1. Meal Plan Functions
export async function getMealPlans() {
  const { data, error } = await supabase
    .from('meal_plans')
    .select('*')
  
  if (error) {
    console.error('Error fetching meal plans:', error)
    return []
  }
  
  return data
}

export async function getMealPlansByCategory(category: string) {
  const { data, error } = await supabase
    .from('meal_plans')
    .select('*')
    .eq('category', category)
  
  if (error) {
    console.error(`Error fetching ${category} meal plans:`, error)
    return []
  }
  
  return data
}

export async function getMealPlanById(id: string) {
  const { data, error } = await supabase
    .from('meal_plans')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error(`Error fetching meal plan ${id}:`, error)
    return null
  }
  
  return data
}

export async function createMealPlan(mealPlan: any) {
  const { data, error } = await supabase
    .from('meal_plans')
    .insert([mealPlan])
    .select()
  
  if (error) {
    console.error('Error creating meal plan:', error)
    throw error
  }
  
  return data[0]
}

export async function updateMealPlan(id: string, updates: any) {
  const { data, error } = await supabase
    .from('meal_plans')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating meal plan:', error)
    throw error
  }
  
  return data[0]
}

export async function deleteMealPlan(id: string) {
  const { error } = await supabase
    .from('meal_plans')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting meal plan:', error)
    throw error
  }
  
  return true
}

// 2. Trainer Functions
export async function getTrainers() {
  const { data, error } = await supabase
    .from('trainers')
    .select('*')
  
  if (error) {
    console.error('Error fetching trainers:', error)
    return []
  }
  
  return data
}

export async function getTrainerById(id: string) {
  const { data, error } = await supabase
    .from('trainers')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error(`Error fetching trainer ${id}:`, error)
    return null
  }
  
  return data
}

export async function createTrainer(trainer: any) {
  const { data, error } = await supabase
    .from('trainers')
    .insert([trainer])
    .select()
  
  if (error) {
    console.error('Error creating trainer:', error)
    throw error
  }
  
  return data[0]
}

export async function updateTrainer(id: string, updates: any) {
  const { data, error } = await supabase
    .from('trainers')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating trainer:', error)
    throw error
  }
  
  return data[0]
}

export async function deleteTrainer(id: string) {
  const { error } = await supabase
    .from('trainers')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting trainer:', error)
    throw error
  }
  
  return true
}

// 3. Membership Functions
export async function getMemberships() {
  const { data, error } = await supabase
    .from('memberships')
    .select('*')
  
  if (error) {
    console.error('Error fetching memberships:', error)
    return []
  }
  
  return data
}

export async function getMembershipById(id: string) {
  const { data, error } = await supabase
    .from('memberships')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error(`Error fetching membership ${id}:`, error)
    return null
  }
  
  return data
}

export async function createMembership(membership: any) {
  const { data, error } = await supabase
    .from('memberships')
    .insert([membership])
    .select()
  
  if (error) {
    console.error('Error creating membership:', error)
    throw error
  }
  
  return data[0]
}

export async function updateMembership(id: string, updates: any) {
  const { data, error } = await supabase
    .from('memberships')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating membership:', error)
    throw error
  }
  
  return data[0]
}

export async function deleteMembership(id: string) {
  const { error } = await supabase
    .from('memberships')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting membership:', error)
    throw error
  }
  
  return true
}

// 4. Schedule Functions
export async function getSchedules() {
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
  
  if (error) {
    console.error('Error fetching schedules:', error)
    return []
  }
  
  return data
}

export async function getSchedulesByDay(day: string) {
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .eq('day', day)
  
  if (error) {
    console.error(`Error fetching schedules for ${day}:`, error)
    return []
  }
  
  return data
}

export async function getScheduleById(id: string) {
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error(`Error fetching schedule ${id}:`, error)
    return null
  }
  
  return data
}

export async function createSchedule(schedule: any) {
  const { data, error } = await supabase
    .from('schedules')
    .insert([schedule])
    .select()
  
  if (error) {
    console.error('Error creating schedule:', error)
    throw error
  }
  
  return data[0]
}

export async function updateSchedule(id: string, updates: any) {
  const { data, error } = await supabase
    .from('schedules')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating schedule:', error)
    throw error
  }
  
  return data[0]
}

export async function deleteSchedule(id: string) {
  const { error } = await supabase
    .from('schedules')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting schedule:', error)
    throw error
  }
  
  return true
}

// 5. User Functions
export async function getUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
  
  if (error) {
    console.error('Error fetching users:', error)
    return []
  }
  
  return data
}

export async function getUserById(id: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error(`Error fetching user ${id}:`, error)
    return null
  }
  
  return data
}

export async function getUserByEmail(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()
  
  if (error) {
    console.error(`Error fetching user with email ${email}:`, error)
    return null
  }
  
  return data
}

export async function createUser(user: any) {
  const { data, error } = await supabase
    .from('users')
    .insert([user])
    .select()
  
  if (error) {
    console.error('Error creating user:', error)
    throw error
  }
  
  return data[0]
}

export async function updateUser(id: string, updates: any) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating user:', error)
    throw error
  }
  
  return data[0]
}

export async function deleteUser(id: string) {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting user:', error)
    throw error
  }
  
  return true
}

