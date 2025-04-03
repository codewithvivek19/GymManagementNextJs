import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10">
                <Image 
                  src="/logo.svg" 
                  alt="Fitness Hub Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white">Fitness Hub</span>
            </div>
            <p className="text-gray-400 mb-4">
              Transforming lives through fitness since 2015. Join our community and begin your fitness journey today.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-primary transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/membership" className="text-gray-400 hover:text-primary transition-colors">Membership</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#personal-training" className="text-gray-400 hover:text-primary transition-colors">Personal Training</Link>
              </li>
              <li>
                <Link href="/services#group-classes" className="text-gray-400 hover:text-primary transition-colors">Group Classes</Link>
              </li>
              <li>
                <Link href="/services#nutrition-coaching" className="text-gray-400 hover:text-primary transition-colors">Nutrition Coaching</Link>
              </li>
              <li>
                <Link href="/services#recovery-wellness" className="text-gray-400 hover:text-primary transition-colors">Recovery & Wellness</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-400">
              <p className="mb-2">123 Fitness Street</p>
              <p className="mb-2">Mumbai, Maharashtra 400001</p>
              <p className="mb-2">India</p>
              <p className="mb-4">
                <a href="tel:+919876543210" className="hover:text-primary transition-colors">+91 98765 43210</a>
              </p>
              <p>
                <a href="mailto:info@fitnesshub.com" className="hover:text-primary transition-colors">info@fitnesshub.com</a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Fitness Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 