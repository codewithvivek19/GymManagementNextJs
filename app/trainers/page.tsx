"use client"

import { useState, useEffect } from "react"
import { getTrainers } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Mail, Phone } from "lucide-react"
import Image from "next/image"

// Fallback data in case API fails
const fallbackTrainers = [
  {
    id: "t1",
    name: "Arjun Sharma",
    email: "arjun.sharma@example.com",
    specialization: "Strength Training",
    experience: 8,
    bio: "Former national-level athlete with expertise in strength and conditioning. Certified from National Institute of Sports, Patiala.",
    image_url: "https://placehold.co/600x800/jpeg?text=Trainer+1"
  },
  {
    id: "t2",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    specialization: "Yoga & Flexibility",
    experience: 6,
    bio: "Internationally certified yoga instructor with focus on functional mobility and mind-body connection.",
    image_url: "https://placehold.co/600x800/jpeg?text=Trainer+2"
  },
  {
    id: "t3",
    name: "Rahul Verma",
    email: "rahul.verma@example.com",
    specialization: "HIIT & Functional Training",
    experience: 5,
    bio: "Specializes in high-intensity interval training and functional fitness programs for busy professionals.",
    image_url: "https://placehold.co/600x800/jpeg?text=Trainer+3"
  }
]

// Types
interface Trainer {
  id: string;
  name: string;
  email: string;
  specialization: string;
  experience: number;
  bio: string;
  image_url: string;
}

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTrainers() {
      try {
        setLoading(true)
        const data = await getTrainers()
        
        if (data && data.length > 0) {
          setTrainers(data)
        } else {
          // Fallback to hardcoded data if API returns empty result
          setTrainers(fallbackTrainers)
          console.warn('No trainers found in database, using fallback data')
        }
      } catch (err) {
        console.error('Error fetching trainers:', err)
        setError('Failed to load trainers')
        setTrainers(fallbackTrainers)
      } finally {
        setLoading(false)
      }
    }
    
    fetchTrainers()
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Our Professional Trainers</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet our team of certified trainers who will help you achieve your fitness goals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="relative overflow-hidden">
              <div className="aspect-[3/4] relative">
                <Skeleton className="h-full w-full absolute" />
              </div>
              <CardHeader>
                <Skeleton className="h-8 w-1/2 mb-2" />
                <Skeleton className="h-4 w-4/5" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Oops!</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          {error}. Please try again later.
        </p>
        <Button onClick={() => window.location.reload()}>Refresh Page</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Our Professional Trainers</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Meet our team of certified trainers who will help you achieve your fitness goals.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainers.map((trainer) => (
          <Card key={trainer.id} className="overflow-hidden flex flex-col h-full">
            <div className="aspect-[3/4] relative">
              <Image
                src={trainer.image_url || "https://placehold.co/600x800/jpeg?text=Trainer"}
                alt={trainer.name}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>{trainer.name}</CardTitle>
              <CardDescription className="flex items-center">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                  {trainer.specialization}
                </span>
                <span className="ml-2 text-muted-foreground">
                  {trainer.experience} years experience
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">
                {trainer.bio}
              </p>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Contact Trainer
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
} 