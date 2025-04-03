"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getSchedules, getTrainers } from "@/lib/supabase"
import { CalendarClock, Clock, Users } from "lucide-react"

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const gymHours = {
  Monday: "06:00 - 22:00",
  Tuesday: "06:00 - 22:00",
  Wednesday: "06:00 - 22:00",
  Thursday: "06:00 - 22:00",
  Friday: "06:00 - 22:00",
  Saturday: "07:00 - 20:00",
  Sunday: "08:00 - 18:00",
}

// Define class categories with colors
const classCategories = {
  "Yoga": { color: "bg-green-100 border-green-300 text-green-800" },
  "Pilates": { color: "bg-blue-100 border-blue-300 text-blue-800" },
  "HIIT": { color: "bg-red-100 border-red-300 text-red-800" },
  "Spin": { color: "bg-yellow-100 border-yellow-300 text-yellow-800" },
  "Zumba": { color: "bg-purple-100 border-purple-300 text-purple-800" },
  "Boxing": { color: "bg-orange-100 border-orange-300 text-orange-800" },
  "Strength": { color: "bg-gray-100 border-gray-300 text-gray-800" },
  "Cardio": { color: "bg-pink-100 border-pink-300 text-pink-800" },
}

// Helper function to determine class color
const getClassColor = (className) => {
  for (const [category, styles] of Object.entries(classCategories)) {
    if (className.includes(category)) {
      return styles.color;
    }
  }
  return "bg-slate-100 border-slate-300 text-slate-800"; // Default
}

export default function Timetable() {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [trainers, setTrainers] = useState({})

  useEffect(() => {
    const fetchSchedulesAndTrainers = async () => {
      try {
        setLoading(true)
        
        // Fetch trainers from API
        const trainersResponse = await fetch('/api/data?type=trainers');
        const trainersResult = await trainersResponse.json();
        
        let trainersData = [];
        if (trainersResult.data) {
          trainersData = trainersResult.data;
        } else {
          console.error("API returned error for trainers:", trainersResult.error);
          
          // Fallback to Supabase
          trainersData = await getTrainers();
        }
        
        const trainersMap = {};
        if (trainersData && trainersData.length > 0) {
          trainersData.forEach(trainer => {
            trainersMap[trainer.id] = trainer.name;
          });
          setTrainers(trainersMap);
        }
        
        // Fetch schedules from API
        const schedulesResponse = await fetch('/api/data?type=schedules');
        const schedulesResult = await schedulesResponse.json();
        
        let schedulesData = [];
        if (schedulesResult.data) {
          schedulesData = schedulesResult.data;
        } else {
          console.error("API returned error for schedules:", schedulesResult.error);
          
          // Fallback to Supabase
          schedulesData = await getSchedules();
        }
        
        if (schedulesData && schedulesData.length > 0) {
          // Group schedules by day
          const groupedSchedules = weekdays.map(day => {
            const daySchedules = schedulesData.filter(schedule => 
              schedule.day.toLowerCase() === day.toLowerCase()
            );
            
            // Map to the format expected by the component
            const formattedSchedules = daySchedules.map(schedule => {
              // If trainer is directly available from the API response
              let trainerName = '';
              if (schedule.trainer) {
                trainerName = schedule.trainer.name;
              } else if (schedule.trainer_id && trainersMap[schedule.trainer_id]) {
                trainerName = trainersMap[schedule.trainer_id];
              } else {
                trainerName = "Unknown Instructor";
              }
              
              return {
                time: `${schedule.time} - ${calculateEndTime(schedule.time, schedule.duration)}`,
                name: schedule.name,
                trainer: trainerName,
                level: schedule.level || "All Levels",
                duration: schedule.duration || 60,
              };
            });
            
            // Sort schedules by time
            formattedSchedules.sort((a, b) => {
              const timeA = a.time.split(' - ')[0];
              const timeB = b.time.split(' - ')[0];
              return timeA.localeCompare(timeB);
            });
            
            return {
              day,
              schedule: formattedSchedules
            };
          });
          
          setClasses(groupedSchedules);
        } else {
          // Create empty structure if no schedules
          const emptySchedules = weekdays.map(day => ({
            day,
            schedule: []
          }));
          setClasses(emptySchedules);
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching schedules:", err);
        setError("Failed to load class schedule. Please try again later.");
        
        // Create empty structure on error
        const emptySchedules = weekdays.map(day => ({
          day,
          schedule: []
        }));
        setClasses(emptySchedules);
      } finally {
        setLoading(false);
      }
    }
    
    fetchSchedulesAndTrainers();
  }, []);
  
  // Helper function to calculate end time based on start time and duration
  const calculateEndTime = (startTime, durationMinutes) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    let totalMinutes = hours * 60 + minutes + durationMinutes;
    
    const endHours = Math.floor(totalMinutes / 60) % 24;
    const endMinutes = totalMinutes % 60;
    
    return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Weekly Schedule</h3>
          <p className="text-muted-foreground">Loading schedule data...</p>
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-16 bg-muted rounded"></div>
                  ))}
                </div>
              </CardContent>
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
          <h3 className="text-2xl font-bold mb-2">Weekly Schedule</h3>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Weekly Schedule</h3>
        <p className="text-muted-foreground">View our class schedule and plan your workouts for the week.</p>
      </div>

      <Card>
        <CardHeader className="bg-slate-50 border-b">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <CardTitle>Gym Hours</CardTitle>
          </div>
          <CardDescription>Our facility operating hours</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
            {Object.entries(gymHours).map(([day, hours]) => (
              <div key={day} className="p-3 bg-slate-50 rounded-lg text-center border shadow-sm">
                <div className="font-medium mb-1">{day}</div>
                <div className={`text-sm ${day === "Sunday" ? "text-amber-600 font-medium" : "text-muted-foreground"}`}>
                  {hours}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {classes.map((daySchedule) => (
          <Card key={daySchedule.day} className="overflow-hidden">
            <CardHeader className={`bg-slate-50 border-b ${daySchedule.day === 'Sunday' ? 'bg-amber-50' : ''}`}>
              <div className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-primary" />
                <CardTitle>{daySchedule.day}</CardTitle>
              </div>
              {daySchedule.day === "Sunday" ? (
                <CardDescription>Limited classes on Sunday</CardDescription>
              ) : (
                <CardDescription>Class schedule for {daySchedule.day}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="pt-6">
              {daySchedule.schedule.length > 0 ? (
                <div className="space-y-4">
                  {daySchedule.schedule.map((classItem, index) => (
                    <div
                      key={index}
                      className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border ${getClassColor(classItem.name)}`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                        <div className="font-medium text-gray-700 bg-white px-3 py-1 rounded-full border shadow-sm flex items-center">
                          <Clock className="h-4 w-4 mr-1.5 text-primary" />
                          {classItem.time}
                        </div>
                        <div className="font-bold text-lg">{classItem.name}</div>
                      </div>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6 mt-3 md:mt-0">
                        <div className="flex items-center text-sm text-gray-700">
                          <Users className="h-4 w-4 mr-1.5 text-primary" />
                          {classItem.trainer}
                        </div>
                        <Badge variant="secondary" className="shadow-sm">
                          {classItem.level}
                        </Badge>
                        <Badge variant="outline" className="shadow-sm">
                          {classItem.duration} min
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">No classes scheduled for this day</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="bg-slate-50 border-b">
          <CardTitle>Class Categories</CardTitle>
          <CardDescription>Learn about our different class types</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(classCategories).map(([category, { color }]) => (
              <div key={category} className={`p-3 rounded-lg border ${color}`}>
                <div className="font-medium">{category}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

