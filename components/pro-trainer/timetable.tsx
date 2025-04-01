import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const classes = [
  {
    day: "Monday",
    schedule: [
      { time: "06:00 - 07:00", name: "Morning HIIT", trainer: "John Smith", level: "All Levels" },
      { time: "09:00 - 10:00", name: "Yoga Flow", trainer: "Sarah Johnson", level: "Beginner" },
      { time: "12:00 - 13:00", name: "Strength Circuit", trainer: "Michael Johnson", level: "Intermediate" },
      { time: "17:30 - 18:30", name: "Spin Class", trainer: "David Williams", level: "All Levels" },
      { time: "19:00 - 20:00", name: "Boxing Fundamentals", trainer: "John Smith", level: "Beginner" },
    ],
  },
  {
    day: "Tuesday",
    schedule: [
      { time: "06:00 - 07:00", name: "Functional Training", trainer: "Michael Johnson", level: "Intermediate" },
      { time: "09:00 - 10:00", name: "Pilates", trainer: "Sarah Johnson", level: "All Levels" },
      { time: "12:00 - 13:00", name: "Express Core", trainer: "David Williams", level: "All Levels" },
      { time: "17:30 - 18:30", name: "Zumba", trainer: "Guest Instructor", level: "All Levels" },
      { time: "19:00 - 20:00", name: "Power Yoga", trainer: "Sarah Johnson", level: "Intermediate" },
    ],
  },
  {
    day: "Wednesday",
    schedule: [
      { time: "06:00 - 07:00", name: "Morning HIIT", trainer: "John Smith", level: "All Levels" },
      { time: "09:00 - 10:00", name: "Senior Fitness", trainer: "Sarah Johnson", level: "Beginner" },
      { time: "12:00 - 13:00", name: "Strength Circuit", trainer: "Michael Johnson", level: "Intermediate" },
      { time: "17:30 - 18:30", name: "Spin Class", trainer: "David Williams", level: "All Levels" },
      { time: "19:00 - 20:00", name: "Kickboxing", trainer: "John Smith", level: "Intermediate" },
    ],
  },
  {
    day: "Thursday",
    schedule: [
      { time: "06:00 - 07:00", name: "Functional Training", trainer: "Michael Johnson", level: "Intermediate" },
      { time: "09:00 - 10:00", name: "Yoga Flow", trainer: "Sarah Johnson", level: "Beginner" },
      { time: "12:00 - 13:00", name: "Express Core", trainer: "David Williams", level: "All Levels" },
      { time: "17:30 - 18:30", name: "HIIT", trainer: "John Smith", level: "Advanced" },
      { time: "19:00 - 20:00", name: "Meditation & Stretch", trainer: "Sarah Johnson", level: "All Levels" },
    ],
  },
  {
    day: "Friday",
    schedule: [
      { time: "06:00 - 07:00", name: "Morning HIIT", trainer: "John Smith", level: "All Levels" },
      { time: "09:00 - 10:00", name: "Pilates", trainer: "Sarah Johnson", level: "All Levels" },
      { time: "12:00 - 13:00", name: "Strength Circuit", trainer: "Michael Johnson", level: "Intermediate" },
      { time: "17:30 - 18:30", name: "Spin Class", trainer: "David Williams", level: "All Levels" },
      { time: "19:00 - 20:00", name: "Social Dance", trainer: "Guest Instructor", level: "Beginner" },
    ],
  },
  {
    day: "Saturday",
    schedule: [
      { time: "08:00 - 09:00", name: "Weekend Warrior", trainer: "John Smith", level: "Advanced" },
      { time: "10:00 - 11:00", name: "Yoga Flow", trainer: "Sarah Johnson", level: "All Levels" },
      { time: "12:00 - 13:00", name: "Family Fitness", trainer: "Michael Johnson", level: "All Levels" },
      { time: "14:00 - 15:00", name: "Boxing", trainer: "John Smith", level: "Intermediate" },
    ],
  },
  {
    day: "Sunday",
    schedule: [],
  },
]

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

