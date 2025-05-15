
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import PreHarvest from "@/components/PreHarvest";
import HowItWorks from "@/components/HowItWorks";
import TrustSafety from "@/components/TrustSafety";
import GlobalReach from "@/components/GlobalReach";
import Footer from "@/components/Footer";
import FeaturedProducts from "@/components/FeaturedProducts";
import ContactForm from "@/components/ContactForm";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <Categories />
      <PreHarvest />
      <HowItWorks />
      <TrustSafety />
      <GlobalReach />
      
      {/* Lead Generation Contact Section */}
      <section id="contact" className="py-16 bg-earth-sand-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-earth-olive-dark mb-4">
              Get in Touch with Us
            </h2>
            <p className="text-lg text-earth-olive-dark/80 max-w-2xl mx-auto">
              Have questions about our marketplace, products, or how to start selling? 
              Our team is here to help you grow your agricultural business.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
