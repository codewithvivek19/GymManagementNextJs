const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

// Configure Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Sample meal plan images
const mealPlanImages = {
  lowCarb: 'https://placehold.co/600x400/png?text=Low+Carb+Plan&font=playfair',
  balancedDeficit: 'https://placehold.co/600x400/png?text=Balanced+Deficit&font=playfair',
  highProtein: 'https://placehold.co/600x400/png?text=High+Protein+Surplus&font=playfair',
  cleanBulk: 'https://placehold.co/600x400/png?text=Clean+Bulk&font=playfair',
  balancedNutrition: 'https://placehold.co/600x400/png?text=Balanced+Nutrition&font=playfair',
  performanceFocus: 'https://placehold.co/600x400/png?text=Performance+Focus&font=playfair',
  highProteinVeg: 'https://placehold.co/600x400/png?text=High+Protein+Vegetarian&font=playfair',
  balancedVeg: 'https://placehold.co/600x400/png?text=Balanced+Vegetarian&font=playfair',
}

// Sample meal plans data
const mealPlansData = [
  {
    id: "wl-1",
    title: "Low Carb Plan",
    description: "A low-carbohydrate approach focused on protein and healthy fats",
    category: "weightLoss",
    calories: "1500-1800",
    imageUrl: mealPlanImages.lowCarb,
    proteinPercentage: "40%",
    carbsPercentage: "20%", 
    fatsPercentage: "40%",
    meals: [
      { name: "Breakfast", description: "Spinach and feta omelet with avocado" },
      { name: "Snack", description: "Greek yogurt with berries and nuts" },
      { name: "Lunch", description: "Grilled chicken salad with olive oil dressing" },
      { name: "Snack", description: "Protein shake with almond milk" },
      { name: "Dinner", description: "Baked salmon with roasted vegetables" },
    ]
  },
  {
    id: "wl-2",
    title: "Balanced Deficit",
    description: "Moderate carbs with balanced macronutrients for sustainable weight loss",
    category: "weightLoss",
    calories: "1600-1900",
    imageUrl: mealPlanImages.balancedDeficit,
    proteinPercentage: "30%",
    carbsPercentage: "40%", 
    fatsPercentage: "30%",
    meals: [
      { name: "Breakfast", description: "Overnight oats with protein powder and berries" },
      { name: "Snack", description: "Apple with almond butter" },
      { name: "Lunch", description: "Turkey and quinoa bowl with vegetables" },
      { name: "Snack", description: "Cottage cheese with cucumber slices" },
      { name: "Dinner", description: "Lean beef stir fry with brown rice" },
    ]
  },
  {
    id: "mg-1",
    title: "High Protein Surplus",
    description: "Calorie surplus with emphasis on protein for muscle building",
    category: "muscleGain",
    calories: "2800-3200",
    imageUrl: mealPlanImages.highProtein,
    proteinPercentage: "35%",
    carbsPercentage: "45%", 
    fatsPercentage: "20%",
    meals: [
      { name: "Breakfast", description: "Protein pancakes with banana and honey" },
      { name: "Snack", description: "Protein shake with oats and peanut butter" },
      { name: "Lunch", description: "Chicken, sweet potato, and broccoli" },
      { name: "Snack", description: "Tuna wrap with whole grain tortilla" },
      { name: "Dinner", description: "Steak with quinoa and roasted vegetables" },
      { name: "Evening Snack", description: "Casein protein with Greek yogurt" },
    ]
  },
  {
    id: "mg-2",
    title: "Clean Bulk",
    description: "Moderate surplus with quality foods for lean muscle gain",
    category: "muscleGain",
    calories: "2600-3000",
    imageUrl: mealPlanImages.cleanBulk,
    proteinPercentage: "30%",
    carbsPercentage: "50%", 
    fatsPercentage: "20%",
    meals: [
      { name: "Breakfast", description: "Egg white omelette with oatmeal and fruit" },
      { name: "Snack", description: "Protein bar and banana" },
      { name: "Lunch", description: "Turkey and rice bowl with vegetables" },
      { name: "Snack", description: "Greek yogurt with granola and honey" },
      { name: "Dinner", description: "Salmon with sweet potato and asparagus" },
      { name: "Evening Snack", description: "Cottage cheese with pineapple" },
    ]
  },
  {
    id: "mt-1",
    title: "Balanced Nutrition",
    description: "Well-rounded nutrition plan for maintaining current physique",
    category: "maintenance",
    calories: "2000-2400",
    imageUrl: mealPlanImages.balancedNutrition,
    proteinPercentage: "25%",
    carbsPercentage: "50%", 
    fatsPercentage: "25%",
    meals: [
      { name: "Breakfast", description: "Whole grain toast with eggs and avocado" },
      { name: "Snack", description: "Fruit and nut mix" },
      { name: "Lunch", description: "Mediterranean bowl with falafel and hummus" },
      { name: "Snack", description: "Greek yogurt with honey" },
      { name: "Dinner", description: "Grilled fish with quinoa and vegetables" },
    ]
  },
  {
    id: "mt-2",
    title: "Performance Focus",
    description: "Nutrition plan optimized for athletic performance",
    category: "maintenance",
    calories: "2200-2600",
    imageUrl: mealPlanImages.performanceFocus,
    proteinPercentage: "25%",
    carbsPercentage: "55%", 
    fatsPercentage: "20%",
    meals: [
      { name: "Breakfast", description: "Oatmeal with protein powder, banana, and berries" },
      { name: "Snack", description: "Whole grain crackers with hummus" },
      { name: "Lunch", description: "Chicken and vegetable stir fry with brown rice" },
      { name: "Pre-workout", description: "Apple with peanut butter" },
      { name: "Post-workout", description: "Protein shake with banana" },
      { name: "Dinner", description: "Lean protein with sweet potato and green vegetables" },
    ]
  },
  {
    id: "vg-1",
    title: "High Protein Vegetarian",
    description: "Plant-based proteins for muscle maintenance and recovery",
    category: "vegetarian",
    calories: "1800-2200",
    imageUrl: mealPlanImages.highProteinVeg,
    proteinPercentage: "25%",
    carbsPercentage: "50%", 
    fatsPercentage: "25%",
    meals: [
      { name: "Breakfast", description: "Tofu scramble with vegetables and whole grain toast" },
      { name: "Snack", description: "Protein smoothie with plant-based protein" },
      { name: "Lunch", description: "Lentil soup with quinoa salad" },
      { name: "Snack", description: "Edamame with sea salt" },
      { name: "Dinner", description: "Tempeh stir fry with brown rice and vegetables" },
    ]
  },
  {
    id: "vg-2",
    title: "Balanced Vegetarian",
    description: "Well-rounded vegetarian diet with diverse nutrient sources",
    category: "vegetarian",
    calories: "1900-2300",
    imageUrl: mealPlanImages.balancedVeg,
    proteinPercentage: "20%",
    carbsPercentage: "55%", 
    fatsPercentage: "25%",
    meals: [
      { name: "Breakfast", description: "Greek yogurt parfait with granola and mixed berries" },
      { name: "Snack", description: "Hummus with carrot and cucumber sticks" },
      { name: "Lunch", description: "Chickpea and vegetable wrap with avocado" },
      { name: "Snack", description: "Trail mix with nuts and dried fruits" },
      { name: "Dinner", description: "Vegetable curry with brown rice and tofu" },
    ]
  },
]

