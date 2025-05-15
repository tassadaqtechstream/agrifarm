import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Map, Leaf, DollarSign, Tag, TrendingUp, Users, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const PreHarvestPage = () => {
  const preHarvestDeals = [
    {
      id: 1,
      title: "Premium Dates Harvest",
      crop: "Dates",
      location: "Al-Ahsa, Saudi Arabia",
      harvestDate: "August 2025",
      price: 15.99,
      priceUnit: "per kg",
      estimatedYield: "15,000 kg",
      description: "Pre-purchase premium Khalas dates from our certified organic palm gardens. These dates will be harvested at peak ripeness and processed according to international standards.",
      image: "https://images.unsplash.com/photo-1632699890072-74473dd0e4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
      seller: "Al-Ahsa Date Farms",
      sellerRating: 4.8
    },
    {
      id: 2,
      title: "Organic Mango Plantation",
      crop: "Mangoes",
      location: "Jazan, Saudi Arabia",
      harvestDate: "June 2025",
      price: 12.50,
      priceUnit: "per kg",
      estimatedYield: "20,000 kg",
      description: "Secure our upcoming harvest of premium organic mangoes. Our plantation uses sustainable farming practices and produces some of the sweetest mangoes in the region.",
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
      seller: "Green Mango Co-op",
      sellerRating: 4.6
    },
    {
      id: 3,
      title: "Premium Wheat Fields",
      crop: "Wheat",
      location: "Al-Jouf, Saudi Arabia",
      harvestDate: "July 2025",
      price: 0.95,
      priceUnit: "per kg",
      estimatedYield: "500,000 kg",
      description: "Pre-purchase hard winter wheat from our extensive fields. Perfect for flour milling and bread production. Our wheat meets international quality standards for protein content and moisture levels.",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      seller: "Al-Jouf Agricultural Development Co.",
      sellerRating: 4.9
    },
    {
      id: 4,
      title: "Greenhouse Tomatoes",
      crop: "Tomatoes",
      location: "Riyadh, Saudi Arabia",
      harvestDate: "Continuous (May-Sept 2025)",
      price: 3.25,
      priceUnit: "per kg",
      estimatedYield: "5,000 kg monthly",
      description: "Secure a consistent supply of premium greenhouse tomatoes. Our climate-controlled facilities ensure year-round production of high-quality tomatoes without seasonal interruptions.",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      seller: "Tech Farms Saudi",
      sellerRating: 4.7
    },
    {
      id: 5,
      title: "Premium Olive Groves",
      crop: "Olives & Olive Oil",
      location: "Al-Jawf, Saudi Arabia",
      harvestDate: "October 2025",
      price: 18.50,
      priceUnit: "per liter (oil)",
      estimatedYield: "12,000 liters (oil)",
      description: "Pre-purchase premium olive oil from our award-winning groves. Cold-pressed and extra virgin, our olive oil meets the highest international standards for acidity and purity.",
      image: "https://images.unsplash.com/photo-1445772022536-0025d867e6c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      seller: "Al-Jawf Olive Cooperative",
      sellerRating: 4.9
    },
    {
      id: 6,
      title: "Mixed Berry Farm",
      crop: "Berries",
      location: "Al-Baha, Saudi Arabia",
      harvestDate: "April 2025",
      price: 22.00,
      priceUnit: "per kg",
      estimatedYield: "4,000 kg",
      description: "Secure our upcoming harvest of premium berries grown in the highlands of Al-Baha. Our cool mountain climate produces exceptionally sweet and flavorful berries.",
      image: "https://images.unsplash.com/photo-1615218370629-da07db3571a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
      seller: "Highland Berry Farms",
      sellerRating: 4.5
    },
    {
      id: 7,
      title: "Premium Citrus Orchard",
      crop: "Citrus",
      location: "Eastern Province, Saudi Arabia",
      harvestDate: "December 2025",
      price: 8.75,
      priceUnit: "per kg",
      estimatedYield: "30,000 kg",
      description: "Reserve your share of our premium citrus harvest. Our orchards produce high-quality oranges, lemons, and limes using sustainable farming practices.",
      image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      seller: "Citrus Valley Farms",
      sellerRating: 4.7
    },
    {
      id: 8,
      title: "Organic Potato Fields",
      crop: "Vegetables",
      location: "Al-Qassim, Saudi Arabia",
      harvestDate: "September 2025",
      price: 2.99,
      priceUnit: "per kg",
      estimatedYield: "75,000 kg",
      description: "Pre-purchase certified organic potatoes from our sustainable farms. Multiple varieties available for different culinary applications.",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      seller: "Qassim Organic Farms",
      sellerRating: 4.8
    },
    {
      id: 9,
      title: "Premium Alfalfa Fields",
      crop: "Fodder",
      location: "Northern Borders, Saudi Arabia",
      harvestDate: "Monthly (2025)",
      price: 1.25,
      priceUnit: "per kg",
      estimatedYield: "100,000 kg monthly",
      description: "Secure your livestock feed supply with our premium alfalfa. Regular harvests throughout the year with consistent quality.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
      seller: "Northern Feed Co.",
      sellerRating: 4.6
    },
    {
      id: 10,
      title: "Hydroponic Lettuce Farm",
      crop: "Vegetables",
      location: "Jeddah, Saudi Arabia",
      harvestDate: "Year-round 2025",
      price: 4.50,
      priceUnit: "per kg",
      estimatedYield: "3,000 kg monthly",
      description: "Pre-purchase premium hydroponic lettuce varieties. Year-round production in controlled environment for consistent quality.",
      image: "https://images.unsplash.com/photo-1595856619767-ab951ca3b8bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      seller: "Jeddah Hydroponics",
      sellerRating: 4.9
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="py-8 md:py-12 text-center max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-earth-olive-dark mb-4">
            Pre-Harvest Marketplace
          </h1>
          <p className="text-lg text-earth-olive-dark/80 mb-8">
            Secure agricultural produce before it's harvested. Lock in prices, 
            secure supply, and build direct relationships with producers.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-earth-terracotta/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <Calendar className="h-6 w-6 text-earth-terracotta" />
              </div>
              <h3 className="font-semibold text-earth-olive-dark mb-2">
                Future Harvests
              </h3>
              <p className="text-sm text-earth-olive-dark/70">
                Secure produce that will be harvested in the coming months at pre-agreed prices.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-earth-terracotta/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="h-6 w-6 text-earth-terracotta" />
              </div>
              <h3 className="font-semibold text-earth-olive-dark mb-2">
                Price Stability
              </h3>
              <p className="text-sm text-earth-olive-dark/70">
                Lock in prices now to avoid market fluctuations and ensure budget predictability.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-earth-terracotta/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <Users className="h-6 w-6 text-earth-terracotta" />
              </div>
              <h3 className="font-semibold text-earth-olive-dark mb-2">
                Direct Relationships
              </h3>
              <p className="text-sm text-earth-olive-dark/70">
                Build direct connections with producers and influence cultivation practices.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <Tabs defaultValue="all">
            <TabsList className="w-full max-w-xl mx-auto grid grid-cols-4 h-auto mb-8">
              <TabsTrigger value="all" className="py-3">All</TabsTrigger>
              <TabsTrigger value="fruits" className="py-3">Fruits</TabsTrigger>
              <TabsTrigger value="vegetables" className="py-3">Vegetables</TabsTrigger>
              <TabsTrigger value="grains" className="py-3">Grains</TabsTrigger>
            </TabsList>
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-earth-olive-dark">
                Available Pre-Harvest Opportunities
              </h2>
              
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {preHarvestDeals.map((deal) => (
                  <Card key={deal.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div>
                      <AspectRatio ratio={16/9}>
                        <img
                          src={deal.image}
                          alt={deal.title}
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <div className="flex items-center text-xs font-medium text-earth-terracotta mb-1">
                        <Tag className="h-3 w-3 mr-1" />
                        <span>{deal.crop}</span>
                      </div>
                      <CardTitle className="text-xl text-earth-olive-dark">
                        {deal.title}
                      </CardTitle>
                      <CardDescription className="flex items-center text-sm">
                        <Map className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                        {deal.location}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pb-4">
                      <div className="grid grid-cols-2 gap-y-3 text-sm mb-4">
                        <div className="flex items-start">
                          <Calendar className="h-4 w-4 mr-2 text-earth-terracotta flex-shrink-0" />
                          <div>
                            <div className="font-medium text-earth-olive-dark">Harvest Date</div>
                            <div className="text-earth-olive-dark/70">{deal.harvestDate}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <DollarSign className="h-4 w-4 mr-2 text-earth-terracotta flex-shrink-0" />
                          <div>
                            <div className="font-medium text-earth-olive-dark">Price</div>
                            <div className="text-earth-olive-dark/70">${deal.price} {deal.priceUnit}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Leaf className="h-4 w-4 mr-2 text-earth-terracotta flex-shrink-0" />
                          <div>
                            <div className="font-medium text-earth-olive-dark">Est. Yield</div>
                            <div className="text-earth-olive-dark/70">{deal.estimatedYield}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Users className="h-4 w-4 mr-2 text-earth-terracotta flex-shrink-0" />
                          <div>
                            <div className="font-medium text-earth-olive-dark">Seller</div>
                            <div className="text-earth-olive-dark/70">{deal.seller}</div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-earth-olive-dark/80 line-clamp-3">
                        {deal.description}
                      </p>
                    </CardContent>
                    
                    <CardFooter className="pt-0 flex justify-between items-center gap-4">
                      <Link 
                        to={`/pre-harvest/${deal.id}`} 
                        className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors"
                      >
                        View Details
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="ml-1"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </Link>
                      
                      <Button 
                        className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6"
                      >
                        Reserve Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="fruits" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {preHarvestDeals
                  .filter(deal => ['Mangoes', 'Dates', 'Strawberries & Blackberries'].includes(deal.crop))
                  .map((deal) => (
                    <Card key={deal.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div>
                        <AspectRatio ratio={16/9}>
                          <img
                            src={deal.image}
                            alt={deal.title}
                            className="w-full h-full object-cover"
                          />
                        </AspectRatio>
                      </div>
                      
                      <CardHeader className="pb-2">
                        <div className="flex items-center text-xs font-medium text-earth-terracotta mb-1">
                          <Tag className="h-3 w-3 mr-1" />
                          <span>{deal.crop}</span>
                        </div>
                        <CardTitle className="text-xl text-earth-olive-dark">
                          {deal.title}
                        </CardTitle>
                        <CardDescription className="flex items-center text-sm">
                          <Map className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                          {deal.location}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pb-4">
                        <div className="grid grid-cols-2 gap-y-3 text-sm mb-4">
                          <div className="flex items-start">
                            <Calendar className="h-4 w-4 mr-2 text-earth-terracotta flex-shrink-0" />
                            <div>
                              <div className="font-medium text-earth-olive-dark">Harvest Date</div>
                              <div className="text-earth-olive-dark/70">{deal.harvestDate}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <DollarSign className="h-4 w-4 mr-2 text-earth-terracotta flex-shrink-0" />
                            <div>
                              <div className="font-medium text-earth-olive-dark">Price</div>
                              <div className="text-earth-olive-dark/70">${deal.price} {deal.priceUnit}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Leaf className="h-4 w-4 mr-2 text-earth-terracotta flex-shrink-0" />
                            <div>
                              <div className="font-medium text-earth-olive-dark">Est. Yield</div>
                              <div className="text-earth-olive-dark/70">{deal.estimatedYield}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Users className="h-4 w-4 mr-2 text-earth-terracotta flex-shrink-0" />
                            <div>
                              <div className="font-medium text-earth-olive-dark">Seller</div>
                              <div className="text-earth-olive-dark/70">{deal.seller}</div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-earth-olive-dark/80 line-clamp-3">
                          {deal.description}
                        </p>
                      </CardContent>
                      
                      <CardFooter className="pt-0 flex justify-between items-center gap-4">
                        <Link 
                          to={`/pre-harvest/${deal.id}`} 
                          className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors"
                        >
                          View Details
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="ml-1"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </Link>
                        
                        <Button 
                          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6"
                        >
                          Reserve Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="vegetables" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {preHarvestDeals
                  .filter(deal => ['Tomatoes'].includes(deal.crop))
                  .map((deal) => (
                    <Card key={deal.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div>
                        <AspectRatio ratio={16/9}>
                          <img
                            src={deal.image}
                            alt={deal.title}
                            className="w-full h-full object-cover"
                          />
                        </AspectRatio>
                      </div>
                      
                      <CardHeader className="pb-2">
                        <div className="flex items-center text-xs font-medium text-earth-terracotta mb-1">
                          <Tag className="h-3 w-3 mr-1" />
                          <span>{deal.crop}</span>
                        </div>
                        <CardTitle className="text-xl text-earth-olive-dark">
                          {deal.title}
                        </CardTitle>
                        <CardDescription className="flex items-center text-sm">
                          <Map className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                          {deal.location}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pb-4">
                        <div className="grid grid-cols-2 gap-y-3 text-sm mb-4">
                          <div className="flex items-start">
                            <Calendar className="h-4 w-4 mr-2 text-earth-terracotta flex-shrink-0" />
                            <div>
                              <div className="font-medium text-earth-olive-dark">Harvest Date</div>
                              <div className="text-earth-olive-dark/70">{deal.harvestDate}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <DollarSign className="h-4 w-4 mr-2 text-earth-terracotta flex-shrink-0" />
                            <div>
                              <div className="font-medium text-earth-olive-dark">Price</div>
                              <div className="text-earth-olive-dark/70">${deal.price} {deal.priceUnit}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Leaf className="h-4 w-4 mr-2 text-earth-terracotta flex-shrink-0" />
                            <div>
                              <div className="font-medium text-earth-olive-dark">Est. Yield</div>
                              <div className="text-earth-olive-dark/70">{deal.estimatedYield}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Users className="h-4 w-4 mr-2 text-earth-terracotta flex-shrink-0" />
                            <div>
                              <div className="font-medium text-earth-olive-dark">Seller</div>
                              <div className="text-earth-olive-dark/70">{deal.seller}</div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-earth-olive-dark/80 line-clamp-3">
                          {deal.description}
                        </p>
                      </CardContent>
                      
                      <CardFooter className="pt-0 flex justify-between items-center gap-4">
                        <Link 
                          to={`/pre-harvest/${deal.id}`} 
                          className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors"
                        >
                          View Details
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="ml-1"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </Link>
                        
                        <Button 
                          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6"
                        >
                          Reserve Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="grains" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {preHarvestDeals
                  .filter(deal => ['Wheat', 'Olives & Olive Oil'].includes(deal.crop))
                  .map((deal) => (
                    <Card key={deal.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div>
                        <AspectRatio ratio={16/9}>
                          <img
                            src={deal.image}
                            alt={deal.title}
                            className="w-full h-full object-cover"
                          />
                        </AspectRatio>
                      </div>
                      
                      <CardHeader className="pb-2">
                        <div className="flex items-center text-xs font-medium text-earth-terracotta mb-1">
                          <Tag className="h-3 w-3 mr-1" />
                          <span>{deal.crop}</span>
                        </div>
                        <CardTitle className="text-xl text-earth-olive-dark">
                          {deal.title}
                        </CardTitle>
                        <CardDescription className="flex items-center text-sm">
                          <Map className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                          {deal.location}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pb-4">
                        <div className="grid grid-cols-2 gap-y-3 text-sm mb-4">
                          <div className="flex items-start">
                            <Calendar className="h-4 w-4 mr-2 text-earth-terracotta flex-shrink-0" />
                            <div>
                              <div className="font-medium text-earth-olive-dark">Harvest Date</div>
                              <div className="text-earth-olive-dark/70">{deal.harvestDate}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <DollarSign className="h-4 w-4 mr-2 text-earth-terracotta flex-shrink-0" />
                            <div>
                              <div className="font-medium text-earth-olive-dark">Price</div>
                              <div className="text-earth-olive-dark/70">${deal.price} {deal.priceUnit}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Leaf className="h-4 w-4 mr-2 text-earth-terracotta flex-shrink-0" />
                            <div>
                              <div className="font-medium text-earth-olive-dark">Est. Yield</div>
                              <div className="text-earth-olive-dark/70">{deal.estimatedYield}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Users className="h-4 w-4 mr-2 text-earth-terracotta flex-shrink-0" />
                            <div>
                              <div className="font-medium text-earth-olive-dark">Seller</div>
                              <div className="text-earth-olive-dark/70">{deal.seller}</div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-earth-olive-dark/80 line-clamp-3">
                          {deal.description}
                        </p>
                      </CardContent>
                      
                      <CardFooter className="pt-0 flex justify-between items-center gap-4">
                        <Link 
                          to={`/pre-harvest/${deal.id}`} 
                          className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors"
                        >
                          View Details
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="ml-1"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </Link>
                        
                        <Button 
                          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6"
                        >
                          Reserve Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="bg-white rounded-xl p-8 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-earth-olive-dark mb-8 text-center">
            How Pre-Harvest Contracts Work
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-earth-terracotta/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl font-bold text-earth-terracotta">1</span>
              </div>
              <h3 className="font-semibold text-earth-olive-dark mb-2">
                Browse & Select
              </h3>
              <p className="text-sm text-earth-olive-dark/70">
                Browse available pre-harvest contracts across different categories and regions. Review yields, prices, and harvest dates.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-earth-terracotta/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl font-bold text-earth-terracotta">2</span>
              </div>
              <h3 className="font-semibold text-earth-olive-dark mb-2">
                Reserve & Pay
              </h3>
              <p className="text-sm text-earth-olive-dark/70">
                Secure your allocation with a deposit or full payment. All transactions are secured and protected by our platform.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-earth-terracotta/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl font-bold text-earth-terracotta">3</span>
              </div>
              <h3 className="font-semibold text-earth-olive-dark mb-2">
                Receive at Harvest
              </h3>
              <p className="text-sm text-earth-olive-dark/70">
                Track cultivation progress and receive your products when harvested. Choose delivery options or export documentation.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-earth-olive-dark mb-6">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "What is a pre-harvest contract?",
                answer: "A pre-harvest contract allows buyers to purchase agricultural products before they are harvested. It secures your supply and typically locks in a price, providing certainty for both buyers and sellers."
              },
              {
                question: "What if the crop fails or doesn't meet expected quality?",
                answer: "Our platform includes quality guarantees and crop insurance provisions. Specifics vary by contract, but all include protection for buyers in case of crop failure or quality issues."
              },
              {
                question: "Can I visit the farm before committing?",
                answer: "Yes. For larger contracts, we encourage farm visits and can arrange virtual or in-person tours of the facilities. This gives buyers confidence in production standards."
              },
              {
                question: "How is payment structured?",
                answer: "Payment structures vary by contract. Most require a deposit with the balance due upon harvest, while others offer installment plans. All payments are secure and escrow-protected."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-earth-olive-dark mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-earth-olive-dark/70">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PreHarvestPage;
