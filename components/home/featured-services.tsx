import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

const services = [
  {
    title: "Personal Training",
    description: "Work one-on-one with our certified trainers to achieve your fitness goals faster.",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3",
    link: "/services#personal-training",
  },
  {
    title: "Group Classes",
    description: "Join our energetic group classes for motivation, variety, and community.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    link: "/services#group-classes",
  },
  {
    title: "Nutrition Coaching",
    description: "Get personalized meal plans and nutrition advice to complement your fitness routine.",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3",
    link: "/services#nutrition-coaching",
  },
  {
    title: "Recovery & Wellness",
    description: "Enhance your recovery with our range of wellness services including massage and yoga.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3",
    link: "/services#recovery-wellness",
  },
]

export default function FeaturedServices() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We offer a variety of fitness and wellness services to help you reach your goals.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="overflow-hidden">
              <div className="relative h-48">
                <Image src={service.image} alt={service.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={service.link}>Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

