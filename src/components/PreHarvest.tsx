import { Button } from "@/components/ui/button";
import { Calendar, Clock, CreditCard, ShieldCheck, Map, Satellite, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const PreHarvest = () => {
  const { isAuthenticated, user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cropDetails: "",
    quantity: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleExploreClick = () => {
    if (!isAuthenticated) {
      // Show auth dialog instead of redirecting
      setShowAuthDialog(true);
      return;
    }
    
    // If authenticated but not a buyer, show toast notification
    if (profile && profile.user_type !== 'buyer') {
      toast({
        title: "Access Restricted",
        description: "Only buyers can access pre-harvest opportunities. Please register as a buyer.",
        variant: "destructive"
      });
      return;
    }
    
    // If authenticated as a buyer, navigate directly
    navigate('/pre-harvest');
  };

  const handleQuoteClick = () => {
    // Pre-fill form if user is authenticated
    if (isAuthenticated && user && profile) {
      setFormData({
        ...formData,
        name: `${profile.first_name || ""} ${profile.last_name || ""}`.trim(),
        email: user.email || "",
        phone: profile.phone_number || "",
      });
    }
    // Show quote request dialog - no authentication required
    setShowQuoteDialog(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real application, you would make an API call here
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Quote request sent!",
        description: "Our team will contact you shortly with pre-harvest options.",
      });
      
      setShowQuoteDialog(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        cropDetails: "",
        quantity: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignIn = () => {
    navigate('/signin', { state: { from: '/pre-harvest' } });
    setShowAuthDialog(false);
  };

  const handleSignUp = () => {
    navigate('/join/buyer', { state: { from: '/pre-harvest' } });
    setShowAuthDialog(false);
  };

  return (
    <>
      <section id="pre-harvest" className="relative py-28 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200')`,
          }}
        />
        <div className="absolute inset-0 bg-black/60 -z-10" />

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Content */}
            <div className="space-y-10 text-center">
              <div className="inline-flex items-center px-5 py-3 rounded-full bg-earth-terracotta/30 text-white backdrop-blur-sm">
                <Satellite className="w-5 h-5 mr-2" />
                <span className="text-base font-semibold">Smart Agriculture</span>
              </div>

              <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-md">
                Plan Your Harvest with Precision & Intelligence
              </h2>

              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Leverage satellite analytics and smart contracts to secure your agricultural future. Monitor crop health, visualize farm boundaries, and make data-driven decisions before harvest time.
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="group p-6 rounded-xl bg-white/10 hover:bg-white/20 duration-300 backdrop-blur-sm border border-white/20 shadow-lg">
                  <div className="flex items-start gap-5">
                    <div className="p-3 rounded-lg bg-earth-terracotta/30 text-white">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-xl text-white mb-2">Advance Planning</h4>
                      <p className="text-base text-white/90">Secure future supplies up to 6 months ahead</p>
                    </div>
                  </div>
                </div>

                <div className="group p-6 rounded-xl bg-white/10 hover:bg-white/20 duration-300 backdrop-blur-sm border border-white/20 shadow-lg">
                  <div className="flex items-start gap-5">
                    <div className="p-3 rounded-lg bg-earth-terracotta/30 text-white">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-xl text-white mb-2">Smart Pricing</h4>
                      <p className="text-base text-white/90">Choose from various pricing models</p>
                    </div>
                  </div>
                </div>

                <div className="group p-6 rounded-xl bg-white/10 hover:bg-white/20 duration-300 backdrop-blur-sm border border-white/20 shadow-lg">
                  <div className="flex items-start gap-5">
                    <div className="p-3 rounded-lg bg-earth-terracotta/30 text-white">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-xl text-white mb-2">Verified Contracts</h4>
                      <p className="text-base text-white/90">Protected by escrow services</p>
                    </div>
                  </div>
                </div>

                <div className="group p-6 rounded-xl bg-white/10 hover:bg-white/20 duration-300 backdrop-blur-sm border border-white/20 shadow-lg">
                  <div className="flex items-start gap-5">
                    <div className="p-3 rounded-lg bg-earth-terracotta/30 text-white">
                      <Satellite className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-xl text-white mb-2">Real-time Analytics</h4>
                      <p className="text-base text-white/90">Monitor crops via satellite data</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-earth-terracotta hover:bg-earth-terracotta-dark text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                  onClick={handleExploreClick}
                >
                  Explore Pre-Harvest Opportunities
                </Button>
                
                <Button 
                  className="bg-transparent hover:bg-white/20 text-white border-2 border-white px-8 py-6 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                  onClick={handleQuoteClick}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Request Custom Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authentication Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Authentication Required</DialogTitle>
            <DialogDescription>
              You need to sign in or register as a buyer to view pre-harvest opportunities.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <p className="text-sm text-muted-foreground">
              Please sign in to your account or register as a buyer to proceed.
            </p>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAuthDialog(false)}
            >
              Cancel
            </Button>
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleSignUp}
              >
                Register as Buyer
              </Button>
              <Button onClick={handleSignIn}>Sign In</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quote Request Dialog */}
      <Dialog open={showQuoteDialog} onOpenChange={setShowQuoteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request Pre-Harvest Quote</DialogTitle>
            <DialogDescription>
              Tell us about your pre-harvest needs and our team will contact you with available options.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleQuoteSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cropDetails" className="text-right">
                  Crop Type
                </Label>
                <Input
                  id="cropDetails"
                  name="cropDetails"
                  value={formData.cropDetails}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="e.g., Organic Dates, Coffee Beans"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Est. Quantity
                </Label>
                <Input
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="e.g., 500 kg, 2 tons"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="message" className="text-right">
                  Additional Details
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="Please provide any specific requirements, timing preferences, etc."
                  required
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting 
                  ? "Submitting..." 
                  : "Request Quote"
                }
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PreHarvest;
