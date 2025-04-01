import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-10" />
      <div
        className="relative h-[600px] bg-cover bg-center"
        style={{ backgroundImage: "url('/placeholder.svg?height=1200&width=2000')" }}
      >
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Transform Your Body, <br />
              <span className="text-primary">Transform Your Life</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Join FitZone today and start your journey to a healthier, stronger you with our state-of-the-art
              facilities and expert trainers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/memberships">Become a Member</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