async function seedMealPlans() {
  try {
    console.log('Starting to seed meal plans...')
    
    // First check if a meal_plans table exists, if not create it
    const { error: tableError } = await supabase
      .from('meal_plans')
      .select('id')
      .limit(1)
    
    if (tableError && tableError.code === 'PGRST116') {
      console.log('Creating meal_plans table...')
      // Table doesn't exist, you'd typically use migrations for this
      // But for simplicity, we'll create it via API calls
      
      // Code for creating table would go here - but we'll assume Supabase is already set up
      console.log('Please create a meal_plans table in Supabase first.')
      process.exit(1)
    }
    
    // Check if meal plans already exist
    const { data: existingPlans } = await supabase
      .from('meal_plans')
      .select('id')
    
    if (existingPlans && existingPlans.length > 0) {
      console.log('Meal plans already exist in the database, skipping seed')
      return
    }
    
    // Create the meal plans
    const { data, error } = await supabase
      .from('meal_plans')
      .insert(mealPlansData)
    
    if (error) {
      console.error('Error seeding meal plans:', error)
      return
    }
    
    console.log('Successfully seeded meal plans')
    
  } catch (error) {
    console.error('Error in seedMealPlans function:', error)
  }
}

// Run the seeding function
seedMealPlans()
  .then(() => {
    console.log('Seeding complete!')
    process.exit(0)
  })
  .catch(error => {
    console.error('Error in seeding script:', error)
    process.exit(1)
  }) 