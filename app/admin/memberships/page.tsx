"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  getMemberships,
  createMembership,
  updateMembership,
  deleteMembership
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { PlusCircle, Pencil, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Duration options for membership plans
const durationOptions = [
  "1 Month",
  "3 Months",
  "6 Months",
  "12 Months"
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

export default function MembershipsAdmin() {
  // Authentication
  const { isAuthenticated } = useAdminAuth()
  const router = useRouter()

  // State
  const [memberships, setMemberships] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedMembership, setSelectedMembership] = useState(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "1 Month",
    features: "",
    is_popular: false
  })

  // Load memberships
  useEffect(() => {
    async function loadMemberships() {
      try {
        setLoading(true)
        const data = await getMemberships()
        setMemberships(data || [])
      } catch (err) {
        console.error("Error loading memberships:", err)
        setError("Failed to load memberships")
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      loadMemberships()
    }
  }, [isAuthenticated])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle switch toggle
  const handleSwitchChange = (checked) => {
    setFormData((prev) => ({ ...prev, is_popular: checked }))
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
      price: "",
      duration: "1 Month",
      features: "",
      is_popular: false
    })
  }

  // Open edit dialog
  const openEditDialog = (membership) => {
    setSelectedMembership(membership)
    
    // Convert features array to string if needed
    let featuresString = membership.features
    if (Array.isArray(membership.features)) {
      featuresString = membership.features.join("\n")
    }
    
    setFormData({
      name: membership.name || "",
      description: membership.description || "",
      price: membership.price?.toString() || "",
      duration: membership.duration || "1 Month",
      features: featuresString || "",
      is_popular: membership.is_popular || false
    })
    
    setIsEditDialogOpen(true)
  }

  // Open delete dialog
  const openDeleteDialog = (membership) => {
    setSelectedMembership(membership)
    setIsDeleteDialogOpen(true)
  }

  // Format price display
  const formatPrice = (price) => {
    if (!price) return "—"
    return `₹${price}`
  }

  // Format features for display
  const formatFeatures = (features) => {
    if (!features) return "—"
    
    let featuresArray = features
    if (typeof features === 'string') {
      try {
        featuresArray = JSON.parse(features)
      } catch (e) {
        featuresArray = features.split("\n")
      }
    }
    
    if (Array.isArray(featuresArray)) {
      if (featuresArray.length === 0) return "—"
      if (featuresArray.length === 1) return featuresArray[0]
      return `${featuresArray[0]} (+${featuresArray.length - 1} more)`
    }
    
    return "—"
  }

  // Handle create membership
  const handleCreateMembership = async () => {
    try {
      setLoading(true)
      
      // Validate price field
      const price = parseInt(formData.price)
      if (isNaN(price)) {
        setError("Price must be a number")
        setLoading(false)
        return
      }
      
      // Process features from textarea to array
      const features = formData.features
        .split("\n")
        .map(feature => feature.trim())
        .filter(feature => feature.length > 0)
      
      // Create the membership object
      const newMembership = {
        name: formData.name,
        description: formData.description,
        price: price,
        duration: formData.duration,
        features: features,
        is_popular: formData.is_popular
      }
      
      await createMembership(newMembership)
      
      // Refresh the list
      const data = await getMemberships()
      setMemberships(data || [])
      
      // Close dialog and reset form
      setIsAddDialogOpen(false)
      resetFormData()
      
    } catch (err) {
      console.error("Error creating membership:", err)
      setError("Failed to create membership")
    } finally {
      setLoading(false)
    }
  }

  // Handle update membership
  const handleUpdateMembership = async () => {
    try {
      setLoading(true)
      
      // Validate price field
      const price = parseInt(formData.price)
      if (isNaN(price)) {
        setError("Price must be a number")
        setLoading(false)
        return
      }
      
      // Process features from textarea to array
      const features = formData.features
        .split("\n")
        .map(feature => feature.trim())
        .filter(feature => feature.length > 0)
      
      // Update the membership object
      const updatedMembership = {
        name: formData.name,
        description: formData.description,
        price: price,
        duration: formData.duration,
        features: features,
        is_popular: formData.is_popular
      }
      
      await updateMembership(selectedMembership.id, updatedMembership)
      
      // Refresh the list
      const data = await getMemberships()
      setMemberships(data || [])
      
      // Close dialog and reset form
      setIsEditDialogOpen(false)
      resetFormData()
      
    } catch (err) {
      console.error("Error updating membership:", err)
      setError("Failed to update membership")
    } finally {
      setLoading(false)
    }
  }

  // Handle delete membership
  const handleDeleteMembership = async () => {
    try {
      setLoading(true)
      
      await deleteMembership(selectedMembership.id)
      
      // Refresh the list
      const data = await getMemberships()
      setMemberships(data || [])
      
      // Close dialog
      setIsDeleteDialogOpen(false)
      
    } catch (err) {
      console.error("Error deleting membership:", err)
      setError("Failed to delete membership")
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
            <h1 className="text-3xl font-bold">Membership Plans</h1>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Membership
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Membership</DialogTitle>
                <DialogDescription>
                  Create a new membership plan to be displayed on the website.
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
                    placeholder="e.g., Basic, Premium, Elite"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of the membership plan"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="e.g., 1999"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Select 
                      value={formData.duration} 
                      onValueChange={(value) => handleSelectChange("duration", value)}
                    >
                      <SelectTrigger id="duration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {durationOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="features">Features (one per line)</Label>
                  <Textarea
                    id="features"
                    name="features"
                    value={formData.features}
                    onChange={handleInputChange}
                    placeholder="Unlimited gym access&#10;Free fitness assessment&#10;Access to cardio area"
                    rows={5}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_popular"
                    checked={formData.is_popular}
                    onCheckedChange={handleSwitchChange}
                  />
                  <Label htmlFor="is_popular">Mark as popular</Label>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleCreateMembership} disabled={loading}>
                  {loading ? "Creating..." : "Create"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <p className="text-muted-foreground">
          Manage membership plans that users can browse and purchase on the website.
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
      
      {/* Memberships table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Popular</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Loading memberships...
                  </TableCell>
                </TableRow>
              ) : memberships.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No memberships found. Create one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                memberships.map((membership) => (
                  <TableRow key={membership.id}>
                    <TableCell className="font-medium">{membership.name}</TableCell>
                    <TableCell>{formatPrice(membership.price)}</TableCell>
                    <TableCell>{membership.duration}</TableCell>
                    <TableCell>{membership.is_popular ? "Yes" : "No"}</TableCell>
                    <TableCell>{formatFeatures(membership.features)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => openEditDialog(membership)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => openDeleteDialog(membership)}
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
            <DialogTitle>Edit Membership</DialogTitle>
            <DialogDescription>
              Update the membership plan information.
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
                placeholder="e.g., Basic, Premium, Elite"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief description of the membership plan"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Price (₹)</Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., 1999"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-duration">Duration</Label>
                <Select 
                  value={formData.duration} 
                  onValueChange={(value) => handleSelectChange("duration", value)}
                >
                  <SelectTrigger id="edit-duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durationOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-features">Features (one per line)</Label>
              <Textarea
                id="edit-features"
                name="features"
                value={formData.features}
                onChange={handleInputChange}
                placeholder="Unlimited gym access&#10;Free fitness assessment&#10;Access to cardio area"
                rows={5}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-is_popular"
                checked={formData.is_popular}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="edit-is_popular">Mark as popular</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleUpdateMembership} disabled={loading}>
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
              Are you sure you want to delete the membership plan "{selectedMembership?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteMembership} disabled={loading}>
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 