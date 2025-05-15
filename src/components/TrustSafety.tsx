
import { ShieldCheck, Award, Truck, FileCheck } from "lucide-react";

const TrustSafety = () => {
  return (
    <section className="py-16 md:py-20 bg-earth-olive">
      <div className="container mx-auto px-4 md:px-6 text-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built on Trust & Safety
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            We've created a secure ecosystem for agricultural trade with strict verification and quality assurance at every step.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Verified Sellers</h3>
            <p className="text-white/80">
              Every seller undergoes a thorough verification process before joining our marketplace.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <Award className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Quality Assurance</h3>
            <p className="text-white/80">
              Products must meet our stringent quality standards with regular inspections and reviews.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <Truck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Logistics Support</h3>
            <p className="text-white/80">
              Streamlined logistics solutions to ensure your produce arrives fresh and on time.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <FileCheck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Export Compliance</h3>
            <p className="text-white/80">
              Full support for documentation and compliance with international trade regulations.
            </p>
          </div>
        </div>
        
        <div className="mt-16 text-center animate-slide-up">
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
            <div className="flex items-center space-x-4 text-sm md:text-base">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Secure Payments
              </span>
              <span className="hidden md:flex items-center">
                <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Dispute Resolution
              </span>
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                24/7 Support
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSafety;
