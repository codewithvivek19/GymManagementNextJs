"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TrainerSection from "@/components/pro-trainer/trainer-section"
import MealPlans from "@/components/pro-trainer/meal-plans"
import ExerciseTracker from "@/components/pro-trainer/exercise-tracker"
import BmiCalculator from "@/components/pro-trainer/bmi-calculator"
import Timetable from "@/components/pro-trainer/timetable"

export default function ProTrainerPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Pro Trainer Zone</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Access exclusive features to enhance your fitness journey with personalized guidance and tracking tools.
        </p>
      </div>

      <Tabs defaultValue="trainers" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="trainers">Expert Trainers</TabsTrigger>
          <TabsTrigger value="meal-plans">Meal Plans</TabsTrigger>
          <TabsTrigger value="exercise-tracker">Exercise Tracker</TabsTrigger>
          <TabsTrigger value="bmi-calculator">BMI Calculator</TabsTrigger>
          <TabsTrigger value="timetable">Timetable</TabsTrigger>
        </TabsList>

        <TabsContent value="trainers">
          <TrainerSection />
        </TabsContent>

        <TabsContent value="meal-plans">
          <MealPlans />
        </TabsContent>

        <TabsContent value="exercise-tracker">
          <ExerciseTracker />
        </TabsContent>

        <TabsContent value="bmi-calculator">
          <BmiCalculator />
        </TabsContent>

        <TabsContent value="timetable">
          <Timetable />
        </TabsContent>
      </Tabs>
    </div>
  )
}

