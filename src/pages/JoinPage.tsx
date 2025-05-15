
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Store, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const JoinPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-earth-olive-dark mb-4">
              Join Harv3st Marketplace
            </h1>
            <p className="text-lg text-earth-olive-dark/80">
              Connect with buyers and sellers across the GCC region and beyond. 
              Choose the account type that best fits your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 hover:border-earth-terracotta hover:shadow-md transition-all">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 flex items-center justify-center bg-earth-terracotta/10 rounded-full mx-auto mb-4">
                  <ShoppingBag className="h-8 w-8 text-earth-terracotta" />
                </div>
                <CardTitle className="text-xl text-earth-olive-dark">Join as a Buyer</CardTitle>
                <CardDescription>
                  Find quality agricultural products from verified producers in the GCC region and beyond
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-4">
                <ul className="space-y-2">
                  {[
                    "Access thousands of agricultural products",
                    "Secure pre-harvest contracts",
                    "Direct communication with sellers",
                    "Verified quality and compliance",
                    "Secure payment system"
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <svg 
                        className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                      <span className="text-earth-olive-dark/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  asChild 
                  className="w-full bg-earth-terracotta hover:bg-earth-terracotta-dark"
                >
                  <Link to="/join/buyer" className="flex items-center justify-center">
                    Join as Buyer
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="border-2 hover:border-earth-terracotta hover:shadow-md transition-all">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 flex items-center justify-center bg-earth-terracotta/10 rounded-full mx-auto mb-4">
                  <Store className="h-8 w-8 text-earth-terracotta" />
                </div>
                <CardTitle className="text-xl text-earth-olive-dark">Join as a Seller</CardTitle>
                <CardDescription>
                  List your agricultural products and connect with buyers globally
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-4">
                <ul className="space-y-2">
                  {[
                    "Reach thousands of potential buyers",
                    "Offer pre-harvest contracts",
                    "Secure payments and escrow service",
                    "Export documentation support",
                    "Tools to manage your listings and inventory",
                    "Analytics and market insights"
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <svg 
                        className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                      <span className="text-earth-olive-dark/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  asChild 
                  className="w-full bg-earth-terracotta hover:bg-earth-terracotta-dark"
                >
                  <Link to="/join/seller" className="flex items-center justify-center">
                    Join as Seller
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
            <h2 className="text-xl font-semibold text-earth-olive-dark mb-4">
              Already have an account?
            </h2>
            <p className="text-earth-olive-dark/80 mb-4">
              If you already have an account with us, please sign in to access your dashboard.
            </p>
            <Button asChild variant="outline">
              <Link to="/signin">Sign In</Link>
            </Button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-earth-olive-dark/60">
              By joining Harv3st Marketplace, you agree to our{" "}
              <Link to="/terms" className="text-earth-terracotta hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-earth-terracotta hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JoinPage;
