
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, DollarSign, Leaf, Map, Users, ArrowLeft, Satellite } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const PreHarvestDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'satellite' | 'stats'>('satellite');
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  
  // Check if the user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      // Store the current URL to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', `/pre-harvest/${id}`);
      // Show auth dialog instead of redirecting
      setShowAuthDialog(true);
    }
  }, [isAuthenticated, id]);
  
  const handleSignIn = () => {
    navigate('/signin', { state: { from: `/pre-harvest/${id}` } });
    setShowAuthDialog(false);
  };

  const handleSignUp = () => {
    navigate('/join/buyer', { state: { from: `/pre-harvest/${id}` } });
    setShowAuthDialog(false);
  };

  const handleReservationClick = () => {
    if (!isAuthenticated) {
      // Store the redirect path for after login
      sessionStorage.setItem('redirectAfterLogin', `/pre-harvest/${id}/reserve`);
      // Show auth dialog
      setShowAuthDialog(true);
      return;
    }
    
    // If already authenticated, navigate directly
    navigate(`/pre-harvest/${id}/reserve`);
  };

  // For demo purposes, we'll use hardcoded data. In a real app, this would come from an API
  const deal = {
    id: 1,
    title: "Premium Dates Harvest",
    crop: "Dates",
    location: "Al-Ahsa, Saudi Arabia",
    harvestDate: "August 2025",
    price: 15.99,
    priceUnit: "per kg",
    estimatedYield: "15,000 kg",
    description: "Pre-purchase premium Khalas dates from our certified organic palm gardens. These dates will be harvested at peak ripeness and processed according to international standards.",
    image: "https://images.unsplash.com/photo-1632699890072-74473dd0e4b1",
    seller: "Al-Ahsa Date Farms",
    sellerRating: 4.8,
    additionalDetails: {
      certifications: ["Organic", "GlobalG.A.P"],
      cultivationMethod: "Traditional with modern irrigation",
      varietyInfo: "Khalas dates - known for sweetness and texture",
      storageRequirements: "Cool, dry place (13-15°C)",
      shelfLife: "12 months from harvest",
      packaging: "Available in 5kg, 10kg, and bulk containers"
    },
    farmData: {
      name: "Golden Valley Farm",
      location: "Al-Ahsa, Saudi Arabia",
      cropType: "Dates",
      totalArea: "120 hectares",
      estimatedYield: "15,000 kg",
      plantingDate: "February 2025",
      harvestDate: "August 2025",
      soilHealth: "Excellent",
      waterUsage: "Optimized irrigation"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Auth Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Authentication Required</DialogTitle>
            <DialogDescription>
              You need to sign in or register as a buyer to view pre-harvest product details.
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
              onClick={() => navigate('/')}
            >
              Back to Home
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
      
      <main className="container mx-auto py-8 px-4 md:px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-earth-olive-dark hover:text-earth-olive mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Pre-Harvest Listings
        </button>

        {isAuthenticated && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2">
              <Card>
                <AspectRatio ratio={16/9}>
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </AspectRatio>
                
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-earth-olive-dark mb-2">
                      {deal.title}
                    </h1>
                    <div className="flex items-center text-earth-olive-dark/70">
                      <Map className="h-4 w-4 mr-2" />
                      {deal.location}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-2 text-earth-terracotta flex-shrink-0" />
                      <div>
                        <div className="font-medium text-earth-olive-dark">Harvest Date</div>
                        <div className="text-earth-olive-dark/70">{deal.harvestDate}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <DollarSign className="h-5 w-5 mr-2 text-earth-terracotta flex-shrink-0" />
                      <div>
                        <div className="font-medium text-earth-olive-dark">Price</div>
                        <div className="text-earth-olive-dark/70">${deal.price} {deal.priceUnit}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Leaf className="h-5 w-5 mr-2 text-earth-terracotta flex-shrink-0" />
                      <div>
                        <div className="font-medium text-earth-olive-dark">Est. Yield</div>
                        <div className="text-earth-olive-dark/70">{deal.estimatedYield}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Users className="h-5 w-5 mr-2 text-earth-terracotta flex-shrink-0" />
                      <div>
                        <div className="font-medium text-earth-olive-dark">Seller</div>
                        <div className="text-earth-olive-dark/70">{deal.seller}</div>
                      </div>
                    </div>
                  </div>

                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList>
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="details">Product Details</TabsTrigger>
                      <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
                      <TabsTrigger value="farm-view">Farm View</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-4">
                      <div className="prose max-w-none">
                        <p className="text-earth-olive-dark/80">{deal.description}</p>
                        <h3 className="text-lg font-semibold text-earth-olive-dark mt-4">Certifications</h3>
                        <ul className="list-disc pl-5 text-earth-olive-dark/80">
                          {deal.additionalDetails.certifications.map((cert, index) => (
                            <li key={index}>{cert}</li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="details" className="mt-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-earth-olive-dark">Cultivation Method</h3>
                          <p className="text-earth-olive-dark/80">{deal.additionalDetails.cultivationMethod}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-earth-olive-dark">Variety Information</h3>
                          <p className="text-earth-olive-dark/80">{deal.additionalDetails.varietyInfo}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-earth-olive-dark">Storage Requirements</h3>
                          <p className="text-earth-olive-dark/80">{deal.additionalDetails.storageRequirements}</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="terms" className="mt-4">
                      <div className="space-y-4 text-earth-olive-dark/80">
                        <h3 className="font-semibold text-earth-olive-dark">Contract Terms</h3>
                        <ul className="list-disc pl-5">
                          <li>30% deposit required to secure the contract</li>
                          <li>Balance payment due 2 weeks before harvest</li>
                          <li>Quality guarantees based on industry standards</li>
                          <li>Flexible delivery options available</li>
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="farm-view" className="mt-4">
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-earth-olive-dark">Farm Analytics</h3>
                        
                        <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-xl mb-4">
                          {activeTab === 'satellite' ? (
                            <>
                              <div className="absolute inset-0">
                                <img 
                                  src="https://images.unsplash.com/photo-1486080406518-c389f6f7a15c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                                  alt="Satellite view of agricultural field" 
                                  className="w-full h-full object-cover"
                                />
                                {/* Farm boundary overlay */}
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                  <polygon 
                                    points="20,20 80,15 85,75 30,80" 
                                    fill="rgba(255, 140, 0, 0.2)" 
                                    stroke="rgba(255, 140, 0, 0.8)" 
                                    strokeWidth="0.5"
                                  />
                                  {/* Markers for different zones */}
                                  <circle cx="35" cy="35" r="3" fill="rgba(50, 205, 50, 0.8)" />
                                  <circle cx="60" cy="45" r="3" fill="rgba(255, 215, 0, 0.8)" />
                                  <circle cx="50" cy="60" r="3" fill="rgba(30, 144, 255, 0.8)" />
                                </svg>
                              </div>
                              {/* Interface overlay */}
                              <div className="absolute top-4 left-4 flex space-x-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button size="sm" variant="outline" className="bg-white/90 hover:bg-white">
                                        <Map className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Toggle boundary view</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button size="sm" variant="outline" className="bg-white/90 hover:bg-white">
                                        <Satellite className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Switch to drone view</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                              {/* Legend */}
                              <div className="absolute bottom-4 left-4 bg-white/80 p-2 rounded-md text-xs">
                                <div className="flex items-center gap-2">
                                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                  <span>Optimal Growth</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                                  <span>Moderate Stress</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                                  <span>Water Resources</span>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="absolute inset-0 bg-white p-4 overflow-y-auto">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead colSpan={2} className="text-center text-earth-olive-dark">Farm Analysis Report</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {Object.entries(deal.farmData).map(([key, value]) => (
                                    <TableRow key={key}>
                                      <TableCell className="font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</TableCell>
                                      <TableCell>{value}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                              
                              <div className="mt-4">
                                <h4 className="font-semibold text-earth-olive-dark mb-2">Growth Analysis</h4>
                                <div className="bg-gray-100 h-6 rounded-full overflow-hidden">
                                  <div className="bg-green-500 h-full" style={{width: '75%'}}></div>
                                </div>
                                <div className="flex justify-between text-xs mt-1">
                                  <span>Current Growth: 75%</span>
                                  <span>Expected Harvest: On Track</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Tab switches */}
                        <div className="flex justify-center gap-2">
                          <Button 
                            variant={activeTab === 'satellite' ? 'default' : 'outline'}
                            className={activeTab === 'satellite' ? 'bg-earth-olive text-white' : 'bg-white text-earth-olive-dark'} 
                            onClick={() => setActiveTab('satellite')}
                          >
                            <Satellite className="h-4 w-4 mr-2" />
                            Satellite View
                          </Button>
                          <Button 
                            variant={activeTab === 'stats' ? 'default' : 'outline'} 
                            className={activeTab === 'stats' ? 'bg-earth-olive text-white' : 'bg-white text-earth-olive-dark'}
                            onClick={() => setActiveTab('stats')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                              <path d="M3 3v18h18"></path>
                              <path d="M18 9l-6-6-6 6"></path>
                              <path d="M18 4v5h-5"></path>
                            </svg>
                            Farm Stats
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Reservation Card */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-earth-olive-dark mb-4">
                    Reserve Your Pre-Harvest
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-earth-olive-dark">Price per unit</span>
                      <span className="font-medium text-earth-olive-dark">${deal.price} {deal.priceUnit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-earth-olive-dark">Available Quantity</span>
                      <span className="font-medium text-earth-olive-dark">{deal.estimatedYield}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-earth-olive-dark">Harvest Date</span>
                      <span className="font-medium text-earth-olive-dark">{deal.harvestDate}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium"
                    onClick={handleReservationClick}
                  >
                    Start Reservation Process
                  </Button>

                  <p className="text-sm text-earth-olive-dark/70 text-center mt-4">
                    No payment required until contract is finalized
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default PreHarvestDetailPage;
