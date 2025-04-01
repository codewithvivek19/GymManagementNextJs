import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a single supabase client for the entire app
const supabase = createClient(supabaseUrl, supabaseKey)

// ======= Trainers =======
export async function getTrainers() {
  try {
    const { data, error } = await supabase
      .from('trainers')
      .select('*')
      .order('name')
    
    if (error) {
      console.error('Error fetching trainers:', error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error fetching trainers:', error)
    return null
  }
}

export async function getTrainerById(id) {
  try {
    const { data, error } = await supabase
      .from('trainers')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error(`Error fetching trainer with id ${id}:`, error)
      return null
    }
    
    return data
  } catch (error) {
    console.error(`Error fetching trainer with id ${id}:`, error)
    return null
  }
}

export async function createTrainer(trainer) {
  try {
    const { data, error } = await supabase
      .from('trainers')
      .insert([trainer])
      .select()
    
    if (error) {
      console.error('Error creating trainer:', error)
      return null
    }
    
    return data[0]
  } catch (error) {
    console.error('Error creating trainer:', error)
    return null
  }
}

export async function updateTrainer(id, updatedTrainer) {
  try {
    const { data, error } = await supabase
      .from('trainers')
      .update(updatedTrainer)
      .eq('id', id)
      .select()
    
    if (error) {
      console.error(`Error updating trainer with id ${id}:`, error)
      return null
    }
    
    return data[0]
  } catch (error) {
    console.error(`Error updating trainer with id ${id}:`, error)
    return null
  }
}

export async function deleteTrainer(id) {
  try {
    const { error } = await supabase
      .from('trainers')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error(`Error deleting trainer with id ${id}:`, error)
      return false
    }
    
    return true
  } catch (error) {
    console.error(`Error deleting trainer with id ${id}:`, error)
    return false
  }
}

// ======= Schedules =======
export async function getSchedules() {
  try {
    const { data, error } = await supabase
      .from('schedules')
      .select('*')
      .order('day')
    
    if (error) {
      console.error('Error fetching schedules:', error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error fetching schedules:', error)
    return null
  }
}

export async function getScheduleById(id) {
  try {
    const { data, error } = await supabase
      .from('schedules')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error(`Error fetching schedule with id ${id}:`, error)
      return null
    }
    
    return data
  } catch (error) {
    console.error(`Error fetching schedule with id ${id}:`, error)
    return null
  }
}

export async function createSchedule(schedule) {
  try {
    const { data, error } = await supabase
      .from('schedules')
      .insert([schedule])
      .select()
    
    if (error) {
      console.error('Error creating schedule:', error)
      return null
    }
    
    return data[0]
  } catch (error) {
    console.error('Error creating schedule:', error)
    return null
  }
}

export async function updateSchedule(id, updatedSchedule) {
  try {
    const { data, error } = await supabase
      .from('schedules')
      .update(updatedSchedule)
      .eq('id', id)
      .select()
    
    if (error) {
      console.error(`Error updating schedule with id ${id}:`, error)
      return null
    }
    
    return data[0]
  } catch (error) {
    console.error(`Error updating schedule with id ${id}:`, error)
    return null
  }
}

export async function deleteSchedule(id) {
  try {
    const { error } = await supabase
      .from('schedules')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error(`Error deleting schedule with id ${id}:`, error)
      return false
    }
    
    return true
  } catch (error) {
    console.error(`Error deleting schedule with id ${id}:`, error)
    return false
  }
}

// ======= Meal Plans =======
export async function getMealPlans() {
  try {
    const { data, error } = await supabase
      .from('meal_plans')
      .select('*')
      .order('category')
    
    if (error) {
      console.error('Error fetching meal plans:', error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error fetching meal plans:', error)
    return null
  }
}

export async function getMealPlanById(id) {
  try {
    const { data, error } = await supabase
      .from('meal_plans')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error(`Error fetching meal plan with id ${id}:`, error)
      return null
    }
    
    return data
  } catch (error) {
    console.error(`Error fetching meal plan with id ${id}:`, error)
    return null
  }
}

export async function createMealPlan(mealPlan) {
  try {
    const { data, error } = await supabase
      .from('meal_plans')
      .insert([mealPlan])
      .select()
    
    if (error) {
      console.error('Error creating meal plan:', error)
      return null
    }
    
    return data[0]
  } catch (error) {
    console.error('Error creating meal plan:', error)
    return null
  }
}

export async function updateMealPlan(id, updatedMealPlan) {
  try {
    const { data, error } = await supabase
      .from('meal_plans')
      .update(updatedMealPlan)
      .eq('id', id)
      .select()
    
    if (error) {
      console.error(`Error updating meal plan with id ${id}:`, error)
      return null
    }
    
    return data[0]
  } catch (error) {
    console.error(`Error updating meal plan with id ${id}:`, error)
    return null
  }
}

export async function deleteMealPlan(id) {
  try {
    const { error } = await supabase
      .from('meal_plans')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error(`Error deleting meal plan with id ${id}:`, error)
      return false
    }
    
    return true
  } catch (error) {
    console.error(`Error deleting meal plan with id ${id}:`, error)
    return false
  }
}

