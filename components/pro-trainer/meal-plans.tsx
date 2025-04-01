"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Image from "next/image"
import { getMealPlans } from "@/lib/supabase"

// Fallback data in case Supabase is not available
const fallbackMealPlans = {
  weight_loss: [
    {
      id: "wl-1",
      title: "Low Carb Plan",
      description: "A low-carbohydrate approach focused on protein and healthy fats",
      category: "weight_loss",
      calories: 1800,
      image_url: 'https://placehold.co/600x400/png?text=Low+Carb+Plan&font=playfair',
      proteinPercentage: "40%",
      carbsPercentage: "20%", 
      fatsPercentage: "40%",
      meals: JSON.stringify([
        { name: "Breakfast", description: "Spinach and feta omelet with avocado" },
        { name: "Snack", description: "Greek yogurt with berries and nuts" },
        { name: "Lunch", description: "Grilled chicken salad with olive oil dressing" },
        { name: "Snack", description: "Protein shake with almond milk" },
        { name: "Dinner", description: "Baked salmon with roasted vegetables" },
      ])
    },
    {
      id: "wl-2",
      title: "Balanced Deficit",
      description: "Moderate carbs with balanced macronutrients for sustainable weight loss",
      category: "weight_loss",
      calories: 1900,
      image_url: 'https://placehold.co/600x400/png?text=Balanced+Deficit&font=playfair',
      proteinPercentage: "30%",
      carbsPercentage: "40%", 
      fatsPercentage: "30%",
      meals: JSON.stringify([
        { name: "Breakfast", description: "Overnight oats with protein powder and berries" },
        { name: "Snack", description: "Apple with almond butter" },
        { name: "Lunch", description: "Turkey and quinoa bowl with vegetables" },
        { name: "Snack", description: "Cottage cheese with cucumber slices" },
        { name: "Dinner", description: "Lean beef stir fry with brown rice" },
      ])
    }
  ],
  muscle_gain: [
    {
      id: "mg-1",
      title: "High Protein Surplus",
      description: "Calorie surplus with emphasis on protein for muscle building",
      category: "muscle_gain",
      calories: 3000,
      image_url: 'https://placehold.co/600x400/png?text=High+Protein+Surplus&font=playfair',
      proteinPercentage: "35%",
      carbsPercentage: "45%", 
      fatsPercentage: "20%",
      meals: JSON.stringify([
        { name: "Breakfast", description: "Protein pancakes with banana and honey" },
        { name: "Snack", description: "Protein shake with oats and peanut butter" },
        { name: "Lunch", description: "Chicken, sweet potato, and broccoli" },
        { name: "Snack", description: "Tuna wrap with whole grain tortilla" },
        { name: "Dinner", description: "Steak with quinoa and roasted vegetables" }
      ])
    }
  ],
  maintenance: [
    {
      id: "mt-1",
      title: "Balanced Nutrition",
      description: "Well-rounded nutrition plan for maintaining current physique",
      category: "maintenance",
      calories: 2200,
      image_url: 'https://placehold.co/600x400/png?text=Balanced+Nutrition&font=playfair',
      proteinPercentage: "25%",
      carbsPercentage: "50%", 
      fatsPercentage: "25%",
      meals: JSON.stringify([
        { name: "Breakfast", description: "Whole grain toast with eggs and avocado" },
        { name: "Snack", description: "Fruit and nut mix" },
        { name: "Lunch", description: "Mediterranean bowl with falafel and hummus" },
        { name: "Snack", description: "Greek yogurt with honey" },
        { name: "Dinner", description: "Grilled fish with quinoa and vegetables" }
      ])
    }
  ],
  vegetarian: [
    {
      id: "vg-1",
      title: "High Protein Vegetarian",
      description: "Plant-based proteins for muscle maintenance and recovery",
      category: "vegetarian",
      calories: 2000,
      image_url: 'https://placehold.co/600x400/png?text=High+Protein+Vegetarian&font=playfair',
      proteinPercentage: "25%",
      carbsPercentage: "50%", 
      fatsPercentage: "25%",
      meals: JSON.stringify([
        { name: "Breakfast", description: "Tofu scramble with vegetables and whole grain toast" },
        { name: "Snack", description: "Protein smoothie with plant-based protein" },
        { name: "Lunch", description: "Lentil soup with quinoa salad" },
        { name: "Snack", description: "Edamame with sea salt" },
        { name: "Dinner", description: "Tempeh stir fry with brown rice and vegetables" }
      ])
    }
  ]
};

// Helper function to parse JSON safely
const safeJsonParse = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('Error parsing JSON:', e);
    return [];
  }
};

