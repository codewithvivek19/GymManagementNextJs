import React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const MembershipPage = () => {
  const membershipPlans = [
    {
      id: 1,
      name: "Basic",
      price: "₹1,499",
      duration: "Monthly",
      description: "Perfect for beginners who want access to essential gym facilities.",
      features: [
        "Access to gym equipment",
        "Locker room access",
        "Fitness assessment",
        "App access",
      ],
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      popular: false,
    },
    {
      id: 2,
      name: "Premium",
      price: "₹2,999",
      duration: "Monthly",
      description: "Our most popular plan with additional benefits and services.",
      features: [
        "All Basic features",
        "Group classes included",
        "1 session with a personal trainer",
        "Nutrition consultation",
        "Towel service",
        "Steam room access",
      ],
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      popular: true,
    },
    {
      id: 3,
      name: "Elite",
      price: "₹4,999",
      duration: "Monthly",
      description: "The ultimate fitness experience with premium services and priority access.",
      features: [
        "All Premium features",
        "Unlimited personal training",
        "Nutrition planning",
        "Priority class booking",
        "Guest passes (2 per month)",
        "Exclusive events access",
        "Massage therapy sessions",
      ],
      image: "https://images.unsplash.com/photo-1623874106686-5be2b325c8f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      popular: false,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Membership Plans</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that fits your fitness goals and lifestyle. All memberships include 24/7 access to our state-of-the-art facilities.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {membershipPlans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`overflow-hidden flex flex-col h-full ${plan.popular ? 'border-primary shadow-lg' : ''}`}
          >
            <div className="relative h-48">
              <Image
                src={plan.image}
                alt={`${plan.name} Membership`}
                fill
                className="object-cover"
              />
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-2">/ {plan.duration}</span>
              </div>
              <CardDescription className="mt-2">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant={plan.popular ? "default" : "outline"}>
                <Link href="/payment">Choose Plan</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Membership Benefits</h2>
            <p className="text-lg text-muted-foreground mb-6">
              All of our memberships come with core benefits to enhance your fitness journey:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mr-3" />
                <span>24/7 access to our state-of-the-art facility</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mr-3" />
                <span>Mobile app for booking, tracking, and fitness content</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mr-3" />
                <span>Clean, modern locker rooms with showers</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mr-3" />
                <span>Free parking for members</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mr-3" />
                <span>No long-term contracts - month-to-month options available</span>
              </li>
            </ul>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3" 
              alt="Gym facilities"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold mb-4">Need Help Choosing?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Not sure which plan is right for you? Schedule a free consultation with our membership team.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}

export default MembershipPage 