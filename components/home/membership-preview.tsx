import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

const membershipPlans = [
  {
    name: "Basic",
    price: "$29.99",
    description: "Essential access to gym facilities",
    features: ["Access to gym equipment", "Locker room access", "Free WiFi"],
    popular: false,
  },
  {
    name: "Premium",
    price: "$49.99",
    description: "Full access with additional perks",
    features: [
      "Access to gym equipment",
      "Unlimited group classes",
      "1 personal training session/month",
      "Towel service",
    ],
    popular: true,
  },
  {
    name: "Premium Quarterly",
    price: "$129.99",
    description: "Premium plan with quarterly commitment",
    features: [
      "All Premium features",
      "3 personal training sessions/quarter",
      "Nutrition consultation",
      "2 guest passes per quarter",
    ],
    popular: false,
    savings: "Save 15%",
  },
]

export default function MembershipPreview() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Membership Plans</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect membership plan that fits your fitness goals and budget.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {membershipPlans.map((plan, index) => (
          <Card key={index} className={`relative ${plan.popular ? "border-primary" : ""}`}>
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                Most Popular
              </div>
            )}
            {plan.savings && (
              <div className="absolute top-0 left-0 bg-green-500 text-white px-3 py-1 text-sm font-medium rounded-br-lg rounded-tl-lg">
                {plan.savings}
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <p className="text-muted-foreground">{plan.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">
                {plan.price}
                <span className="text-sm font-normal text-muted-foreground">/month</span>
              </div>

              <ul className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                <Link href="/memberships">Choose Plan</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

