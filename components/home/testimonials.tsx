import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "FitZone completely transformed my approach to fitness. The trainers are knowledgeable and supportive, and the facilities are top-notch.",
    author: "Sarah Johnson",
    role: "Member since 2020",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    quote:
      "I've tried many gyms over the years, but FitZone stands out for its community feel and personalized approach to fitness.",
    author: "Michael Chen",
    role: "Member since 2019",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    quote:
      "The nutrition counseling combined with personal training has helped me lose 30 pounds and keep it off. I'm in the best shape of my life!",
    author: "Emily Rodriguez",
    role: "Member since 2021",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-muted py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">What Our Members Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Hear from our members who have transformed their lives with FitZone.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background">
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-primary mb-4" />
                <p className="text-muted-foreground mb-6">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter className="flex items-center space-x-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

