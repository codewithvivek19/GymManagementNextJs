import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const services = [
  {
    id: "personal-training",
    category: "training",
    title: "Personal Training",
    description: "One-on-one sessions with our expert trainers tailored to your specific goals and fitness level.",
    image: "/placeholder.svg?height=600&width=800",
    features: ["Customized workout plans", "Nutritional guidance", "Regular progress tracking", "Flexible scheduling"],
  },
  {
    id: "group-classes",
    category: "classes",
    title: "Group Classes",
    description: "High-energy group sessions led by professional instructors in a motivating environment.",
    image: "/placeholder.svg?height=600&width=800",
    features: [
      "Variety of class types",
      "All fitness levels welcome",
      "Social and motivating atmosphere",
      "Regular schedule",
    ],
  },
  {
    id: "nutrition-counseling",
    category: "nutrition",
    title: "Nutrition Counseling",
    description: "Expert advice on diet and nutrition to complement your fitness routine and maximize results.",
    image: "/placeholder.svg?height=600&width=800",
    features: ["Personalized meal plans", "Dietary assessments", "Supplement recommendations", "Ongoing support"],
  },
  {
    id: "strength-training",
    category: "training",
    title: "Strength Training",
    description:
      "Build muscle, increase strength, and improve overall fitness with our comprehensive strength programs.",
    image: "/placeholder.svg?height=600&width=800",
    features: ["Free weights area", "Machine circuits", "Functional training", "Progressive programs"],
  },
  {
    id: "cardio-fitness",
    category: "training",
    title: "Cardio Fitness",
    description: "Improve heart health, burn calories, and boost endurance with our state-of-the-art cardio equipment.",
    image: "/placeholder.svg?height=600&width=800",
    features: ["Treadmills and ellipticals", "Rowing machines", "Stair climbers", "Indoor cycling"],
  },
  {
    id: "yoga-pilates",
    category: "classes",
    title: "Yoga & Pilates",
    description: "Enhance flexibility, core strength, and mental wellbeing with our yoga and pilates classes.",
    image: "/placeholder.svg?height=600&width=800",
    features: ["Various yoga styles", "Mat and reformer pilates", "Mindfulness practices", "Suitable for all levels"],
  },
  {
    id: "recovery-wellness",
    category: "wellness",
    title: "Recovery & Wellness",
    description:
      "Optimize your recovery with our range of wellness services designed to reduce soreness and prevent injury.",
    image: "/placeholder.svg?height=600&width=800",
    features: ["Massage therapy", "Sauna and steam room", "Stretching area", "Cold plunge"],
  },
  {
    id: "fitness-assessment",
    category: "wellness",
    title: "Fitness Assessment",
    description:
      "Comprehensive evaluation of your current fitness level to establish baselines and set realistic goals.",
    image: "/placeholder.svg?height=600&width=800",
    features: [
      "Body composition analysis",
      "Strength and endurance testing",
      "Flexibility assessment",
      "Personalized recommendations",
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Our Services</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our comprehensive range of fitness services designed to help you achieve your health and wellness
          goals.
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-12">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="all">All Services</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="wellness">Wellness</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </TabsContent>

        {["training", "classes", "nutrition", "wellness"].map((category) => (
          <TabsContent key={category} value={category} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services
              .filter((service) => service.category === category)
              .map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function ServiceCard({ service }) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
        <p className="text-muted-foreground mb-4">{service.description}</p>
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Features:</h4>
          <ul className="space-y-1">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button className="w-full">Learn More</Button>
      </div>
    </div>
  )
}