// Helper function to prepare meal plan data for display
const prepareMealPlanForDisplay = (plan) => {
  // If the plan doesn't have these values, add default ones
  const processed = {
    ...plan,
    proteinPercentage: plan.protein ? `${plan.protein}%` : "30%",
    carbsPercentage: plan.carbs ? `${plan.carbs}%` : "40%",
    fatsPercentage: plan.fat ? `${plan.fat}%` : "30%",
  };
  
  // Parse meals if it's a string, ensure it's an array
  if (typeof plan.meals === 'string') {
    processed.meals = safeJsonParse(plan.meals);
  } else if (Array.isArray(plan.meals)) {
    processed.meals = plan.meals;
  } else {
    // Default empty array if meals is not present or invalid
    processed.meals = [];
  }
  
  return processed;
};

export default function MealPlans() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [mealPlans, setMealPlans] = useState({
    weight_loss: [],
    muscle_gain: [],
    maintenance: [],
    vegetarian: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        setLoading(true)
        
        // Try to fetch from Supabase
        try {
          const allMealPlans = await getMealPlans();
          
          // If any data is returned, process and organize by category
          if (allMealPlans && allMealPlans.length > 0) {
            const categorizedPlans = {
              weight_loss: [],
              muscle_gain: [],
              maintenance: [],
              vegetarian: []
            };
            
            // Group meal plans by category
            allMealPlans.forEach(plan => {
              const category = plan.category || 'weight_loss';
              if (categorizedPlans[category]) {
                categorizedPlans[category].push(prepareMealPlanForDisplay(plan));
              }
            });
            
            setMealPlans(categorizedPlans);
            setUsingFallback(false);
          } else {
            // No data from Supabase, use fallback
            setMealPlans(fallbackMealPlans)
            setUsingFallback(true)
            console.log("Using fallback meal plans data (no Supabase data found)")
          }
        } catch (supabaseError) {
          // Supabase error, use fallback
          console.error("Supabase error:", supabaseError)
          setMealPlans(fallbackMealPlans)
          setUsingFallback(true)
          console.log("Using fallback meal plans data (Supabase error)")
        }
        
        setError(null)
      } catch (err) {
        console.error("Error in meal plans component:", err)
        setError("Failed to load meal plans. Using default data.")
        setMealPlans(fallbackMealPlans)
        setUsingFallback(true)
      } finally {
        setLoading(false)
      }
    }
    
    fetchMealPlans()
  }, [])

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Nutrition Plans</h3>
          <p className="text-muted-foreground">Loading meal plans...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Nutrition Plans</h3>
        <p className="text-muted-foreground">
          Fuel your fitness journey with our customized meal plans designed to support your specific goals.
          {usingFallback && <span className="block text-xs mt-2 text-amber-500">(Using demo data)</span>}
        </p>
      </div>

      <Tabs defaultValue="weight_loss">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="weight_loss">Weight Loss</TabsTrigger>
          <TabsTrigger value="muscle_gain">Muscle Gain</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="vegetarian">Vegetarian</TabsTrigger>
        </TabsList>

        {Object.entries(mealPlans).map(([category, plans]) => (
          <TabsContent key={category} value={category} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {plans.length === 0 ? (
                <p>No meal plans available for this category.</p>
              ) : (
                plans.map((plan) => (
                  <Card key={plan.id} className="overflow-hidden">
                    <div className="relative h-48 w-full">
                      <Image 
                        src={plan.image_url} 
                        alt={plan.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{plan.title}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium">Daily Calories</p>
                          <p className="text-muted-foreground">{plan.calories} kcal</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Macros</p>
                          <p className="text-muted-foreground">
                            P: {plan.proteinPercentage} | C: {plan.carbsPercentage} | F: {plan.fatsPercentage}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Sample Meals</p>
                        <ul className="space-y-2">
                          {Array.isArray(plan.meals) && plan.meals.length > 0 ? (
                            plan.meals.map((meal, index) => (
                              <li key={index} className="text-sm">
                                <span className="font-medium">{meal.name}:</span> {meal.description}
                              </li>
                            ))
                          ) : (
                            <li className="text-sm">No meals available for this plan.</li>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => setSelectedPlan(plan)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Full Plan
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>

            <div className="bg-muted p-6 rounded-lg">
              <h4 className="font-medium text-lg mb-2">Nutrition Tips</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Stay hydrated by drinking at least 8 glasses of water daily</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Eat protein with every meal to support muscle recovery</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Include a variety of colorful vegetables for essential micronutrients</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Time your carbohydrates around your workouts for optimal energy</span>
                </li>
              </ul>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

