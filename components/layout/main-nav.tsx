import Link from "next/link"
import Image from "next/image"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Membership", href: "/membership" },
  { name: "Pro Trainer", href: "/pro-trainer" },
  { name: "Contact", href: "/contact" },
]

export default function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <div className="relative w-8 h-8">
          <Image src="/logo.svg" alt="Fitness Hub" fill className="object-contain" />
        </div>
        <span className="inline-block font-bold">Fitness Hub</span>
      </Link>
      <nav className="flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center text-sm font-medium transition-colors hover:text-primary"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
} 