"use client"

import { useState, useEffect } from "react"
import { getMealPlans } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { PieChart, BarChart3, LucideIcon } from "lucide-react"
import Image from "next/image"

// Fallback data in case API fails
const fallbackMealPlans = [
  {
    id: "mp1",
    title: "Weight Loss Meal Plan",
    description: "A calorie-deficit meal plan designed to promote healthy weight loss with Indian cuisine options.",
    category: "weight_loss",
    calories: "1800",
    image_url: "https://placehold.co/600x400/jpeg?text=Weight+Loss+Meal+Plan",
    proteinPercentage: "40%", 
    carbsPercentage: "20%", 
    fatsPercentage: "40%",
    meals: JSON.stringify([
      {
        name: 'Breakfast',
        time: '8:00 AM',
        description: 'Vegetable oats upma with sprouts and a small cup of chai (no sugar)',
        calories: 300
      },
      {
        name: 'Lunch',
        time: '12:30 PM',
        description: 'Roti with paneer bhurji and cucumber raita',
        calories: 450
      },
      {
        name: 'Snack',
        time: '3:30 PM',
        description: 'Roasted chana with a small apple',
        calories: 200
      },
      {
        name: 'Dinner',
        time: '7:00 PM',
        description: 'Grilled fish or tofu curry with steamed brown rice',
        calories: 550
      },
      {
        name: 'Evening Snack',
        time: '9:00 PM',
        description: 'Herbal tea with 2-3 almonds',
        calories: 100
      }
    ])
  },
  {
    id: "mp2",
    title: "Muscle Gain Meal Plan",
    description: "A protein-rich meal plan designed to support muscle growth and recovery.",
    category: "muscle_gain",
    calories: "3000",
    image_url: "https://placehold.co/600x400/jpeg?text=Muscle+Gain+Meal+Plan",
    proteinPercentage: "35%", 
    carbsPercentage: "45%", 
    fatsPercentage: "20%",
    meals: JSON.stringify([
      {
        name: 'Breakfast',
        time: '7:00 AM',
        description: 'Protein oatmeal with banana and peanut butter',
        calories: 500
      },
      {
        name: 'Mid-Morning Snack',
        time: '10:00 AM',
        description: 'Protein shake with a serving of almonds',
        calories: 350
      },
      {
        name: 'Lunch',
        time: '1:00 PM',
        description: 'Grilled steak with brown rice and vegetables',
        calories: 700
      }
    ])
  },
  {
    id: "mp3",
    title: "Vegetarian Meal Plan",
    description: "A plant-based meal plan rich in nutrients and protein alternatives.",
    category: "vegetarian",
    calories: "2000",
    image_url: "https://placehold.co/600x400/jpeg?text=Vegetarian+Meal+Plan",
    proteinPercentage: "25%", 
    carbsPercentage: "50%", 
    fatsPercentage: "25%",
    meals: JSON.stringify([
      {
        name: 'Breakfast',
        time: '8:00 AM',
        description: 'Vegetable omelette with whole grain toast',
        calories: 350
      },
      {
        name: 'Lunch',
        time: '12:30 PM',
        description: 'Lentil soup with a side salad',
        calories: 450
      },
      {
        name: 'Snack',
        time: '3:30 PM',
        description: 'Hummus with carrot and cucumber sticks',
        calories: 200
      }
    ])
  },
  {
    id: "mp4",
    title: "Maintenance Meal Plan",
    description: "A balanced meal plan designed to maintain current weight and support overall health.",
    category: "maintenance",
    calories: "2200",
    image_url: "https://placehold.co/600x400/jpeg?text=Maintenance+Meal+Plan",
    proteinPercentage: "25%", 
    carbsPercentage: "50%", 
    fatsPercentage: "25%",
    meals: JSON.stringify([
      {
        name: 'Breakfast',
        time: '7:30 AM',
        description: 'Whole grain toast with avocado and eggs',
        calories: 400
      },
      {
        name: 'Lunch',
        time: '12:00 PM',
        description: 'Turkey wrap with vegetables and hummus',
        calories: 550
      },
      {
        name: 'Snack',
        time: '3:00 PM',
        description: 'Greek yogurt with mixed berries',
        calories: 200
      }
    ])
  }
]

// Types
interface Meal {
  name: string;
  time: string;
  description: string;
  calories: number;
}

interface MealPlan {
  id: string;
  title: string;
  description: string;
  category: string;
  calories: number | string;
  image_url: string;
  protein?: number;
  carbs?: number;
  fat?: number;
  meals: string | Meal[];
}

