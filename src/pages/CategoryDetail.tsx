import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  MapPin,
  Filter,
  Check,
  CircleEllipsis,
  ArrowLeft 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

const productsByCategory = {
  fruits: [
    {
      id: 1,
      name: "Organic Red Apples",
      price: 2.99,
      unit: "kg",
      location: "Saudi Arabia",
      isOrganic: true,
      isCompanyMaintained: false,
      isAuthenticated: false,
      isFeatured: true,
      availability: "In Stock",
      description: "Sweet and crisp organic red apples grown in the highlands of Saudi Arabia.",
      image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 9,
      name: "Fresh Oranges",
      price: 3.49,
      unit: "kg",
      location: "UAE",
      isOrganic: false,
      isCompanyMaintained: false,
      isAuthenticated: false,
      isFeatured: true,
      availability: "In Stock",
      description: "Juicy oranges with the perfect balance of sweetness and acidity.",
      image: "https://images.unsplash.com/photo-1547514701-42782101795e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    },
    {
      id: 10,
      name: "Premium Dates",
      price: 6.99,
      unit: "kg",
      location: "Saudi Arabia",
      isOrganic: true,
      isCompanyMaintained: false,
      isAuthenticated: false,
      isFeatured: false,
      availability: "In Stock",
      description: "Premium quality dates known for their soft texture and rich flavor.",
      image: "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 11,
      name: "Fresh Mangoes",
      price: 4.99,
      unit: "kg",
      location: "Oman",
      isOrganic: false,
      isCompanyMaintained: false,
      isAuthenticated: false,
      isFeatured: true,
      availability: "Limited Stock",
      description: "Sweet and aromatic mangoes, perfect for juice or desserts.",
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    }
  ],
  vegetables: [
    {
      id: 2,
      name: "Fresh Roma Tomatoes",
      price: 1.99,
      unit: "kg",
      location: "UAE",
      isOrganic: false,
      isCompanyMaintained: false,
      isAuthenticated: false,
      isFeatured: false,
      availability: "In Stock",
      description: "Firm, flavorful Roma tomatoes perfect for sauces and salads.",
      image: "https://images.unsplash.com/photo-1546094096-0df4bcabd1c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    },
    {
      id: 8,
      name: "Fresh Green Beans",
      price: 3.29,
      unit: "kg",
      location: "UAE",
      isOrganic: false,
      isCompanyMaintained: false,
      isAuthenticated: false,
      isFeatured: false,
      availability: "In Stock",
      description: "Crisp, tender green beans harvested at peak freshness.",
      image: "https://images.unsplash.com/photo-1567375698348-5d9d5a01aebc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 12,
      name: "Fresh Cucumbers",
      price: 1.79,
      unit: "kg",
      location: "Kuwait",
      isOrganic: true,
      isCompanyMaintained: false,
      isAuthenticated: false,
      isFeatured: false,
      availability: "In Stock",
      description: "Crisp, juicy cucumbers perfect for salads and garnishes.",
      image: "https://images.unsplash.com/photo-1566486189376-d5f21e25aae4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    }
  ],
  grains: [
    {
      id: 3,
      name: "Premium Basmati Rice",
      price: 4.50,
      unit: "kg",
      location: "Qatar",
      isOrganic: false,
      isCompanyMaintained: false,
      isAuthenticated: false,
      isFeatured: true,
      availability: "In Stock",
      description: "Aromatic, long-grain basmati rice known for its fragrance and delicate flavor.",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 13,
      name: "Organic Quinoa",
      price: 5.99,
      unit: "kg",
      location: "Saudi Arabia",
      isOrganic: true,
      isCompanyMaintained: false,
      isAuthenticated: false,
      isFeatured: true,
      availability: "In Stock",
      description: "Nutrient-rich ancient grain with a subtle nutty flavor.",
      image: "https://images.unsplash.com/photo-1612257999758-527654d18eb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    }
  ],
  spices: [
    {
      id: 4,
      name: "Saffron",
      price: 12.99,
      unit: "g",
      location: "Oman",
      isOrganic: true,
      isCompanyMaintained: false,
      isAuthenticated: false,
      isFeatured: false,
      availability: "Limited Stock",
      description: "Premium quality saffron threads known for their rich color, aroma, and flavor.",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 14,
      name: "Premium Cardamom",
      price: 8.49,
      unit: "100g",
      location: "UAE",
      isOrganic: false,
      isCompanyMaintained: false,
      isAuthenticated: false,
      isFeatured: true,
      availability: "In Stock",
      description: "Aromatic cardamom pods with intense flavor for use in sweet and savory dishes.",
      image: "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
  ],
  flowers: [
    {
      id: 5,
      name: "Fresh Cut Tulips",
      price: 7.99,
      unit: "bunch",
      location: "Kuwait",
      isOrganic: false,
      isCompanyMaintained: false,
      isAuthenticated: false,
      isFeatured: true,
      availability: "Pre-Order",
      description: "Vibrant, colorful tulips available for pre-order. Perfect for brightening any space.",
      image: "https://images.unsplash.com/photo-1523694576729-68b32f1c8181?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 15,
      name: "Jasmine Plants",
      price: 9.99,
      unit: "pot",
      location: "Oman",
      isOrganic: true,
      isCompanyMaintained: false,
      isAuthenticated: false,
      isFeatured: false,
      availability: "In Stock",
      description: "Fragrant jasmine plants in decorative pots, perfect for gardens or patios.",
      image: "https://images.unsplash.com/photo-1567331711402-509c12c41959?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    }
  ],
  livestock: [
    {
      id: 6,
      name: "Free-Range Chicken",
      price: 9.99,
      unit: "kg",
      location: "Bahrain",
      isOrganic: true,
      isCompanyMaintained: false,
      isAuthenticated: false,
      isFeatured: false,
      availability: "In Stock",
      description: "Ethically raised, free-range chicken fed with natural grains.",
      image: "https://images.unsplash.com/photo-1612170153139-6f881ff067e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 16,
      name: "Premium Lamb",
      price: 14.99,
      unit: "kg",
      location: "Saudi Arabia",
      isOrganic: false,
      isCompanyMaintained: false,
      isAuthenticated: false,
      isFeatured: true,
      availability: "Limited Stock",
      description: "Premium quality lamb from free-range, grass-fed livestock.",
      image: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
  ],
  "dairy & eggs": [
    {
      id: 7,
      name: "Organic Farm Eggs",
      price: 5.49,
      unit: "dozen",
      location: "Saudi Arabia",
      isOrganic: true,
      isCompanyMaintained: false,
      isAuthenticated: false,
      isFeatured: true,
      availability: "In Stock",
      description: "Fresh organic eggs from free-range chickens raised on natural feed.",
      image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 17,
      name: "Artisanal Goat Cheese",
      price: 8.99,
      unit: "200g",
      location: "Qatar",
      isOrganic: true,
      isCompanyMaintained: false,
      isAuthenticated: false,
      isFeatured: false,
      availability: "In Stock",
      description: "Creamy, tangy goat cheese made using traditional methods.",
      image: "https://images.unsplash.com/photo-1566454825481-62d01679f271?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    }
  ]
};

const locations = [
  "Saudi Arabia", 
  "UAE", 
  "Qatar", 
  "Kuwait", 
  "Oman", 
  "Bahrain", 
  "Pakistan", 
  "India", 
  "Bangladesh"
];

const CategoryDetail = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: "",
    organic: false,
    companyMaintained: false,
    authenticated: false,
    priceRange: [0, 20],
    locations: [] as string[]
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const normalizedCategory = categoryName ? categoryName.toLowerCase() : "";
  
  const categoryProducts = productsByCategory[normalizedCategory as keyof typeof productsByCategory] || [];
  
  const formattedCategoryName = categoryName
    ? categoryName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
    : "";

  const handleFilterChange = (key: string, value: any) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

  const toggleLocation = (location: string) => {
    const locations = [...filters.locations];
    if (locations.includes(location)) {
      setFilters({
        ...filters,
        locations: locations.filter(loc => loc !== location)
      });
    } else {
      setFilters({
        ...filters,
        locations: [...locations, location]
      });
    }
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      organic: false,
      companyMaintained: false,
      authenticated: false,
      priceRange: [0, 20],
      locations: []
    });
  };

  const filteredProducts = categoryProducts.filter(product => {
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    if (filters.organic && !product.isOrganic) {
      return false;
    }
    
    if (filters.companyMaintained && !product.isCompanyMaintained) {
      return false;
    }
    
    if (filters.authenticated && !product.isAuthenticated) {
      return false;
    }
    
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    
    if (filters.locations.length > 0 && !filters.locations.includes(product.location)) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-earth-sand-light py-10 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <Button
              variant="ghost"
              className="mb-4 text-earth-olive-dark hover:text-earth-terracotta"
              onClick={() => navigate('/categories')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Categories
            </Button>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-earth-olive-dark mb-4">
              {formattedCategoryName}
            </h1>
            <p className="text-lg text-earth-olive-dark/80 max-w-3xl mb-8">
              Browse our selection of quality {formattedCategoryName.toLowerCase()} from trusted suppliers across the GCC region
            </p>
            
            <div className="max-w-2xl flex">
              <Input
                type="text"
                placeholder={`Search for ${formattedCategoryName.toLowerCase()}...`}
                className="rounded-r-none border-r-0 focus-visible:ring-earth-olive"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
              <Button className="rounded-l-none bg-earth-olive hover:bg-earth-olive-dark text-white">
                Search
              </Button>
            </div>
          </div>
        </div>
        
        <div className="py-8 md:py-12 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:hidden w-full">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center"
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {mobileFiltersOpen ? "Hide Filters" : "Show Filters"}
                </Button>
              </div>
              
              <div className={`md:w-1/4 lg:w-1/5 ${mobileFiltersOpen ? 'block' : 'hidden md:block'}`}>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-earth-olive-dark">Filters</h3>
                    <Button 
                      variant="ghost" 
                      className="h-8 px-2 text-sm text-earth-terracotta hover:text-earth-terracotta-dark"
                      onClick={resetFilters}
                    >
                      Reset All
                    </Button>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-2 text-earth-olive-dark">Price Range</h4>
                    <Slider
                      value={filters.priceRange}
                      min={0}
                      max={20}
                      step={0.5}
                      onValueChange={(value) => handleFilterChange('priceRange', value)}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-earth-olive-dark/70">
                      <span>${filters.priceRange[0].toFixed(2)}</span>
                      <span>${filters.priceRange[1].toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="mb-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="organic" 
                        checked={filters.organic}
                        onCheckedChange={(checked) => handleFilterChange('organic', !!checked)}
                      />
                      <label
                        htmlFor="organic"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-earth-olive-dark"
                      >
                        Organic Products Only
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="companyMaintained" 
                        checked={filters.companyMaintained}
                        onCheckedChange={(checked) => handleFilterChange('companyMaintained', !!checked)}
                      />
                      <label
                        htmlFor="companyMaintained"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-earth-olive-dark"
                      >
                        Company Maintained Farms
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="authenticated" 
                        checked={filters.authenticated}
                        onCheckedChange={(checked) => handleFilterChange('authenticated', !!checked)}
                      />
                      <label
                        htmlFor="authenticated"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-earth-olive-dark"
                      >
                        Authenticated Products
                      </label>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-2 text-earth-olive-dark">Country of Origin</h4>
                    <div className="space-y-2">
                      {locations.map((location) => (
                        <div key={location} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`location-${location}`} 
                            checked={filters.locations.includes(location)}
                            onCheckedChange={() => toggleLocation(location)}
                          />
                          <label
                            htmlFor={`location-${location}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-earth-olive-dark"
                          >
                            {location}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-3/4 lg:w-4/5">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <CircleEllipsis className="h-12 w-12 text-earth-olive-dark/30 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-earth-olive-dark mb-2">No Products Found</h3>
                    <p className="text-earth-olive-dark/70 mb-4">Try adjusting your filters or search criteria</p>
                    <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.map((product) => (
                      <div 
                        key={product.id} 
                        className="bg-white rounded-lg overflow-hidden shadow-sm transition-transform hover:shadow-md hover:-translate-y-1 cursor-pointer"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        <div className="h-48 overflow-hidden relative">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                          />
                          {product.isFeatured && (
                            <div className="absolute top-2 right-2 bg-earth-gold text-earth-olive-dark text-xs font-semibold px-2 py-1 rounded-full">
                              Featured
                            </div>
                          )}
                          {product.isOrganic && (
                            <div className="absolute top-2 left-2 bg-earth-olive text-white text-xs font-semibold px-2 py-1 rounded-full">
                              Organic
                            </div>
                          )}
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-semibold text-earth-olive-dark mb-1 line-clamp-1">{product.name}</h3>
                          
                          <div className="flex items-center text-earth-olive-dark/70 text-sm mb-2">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{product.location}</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="font-semibold text-earth-terracotta">
                              ${product.price.toFixed(2)} <span className="text-xs font-normal">/ {product.unit}</span>
                            </div>
                            
                            <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              product.availability === "In Stock" 
                                ? "bg-green-100 text-green-800" 
                                : product.availability === "Limited Stock"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                            }`}>
                              {product.availability}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryDetail;