// ======= Memberships =======
export async function getMemberships() {
  try {
    const { data, error } = await supabase
      .from('memberships')
      .select('*')
      .order('price')
    
    if (error) {
      console.error('Error fetching memberships:', error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error fetching memberships:', error)
    return null
  }
}

export async function getMembershipById(id) {
  try {
    const { data, error } = await supabase
      .from('memberships')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error(`Error fetching membership with id ${id}:`, error)
      return null
    }
    
    return data
  } catch (error) {
    console.error(`Error fetching membership with id ${id}:`, error)
    return null
  }
}

export async function createMembership(membership) {
  try {
    const { data, error } = await supabase
      .from('memberships')
      .insert([membership])
      .select()
    
    if (error) {
      console.error('Error creating membership:', error)
      return null
    }
    
    return data[0]
  } catch (error) {
    console.error('Error creating membership:', error)
    return null
  }
}

export async function updateMembership(id, updatedMembership) {
  try {
    const { data, error } = await supabase
      .from('memberships')
      .update(updatedMembership)
      .eq('id', id)
      .select()
    
    if (error) {
      console.error(`Error updating membership with id ${id}:`, error)
      return null
    }
    
    return data[0]
  } catch (error) {
    console.error(`Error updating membership with id ${id}:`, error)
    return null
  }
}

export async function deleteMembership(id) {
  try {
    const { error } = await supabase
      .from('memberships')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error(`Error deleting membership with id ${id}:`, error)
      return false
    }
    
    return true
  } catch (error) {
    console.error(`Error deleting membership with id ${id}:`, error)
    return false
  }
}

// ======= User Management =======
export async function getUserByEmail(email) {
  try {
    const { data, error } = await supabase
      .from('trainers')  // Using trainers table since we don't have a separate users table
      .select('*')
      .eq('email', email)
      .single()
    
    if (error) {
      console.error(`Error fetching user with email ${email}:`, error)
      return null
    }
    
    return data
  } catch (error) {
    console.error(`Error fetching user with email ${email}:`, error)
    return null
  }
}

export async function createUser(userData) {
  try {
    // In this simplified model, we're using trainers as users
    const { data, error } = await supabase
      .from('trainers')
      .insert([{
        name: userData.name,
        email: userData.email,
        specialization: userData.specialization || "General Fitness",
        experience: userData.experience || 1,
        bio: userData.bio || "New trainer profile",
        image_url: userData.image_url || "https://placehold.co/400x400/png?text=Trainer",
      }])
      .select()
    
    if (error) {
      console.error('Error creating user:', error)
      return null
    }
    
    return data[0]
  } catch (error) {
    console.error('Error creating user:', error)
    return null
  }
}

export async function updateUser(id, updatedUserData) {
  try {
    const { data, error } = await supabase
      .from('trainers') // Using trainers table
      .update(updatedUserData)
      .eq('id', id)
      .select()
    
    if (error) {
      console.error(`Error updating user with id ${id}:`, error)
      return null
    }
    
    return data[0]
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error)
    return null
  }
}

// Additional meal plan function
export async function getMealPlansByCategory(category) {
  try {
    const { data, error } = await supabase
      .from('meal_plans')
      .select('*')
      .eq('category', category)
    
    if (error) {
      console.error(`Error fetching meal plans for category ${category}:`, error)
      return null
    }
    
    return data
  } catch (error) {
    console.error(`Error fetching meal plans for category ${category}:`, error)
    return null
  }
}

// ======= Membership Purchases =======
export async function createMembershipPurchase(purchaseData) {
  try {
    const { data, error } = await supabase
      .from('membership_purchases')
      .insert([purchaseData])
      .select()
    
    if (error) {
      console.error('Error creating membership purchase:', error)
      return null
    }
    
    return data[0]
  } catch (error) {
    console.error('Error creating membership purchase:', error)
    return null
  }
}

export async function getMembershipPurchasesByUserId(userId) {
  try {
    const { data, error } = await supabase
      .from('membership_purchases')
      .select('*, membership:membership_id(*)')
      .eq('user_id', userId)
      .order('purchase_date', { ascending: false })
    
    if (error) {
      console.error(`Error fetching membership purchases for user ${userId}:`, error)
      return null
    }
    
    return data
  } catch (error) {
    console.error(`Error fetching membership purchases for user ${userId}:`, error)
    return null
  }
}

export async function getCurrentMembershipForUser(userId) {
  try {
    const { data, error } = await supabase
      .from('membership_purchases')
      .select('*, membership:membership_id(*)')
      .eq('user_id', userId)
      .gte('end_date', new Date().toISOString())
      .order('end_date', { ascending: true })
      .limit(1)
    
    if (error) {
      console.error(`Error fetching current membership for user ${userId}:`, error)
      return null
    }
    
    return data.length > 0 ? data[0] : null
  } catch (error) {
    console.error(`Error fetching current membership for user ${userId}:`, error)
    return null
  }
}

export default supabase 