"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, Mail, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { getTrainers } from "@/lib/supabase"

export default function TrainerSection() {
  const [trainers, setTrainers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true)
        
        // Use the new API endpoint
        const response = await fetch('/api/data?type=trainers');
        const result = await response.json();
        
        if (result.data) {
          setTrainers(result.data);
        } else {
          console.error("API returned error:", result.error);
          
          // Fallback to Supabase directly
          console.log("Falling back to direct Supabase call");
          const data = await getTrainers();
          
          if (data && data.length > 0) {
            setTrainers(data);
          } else {
            setError("No trainers found. Please try again later.");
          }
        }
      } catch (err) {
        console.error("Error fetching trainers:", err)
        setError("Failed to load trainers. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    
    fetchTrainers()
  }, [])

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Expert Trainers</h3>
          <p className="text-muted-foreground">Loading trainers...</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-4 animate-pulse">
              <div className="relative h-64 bg-muted rounded-lg mb-4"></div>
              <div className="h-6 bg-muted rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-muted rounded mb-4 w-1/2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Expert Trainers</h3>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    )
  }

  if (trainers.length === 0) {
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Expert Trainers</h3>
          <p className="text-muted-foreground">No trainers are currently available. Please check back later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Expert Trainers</h3>
        <p className="text-muted-foreground">
          Meet our certified fitness professionals who will guide you in your fitness journey.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="border rounded-lg overflow-hidden">
            <div className="relative h-64 w-full">
              <Image
                src={trainer.image_url || "https://via.placeholder.com/400x400?text=Trainer"}
                alt={trainer.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h4 className="font-bold text-xl mb-1">{trainer.name}</h4>
              <Badge variant="outline" className="mb-3">
                {trainer.specialization}
              </Badge>
              <p className="text-sm text-muted-foreground mb-3">
                {trainer.experience} years experience
              </p>
              <p className="text-sm mb-4 line-clamp-3">
                {trainer.bio}
              </p>

              <div className="flex justify-between mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>{trainer.name}</DialogTitle>
                      <DialogDescription>{trainer.specialization}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="relative h-64 w-full rounded-lg overflow-hidden">
                        <Image
                          src={trainer.image_url || "https://via.placeholder.com/400x400?text=Trainer"}
                          alt={trainer.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">About Me</h4>
                        <p className="text-sm text-muted-foreground">{trainer.bio}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Experience</h4>
                        <p className="text-sm text-muted-foreground">{trainer.experience} years of professional experience</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Contact</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="h-4 w-4 mr-2" />
                          {trainer.email}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button>Book a Session</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Session
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

