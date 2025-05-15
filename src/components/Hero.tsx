
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Sprout, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-earth-sand-light via-earth-sand to-earth-sand-dark">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-earth-terracotta/5 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-earth-olive/5 blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-earth-gold/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-28 min-h-[calc(100vh-4rem)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content section */}
          <div className="order-2 md:order-1 z-10">
            <div 
              className="inline-flex items-center px-4 py-2 bg-earth-terracotta/10 text-earth-terracotta font-medium rounded-full mb-6 animate-fade-in"
            >
              <Sprout className="h-4 w-4 mr-2" />
              <span>Premier GCC Agricultural Marketplace</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-earth-olive-dark mb-6 animate-fade-in leading-tight">
              Where GCC Agriculture <span className="text-earth-terracotta">Meets Global</span> Trade
            </h1>
            
            <p className="text-lg md:text-xl text-earth-olive mb-8 animate-slide-up leading-relaxed max-w-xl">
              Connect with farmers, wholesalers, and buyers across the region and beyond. From fresh produce to pre-harvest contracts, Harv3st Marketplace helps you grow your agricultural business.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12 animate-slide-up">
              <Link
                to="/pre-harvest"
                className="btn-primary inline-flex items-center gap-2 rounded-full shadow-lg hover:shadow-earth-terracotta/20 transition-all duration-300"
              >
                <ShoppingBag className="h-5 w-5" />
                Explore Pre-Harvest Deals
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link
                to="/categories"
                className="btn-secondary inline-flex items-center gap-2 rounded-full border border-earth-olive/20 hover:border-earth-olive transition-all duration-300"
              >
                Browse Categories
              </Link>
            </div>

            {/* Stats section */}
            <div className="grid grid-cols-3 gap-3 animate-slide-up">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-white/40 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <span className="block font-bold text-2xl text-earth-terracotta">500+</span>
                <span className="text-sm text-earth-olive-dark">Verified Sellers</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-white/40 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <span className="block font-bold text-2xl text-earth-terracotta">15K+</span>
                <span className="text-sm text-earth-olive-dark">Products</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-white/40 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <span className="block font-bold text-2xl text-earth-terracotta">6</span>
                <span className="text-sm text-earth-olive-dark">GCC Countries</span>
              </div>
            </div>
          </div>
          
          {/* Image section */}
          <div className="order-1 md:order-2 relative animate-fade-in">
            <div className="relative">
              {/* Main image with frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="/lovable-uploads/0d982ab6-da00-46cf-8ad2-959c23c5a351.png"
                  alt="Global agricultural trade with farmer and business person" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-earth-olive-dark/40 to-transparent"></div>
              </div>
              
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 animate-slide-up">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-earth-gold text-white">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-earth-olive-dark">Global Reach</p>
                    <p className="text-xs text-earth-olive">Connect with buyers & sellers worldwide</p>
                  </div>
                </div>
              </div>
              
              {/* Pre-harvest badge */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-xl p-3 animate-slide-up">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-earth-terracotta text-white">
                    <span className="font-bold text-sm">NEW</span>
                  </div>
                  <div>
                    <p className="font-semibold text-earth-olive-dark">Pre-Harvest Contracts</p>
                    <p className="text-xs text-earth-olive">Secure your produce early</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
