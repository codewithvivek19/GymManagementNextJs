"use client"

import { useState, useEffect } from "react"
import { getSchedules } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, MapPin, User } from "lucide-react"

// Fallback data in case API fails
const fallbackSchedule = [
  {
    id: "s1",
    class_name: "Yoga Flow",
    day: "Monday",
    time: "8:00 AM - 9:00 AM",
    trainer: "Rahul Verma",
    description: "A gentle flow yoga class suitable for all levels.",
    location: "Studio 1"
  },
  {
    id: "s2",
    class_name: "HIIT Workout",
    day: "Monday",
    time: "6:00 PM - 7:00 PM",
    trainer: "Arjun Sharma",
    description: "High-intensity interval training to maximize calorie burn.",
    location: "Main Floor"
  },
  {
    id: "s3",
    class_name: "Strength Training",
    day: "Tuesday",
    time: "10:00 AM - 11:00 AM",
    trainer: "Arjun Sharma",
    description: "Focus on building strength and muscle mass with compound exercises.",
    location: "Weight Room"
  },
  {
    id: "s4",
    class_name: "Spin Class",
    day: "Tuesday",
    time: "5:30 PM - 6:30 PM",
    trainer: "Arjun Sharma",
    description: "High-energy indoor cycling class to improve cardiovascular fitness.",
    location: "Spin Studio"
  },
  {
    id: "s5",
    class_name: "Pilates",
    day: "Wednesday",
    time: "9:00 AM - 10:00 AM",
    trainer: "Priya Patel",
    description: "Core-focused exercises to improve strength, flexibility, and posture.",
    location: "Studio 2"
  },
  {
    id: "s6",
    class_name: "Bodybuilding",
    day: "Wednesday",
    time: "7:00 PM - 8:00 PM",
    trainer: "Arjun Sharma",
    description: "Advanced muscle-building techniques for experienced lifters.",
    location: "Weight Room"
  },
  {
    id: "s7",
    class_name: "Weekend Warrior",
    day: "Saturday",
    time: "10:00 AM - 11:30 AM",
    trainer: "Arjun Sharma",
    description: "A challenging full-body workout to kickstart your weekend.",
    location: "Main Floor"
  },
  {
    id: "s8",
    class_name: "Recovery Yoga",
    day: "Sunday",
    time: "9:00 AM - 10:00 AM",
    trainer: "Priya Patel",
    description: "Gentle stretching and relaxation to recover from the week's workouts.",
    location: "Studio 1"
  }
]

// Types
interface ClassSchedule {
  id: string;
  name: string;  // This will be used as class_name
  day: string;
  time: string;
  description: string;
  location: string;
  trainer_id?: string;
  trainer?: {
    name: string;
  };
  duration?: number;
}

// Days of the week
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<ClassSchedule[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [activeDay, setActiveDay] = useState<string>("Monday")

  useEffect(() => {
    async function fetchSchedule() {
      try {
        setLoading(true)
        const data = await getSchedules()
        
        if (data && data.length > 0) {
          // Map data to the expected format for the component
          const formattedSchedule = data.map((item: any) => ({
            id: item.id,
            class_name: item.name,  // Map name to class_name for display
            day: item.day,
            time: `${item.time} - ${getEndTime(item.time, item.duration || 60)}`,
            trainer: item.trainer?.name || "Staff Trainer",
            description: item.description || "",
            location: item.location || "Main Gym"
          }));
          
          setSchedule(formattedSchedule)
        } else {
          // Fallback to hardcoded data if API returns empty result
          setSchedule(fallbackSchedule)
          console.warn('No schedule found in database, using fallback data')
        }
      } catch (err) {
        console.error('Error fetching schedule:', err)
        setError('Failed to load class schedule')
        setSchedule(fallbackSchedule)
      } finally {
        setLoading(false)
      }
    }
    
    fetchSchedule()
  }, [])

  // Helper function to calculate end time based on start time and duration
  const getEndTime = (startTime: string, durationMinutes: number) => {
    try {
      const [hoursStr, minutesStr] = startTime.split(':');
      const hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);
      
      let date = new Date();
      date.setHours(hours, minutes, 0);
      date.setTime(date.getTime() + durationMinutes * 60000);
      
      const endHours = date.getHours();
      const endMinutes = date.getMinutes();
      
      return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
    } catch (e) {
      console.error('Error parsing time:', e);
      return startTime;
    }
  };

  // Filter classes by day
  const getClassesByDay = (day: string) => {
    return schedule.filter(cls => cls.day === day)
  }

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Class Schedule</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect class to fit your schedule and fitness goals.
          </p>
        </div>
        
        <div className="mb-8">
          <Skeleton className="h-10 w-full max-w-md mx-auto rounded-lg" />
        </div>
        
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
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
        <h1 className="text-4xl font-bold tracking-tight mb-4">Class Schedule</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find the perfect class to fit your schedule and fitness goals.
        </p>
      </div>

      <Tabs defaultValue={activeDay} className="mb-12" onValueChange={setActiveDay}>
        <TabsList className="grid grid-cols-7 mb-8">
          {days.map((day) => (
            <TabsTrigger key={day} value={day} className="text-center">
              {day}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {days.map((day) => {
          const classes = getClassesByDay(day)
          
          return (
            <TabsContent key={day} value={day}>
              {classes.length === 0 ? (
                <Card>
                  <CardContent className="py-10 text-center">
                    <p className="text-muted-foreground">No classes scheduled for {day}.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {classes.map((cls) => (
                    <Card key={cls.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{cls.class_name}</CardTitle>
                            <CardDescription>{cls.description}</CardDescription>
                          </div>
                          <Button variant="secondary" size="sm">
                            Book Class
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{cls.time}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <User className="h-4 w-4 mr-2" />
                            <span>Instructor: {cls.trainer}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{cls.location}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
} 