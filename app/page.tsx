import Hero from "@/components/home/hero"
import FeaturedServices from "@/components/home/featured-services"
import Testimonials from "@/components/home/testimonials"
import MembershipPreview from "@/components/home/membership-preview"
import CallToAction from "@/components/home/call-to-action"

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      <Hero />
      <FeaturedServices />
      <Testimonials />
      <MembershipPreview />
      <CallToAction />
    </div>
  )
}

