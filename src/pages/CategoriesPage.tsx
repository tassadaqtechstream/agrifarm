import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Apple, 
  Wheat, 
  Flower2, 
  Beef, 
  Leaf, 
  Carrot, 
  Egg, 
  CircleEllipsis,
  Filter,
  MapPin,
  Calendar,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

const categories = [
  {
    name: "Fruits",
    icon: <Apple className="h-8 w-8 text-earth-terracotta" />,
    description: "Fresh seasonal fruits from local farms",
    bgColor: "bg-red-50"
  },
  {
    name: "Vegetables",
    icon: <Carrot className="h-8 w-8 text-earth-terracotta" />,
    description: "Organic and conventional vegetables",
    bgColor: "bg-green-50"
  },
  {
    name: "Grains",
    icon: <Wheat className="h-8 w-8 text-earth-terracotta" />,
    description: "Premium quality wheat, rice, and cereals",
    bgColor: "bg-amber-50"
  },
  {
    name: "Spices",
    icon: <Leaf className="h-8 w-8 text-earth-terracotta" />,
    description: "Authentic regional spices and herbs",
    bgColor: "bg-orange-50"
  },
  {
    name: "Flowers",
    icon: <Flower2 className="h-8 w-8 text-earth-terracotta" />,
    description: "Ornamental plants and cut flowers",
    bgColor: "bg-pink-50"
  },
  {
    name: "Livestock",
    icon: <Beef className="h-8 w-8 text-earth-terracotta" />,
    description: "Responsibly raised livestock products",
    bgColor: "bg-yellow-50"
  },
  {
    name: "Dairy & Eggs",
    icon: <Egg className="h-8 w-8 text-earth-terracotta" />,
    description: "Farm-fresh dairy products and eggs",
    bgColor: "bg-blue-50"
  },
  {
    name: "More",
    icon: <CircleEllipsis className="h-8 w-8 text-earth-terracotta" />,
    description: "Explore other agricultural categories",
    bgColor: "bg-gray-50"
  },
];

