"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getTrainers
} from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusCircle, Pencil, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Days of the week
const daysOfWeek = [
  "Monday", 
  "Tuesday", 
  "Wednesday", 
  "Thursday", 
  "Friday", 
  "Saturday", 
  "Sunday"
]

// Simple authentication check
function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth")
    if (adminAuth !== "true") {
      router.push("/admin")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  return { isAuthenticated }
}

export default function SchedulesAdmin() {
  // Authentication
  const { isAuthenticated } = useAdminAuth()
  const router = useRouter()

  // State
  const [schedules, setSchedules] = useState([])
  const [trainers, setTrainers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    day: "Monday",
    time: "",
    duration: "60",
    location: "",
    trainer_id: "",
    max_participants: "20"
  })

  // Load schedules and trainers
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const schedulesData = await getSchedules()
        setSchedules(schedulesData || [])
        
        const trainersData = await getTrainers()
        setTrainers(trainersData || [])
      } catch (err) {
        console.error("Error loading data:", err)
        setError("Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select input changes
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Reset form data
  const resetFormData = () => {
    setFormData({
      name: "",
      description: "",
      day: "Monday",
      time: "",
      duration: "60",
      location: "",
      trainer_id: "",
      max_participants: "20"
    })
  }

  // Open edit dialog
  const openEditDialog = (schedule) => {
    setSelectedSchedule(schedule)
    
    setFormData({
      name: schedule.name || "",
      description: schedule.description || "",
      day: schedule.day || "Monday",
      time: schedule.time || "",
      duration: schedule.duration?.toString() || "60",
      location: schedule.location || "",
      trainer_id: schedule.trainer_id?.toString() || "",
      max_participants: schedule.max_participants?.toString() || "20"
    })
    
    setIsEditDialogOpen(true)
  }

  // Open delete dialog
  const openDeleteDialog = (schedule) => {
    setSelectedSchedule(schedule)
    setIsDeleteDialogOpen(true)
  }

  // Find trainer name by ID
  const getTrainerName = (trainerId) => {
    const trainer = trainers.find(t => t.id === trainerId)
    return trainer ? trainer.name : "Unknown"
  }

  // Handle create schedule
  const handleCreateSchedule = async () => {
    try {
      setLoading(true)
      
      // Validate numeric fields
      const duration = parseInt(formData.duration)
      const maxParticipants = parseInt(formData.max_participants)
      
      if (isNaN(duration) || isNaN(maxParticipants)) {
        setError("Duration and max participants must be numbers")
        setLoading(false)
        return
      }
      
      // Create the schedule object
      const newSchedule = {
        name: formData.name,
        description: formData.description,
        day: formData.day,
        time: formData.time,
        duration: duration,
        location: formData.location,
        trainer_id: formData.trainer_id ? parseInt(formData.trainer_id) : null,
        max_participants: maxParticipants
      }
      
      await createSchedule(newSchedule)
      
      // Refresh the list
      const data = await getSchedules()
      setSchedules(data || [])
      
      // Close dialog and reset form
      setIsAddDialogOpen(false)
      resetFormData()
      
    } catch (err) {
      console.error("Error creating schedule:", err)
      setError("Failed to create schedule")
    } finally {
      setLoading(false)
    }
  }

  // Handle update schedule
  const handleUpdateSchedule = async () => {
    try {
      setLoading(true)
      
      // Validate numeric fields
      const duration = parseInt(formData.duration)
      const maxParticipants = parseInt(formData.max_participants)
      
      if (isNaN(duration) || isNaN(maxParticipants)) {
        setError("Duration and max participants must be numbers")
        setLoading(false)
        return
      }
      
      // Update the schedule object
      const updatedSchedule = {
        name: formData.name,
        description: formData.description,
        day: formData.day,
        time: formData.time,
        duration: duration,
        location: formData.location,
        trainer_id: formData.trainer_id ? parseInt(formData.trainer_id) : null,
        max_participants: maxParticipants
      }
      
      await updateSchedule(selectedSchedule.id, updatedSchedule)
      
      // Refresh the list
      const data = await getSchedules()
      setSchedules(data || [])
      
      // Close dialog and reset form
      setIsEditDialogOpen(false)
      resetFormData()
      
    } catch (err) {
      console.error("Error updating schedule:", err)
      setError("Failed to update schedule")
    } finally {
      setLoading(false)
    }
  }

  // Handle delete schedule
  const handleDeleteSchedule = async () => {
    try {
      setLoading(true)
      
      await deleteSchedule(selectedSchedule.id)
      
      // Refresh the list
      const data = await getSchedules()
      setSchedules(data || [])
      
      // Close dialog
      setIsDeleteDialogOpen(false)
      
    } catch (err) {
      console.error("Error deleting schedule:", err)
      setError("Failed to delete schedule")
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Link href="/admin">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Class Schedules</h1>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Class
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Class</DialogTitle>
                <DialogDescription>
                  Create a new class to be displayed on the schedule.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Class Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Yoga Flow, HIIT"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of the class"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="day">Day</Label>
                    <Select 
                      value={formData.day} 
                      onValueChange={(value) => handleSelectChange("day", value)}
                    >
                      <SelectTrigger id="day">
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        {daysOfWeek.map(day => (
                          <SelectItem key={day} value={day}>{day}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      placeholder="e.g., 09:00 AM"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      name="duration"
                      type="number"
                      value={formData.duration}
                      onChange={handleInputChange}
                      placeholder="e.g., 60"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="max_participants">Max Participants</Label>
                    <Input
                      id="max_participants"
                      name="max_participants"
                      type="number"
                      value={formData.max_participants}
                      onChange={handleInputChange}
                      placeholder="e.g., 20"
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Studio 1, Main Hall"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="trainer_id">Trainer</Label>
                  <Select 
                    value={formData.trainer_id} 
                    onValueChange={(value) => handleSelectChange("trainer_id", value)}
                  >
                    <SelectTrigger id="trainer_id">
                      <SelectValue placeholder="Select trainer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {trainers.map(trainer => (
                        <SelectItem key={trainer.id} value={trainer.id.toString()}>
                          {trainer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleCreateSchedule} disabled={loading}>
                  {loading ? "Creating..." : "Create"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <p className="text-muted-foreground">
          Manage class schedules that users can view and book on the website.
        </p>
      </div>
      
      {/* Error message */}
      {error && (
        <Card className="mb-6 bg-red-50">
          <CardContent className="py-4">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}
      
      {/* Schedules table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Day</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Trainer</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Loading schedules...
                  </TableCell>
                </TableRow>
              ) : schedules.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No classes found. Create one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                schedules.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell className="font-medium">{schedule.name}</TableCell>
                    <TableCell>{schedule.day}</TableCell>
                    <TableCell>{schedule.time}</TableCell>
                    <TableCell>{schedule.trainer_id ? getTrainerName(schedule.trainer_id) : "—"}</TableCell>
                    <TableCell>{schedule.location}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => openEditDialog(schedule)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => openDeleteDialog(schedule)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Class</DialogTitle>
            <DialogDescription>
              Update the class schedule information.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Class Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Yoga Flow, HIIT"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief description of the class"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-day">Day</Label>
                <Select 
                  value={formData.day} 
                  onValueChange={(value) => handleSelectChange("day", value)}
                >
                  <SelectTrigger id="edit-day">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {daysOfWeek.map(day => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-time">Time</Label>
                <Input
                  id="edit-time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  placeholder="e.g., 09:00 AM"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-duration">Duration (minutes)</Label>
                <Input
                  id="edit-duration"
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="e.g., 60"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-max_participants">Max Participants</Label>
                <Input
                  id="edit-max_participants"
                  name="max_participants"
                  type="number"
                  value={formData.max_participants}
                  onChange={handleInputChange}
                  placeholder="e.g., 20"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Studio 1, Main Hall"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-trainer_id">Trainer</Label>
              <Select 
                value={formData.trainer_id} 
                onValueChange={(value) => handleSelectChange("trainer_id", value)}
              >
                <SelectTrigger id="edit-trainer_id">
                  <SelectValue placeholder="Select trainer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {trainers.map(trainer => (
                    <SelectItem key={trainer.id} value={trainer.id.toString()}>
                      {trainer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleUpdateSchedule} disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the class "{selectedSchedule?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteSchedule} disabled={loading}>
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 