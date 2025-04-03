"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center min-h-[80vh] flex items-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019613576-2b22c76fd955?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')" }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-2xl space-y-8">
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Transform Your Body, Transform Your Life
          </h1>
          <p className="text-xl text-gray-200">
            Join our fitness community and experience personalized training programs, nutrition guidance, and a supportive environment designed to help you achieve your fitness goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/membership">View Memberships</Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 text-white hover:bg-white/20" asChild>
              <Link href="/contact">Book Free Session</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

