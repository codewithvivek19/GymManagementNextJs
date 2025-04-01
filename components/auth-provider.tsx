"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { getUserByEmail, createUser, updateUser } from "@/lib/supabase"

// Use environment variables for Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

const supabase = createClient(supabaseUrl, supabaseAnonKey)

type User = {
  id: string
  email: string
  name: string
  role: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    checkUser()

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        try {
          // Try to get user profile data from Supabase
          let userData = await getUserByEmail(session.user.email!)
          
          // If user doesn't exist in our database, create a basic profile
          if (!userData) {
            userData = await createUser({
              id: session.user.id,
              email: session.user.email!,
              name: session.user.email!.split('@')[0], // Use part of email as name
              role: "user", // Default role
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            })
          }
          
          setUser({
            id: userData.id,
            email: userData.email,
            name: userData.name || "User",
            role: userData.role || "user", // Default to "user" role
          })
        } catch (error) {
          console.error("Error getting user data:", error)
          
          // Fallback to session data
          setUser({
            id: session.user.id,
            email: session.user.email!,
            name: session.user.email!.split('@')[0], 
            role: "user",
          })
        }
      } else {
        setUser(null)
      }

      setIsLoading(false)
    })

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [])

  async function checkUser() {
    try {
      // First try to get the Supabase session
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        try {
          // Try to get user data from our database
          const userData = await getUserByEmail(session.user.email!)
          
          if (userData) {
            setUser({
              id: userData.id,
              email: userData.email,
              name: userData.name,
              role: userData.role,
            })
            return
          }
        } catch (error) {
          console.error("Error fetching user data:", error)
        }
      }
      
      // If no session or database user, check localStorage for mock user (for demo purposes)
      const mockUser = localStorage.getItem("mockUser")
      if (mockUser) {
        setUser(JSON.parse(mockUser))
      }
    } catch (error) {
      console.error("Error checking user:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function login(email: string, password: string) {
    try {
      // First try to authenticate with Supabase
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        
        if (error) throw error
        
        if (data.user) {
          // Try to get user profile from our database
          let userData = await getUserByEmail(email)
          
          if (userData) {
            setUser({
              id: userData.id,
              email: userData.email,
              name: userData.name,
              role: userData.role,
            })
            return
          }
        }
      } catch (supabaseError) {
        console.error("Supabase auth error:", supabaseError)
        // If Supabase auth fails, try mock users
      }
      
      // Demo admin and regular user accounts as fallback
      if (email === "admin@example.com" && password === "password") {
        const mockUser = {
          id: "admin-123",
          email: email,
          name: "Admin User",
          role: "admin", // Admin role
        }

        localStorage.setItem("mockUser", JSON.stringify(mockUser))
        setUser(mockUser)
        return
      }
      else if (email === "demo@example.com" && password === "password") {
        const mockUser = {
          id: "user-123",
          email: email,
          name: "Demo User",
          role: "user", // Regular user role
        }

        localStorage.setItem("mockUser", JSON.stringify(mockUser))
        setUser(mockUser)
        return
      }

      throw new Error("Invalid credentials")
    } catch (error: any) {
      throw new Error(error.message || "Login failed")
    }
  }

  async function register(email: string, password: string, name: string) {
    try {
      // First try to register with Supabase
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })
        
        if (error) throw error
        
        if (data.user) {
          // Create user profile in our database
          const userData = await createUser({
            id: data.user.id,
            email: data.user.email!,
            name: name,
            role: "user", // Default role
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
          
          setUser({
            id: userData.id,
            email: userData.email,
            name: userData.name,
            role: userData.role,
          })
          return
        }
      } catch (supabaseError) {
        console.error("Supabase registration error:", supabaseError)
        // If Supabase registration fails, use mock registration
      }
      
      // For demo purposes, simulate a successful registration with mock data
      const mockUser = {
        id: "user-" + Math.floor(Math.random() * 1000),
        email: email,
        name: name,
        role: "user", // Default role for new users
      }

      localStorage.setItem("mockUser", JSON.stringify(mockUser))
      setUser(mockUser)
    } catch (error: any) {
      throw new Error(error.message || "Registration failed")
    }
  }

  async function logout() {
    try {
      // First try to sign out from Supabase
      await supabase.auth.signOut()
      
      // Also remove any mock user data
      localStorage.removeItem("mockUser")
      setUser(null)
    } catch (error: any) {
      console.error("Error logging out:", error.message)
    }
  }

  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

