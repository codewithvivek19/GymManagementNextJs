import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function AboutSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1637666522306-1af318bca066?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="Our modern gym facility"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">About Our Gym</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Founded in 2015, our gym has grown from a small local fitness center to one of the most reputable fitness
              establishments in the city. We've helped thousands of members transform their lives through personalized
              fitness programs, nutrition guidance, and a supportive community.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Our team of certified trainers brings decades of combined experience and specializes in various fitness
              disciplines, from strength training and cardio to yoga and rehabilitation. We believe fitness is for
              everyone, and our inclusive environment welcomes people of all fitness levels and backgrounds.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/about">Learn More</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/team">Meet Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 