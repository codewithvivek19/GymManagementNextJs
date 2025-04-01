import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const trainers = [
  {
    id: 1,
    name: "John Smith",
    gender: "male",
    image: "/placeholder.svg?height=400&width=400",
    specialization: "Strength & Conditioning",
    experience: "10+ years",
    bio: "John is a certified strength and conditioning specialist with over a decade of experience helping clients achieve their fitness goals. He specializes in powerlifting and functional training.",
    certifications: ["CSCS", "NASM-CPT", "CrossFit L3"],
  },
  {
    id: 2,
    name: "Michael Johnson",
    gender: "male",
    image: "/placeholder.svg?height=400&width=400",
    specialization: "Sports Performance",
    experience: "8 years",
    bio: "Michael is a former college athlete who specializes in sports-specific training. He works with athletes of all levels to improve performance and prevent injuries.",
    certifications: ["NSCA-CPT", "PES", "CES"],
  },
  {
    id: 3,
    name: "David Williams",
    gender: "male",
    image: "/placeholder.svg?height=400&width=400",
    specialization: "Weight Loss & Nutrition",
    experience: "6 years",
    bio: "David combines exercise science with nutrition coaching to help clients transform their bodies. His holistic approach focuses on sustainable lifestyle changes.",
    certifications: ["ACE-CPT", "Precision Nutrition", "TRX"],
  },
  {
    id: 4,
    name: "Sarah Johnson",
    gender: "female",
    image: "/placeholder.svg?height=400&width=400",
    specialization: "Yoga & Mobility",
    experience: "12 years",
    bio: "Sarah is a 500-hour certified yoga instructor with additional training in mobility and corrective exercise. She helps clients improve flexibility, reduce pain, and enhance recovery.",
    certifications: ["RYT-500", "FRC", "NASM-CES"],
  },
]

export default function TrainerSection() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Meet Our Expert Trainers</h3>
        <p className="text-muted-foreground">
          Our certified trainers are here to guide you on your fitness journey with personalized programs and expert
          advice.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trainers.map((trainer) => (
          <Card key={trainer.id} className="overflow-hidden">
            <div className="relative h-64">
              <Image src={trainer.image || "/placeholder.svg"} alt={trainer.name} fill className="object-cover" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle>{trainer.name}</CardTitle>
              <CardDescription>{trainer.specialization}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pb-2">
              <p className="text-sm">
                <span className="font-medium">Experience:</span> {trainer.experience}
              </p>
              <div className="flex flex-wrap gap-2">
                {trainer.certifications.map((cert, index) => (
                  <Badge key={index} variant="secondary">
                    {cert}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Profile
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="bg-muted p-6 rounded-lg mt-8">
        <h3 className="text-xl font-bold mb-4">Book a Session with a Trainer</h3>
        <p className="text-muted-foreground mb-4">
          Get personalized guidance from our expert trainers to accelerate your fitness journey. Whether you're just
          starting out or looking to break through a plateau, our trainers can help.
        </p>
        <Button>Schedule a Consultation</Button>
      </div>
    </div>
  )
}

