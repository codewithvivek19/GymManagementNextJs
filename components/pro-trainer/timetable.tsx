"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getSchedules, getTrainers } from "@/lib/supabase"

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const gymHours = {
  Monday: "05:00 - 23:00",
  Tuesday: "05:00 - 23:00",
  Wednesday: "05:00 - 23:00",
  Thursday: "05:00 - 23:00",
  Friday: "05:00 - 23:00",
  Saturday: "07:00 - 21:00",
  Sunday: "Closed",
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
              };
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
        <CardHeader>
          <CardTitle>Gym Hours</CardTitle>
          <CardDescription>Our facility operating hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(gymHours).map(([day, hours]) => (
              <div key={day} className="p-3 bg-muted rounded-lg text-center">
                <div className="font-medium">{day}</div>
                <div className={`text-sm ${hours === "Closed" ? "text-red-500" : "text-muted-foreground"}`}>
                  {hours}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {classes.map((daySchedule) => (
          <Card key={daySchedule.day}>
            <CardHeader>
              <CardTitle>{daySchedule.day}</CardTitle>
              {daySchedule.day === "Sunday" ? (
                <CardDescription>Gym closed on Sundays</CardDescription>
              ) : (
                <CardDescription>Class schedule for {daySchedule.day}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {daySchedule.schedule.length > 0 ? (
                <div className="space-y-4">
                  {daySchedule.schedule.map((classItem, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <div className="font-medium min-w-[140px]">{classItem.time}</div>
                        <div className="font-bold">{classItem.name}</div>
                      </div>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 mt-2 md:mt-0">
                        <div className="text-sm text-muted-foreground">Instructor: {classItem.trainer}</div>
                        <Badge variant="outline">{classItem.level}</Badge>
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
        <CardHeader>
          <CardTitle>Class Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Class Levels</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <div>
                    <span className="font-medium">Beginner:</span>{" "}
                    <span className="text-muted-foreground">
                      Suitable for those new to fitness or the specific exercise type. Focuses on proper form and
                      technique.
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <div>
                    <span className="font-medium">Intermediate:</span>{" "}
                    <span className="text-muted-foreground">
                      For those with some experience. Increases intensity and introduces more complex movements.
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <div>
                    <span className="font-medium">Advanced:</span>{" "}
                    <span className="text-muted-foreground">
                      Challenging classes for experienced individuals. High intensity with complex movements.
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <div>
                    <span className="font-medium">All Levels:</span>{" "}
                    <span className="text-muted-foreground">
                      Suitable for everyone with modifications provided for different fitness levels.
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Class Policies</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span className="text-muted-foreground">Please arrive 5-10 minutes before class starts</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span className="text-muted-foreground">Reservations can be made up to 24 hours in advance</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span className="text-muted-foreground">
                    Please cancel at least 2 hours before class if you cannot attend
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span className="text-muted-foreground">Bring a water bottle and towel to all classes</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

