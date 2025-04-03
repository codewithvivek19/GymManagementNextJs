"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { PlusCircle, Trash2, BarChart3, Calendar, ClipboardList } from "lucide-react"
import Image from "next/image"

// Exercise categories with images
const exerciseCategories = [
  { value: "strength", label: "Strength Training", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3" },
  { value: "cardio", label: "Cardio", image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3" },
  { value: "flexibility", label: "Flexibility", image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3" },
  { value: "balance", label: "Balance & Stability", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3" },
]

const exerciseOptions = {
  strength: [
    { value: "bench-press", label: "Bench Press" },
    { value: "squat", label: "Squat" },
    { value: "deadlift", label: "Deadlift" },
    { value: "shoulder-press", label: "Shoulder Press" },
    { value: "pull-up", label: "Pull-up" },
  ],
  cardio: [
    { value: "running", label: "Running" },
    { value: "cycling", label: "Cycling" },
    { value: "rowing", label: "Rowing" },
    { value: "swimming", label: "Swimming" },
    { value: "jump-rope", label: "Jump Rope" },
  ],
  flexibility: [
    { value: "yoga", label: "Yoga" },
    { value: "static-stretching", label: "Static Stretching" },
    { value: "dynamic-stretching", label: "Dynamic Stretching" },
    { value: "foam-rolling", label: "Foam Rolling" },
  ],
  balance: [
    { value: "single-leg-stand", label: "Single Leg Stand" },
    { value: "bosu-ball", label: "Bosu Ball Exercises" },
    { value: "stability-ball", label: "Stability Ball Exercises" },
    { value: "balance-board", label: "Balance Board" },
  ],
}

// Sample workout history
const sampleWorkoutHistory = [
  {
    id: 1,
    date: "2023-03-28",
    exercises: [
      { name: "Bench Press", category: "strength", sets: 4, reps: 8, weight: 185 },
      { name: "Squat", category: "strength", sets: 3, reps: 10, weight: 225 },
      { name: "Pull-up", category: "strength", sets: 3, reps: 8, weight: 0 },
    ],
  },
  {
    id: 2,
    date: "2023-03-26",
    exercises: [
      { name: "Running", category: "cardio", duration: 30, distance: 5, unit: "km" },
      { name: "Yoga", category: "flexibility", duration: 20 },
    ],
  },
  {
    id: 3,
    date: "2023-03-24",
    exercises: [
      { name: "Deadlift", category: "strength", sets: 3, reps: 5, weight: 275 },
      { name: "Shoulder Press", category: "strength", sets: 3, reps: 8, weight: 135 },
      { name: "Cycling", category: "cardio", duration: 45, distance: 15, unit: "km" },
    ],
  },
]

export default function ExerciseTracker() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedExercise, setSelectedExercise] = useState("")
  const [sets, setSets] = useState("")
  const [reps, setReps] = useState("")
  const [weight, setWeight] = useState("")
  const [duration, setDuration] = useState("")
  const [distance, setDistance] = useState("")
  const [unit, setUnit] = useState("km")
  const [workoutHistory, setWorkoutHistory] = useState(sampleWorkoutHistory)
  const { toast } = useToast()

  const handleCategoryChange = (value) => {
    setSelectedCategory(value)
    setSelectedExercise("")
  }

  const handleAddExercise = () => {
    // Validate input based on category
    if (!selectedCategory || !selectedExercise) {
      toast({
        title: "Missing information",
        description: "Please select both category and exercise",
        variant: "destructive",
      })
      return
    }

    const exerciseName = exerciseOptions[selectedCategory].find((ex) => ex.value === selectedExercise)?.label

    const today = new Date().toISOString().split("T")[0]
    const existingWorkoutIndex = workoutHistory.findIndex((w) => w.date === today)

    let newExercise = {}

    if (selectedCategory === "strength") {
      if (!sets || !reps) {
        toast({
          title: "Missing information",
          description: "Please enter sets and reps for strength exercises",
          variant: "destructive",
        })
        return
      }
      newExercise = {
        name: exerciseName,
        category: selectedCategory,
        sets: Number.parseInt(sets),
        reps: Number.parseInt(reps),
        weight: weight ? Number.parseInt(weight) : 0,
      }
    } else if (selectedCategory === "cardio") {
      if (!duration) {
        toast({
          title: "Missing information",
          description: "Please enter duration for cardio exercises",
          variant: "destructive",
        })
        return
      }
      newExercise = {
        name: exerciseName,
        category: selectedCategory,
        duration: Number.parseInt(duration),
        distance: distance ? Number.parseInt(distance) : 0,
        unit: unit,
      }
    } else {
      if (!duration) {
        toast({
          title: "Missing information",
          description: "Please enter duration for this exercise",
          variant: "destructive",
        })
        return
      }
      newExercise = {
        name: exerciseName,
        category: selectedCategory,
        duration: Number.parseInt(duration),
      }
    }

    if (existingWorkoutIndex >= 0) {
      // Add to existing workout
      const updatedHistory = [...workoutHistory]
      updatedHistory[existingWorkoutIndex].exercises.push(newExercise)
      setWorkoutHistory(updatedHistory)
    } else {
      // Create new workout
      const newWorkout = {
        id: Date.now(),
        date: today,
        exercises: [newExercise],
      }
      setWorkoutHistory([newWorkout, ...workoutHistory])
    }

    // Reset form
    setSelectedExercise("")
    setSets("")
    setReps("")
    setWeight("")
    setDuration("")
    setDistance("")
    setUnit("km")

    toast({
      title: "Exercise added",
      description: `${exerciseName} has been added to your workout`,
    })
  }

  const handleDeleteWorkout = (workoutId) => {
    setWorkoutHistory(workoutHistory.filter((workout) => workout.id !== workoutId))
    toast({
      title: "Workout deleted",
      description: "The workout has been removed from your history",
    })
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Exercise Tracker</h3>
        <p className="text-muted-foreground">
          Log your workouts, track your progress, and get recommendations for complementary exercises.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {exerciseCategories.map((category) => (
          <Card 
            key={category.value} 
            className={`cursor-pointer transition-all ${selectedCategory === category.value ? 'ring-2 ring-primary' : ''}`}
            onClick={() => handleCategoryChange(category.value)}
          >
            <div className="relative h-36 w-full overflow-hidden rounded-t-lg">
              <Image 
                src={category.image} 
                alt={category.label} 
                fill 
                className="object-cover"
              />
            </div>
            <CardHeader className="p-3 text-center">
              <CardTitle className="text-sm font-medium">{category.label}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="log">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="log">
            <ClipboardList className="h-4 w-4 mr-2" />
            Log Workout
          </TabsTrigger>
          <TabsTrigger value="history">
            <Calendar className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
          <TabsTrigger value="stats">
            <BarChart3 className="h-4 w-4 mr-2" />
            Stats
          </TabsTrigger>
        </TabsList>

        <TabsContent value="log">
          <Card>
            <CardHeader>
              <CardTitle>Log Your Exercise</CardTitle>
              <CardDescription>Record your workout details to track your progress over time.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Exercise Category</Label>
                  <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {exerciseCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exercise">Exercise</Label>
                  <Select value={selectedExercise} onValueChange={setSelectedExercise} disabled={!selectedCategory}>
                    <SelectTrigger id="exercise">
                      <SelectValue placeholder="Select exercise" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCategory &&
                        exerciseOptions[selectedCategory].map((exercise) => (
                          <SelectItem key={exercise.value} value={exercise.value}>
                            {exercise.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedCategory === "strength" && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sets">Sets</Label>
                    <Input id="sets" type="number" min="1" value={sets} onChange={(e) => setSets(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reps">Reps</Label>
                    <Input id="reps" type="number" min="1" value={reps} onChange={(e) => setReps(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (lbs)</Label>
                    <Input
                      id="weight"
                      type="number"
                      min="0"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {selectedCategory === "cardio" && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (min)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="distance">Distance (optional)</Label>
                    <Input
                      id="distance"
                      type="number"
                      min="0"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select value={unit} onValueChange={setUnit}>
                      <SelectTrigger id="unit">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="km">Kilometers</SelectItem>
                        <SelectItem value="mi">Miles</SelectItem>
                        <SelectItem value="m">Meters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {(selectedCategory === "flexibility" || selectedCategory === "balance") && (
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (min)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddExercise} disabled={!selectedExercise}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Exercise
              </Button>
            </CardFooter>
          </Card>

          {workoutHistory.length > 0 && workoutHistory[0].date === new Date().toISOString().split("T")[0] && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Today's Workout</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {workoutHistory[0].exercises.map((exercise, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{exercise.name}</span>
                        {exercise.category === "strength" && (
                          <span className="text-muted-foreground">
                            {" "}
                            - {exercise.sets} sets × {exercise.reps} reps
                            {exercise.weight > 0 ? ` @ ${exercise.weight} lbs` : ""}
                          </span>
                        )}
                        {exercise.category === "cardio" && (
                          <span className="text-muted-foreground">
                            {" "}
                            - {exercise.duration} min
                            {exercise.distance > 0 ? ` | ${exercise.distance} ${exercise.unit}` : ""}
                          </span>
                        )}
                        {(exercise.category === "flexibility" || exercise.category === "balance") && (
                          <span className="text-muted-foreground"> - {exercise.duration} min</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-6">
            {workoutHistory.map((workout) => (
              <Card key={workout.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg">
                    {new Date(workout.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteWorkout(workout.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {workout.exercises.map((exercise, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">{exercise.name}</span>
                          {exercise.category === "strength" && (
                            <span className="text-muted-foreground">
                              {" "}
                              - {exercise.sets} sets × {exercise.reps} reps
                              {exercise.weight > 0 ? ` @ ${exercise.weight} lbs` : ""}
                            </span>
                          )}
                          {exercise.category === "cardio" && (
                            <span className="text-muted-foreground">
                              {" "}
                              - {exercise.duration} min
                              {exercise.distance > 0 ? ` | ${exercise.distance} ${exercise.unit}` : ""}
                            </span>
                          )}
                          {(exercise.category === "flexibility" || exercise.category === "balance") && (
                            <span className="text-muted-foreground"> - {exercise.duration} min</span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Workout Statistics</CardTitle>
              <CardDescription>View your progress and workout patterns over time.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Workout statistics visualization would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

