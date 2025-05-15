
import { Globe } from "lucide-react";

const countries = [
  { name: "UAE", flag: "🇦🇪", percentage: 80 },
  { name: "Saudi Arabia", flag: "🇸🇦", percentage: 70 },
  { name: "Qatar", flag: "🇶🇦", percentage: 60 },
  { name: "Kuwait", flag: "🇰🇼", percentage: 50 },
  { name: "Bahrain", flag: "🇧🇭", percentage: 40 },
  { name: "Oman", flag: "🇴🇲", percentage: 45 },
  { name: "Jordan", flag: "🇯🇴", percentage: 35 },
  { name: "Egypt", flag: "🇪🇬", percentage: 30 },
  { name: "Pakistan", flag: "🇵🇰", percentage: 25 },
  { name: "India", flag: "🇮🇳", percentage: 20 },
  { name: "Bangladesh", flag: "🇧🇩", percentage: 15 },
];

const GlobalReach = () => {
  return (
    <section id="global-reach" className="py-16 md:py-24 bg-earth-sand-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side with content */}
          <div className="lg:w-1/2 animate-slide-in-left">
            <div className="inline-block bg-earth-gold/20 px-4 py-1 rounded-full text-earth-gold-dark font-medium mb-4">
              GLOBAL NETWORK
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-earth-olive-dark mb-6">
              Connecting GCC Agriculture with Global Markets
            </h2>
            
            <p className="text-lg text-earth-olive-dark/80 mb-8">
              Our marketplace brings together buyers and sellers from across the GCC region and beyond, creating opportunities for international trade and discovery of unique agricultural products.
            </p>
            
            <div className="space-y-4">
              {countries.map((country) => (
                <div key={country.name} className="flex items-center">
                  <span className="text-2xl mr-3">{country.flag}</span>
                  <span className="w-32 text-earth-olive-dark">{country.name}</span>
                  <div className="flex-1 h-2 bg-earth-sand-dark/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-earth-olive rounded-full animate-slide-in-left" 
                      style={{ 
                        width: `${country.percentage}%`,
                        animationDelay: "0.5s"
                      }}
                    ></div>
                  </div>
                  <span className="ml-3 text-earth-olive-dark font-medium">{country.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right side with globe visualization */}
          <div className="lg:w-1/2 animate-fade-in">
            <div className="relative">
              <div className="w-full h-96 bg-earth-olive/5 rounded-full flex items-center justify-center">
                <Globe className="h-48 w-48 text-earth-olive animate-pulse" />
                
                {/* Animated dots representing trade connections */}
                <div className="absolute w-4 h-4 bg-earth-terracotta rounded-full top-1/4 left-1/3 animate-ping" style={{ animationDuration: "3s", animationDelay: "0.2s" }}></div>
                <div className="absolute w-3 h-3 bg-earth-gold rounded-full top-1/2 right-1/4 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "1s" }}></div>
                <div className="absolute w-2 h-2 bg-earth-olive rounded-full bottom-1/4 left-1/3 animate-ping" style={{ animationDuration: "4s", animationDelay: "0.5s" }}></div>
                
                {/* Country labels */}
                <div className="absolute top-1/5 left-1/3 bg-white px-2 py-1 rounded-md shadow-md text-xs text-earth-olive-dark">
                  UAE 🇦🇪
                </div>
                <div className="absolute bottom-1/4 right-1/3 bg-white px-2 py-1 rounded-md shadow-md text-xs text-earth-olive-dark">
                  Saudi Arabia 🇸🇦
                </div>
                <div className="absolute top-1/2 right-1/5 bg-white px-2 py-1 rounded-md shadow-md text-xs text-earth-olive-dark">
                  Qatar 🇶🇦
                </div>
              </div>
              
              {/* Floating stats cards */}
              <div className="absolute -left-5 top-1/3 bg-white rounded-lg shadow-lg p-3 animate-slide-up" style={{ animationDelay: "0.6s" }}>
                <p className="font-semibold text-earth-olive-dark">20+ Countries</p>
                <p className="text-xs text-earth-olive-dark/70">Reach global markets</p>
              </div>
              
              <div className="absolute -right-5 bottom-1/3 bg-white rounded-lg shadow-lg p-3 animate-slide-up" style={{ animationDelay: "0.8s" }}>
                <p className="font-semibold text-earth-olive-dark">1000+ Traders</p>
                <p className="text-xs text-earth-olive-dark/70">International network</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalReach;
