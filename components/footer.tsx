import Link from "next/link"
import { Dumbbell, Facebook, Instagram, Twitter, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Dumbbell className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">FitZone</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Transforming lives through fitness since 2010. Join our community and achieve your fitness goals.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="mailto:info@fitzone.com" className="text-muted-foreground hover:text-primary">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/memberships" className="text-muted-foreground hover:text-primary text-sm">
                  Memberships
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#personal-training" className="text-muted-foreground hover:text-primary text-sm">
                  Personal Training
                </Link>
              </li>
              <li>
                <Link href="/services#group-classes" className="text-muted-foreground hover:text-primary text-sm">
                  Group Classes
                </Link>
              </li>
              <li>
                <Link
                  href="/services#nutrition-counseling"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  Nutrition Counseling
                </Link>
              </li>
              <li>
                <Link href="/services#fitness-assessment" className="text-muted-foreground hover:text-primary text-sm">
                  Fitness Assessment
                </Link>
              </li>
              <li>
                <Link href="/pro-trainer" className="text-muted-foreground hover:text-primary text-sm">
                  Pro Trainer Zone
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Contact Info</h3>
            <address className="not-italic space-y-2 text-sm text-muted-foreground">
              <p>123 Fitness Avenue</p>
              <p>Workout City, WC 12345</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Email: info@fitzone.com</p>
            </address>
            <div className="mt-4">
              <h4 className="font-medium text-sm mb-2">Hours</h4>
              <p className="text-sm text-muted-foreground">Mon-Fri: 5:00 AM - 11:00 PM</p>
              <p className="text-sm text-muted-foreground">Sat: 7:00 AM - 9:00 PM</p>
              <p className="text-sm text-muted-foreground">Sun: Closed</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} FitZone. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

