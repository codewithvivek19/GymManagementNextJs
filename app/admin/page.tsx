"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { 
  Users, 
  Dumbbell, 
  CalendarDays, 
  CreditCard, 
  Utensils,
  LogOut
} from "lucide-react"
import Link from "next/link"

// For demo purposes only - would normally use proper auth
const DEMO_EMAIL = "admin@example.com"
const DEMO_PASSWORD = "password123"

export default function AdminDashboard() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth")
    if (adminAuth === "true") {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = () => {
    setIsLoading(true)
    setError("")

    // Simple validation
    if (!email || !password) {
      setError("Please enter both email and password")
      setIsLoading(false)
      return
    }

    // Demo authentication - in a real app, use Supabase auth
    setTimeout(() => {
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        localStorage.setItem("adminAuth", "true")
        setIsLoggedIn(true)
      } else {
        setError("Invalid credentials")
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    setIsLoggedIn(false)
  }

  // Fill in demo credentials
  const fillDemoCredentials = () => {
    setEmail(DEMO_EMAIL)
    setPassword(DEMO_PASSWORD)
  }

  // Login form
  if (!isLoggedIn) {
    return (
      <div className="container max-w-md mx-auto px-4 py-24">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
              Sign in to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full mb-4" onClick={handleLogin} disabled={isLoading}>
              {isLoading ? "Logging in..." : "Sign In"}
            </Button>
            <Button variant="outline" className="w-full" onClick={fillDemoCredentials}>
              Fill Demo Credentials
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Admin dashboard
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/members">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Members</CardTitle>
              <Users className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage gym members and their profiles
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/trainers">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Trainers</CardTitle>
              <Dumbbell className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage trainer profiles and specializations
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/schedules">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Class Schedule</CardTitle>
              <CalendarDays className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage class schedules and availability
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/memberships">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Memberships</CardTitle>
              <CreditCard className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage membership plans and pricing
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/meal-plans">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Meal Plans</CardTitle>
              <Utensils className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage meal plans and nutritional information
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
} 