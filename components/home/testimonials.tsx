"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"

const testimonials = [
  {
    name: "Arjun Mehta",
    text: "I've tried many gyms before, but none compare to the personalized attention and results I've achieved here. The trainers are knowledgeable and the community is so supportive!",
    role: "Software Engineer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Kavita Patel",
    text: "The nutrition coaching combined with the training program has completely transformed my health. I've lost 15kg and gained so much confidence in the process!",
    role: "Marketing Executive",
    image: "https://images.unsplash.com/photo-1621784563330-caee0b138a00?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Rajiv Kumar",
    text: "As a senior, I was hesitant to join a gym, but the staff made me feel welcome and designed a program specifically for my needs. My mobility has improved tremendously!",
    role: "Retired Professor",
    image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-muted py-16">
      <div className="container space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">What Our Members Say</h2>
          <p className="text-muted-foreground">
            Hear from our satisfied members about their fitness journeys and the results they've achieved.
          </p>
        </div>

        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.name}>
                <Card>
                  <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2 text-center md:text-left">
                      <blockquote className="text-lg italic">"{testimonial.text}"</blockquote>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}

