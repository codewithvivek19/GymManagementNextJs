"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  getMealPlans,
  createMealPlan,
  updateMealPlan,
  deleteMealPlan
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

// Meal plan categories
const mealPlanCategories = [
  "Weight Loss",
  "Muscle Gain",
  "Balanced Diet",
  "Vegetarian",
  "Vegan",
  "Keto",
  "Low Carb"
]

export default function MealPlansAdmin() {
  // Authentication
  const { isAuthenticated } = useAdminAuth()
  const router = useRouter()

  // State
  const [mealPlans, setMealPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedMealPlan, setSelectedMealPlan] = useState(null)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Balanced Diet",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    image_url: "",
    meals: ""
  })

  // Load meal plans
  useEffect(() => {
    async function loadMealPlans() {
      try {
        setLoading(true)
        const data = await getMealPlans()
        setMealPlans(data || [])
      } catch (err) {
        console.error("Error loading meal plans:", err)
        setError("Failed to load meal plans")
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      loadMealPlans()
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
      title: "",
      description: "",
      category: "Balanced Diet",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
      image_url: "",
      meals: ""
    })
  }

  // Open edit dialog
  const openEditDialog = (mealPlan) => {
    setSelectedMealPlan(mealPlan)
    
    // Convert meals array to string if needed
    let mealsString = mealPlan.meals
    if (Array.isArray(mealPlan.meals)) {
      mealsString = mealPlan.meals.join("\n")
    }
    
    setFormData({
      title: mealPlan.title || "",
      description: mealPlan.description || "",
      category: mealPlan.category || "Balanced Diet",
      calories: mealPlan.calories?.toString() || "",
      protein: mealPlan.protein?.toString() || "",
      carbs: mealPlan.carbs?.toString() || "",
      fat: mealPlan.fat?.toString() || "",
      image_url: mealPlan.image_url || "",
      meals: mealsString || ""
    })
    
    setIsEditDialogOpen(true)
  }

  // Open delete dialog
  const openDeleteDialog = (mealPlan) => {
    setSelectedMealPlan(mealPlan)
    setIsDeleteDialogOpen(true)
  }

  // Handle create meal plan
  const handleCreateMealPlan = async () => {
    try {
      setLoading(true)
      
      // Validate numeric fields
      const calories = parseInt(formData.calories)
      const protein = parseInt(formData.protein)
      const carbs = parseInt(formData.carbs)
      const fat = parseInt(formData.fat)
      
      if (isNaN(calories) || isNaN(protein) || isNaN(carbs) || isNaN(fat)) {
        setError("Nutritional values must be numbers")
        setLoading(false)
        return
      }
      
      // Process meals from textarea to array
      const meals = formData.meals
        .split("\n")
        .map(meal => meal.trim())
        .filter(meal => meal.length > 0)
      
      // Create the meal plan object
      const newMealPlan = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        calories: calories,
        protein: protein,
        carbs: carbs,
        fat: fat,
        image_url: formData.image_url,
        meals: meals
      }
      
      await createMealPlan(newMealPlan)
      
      // Refresh the list
      const data = await getMealPlans()
      setMealPlans(data || [])
      
      // Close dialog and reset form
      setIsAddDialogOpen(false)
      resetFormData()
      
    } catch (err) {
      console.error("Error creating meal plan:", err)
      setError("Failed to create meal plan")
    } finally {
      setLoading(false)
    }
  }

  // Handle update meal plan
  const handleUpdateMealPlan = async () => {
    try {
      setLoading(true)
      
      // Validate numeric fields
      const calories = parseInt(formData.calories)
      const protein = parseInt(formData.protein)
      const carbs = parseInt(formData.carbs)
      const fat = parseInt(formData.fat)
      
      if (isNaN(calories) || isNaN(protein) || isNaN(carbs) || isNaN(fat)) {
        setError("Nutritional values must be numbers")
        setLoading(false)
        return
      }
      
      // Process meals from textarea to array
      const meals = formData.meals
        .split("\n")
        .map(meal => meal.trim())
        .filter(meal => meal.length > 0)
      
      // Update the meal plan object
      const updatedMealPlan = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        calories: calories,
        protein: protein,
        carbs: carbs,
        fat: fat,
        image_url: formData.image_url,
        meals: meals
      }
      
      await updateMealPlan(selectedMealPlan.id, updatedMealPlan)
      
      // Refresh the list
      const data = await getMealPlans()
      setMealPlans(data || [])
      
      // Close dialog and reset form
      setIsEditDialogOpen(false)
      resetFormData()
      
    } catch (err) {
      console.error("Error updating meal plan:", err)
      setError("Failed to update meal plan")
    } finally {
      setLoading(false)
    }
  }

  // Handle delete meal plan
  const handleDeleteMealPlan = async () => {
    try {
      setLoading(true)
      
      await deleteMealPlan(selectedMealPlan.id)
      
      // Refresh the list
      const data = await getMealPlans()
      setMealPlans(data || [])
      
      // Close dialog
      setIsDeleteDialogOpen(false)
      
    } catch (err) {
      console.error("Error deleting meal plan:", err)
      setError("Failed to delete meal plan")
    } finally {
      setLoading(false)
    }
  }

  // Format meals for display in the table
  const formatMeals = (meals) => {
    if (!meals) return "—"
    
    let mealsArray = meals
    if (typeof meals === 'string') {
      try {
        mealsArray = JSON.parse(meals)
      } catch (e) {
        mealsArray = meals.split("\n")
      }
    }
    
    if (Array.isArray(mealsArray)) {
      if (mealsArray.length === 0) return "—"
      if (mealsArray.length === 1) return mealsArray[0]
      return `${mealsArray[0]} (+${mealsArray.length - 1} more)`
    }
    
    return "—"
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
            <h1 className="text-3xl font-bold">Meal Plans</h1>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Meal Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Meal Plan</DialogTitle>
                <DialogDescription>
                  Create a new meal plan to be displayed on the website.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., 7-Day Weight Loss Plan"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of the meal plan"
                    rows={3}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {mealPlanCategories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="calories">Calories</Label>
                    <Input
                      id="calories"
                      name="calories"
                      type="number"
                      value={formData.calories}
                      onChange={handleInputChange}
                      placeholder="e.g., 2000"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="protein">Protein (g)</Label>
                    <Input
                      id="protein"
                      name="protein"
                      type="number"
                      value={formData.protein}
                      onChange={handleInputChange}
                      placeholder="e.g., 100"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="carbs">Carbs (g)</Label>
                    <Input
                      id="carbs"
                      name="carbs"
                      type="number"
                      value={formData.carbs}
                      onChange={handleInputChange}
                      placeholder="e.g., 200"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="fat">Fat (g)</Label>
                    <Input
                      id="fat"
                      name="fat"
                      type="number"
                      value={formData.fat}
                      onChange={handleInputChange}
                      placeholder="e.g., 50"
                    />
                  </div>
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
                
                <div className="grid gap-2">
                  <Label htmlFor="meals">Meals (one per line)</Label>
                  <Textarea
                    id="meals"
                    name="meals"
                    value={formData.meals}
                    onChange={handleInputChange}
                    placeholder="Breakfast: Oatmeal with berries&#10;Lunch: Grilled chicken salad&#10;Dinner: Baked salmon with vegetables"
                    rows={5}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleCreateMealPlan} disabled={loading}>
                  {loading ? "Creating..." : "Create"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <p className="text-muted-foreground">
          Manage meal plans that users can browse on the website.
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
      
      {/* Meal plans table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Calories</TableHead>
                <TableHead>Sample Meal</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Loading meal plans...
                  </TableCell>
                </TableRow>
              ) : mealPlans.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No meal plans found. Create one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                mealPlans.map((mealPlan) => (
                  <TableRow key={mealPlan.id}>
                    <TableCell>
                      <div className="relative h-10 w-16 rounded overflow-hidden">
                        <Image
                          src={mealPlan.image_url || "https://placehold.co/320x200?text=No+Image"}
                          alt={mealPlan.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{mealPlan.title}</TableCell>
                    <TableCell>{mealPlan.category}</TableCell>
                    <TableCell>{mealPlan.calories || "—"} kcal</TableCell>
                    <TableCell>{formatMeals(mealPlan.meals)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => openEditDialog(mealPlan)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => openDeleteDialog(mealPlan)}
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
            <DialogTitle>Edit Meal Plan</DialogTitle>
            <DialogDescription>
              Update the meal plan information.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., 7-Day Weight Loss Plan"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief description of the meal plan"
                rows={3}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger id="edit-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {mealPlanCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-calories">Calories</Label>
                <Input
                  id="edit-calories"
                  name="calories"
                  type="number"
                  value={formData.calories}
                  onChange={handleInputChange}
                  placeholder="e.g., 2000"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-protein">Protein (g)</Label>
                <Input
                  id="edit-protein"
                  name="protein"
                  type="number"
                  value={formData.protein}
                  onChange={handleInputChange}
                  placeholder="e.g., 100"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-carbs">Carbs (g)</Label>
                <Input
                  id="edit-carbs"
                  name="carbs"
                  type="number"
                  value={formData.carbs}
                  onChange={handleInputChange}
                  placeholder="e.g., 200"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-fat">Fat (g)</Label>
                <Input
                  id="edit-fat"
                  name="fat"
                  type="number"
                  value={formData.fat}
                  onChange={handleInputChange}
                  placeholder="e.g., 50"
                />
              </div>
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
            
            <div className="grid gap-2">
              <Label htmlFor="edit-meals">Meals (one per line)</Label>
              <Textarea
                id="edit-meals"
                name="meals"
                value={formData.meals}
                onChange={handleInputChange}
                placeholder="Breakfast: Oatmeal with berries&#10;Lunch: Grilled chicken salad&#10;Dinner: Baked salmon with vegetables"
                rows={5}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleUpdateMealPlan} disabled={loading}>
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
              Are you sure you want to delete the meal plan "{selectedMealPlan?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteMealPlan} disabled={loading}>
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 