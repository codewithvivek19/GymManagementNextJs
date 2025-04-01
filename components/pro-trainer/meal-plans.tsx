"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Image from "next/image"
import { getMealPlans } from "@/lib/supabase"

// Helper function to parse JSON safely
const safeJsonParse = (jsonString) => {
  if (!jsonString) return [];
  
  try {
    // Check if it's already an object (already parsed)
    if (typeof jsonString === 'object') return jsonString;
    
    // Otherwise try to parse it
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('Error parsing JSON:', e, jsonString);
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

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        setLoading(true)
        
        // Use the new API endpoint
        const response = await fetch('/api/data?type=meal-plans');
        const result = await response.json();
        
        if (result.data) {
          const allMealPlans = result.data;
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
        } else {
          console.error("API returned error:", result.error);
          
          // Fallback to Supabase directly
          console.log("Falling back to direct Supabase call");
          const allMealPlans = await getMealPlans();
          
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
          } else {
            setError("No meal plans found. Please try again later.");
          }
        }
      } catch (err) {
        console.error("Error in meal plans component:", err)
        setError("Failed to load meal plans. Please try again later.")
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
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="relative h-48 bg-muted animate-pulse"></div>
              <CardHeader>
                <div className="h-6 bg-muted animate-pulse rounded mb-2"></div>
                <div className="h-4 bg-muted animate-pulse rounded"></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-4 bg-muted animate-pulse rounded"></div>
                <div className="h-4 bg-muted animate-pulse rounded"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted animate-pulse rounded"></div>
                  <div className="h-4 bg-muted animate-pulse rounded"></div>
                  <div className="h-4 bg-muted animate-pulse rounded"></div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="h-10 bg-muted animate-pulse rounded w-full"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Nutrition Plans</h3>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    )
  }

  const hasAnyPlans = Object.values(mealPlans).some(category => category.length > 0);
  
  if (!hasAnyPlans) {
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Nutrition Plans</h3>
          <p className="text-muted-foreground">
            No meal plans available at the moment. Please check back later.
          </p>
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
                        src={plan.image_url || `https://placehold.co/600x400/png?text=${encodeURIComponent(plan.title)}`} 
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

