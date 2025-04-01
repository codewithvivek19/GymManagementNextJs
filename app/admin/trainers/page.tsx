"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  getTrainers,
  createTrainer,
  updateTrainer,
  deleteTrainer
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
import { PlusCircle, Pencil, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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

export default function TrainersAdmin() {
  // Authentication
  const { isAuthenticated } = useAdminAuth()
  const router = useRouter()

  // State
  const [trainers, setTrainers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedTrainer, setSelectedTrainer] = useState(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "",
    experience: "",
    bio: "",
    image_url: ""
  })

  // Load trainers
  useEffect(() => {
    async function loadTrainers() {
      try {
        setLoading(true)
        const data = await getTrainers()
        setTrainers(data || [])
      } catch (err) {
        console.error("Error loading trainers:", err)
        setError("Failed to load trainers")
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      loadTrainers()
    }
  }, [isAuthenticated])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Reset form data
  const resetFormData = () => {
    setFormData({
      name: "",
      email: "",
      specialization: "",
      experience: "",
      bio: "",
      image_url: ""
    })
  }

  // Open edit dialog
  const openEditDialog = (trainer) => {
    setSelectedTrainer(trainer)
    
    setFormData({
      name: trainer.name || "",
      email: trainer.email || "",
      specialization: trainer.specialization || "",
      experience: trainer.experience || "",
      bio: trainer.bio || "",
      image_url: trainer.image_url || ""
    })
    
    setIsEditDialogOpen(true)
  }

  // Open delete dialog
  const openDeleteDialog = (trainer) => {
    setSelectedTrainer(trainer)
    setIsDeleteDialogOpen(true)
  }

  // Handle create trainer
  const handleCreateTrainer = async () => {
    try {
      setLoading(true)
      
      // Validate the experience field is a number
      const experience = parseInt(formData.experience)
      if (isNaN(experience)) {
        setError("Experience must be a number")
        setLoading(false)
        return
      }
      
      // Create the trainer object
      const newTrainer = {
        name: formData.name,
        email: formData.email,
        specialization: formData.specialization,
        experience: experience,
        bio: formData.bio,
        image_url: formData.image_url
      }
      
      await createTrainer(newTrainer)
      
      // Refresh the list
      const data = await getTrainers()
      setTrainers(data || [])
      
      // Close dialog and reset form
      setIsAddDialogOpen(false)
      resetFormData()
      
    } catch (err) {
      console.error("Error creating trainer:", err)
      setError("Failed to create trainer")
    } finally {
      setLoading(false)
    }
  }

  // Handle update trainer
  const handleUpdateTrainer = async () => {
    try {
      setLoading(true)
      
      // Validate the experience field is a number
      const experience = parseInt(formData.experience)
      if (isNaN(experience)) {
        setError("Experience must be a number")
        setLoading(false)
        return
      }
      
      // Update the trainer object
      const updatedTrainer = {
        name: formData.name,
        email: formData.email,
        specialization: formData.specialization,
        experience: experience,
        bio: formData.bio,
        image_url: formData.image_url
      }
      
      await updateTrainer(selectedTrainer.id, updatedTrainer)
      
      // Refresh the list
      const data = await getTrainers()
      setTrainers(data || [])
      
      // Close dialog and reset form
      setIsEditDialogOpen(false)
      resetFormData()
      
    } catch (err) {
      console.error("Error updating trainer:", err)
      setError("Failed to update trainer")
    } finally {
      setLoading(false)
    }
  }

  // Handle delete trainer
  const handleDeleteTrainer = async () => {
    try {
      setLoading(true)
      
      await deleteTrainer(selectedTrainer.id)
      
      // Refresh the list
      const data = await getTrainers()
      setTrainers(data || [])
      
      // Close dialog
      setIsDeleteDialogOpen(false)
      
    } catch (err) {
      console.error("Error deleting trainer:", err)
      setError("Failed to delete trainer")
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
            <h1 className="text-3xl font-bold">Trainers</h1>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Trainer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Trainer</DialogTitle>
                <DialogDescription>
                  Create a new trainer profile to be displayed on the website.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    placeholder="e.g., Strength Training, Yoga, etc."
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="experience">Experience (years)</Label>
                  <Input
                    id="experience"
                    name="experience"
                    type="number"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="e.g., 5"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Brief description of trainer background and expertise"
                    rows={4}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleCreateTrainer} disabled={loading}>
                  {loading ? "Creating..." : "Create"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <p className="text-muted-foreground">
          Manage trainer profiles that users can browse on the website.
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
      
      {/* Trainers table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Loading trainers...
                  </TableCell>
                </TableRow>
              ) : trainers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No trainers found. Create one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                trainers.map((trainer) => (
                  <TableRow key={trainer.id}>
                    <TableCell>
                      <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          src={trainer.image_url || "https://placehold.co/100x100?text=?"}
                          alt={trainer.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{trainer.name}</TableCell>
                    <TableCell>{trainer.specialization || "N/A"}</TableCell>
                    <TableCell>{trainer.experience || "N/A"} years</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => openEditDialog(trainer)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => openDeleteDialog(trainer)}
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
            <DialogTitle>Edit Trainer</DialogTitle>
            <DialogDescription>
              Update the trainer information.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email@example.com"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-specialization">Specialization</Label>
              <Input
                id="edit-specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                placeholder="e.g., Strength Training, Yoga, etc."
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-experience">Experience (years)</Label>
              <Input
                id="edit-experience"
                name="experience"
                type="number"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="e.g., 5"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-bio">Bio</Label>
              <Textarea
                id="edit-bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Brief description of trainer background and expertise"
                rows={4}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-image_url">Image URL</Label>
              <Input
                id="edit-image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleUpdateTrainer} disabled={loading}>
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
              Are you sure you want to delete the trainer "{selectedTrainer?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteTrainer} disabled={loading}>
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 