// Categories
const categories = ["weight_loss", "muscle_gain", "maintenance", "vegetarian"]
const categoryLabels = {
  "weight_loss": "Weight Loss",
  "muscle_gain": "Muscle Gain",
  "maintenance": "Maintenance",
  "vegetarian": "Vegetarian"
}

export default function MealPlansPage() {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("weight_loss")

  useEffect(() => {
    async function fetchMealPlans() {
      try {
        setLoading(true)
        const data = await getMealPlans()
        
        if (data && data.length > 0) {
          // Process the data from the database
          const processedData = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description || "",
            category: item.category || "weight_loss",
            calories: item.calories || 2000,
            image_url: item.image_url || `https://placehold.co/600x400/jpeg?text=${encodeURIComponent(item.title)}`,
            proteinPercentage: item.protein ? `${item.protein}%` : "30%",
            carbsPercentage: item.carbs ? `${item.carbs}%` : "40%",
            fatsPercentage: item.fat ? `${item.fat}%` : "30%",
            meals: item.meals || "[]"
          }));
          
          setMealPlans(processedData)
        } else {
          // Fallback to hardcoded data if API returns empty result
          setMealPlans(fallbackMealPlans)
          console.warn('No meal plans found in database, using fallback data')
        }
      } catch (err) {
        console.error('Error fetching meal plans:', err)
        setError('Failed to load meal plans')
        setMealPlans(fallbackMealPlans)
      } finally {
        setLoading(false)
      }
    }
    
    fetchMealPlans()
  }, [])

  // Filter meal plans by category
  const getMealPlansByCategory = (category: string) => {
    return mealPlans.filter(plan => plan.category === category)
  }

  // Parse meals from string to array
  const getMeals = (meals: string | Meal[]): Meal[] => {
    if (typeof meals === 'string') {
      try {
        return JSON.parse(meals)
      } catch (e) {
        console.error('Error parsing meals:', e)
        return []
      }
    }
    return meals
  }

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Meal Plans</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover nutritious meal plans designed to help you reach your fitness goals.
          </p>
        </div>
        
        <div className="mb-8">
          <Skeleton className="h-10 w-full max-w-md mx-auto rounded-lg" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-video relative">
                <Skeleton className="h-full w-full absolute" />
              </div>
              <CardHeader>
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Oops!</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          {error}. Please try again later.
        </p>
        <Button onClick={() => window.location.reload()}>Refresh Page</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Meal Plans</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover nutritious meal plans designed to help you reach your fitness goals.
        </p>
      </div>

      <Tabs defaultValue={activeCategory} className="mb-12" onValueChange={setActiveCategory}>
        <TabsList className="grid grid-cols-4 mb-8">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="text-center">
              {categoryLabels[category]}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map((category) => {
          const plans = getMealPlansByCategory(category)
          
          return (
            <TabsContent key={category} value={category}>
              {plans.length === 0 ? (
                <Card>
                  <CardContent className="py-10 text-center">
                    <p className="text-muted-foreground">No meal plans found for {categoryLabels[category]}.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  {plans.map((plan) => {
                    const meals = getMeals(plan.meals)
                    
                    return (
                      <Card key={plan.id} className="overflow-hidden">
                        <div className="aspect-video relative">
                          <Image
                            src={plan.image_url || "https://placehold.co/600x400/jpeg?text=Meal+Plan"}
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
                          <div className="grid grid-cols-3 gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg text-center">
                              <p className="text-xs text-muted-foreground mb-1">Protein</p>
                              <p className="font-bold text-primary">{plan.proteinPercentage}</p>
                            </div>
                            <div className="bg-primary/10 p-3 rounded-lg text-center">
                              <p className="text-xs text-muted-foreground mb-1">Carbs</p>
                              <p className="font-bold text-primary">{plan.carbsPercentage}</p>
                            </div>
                            <div className="bg-primary/10 p-3 rounded-lg text-center">
                              <p className="text-xs text-muted-foreground mb-1">Fats</p>
                              <p className="font-bold text-primary">{plan.fatsPercentage}</p>
                            </div>
                          </div>
                          
                          <div>
                            <Badge variant="outline" className="mb-2">
                              <BarChart3 className="h-3 w-3 mr-1" />
                              {plan.calories} calories
                            </Badge>
                            
                            <h4 className="font-medium text-sm mb-2">Sample Meals:</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {meals.slice(0, 3).map((meal, index) => (
                                <li key={index}>
                                  <span className="font-medium">{meal.name}:</span> {meal.description}
                                </li>
                              ))}
                              {meals.length > 3 && (
                                <li className="italic">+ {meals.length - 3} more meals</li>
                              )}
                            </ul>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">View Full Plan</Button>
                        </CardFooter>
                      </Card>
                    )
                  })}
                </div>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
} 