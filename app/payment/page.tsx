"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { getMembershipById, createMembershipPurchase } from "@/lib/supabase"
import { useAuth } from "@/components/auth-provider"

// Fallback data in case API fails
const fallbackMembershipPlans = {
  basic: {
    id: "basic",
    name: "Basic",
    priceUSD: 29.99,
    priceINR: 2499,
    duration: "1 month",
  },
  premium: {
    id: "premium",
    name: "Premium",
    priceUSD: 49.99,
    priceINR: 3999,
    duration: "1 month",
  },
  "premium-quarterly": {
    id: "premium-quarterly",
    name: "Premium Quarterly",
    priceUSD: 129.99,
    priceINR: 10999,
    duration: "3 months",
  },
}

// Component that uses useSearchParams
function PaymentForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()

  const planId = searchParams.get("plan") || "basic"
  const currencyParam = searchParams.get("currency") || "USD"

  const [currency, setCurrency] = useState(currencyParam)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [membershipPlan, setMembershipPlan] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMembershipPlan = async () => {
      try {
        setLoading(true)
        // Try to load the membership from the database
        const data = await getMembershipById(planId)
        
        if (data) {
          setMembershipPlan({
            id: data.id,
            name: data.name,
            priceUSD: Math.round(data.price / 80 * 100) / 100, // Approximate USD price
            priceINR: data.price,
            duration: data.duration || "1 month"
          })
        } else {
          // Fallback to hardcoded data
          setMembershipPlan(fallbackMembershipPlans[planId] || fallbackMembershipPlans.basic)
        }
      } catch (err) {
        console.error('Error fetching membership details:', err)
        setMembershipPlan(fallbackMembershipPlans[planId] || fallbackMembershipPlans.basic)
      } finally {
        setLoading(false)
      }
    }
    
    fetchMembershipPlan()
  }, [planId])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCurrencyChange = (value) => {
    setCurrency(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!membershipPlan) {
        throw new Error("Membership plan not found")
      }
      
      // Calculate membership duration in days
      let durationInDays = 30 // Default to 30 days
      const durationStr = membershipPlan.duration?.toLowerCase() || "1 month"
      
      if (durationStr.includes("month")) {
        const months = parseInt(durationStr) || 1
        durationInDays = months * 30
      } else if (durationStr.includes("year")) {
        const years = parseInt(durationStr) || 1
        durationInDays = years * 365
      } else if (durationStr.includes("day")) {
        durationInDays = parseInt(durationStr) || 30
      }
      
      // Calculate start and end dates
      const startDate = new Date()
      const endDate = new Date(startDate)
      endDate.setDate(endDate.getDate() + durationInDays)
      
      // Prepare purchase data
      const purchaseData = {
        user_id: user?.id || "guest-user", // Use actual user ID if available
        membership_id: membershipPlan.id,
        purchase_date: startDate.toISOString(),
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        amount_paid: currency === "USD" ? membershipPlan.priceUSD * 80 : membershipPlan.priceINR, // Convert USD to INR if needed
        payment_method: "Credit Card",
        status: "active"
      }
      
      // Store in database
      const result = await createMembershipPurchase(purchaseData)
      
      if (!result) {
        throw new Error("Failed to save membership purchase")
      }
      
      toast({
        title: "Payment Successful",
        description: `Thank you for purchasing the ${membershipPlan.name} plan!`,
      })
      
      router.push("/payment/confirmation")
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: "Payment Error",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Loading Payment Details...</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!membershipPlan) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Plan Not Found</CardTitle>
              <CardDescription>The membership plan you selected could not be found.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push("/memberships")}>View Available Plans</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const price = currency === "USD" ? membershipPlan.priceUSD : membershipPlan.priceINR
  const currencySymbol = currency === "USD" ? "$" : "₹"

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Purchase</CardTitle>
            <CardDescription>You are purchasing the {membershipPlan.name} membership plan.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Plan Details</h3>
                    <p className="text-sm text-muted-foreground">{membershipPlan.name} Membership</p>
                    <p className="text-xs text-muted-foreground">Duration: {membershipPlan.duration}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {currencySymbol}
                      {price}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={currency} onValueChange={handleCurrencyChange}>
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="INR">INR (₹)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between font-medium mb-2">
                  <span>Total</span>
                  <span>
                    {currencySymbol}
                    {price}
                  </span>
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : `Pay ${currencySymbol}${price}`}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Main page component with Suspense
export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12 text-center">Loading payment details...</div>}>
      <PaymentForm />
    </Suspense>
  );
}

