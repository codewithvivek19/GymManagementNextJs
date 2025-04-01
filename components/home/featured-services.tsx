import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, Users, Utensils, Activity } from "lucide-react"

const services = [
  {
    icon: <Dumbbell className="h-10 w-10 text-primary" />,
    title: "Personal Training",
    description: "One-on-one sessions with our expert trainers tailored to your specific goals.",
    image: "/placeholder.svg?height=400&width=600",
    link: "/services#personal-training",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Group Classes",
    description: "High-energy group sessions led by professional instructors in a motivating environment.",
    image: "/placeholder.svg?height=400&width=600",
    link: "/services#group-classes",
  },
  {
    icon: <Utensils className="h-10 w-10 text-primary" />,
    title: "Nutrition Counseling",
    description: "Expert advice on diet and nutrition to complement your fitness routine.",
    image: "/placeholder.svg?height=400&width=600",
    link: "/services#nutrition-counseling",
  },
  {
    icon: <Activity className="h-10 w-10 text-primary" />,
    title: "Fitness Assessment",
    description: "Comprehensive evaluation of your current fitness level to establish baselines.",
    image: "/placeholder.svg?height=400&width=600",
    link: "/services#fitness-assessment",
  },
]

export default function FeaturedServices() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Services</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our comprehensive range of fitness services designed to help you achieve your health and wellness
          goals.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
            </div>
            <CardHeader>
              <div className="mb-2">{service.icon}</div>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={service.link}>Learn More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button asChild size="lg">
          <Link href="/services">View All Services</Link>
        </Button>
      </div>
    </section>
  )
}

