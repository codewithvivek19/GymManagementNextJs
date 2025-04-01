import Image from "next/image"
import { Dumbbell, Users, Award, Clock } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">About FitZone</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our mission is to provide a welcoming, inclusive environment where everyone can achieve their fitness goals.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="text-muted-foreground">
            Founded in 2010, FitZone began with a simple vision: to create a fitness center that caters to people of all
            fitness levels. What started as a small gym with basic equipment has grown into a premium fitness
            destination with state-of-the-art facilities.
          </p>
          <p className="text-muted-foreground">
            Over the years, we've helped thousands of members transform their lives through fitness, nutrition guidance,
            and community support. Our team of certified trainers brings decades of combined experience to help you
            achieve your goals.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <Dumbbell className="h-8 w-8 text-primary mb-2" />
              <span className="text-2xl font-bold">50+</span>
              <span className="text-sm text-muted-foreground">Fitness Classes</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <Users className="h-8 w-8 text-primary mb-2" />
              <span className="text-2xl font-bold">5,000+</span>
              <span className="text-sm text-muted-foreground">Happy Members</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <Award className="h-8 w-8 text-primary mb-2" />
              <span className="text-2xl font-bold">20+</span>
              <span className="text-sm text-muted-foreground">Expert Trainers</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <Clock className="h-8 w-8 text-primary mb-2" />
              <span className="text-2xl font-bold">24/7</span>
              <span className="text-sm text-muted-foreground">Access</span>
            </div>
          </div>
        </div>

        <div className="relative h-[500px] rounded-xl overflow-hidden">
          <Image src="/placeholder.svg?height=1000&width=800" alt="Gym interior" fill className="object-cover" />
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Facilities</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Cardio Zone", image: "/placeholder.svg?height=400&width=600" },
            { title: "Strength Training", image: "/placeholder.svg?height=400&width=600" },
            { title: "Group Classes", image: "/placeholder.svg?height=400&width=600" },
            { title: "Personal Training", image: "/placeholder.svg?height=400&width=600" },
            { title: "Recovery Area", image: "/placeholder.svg?height=400&width=600" },
            { title: "Nutrition Bar", image: "/placeholder.svg?height=400&width=600" },
          ].map((facility, index) => (
            <div key={index} className="relative h-64 rounded-lg overflow-hidden group">
              <Image
                src={facility.image || "/placeholder.svg"}
                alt={facility.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <h3 className="text-white font-bold text-xl p-4">{facility.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { name: "John Smith", role: "Founder & Head Trainer", image: "/placeholder.svg?height=400&width=400" },
            { name: "Sarah Johnson", role: "Nutrition Specialist", image: "/placeholder.svg?height=400&width=400" },
            { name: "Mike Williams", role: "Strength Coach", image: "/placeholder.svg?height=400&width=400" },
            { name: "Emily Davis", role: "Yoga Instructor", image: "/placeholder.svg?height=400&width=400" },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative h-64 rounded-full overflow-hidden mx-auto w-64 mb-4">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

