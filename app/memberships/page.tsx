"use client"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { getMemberships } from "@/lib/supabase"
import { Skeleton } from "@/components/ui/skeleton"

// Fallback data in case API fails
const fallbackMembershipPlans = [
  {
    id: "basic",
    name: "Basic",
    description: "Essential access to gym facilities",
    priceUSD: 29.99,
    priceINR: 2499,
    features: ["Access to gym equipment", "Locker room access", "Free WiFi", "Fitness assessment", "Mobile app access"],
    notIncluded: ["Group classes", "Personal training sessions", "Nutrition consultation", "Towel service"],
  },
  {
    id: "premium",
    name: "Premium",
    description: "Full access with additional perks",
    priceUSD: 49.99,
    priceINR: 3999,
    features: [
      "Access to gym equipment",
      "Locker room access",
      "Free WiFi",
      "Fitness assessment",
      "Mobile app access",
      "Unlimited group classes",
      "1 personal training session/month",
      "Towel service",
    ],
    notIncluded: ["Nutrition consultation", "Guest passes"],
    popular: true,
  },
  {
    id: "premium-quarterly",
    name: "Premium Quarterly",
    description: "Premium plan with quarterly commitment",
    priceUSD: 129.99,
    priceINR: 10999,
    features: [
      "Access to gym equipment",
      "Locker room access",
      "Free WiFi",
      "Fitness assessment",
      "Mobile app access",
      "Unlimited group classes",
      "3 personal training sessions/quarter",
      "Towel service",
      "Nutrition consultation",
      "2 guest passes per quarter",
    ],
    notIncluded: [],
    duration: "3 months",
    savings: "Save 15%",
  },
]

// Types
interface Membership {
  id: string;
  title: string;
  description?: string;
  price: number;
  duration?: string;
  features: string[];
  image_url?: string;
}

interface FormattedMembership {
  id: string;
  name: string;
  description: string;
  priceUSD: number;
  priceINR: number;
  features: string[];
  notIncluded: string[];
  popular?: boolean;
  duration?: string;
  savings?: string;
}

export default function MembershipsPage() {
  const [currency, setCurrency] = useState<"USD" | "INR">("INR")
  const [memberships, setMemberships] = useState<FormattedMembership[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchMemberships() {
      try {
        setLoading(true)
        const data = await getMemberships()
        
        if (data && data.length > 0) {
          // Format the data from Supabase to match the expected format
          const formattedData = data.map((item: Membership) => {
            let features: string[] = []
            if (typeof item.features === 'string') {
              try {
                features = JSON.parse(item.features)
              } catch (e) {
                console.error('Error parsing features:', e)
              }
            } else if (Array.isArray(item.features)) {
              features = item.features
            }
            
            // For demonstration - set the premium plan as popular
            const popular = item.title.toLowerCase().includes('premium') && !item.title.toLowerCase().includes('quarterly')
            
            // For quarterly plans, add a savings note
            const savings = item.title.toLowerCase().includes('quarterly') ? 'Save 15%' : undefined
            
            // Calculate USD price (just for illustration - normally would come from DB)
            const priceINR = typeof item.price === 'number' ? item.price : parseInt(item.price)
            const priceUSD = Math.round(priceINR / 80 * 100) / 100
            
            return {
              id: item.id,
              name: item.title,
              description: item.description || '',
              priceUSD: priceUSD,
              priceINR: priceINR,
              features: features,
              notIncluded: [], // This would need to come from the database
              popular,
              duration: item.duration,
              savings
            }
          })
          
          setMemberships(formattedData)
        } else {
          // Fallback to hardcoded data if API returns empty result
          setMemberships(fallbackMembershipPlans)
          console.warn('No memberships found in database, using fallback data')
        }
      } catch (err) {
        console.error('Error fetching memberships:', err)
        setError('Failed to load memberships')
        setMemberships(fallbackMembershipPlans)
      } finally {
        setLoading(false)
      }
    }
    
    fetchMemberships()
  }, [])

  const handlePurchase = (planId: string) => {
    router.push(`/payment?plan=${planId}&currency=${currency}`)
  }

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Membership Plans</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect membership plan that fits your fitness goals and budget.
          </p>
        </div>
        
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-2">
            <Label htmlFor="currency-toggle">USD</Label>
            <Switch id="currency-toggle" />
            <Label htmlFor="currency-toggle">INR</Label>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="relative">
              <CardHeader>
                <Skeleton className="h-8 w-1/3 mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-10 w-1/4" />
                <div>
                  <Skeleton className="h-4 w-1/3 mb-4" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((j) => (
                      <Skeleton key={j} className="h-4 w-full" />
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Oops!</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          {error}. Please try again later.
        </p>
        <Button onClick={() => window.location.reload()}>Refresh Page</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Membership Plans</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect membership plan that fits your fitness goals and budget.
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="flex items-center space-x-2">
          <Label htmlFor="currency-toggle">USD</Label>
          <Switch
            id="currency-toggle"
            checked={currency === "INR"}
            onCheckedChange={(checked) => setCurrency(checked ? "INR" : "USD")}
          />
          <Label htmlFor="currency-toggle">INR</Label>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {memberships.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.popular ? "border-primary" : ""}`}>
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
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">
                {currency === "USD" ? `$${plan.priceUSD}` : `₹${plan.priceINR}`}
                <span className="text-sm font-normal text-muted-foreground">
                  /month{plan.duration ? ` (${plan.duration})` : ""}
                </span>
              </div>

              <div>
                <h4 className="font-medium mb-2">What's included:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {plan.notIncluded && plan.notIncluded.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2 text-muted-foreground">Not included:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    {plan.notIncluded.map((feature, index) => (
                      <li key={index} className="flex">
                        <span className="ml-7">• {feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handlePurchase(plan.id)}
              >
                Choose Plan
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