const products = [
  {
    id: 1,
    name: "Organic Red Apples",
    category: "Fruits",
    price: 2.99,
    unit: "kg",
    location: "Saudi Arabia",
    isOrganic: true,
    isCompanyMaintained: false,
    isAuthenticated: false,
    isFeatured: true,
    availability: "In Stock",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 2,
    name: "Fresh Roma Tomatoes",
    category: "Vegetables",
    price: 1.99,
    unit: "kg",
    location: "UAE",
    isOrganic: false,
    isCompanyMaintained: false,
    isAuthenticated: false,
    isFeatured: false,
    availability: "In Stock",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcabd1c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
  },
  {
    id: 3,
    name: "Premium Basmati Rice",
    category: "Grains",
    price: 4.50,
    unit: "kg",
    location: "Qatar",
    isOrganic: false,
    isCompanyMaintained: true,
    isAuthenticated: true,
    isFeatured: true,
    availability: "In Stock",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 4,
    name: "Saffron",
    category: "Spices",
    price: 12.99,
    unit: "g",
    location: "Oman",
    isOrganic: true,
    isCompanyMaintained: false,
    isAuthenticated: false,
    isFeatured: false,
    availability: "Limited Stock",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 5,
    name: "Fresh Cut Tulips",
    category: "Flowers",
    price: 7.99,
    unit: "bunch",
    location: "Kuwait",
    isOrganic: false,
    isCompanyMaintained: true,
    isAuthenticated: true,
    isFeatured: true,
    availability: "Pre-Order",
    image: "https://images.unsplash.com/photo-1523694576729-6f881ff067e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 6,
    name: "Free-Range Chicken",
    category: "Livestock",
    price: 9.99,
    unit: "kg",
    location: "Bahrain",
    isOrganic: true,
    isCompanyMaintained: false,
    isAuthenticated: false,
    isFeatured: false,
    availability: "In Stock",
    image: "https://images.unsplash.com/photo-1612170153139-6f881ff067e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 7,
    name: "Organic Farm Eggs",
    category: "Dairy & Eggs",
    price: 5.49,
    unit: "dozen",
    location: "Saudi Arabia",
    isOrganic: true,
    isCompanyMaintained: true,
    isAuthenticated: true,
    isFeatured: true,
    availability: "In Stock",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 8,
    name: "Fresh Green Beans",
    category: "Vegetables",
    price: 3.29,
    unit: "kg",
    location: "UAE",
    isOrganic: false,
    isCompanyMaintained: false,
    isAuthenticated: false,
    isFeatured: false,
    availability: "In Stock",
    image: "https://images.unsplash.com/photo-1567375698348-5d9d5a01aebc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 9,
    name: "Organic Baby Spinach",
    category: "Vegetables",
    price: 4.99,
    unit: "kg",
    location: "Saudi Arabia",
    isOrganic: true,
    isCompanyMaintained: true,
    isAuthenticated: true,
    isFeatured: true,
    availability: "In Stock",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80"
  },
  {
    id: 10,
    name: "Fresh Bell Peppers Mix",
    category: "Vegetables",
    price: 3.49,
    unit: "kg",
    location: "UAE",
    isOrganic: true,
    isCompanyMaintained: false,
    isAuthenticated: true,
    isFeatured: false,
    availability: "In Stock",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80"
  },
  {
    id: 11,
    name: "Premium Broccoli",
    category: "Vegetables",
    price: 2.99,
    unit: "kg",
    location: "Bahrain",
    isOrganic: false,
    isCompanyMaintained: true,
    isAuthenticated: true,
    isFeatured: false,
    availability: "In Stock",
    image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80"
  },
  {
    id: 12,
    name: "Fresh Cauliflower",
    category: "Vegetables",
    price: 2.75,
    unit: "piece",
    location: "Saudi Arabia",
    isOrganic: false,
    isCompanyMaintained: false,
    isAuthenticated: true,
    isFeatured: false,
    availability: "In Stock",
    image: "https://images.unsplash.com/photo-1566842600175-97dca489844f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80"
  },
  {
    id: 13,
    name: "Organic Cherry Tomatoes",
    category: "Vegetables",
    price: 3.99,
    unit: "500g",
    location: "Qatar",
    isOrganic: true,
    isCompanyMaintained: true,
    isAuthenticated: true,
    isFeatured: true,
    availability: "Limited Stock",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcabd1c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80"
  },
  {
    id: 14,
    name: "Fresh Zucchini",
    category: "Vegetables",
    price: 2.49,
    unit: "kg",
    location: "UAE",
    isOrganic: false,
    isCompanyMaintained: true,
    isAuthenticated: false,
    isFeatured: false,
    availability: "In Stock",
    image: "https://images.unsplash.com/photo-1596450514735-111a2fe02935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80"
  },
  {
    id: 15,
    name: "Organic Quinoa",
    category: "Grains",
    price: 6.99,
    unit: "kg",
    location: "Saudi Arabia",
    isOrganic: true,
    isCompanyMaintained: true,
    isAuthenticated: true,
    isFeatured: true,
    availability: "In Stock",
    image: "https://images.unsplash.com/photo-1615485500750-00b22c4d9e4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 16,
    name: "Premium Brown Rice",
    category: "Grains",
    price: 4.25,
    unit: "kg",
    location: "UAE",
    isOrganic: false,
    isCompanyMaintained: true,
    isAuthenticated: true,
    isFeatured: false,
    availability: "In Stock",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
  },
  {
    id: 17,
    name: "Organic Couscous",
    category: "Grains",
    price: 5.50,
    unit: "kg",
    location: "Qatar",
    isOrganic: true,
    isCompanyMaintained: false,
    isAuthenticated: false,
    isFeatured: false,
    availability: "Limited Stock",
    image: "https://images.unsplash.com/photo-1592394533824-9440e5d68392?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 18,
    name: "Barley Grains",
    category: "Grains",
    price: 3.75,
    unit: "kg",
    location: "Bahrain",
    isOrganic: false,
    isCompanyMaintained: true,
    isAuthenticated: true,
    isFeatured: true,
    availability: "In Stock",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  }
];

const locations = ["Saudi Arabia", "UAE", "Qatar", "Kuwait", "Oman", "Bahrain"];

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    organic: false,
    companyMaintained: false,
    authenticated: false,
    priceRange: [0, 20],
    locations: [] as string[]
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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

  const handleCategoryClick = (category: string) => {
    setFilters({
      ...filters,
      category
    });
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "",
      organic: false,
      companyMaintained: false,
      authenticated: false,
      priceRange: [0, 20],
      locations: []
    });
  };

  const filteredProducts = products.filter(product => {
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    if (filters.category && product.category !== filters.category) {
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-earth-olive-dark mb-4 text-center">
              Browse Agricultural Products
            </h1>
            <p className="text-lg text-earth-olive-dark/80 max-w-3xl mx-auto text-center mb-8">
              Discover fresh, quality agricultural products from trusted suppliers across the GCC region
            </p>
            
            <div className="max-w-2xl mx-auto flex">
              <Input
                type="text"
                placeholder="Search for products..."
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
        
        <div className="py-6 bg-white border-b">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant={filters.category === "" ? "default" : "outline"}
                className={`rounded-full ${filters.category === "" ? "bg-earth-olive text-white" : "text-earth-olive-dark border-earth-olive/30 hover:bg-earth-olive/5"}`}
                onClick={() => handleFilterChange('category', '')}
              >
                All
              </Button>
              
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={filters.category === category.name ? "default" : "outline"}
                  className={`rounded-full ${filters.category === category.name ? "bg-earth-olive text-white" : "text-earth-olive-dark border-earth-olive/30 hover:bg-earth-olive/5"}`}
                  onClick={() => handleFilterChange('category', category.name)}
                >
                  <span className="mr-2">{category.icon && React.cloneElement(category.icon, { className: "h-4 w-4" })}</span>
                  {category.name}
                </Button>
              ))}
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
                    <div className="space-y-4">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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

export default CategoriesPage;
