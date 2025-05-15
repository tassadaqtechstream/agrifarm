
import React from "react";
import { Handshake, Sprout, ShoppingBag, Truck, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const steps = [
  {
    id: 1,
    title: "Register & Verify",
    description: "Create a secure account with verified business credentials to join our agricultural marketplace community",
    icon: <Shield className="h-8 w-8 text-white" />,
    color: "bg-earth-olive",
  },
  {
    id: 2,
    title: "Connect Directly",
    description: "Browse crops or list your produce with detailed specifications, connecting farmers and buyers without intermediaries",
    icon: <Handshake className="h-8 w-8 text-white" />,
    color: "bg-earth-gold",
  },
  {
    id: 3,
    title: "Pre-Harvest Options",
    description: "Secure future harvests with pre-harvest contracts, giving farmers guaranteed income and buyers assured quality",
    icon: <Sprout className="h-8 w-8 text-white" />,
    color: "bg-earth-terracotta-light",
  },
  {
    id: 4,
    title: "Secure Transactions",
    description: "Complete deals using our escrow-based payment system that protects both parties throughout the process",
    icon: <ShoppingBag className="h-8 w-8 text-white" />,
    color: "bg-earth-terracotta",
  },
  {
    id: 5,
    title: "Logistics Support",
    description: "Utilize our network of verified logistics partners to ensure timely and proper delivery of agricultural goods",
    icon: <Truck className="h-8 w-8 text-white" />,
    color: "bg-earth-olive-dark",
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-gradient-to-b from-white to-earth-sand-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-earth-terracotta font-medium mb-2 block">Our Marketplace Process</span>
          <h2 className="text-3xl md:text-5xl font-bold text-earth-olive-dark mb-6">
            Cultivating Connections, Harvesting Success
          </h2>
          <p className="text-lg md:text-xl text-earth-olive-dark/80 max-w-3xl mx-auto">
            Harv3st MP bridges the gap between agricultural producers and buyers with a secure, 
            transparent marketplace designed for lasting partnerships and sustainable growth.
          </p>
        </div>
        
        <div className="relative">
          {/* Connect line between timeline dots on desktop */}
          <div className="hidden md:block absolute top-36 left-0 right-0 h-1 bg-earth-gold/30 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className="relative flex flex-col items-center text-center group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`${step.color} w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg z-10 group-hover:scale-110 transition-all duration-300`}>
                  {step.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-earth-olive-dark mb-3">
                  {step.title}
                </h3>
                
                <p className="text-earth-olive-dark/80 group-hover:text-earth-olive-dark transition-colors duration-300">
                  {step.description}
                </p>
                
                <div className={`absolute top-0 right-0 md:hidden ${step.color} text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center`}>
                  {step.id}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-20 bg-white shadow-xl rounded-2xl p-8 md:p-12 max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute -top-5 -left-5 text-7xl text-earth-gold opacity-50">"</div>
          
          <div className="relative z-10">
            <blockquote className="text-xl md:text-2xl text-earth-olive-dark/90 text-center mb-8 font-serif italic">
              Harv3st MP has transformed how we source our agricultural supplies. The pre-harvest contracts feature allows us to secure the highest quality produce well in advance, giving both us and the farmers peace of mind.
            </blockquote>
            
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-earth-gold">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Customer testimonial" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-semibold text-lg text-earth-olive-dark">Ahmed Al-Farsi</p>
                <p className="text-earth-olive-dark/70">Procurement Manager, Gulf Fresh Foods</p>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-5 -right-5 text-7xl text-earth-gold opacity-50 rotate-180">"</div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-earth-sand-light rounded-full -translate-y-1/2 translate-x-1/2 opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-earth-gold-light rounded-full translate-y-1/2 -translate-x-1/2 opacity-20"></div>
        </div>
        
        <div className="text-center mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-earth-olive-dark mb-4">Ready to join the agricultural revolution?</h3>
          <p className="text-lg text-earth-olive-dark/80 mb-8 max-w-2xl mx-auto">
            Whether you're growing crops or sourcing the finest produce, Harv3st MP provides the tools and connections you need to thrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-earth-terracotta hover:bg-earth-terracotta-dark text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/join/seller">
                Join as Seller
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-earth-olive text-earth-olive hover:bg-earth-olive hover:text-white px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all duration-300">
              <Link to="/join/buyer">
                Join as Buyer
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
