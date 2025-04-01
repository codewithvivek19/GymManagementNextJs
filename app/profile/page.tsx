"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import MembershipHistory from "@/components/profile/membership-history"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  })
  
  useEffect(() => {
    if (!user) {
      // Redirect to login if not authenticated
      router.push("/auth/login")
      return
    }
    
    // Populate form data with user details if available
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: "",
      address: ""
    })
  }, [user, router])
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you'd update the user profile here
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully"
    })
  }
  
  const handleLogout = async () => {
    await logout()
    router.push("/")
  }
  
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Please Log In</h1>
        <p className="mb-6">You need to be logged in to view your profile</p>
        <Button onClick={() => router.push("/auth/login")}>
          Log In
        </Button>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Profile</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">Your email cannot be changed</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <Button 
                variant="outline" 
                onClick={handleLogout} 
                className="text-destructive border-destructive hover:bg-destructive/10"
              >
                Log Out
              </Button>
            </div>
          </div>
          
          <div className="md:col-span-1">
            {/* Membership history component */}
            <MembershipHistory userId={user.id} />
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Account Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Role</p>
                  <div className="bg-primary/10 py-2 px-4 rounded-md">
                    {user.role === "admin" ? "Administrator" : 
                     user.role === "trainer" ? "Trainer" : "Member"}
                  </div>
                  
                  <p className="text-sm font-medium mt-4">Member Since</p>
                  <div className="text-sm text-muted-foreground">
                    {/* In a real app, you'd use the user's join date */}
                    {new Date().toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 