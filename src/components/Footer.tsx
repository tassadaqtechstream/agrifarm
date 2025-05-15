
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Globe,
  ChevronRight
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-earth-olive-dark text-white">
      <div className="container mx-auto px-4 py-12 md:py-16 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About column */}
          <div>
            <div className="flex flex-col mb-3">
              <div className="font-bold text-xl">
                <span className="text-earth-terracotta">Harv</span>
                <span className="text-white">3</span>
                <span className="text-earth-terracotta">st</span>
                <span className="text-white ml-1">MP</span>
              </div>
              <span className="text-xs text-white/70 mt-1">sow, sell, secure</span>
            </div>
            
            <p className="text-white/80 mb-5">
              Connecting agricultural producers and buyers across the GCC region and beyond through our innovative marketplace platform.
            </p>
            
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/80 hover:text-white flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Product Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Pre-Harvest Contracts
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="text-white/80">
                  Sohar city, building 2<br />
                  Oman
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="text-white/80">+971 4 123 4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="text-white/80">info@oasistrade.com</span>
              </li>
              <li className="flex items-center">
                <Globe className="h-5 w-5 mr-3 flex-shrink-0" />
                <div className="flex items-center">
                  <button className="text-white/80 hover:text-white">English</button>
                  <span className="mx-2">|</span>
                  <button className="text-white/80 hover:text-white">عربي</button>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Newsletter</h3>
            <p className="text-white/80 mb-4">
              Subscribe to our newsletter for the latest updates on agricultural trends and marketplace features.
            </p>
            
            <div className="flex mb-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/10 py-2 px-3 rounded-l-md w-full placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-earth-terracotta"
              />
              <Button className="bg-earth-terracotta hover:bg-earth-terracotta-dark rounded-l-none">
                Subscribe
              </Button>
            </div>
            
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1 text-earth-terracotta" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm text-white/80">We respect your privacy</span>
            </div>
            
            <div className="mt-5">
              <h4 className="font-semibold mb-2">Download Our App</h4>
              <div className="flex space-x-3">
                <a href="#" className="bg-white/10 hover:bg-white/20 transition-colors rounded-md px-3 py-2 flex items-center">
                  <span className="mr-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.0499 0H6.94995C3.11995 0 0 3.12 0 6.95V17.05C0 20.88 3.11995 24 6.94995 24H17.0499C20.8799 24 23.9999 20.88 23.9999 17.05V6.95C23.9999 3.12 20.8799 0 17.0499 0Z" fill="white"/>
                      <path d="M17.5099 12.0099C17.4999 12.2899 17.4699 12.5699 17.3899 12.8399C17.1999 13.4899 16.7999 14.0299 16.2599 14.4299C15.8699 14.7199 15.4399 14.9099 14.9799 14.9999C14.7999 15.0299 14.6299 15.0599 14.4499 15.0599C14.0799 15.0599 13.6999 14.9699 13.3699 14.8199L12.4999 15.0999L11.4799 15.4199C11.4699 15.4199 11.4699 15.4199 11.4599 15.4199C11.3699 15.4499 11.2799 15.3799 11.2699 15.2899V15.2799L11.3199 14.3699C11.3399 14.0299 11.3599 13.6499 11.3799 13.3599C11.3799 13.3399 11.3799 13.3199 11.3799 13.2999C11.3799 13.2599 11.3699 13.2099 11.3499 13.1699C11.1799 12.8399 11.0999 12.4599 11.0999 12.0799C11.0999 10.4099 12.4599 9.04995 14.1299 9.04995C15.7999 9.04995 17.1599 10.4099 17.1599 12.0799C17.5099 12.0099 17.5099 12.0099 17.5099 12.0099ZM9.85993 12.0799C9.85993 12.5599 9.96993 13.0199 10.1599 13.4399C10.1899 13.5099 10.2099 13.5899 10.2099 13.6599C10.2099 13.6999 10.2099 13.7399 10.2099 13.7899C10.1999 13.9999 10.1899 14.2899 10.1599 14.6499L10.0899 15.8999C10.0799 16.0299 10.1399 16.1699 10.2699 16.2199C10.3999 16.2799 10.5399 16.2399 10.6099 16.1199L11.9999 14.0099C12.0599 14.0199 12.1299 14.0399 12.1899 14.0499C12.3799 14.0999 12.5699 14.1199 12.7699 14.1199C13.0399 14.1199 13.3099 14.0799 13.5699 14.0099C13.9799 13.8799 14.3499 13.6599 14.6499 13.3699C15.0199 13.0399 15.2899 12.6199 15.4299 12.1299C15.4799 11.9699 15.5199 11.7999 15.5299 11.6299C15.5399 11.4499 15.5399 11.2699 15.5299 11.0899C15.4699 10.1999 15.0099 9.38995 14.2999 8.87995C13.9699 8.63995 13.5899 8.45995 13.1799 8.36995C12.9799 8.32995 12.7799 8.30995 12.5799 8.30995C11.7099 8.30995 10.8899 8.67995 10.3099 9.25995C10.0099 9.55995 9.77993 9.92995 9.62993 10.3399C9.47993 10.7499 9.39993 11.1999 9.39993 11.6599C9.85993 12.0799 9.85993 12.0799 9.85993 12.0799Z" fill="white"/>
                    </svg>
                  </span>
                  App Store
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 transition-colors rounded-md px-3 py-2 flex items-center">
                  <span className="mr-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.84995 0.95C4.63995 1.16 4.49995 1.5 4.49995 1.93V22.05C4.49995 22.48 4.63995 22.82 4.84995 23.03L4.91995 23.1L15.2999 12.72V12.27L4.91995 1.89L4.84995 0.95Z" fill="white"/>
                      <path d="M19.0499 16.4999L15.2999 12.7499V12.2999L19.0499 8.54995L19.1499 8.59995L23.5499 11.1499C24.7499 11.8499 24.7499 12.9499 23.5499 13.6499L19.1499 16.1999L19.0499 16.4999Z" fill="white"/>
                      <path d="M19.15 16.1999L15.3 12.4999L4.85 22.9999C5.23 23.3999 5.85 23.4499 6.54 23.0499L19.15 16.1999Z" fill="#5C6D35"/>
                      <path d="M19.1499 8.79993L6.5399 1.94993C5.8499 1.54993 5.2299 1.59993 4.8499 1.99993L15.2999 12.4999L19.1499 8.79993Z" fill="#C65F46"/>
                    </svg>
                  </span>
                  Google Play
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} Harv3st Marketplace. All rights reserved. The premier agricultural marketplace for the GCC region.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
