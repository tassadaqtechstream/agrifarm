import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Filter,
  MapPin,
  CircleEllipsis,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

// Import API client
import apiClient from "../utility/Apis.ts"; // Update this path to match your project structure

// Import LucideIcons dynamically
import * as LucideIcons from "lucide-react";

const locations = ["Saudi Arabia", "UAE", "Qatar", "Kuwait", "Oman", "Bahrain"];

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    organic: false,
    companyMaintained: false,
    authenticated: false,
    priceRange: [0, 20],
    locations: []
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // for product
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState(null);

  // Function to get icon component from string name
  const getIconComponent = (iconName) => {
    // Default icon if the specified one doesn't exist
    if (!iconName || !LucideIcons[iconName]) {
      return <CircleEllipsis className="h-8 w-8 text-earth-terracotta" />;
    }

    const IconComponent = LucideIcons[iconName];
    return <IconComponent className="h-8 w-8 text-earth-terracotta" />;
  };

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // Use the commoditiesAPI from the apiClient
        const response = await apiClient.commodities.getCategoryTree();

        if (response && response.tree) {
          setCategories(response.tree);
          console.log("Fetched categories:", response.tree);
          setError(null);
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please try again later.");

        // Fallback to demo categories in case of API failure
        setCategories([
          {
            id: 1,
            name: "Fruits",
            iconName: "Apple",
            description: "Fresh seasonal fruits from local farms",
            bgColor: "bg-red-50"
          },
          {
            id: 2,
            name: "Vegetables",
            iconName: "Carrot",
            description: "Organic and conventional vegetables",
            bgColor: "bg-green-50"
          },
          {
            id: 3,
            name: "Grains",
            iconName: "Wheat",
            description: "Premium quality wheat, rice, and cereals",
            bgColor: "bg-amber-50"
          },
          {
            id: 4,
            name: "More",
            iconName: "CircleEllipsis",
            description: "Explore other agricultural categories",
            bgColor: "bg-gray-50"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch initial products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const response = await apiClient.products.getAllProducts();
        // Check if response has a data property that contains the products array
        if (response?.data && Array.isArray(response.data)) {
          setProducts(response.data);
        } else if (Array.isArray(response)) {
          // If response itself is the array
          setProducts(response);
        } else {
          // Fallback to empty array if unexpected format
          console.warn('Unexpected API response format:', response);
          setProducts([]);
        }
        setProductsError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProductsError("Failed to load products.");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle filter changes
  const handleFilterChange = async (key, value) => {
    // Update the filter state
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value
    }));

    // If changing category, fetch products for that category
    if (key === 'category') {
      try {
        setLoadingProducts(true);

        if (value === '') {
          // If "All" is selected, fetch all products
          const response = await apiClient.products.getAllProducts();
          // Check response format and extract products array
          if (response?.data && Array.isArray(response.data)) {
            setProducts(response.data);
          } else if (Array.isArray(response)) {
            setProducts(response);
          } else {
            console.warn('Unexpected API response format:', response);
            setProducts([]);
          }
        } else {
          // Fetch products filtered by the selected category
          const response = await apiClient.commodities.getFilteredProducts(value);
          // Check response format and extract products array
          if (response?.data && Array.isArray(response.data)) {
            setProducts(response.data);
          } else if (Array.isArray(response)) {
            setProducts(response);
          } else {
            console.warn('Unexpected API response format:', response);
            setProducts([]);
          }
        }

        setProductsError(null);
      } catch (err) {
        console.error(`Error fetching products for category '${value}':`, err);
        setProductsError(`Failed to load products for category '${value}'.`);
      } finally {
        setLoadingProducts(false);
      }
    }
  };

  // Handle search
  const handleSearch = async () => {
    try {
      setLoadingProducts(true);

      if (filters.search.trim()) {
        const response = await apiClient.products.search(filters.search);
        // Check response format and extract products array
        if (response?.data && Array.isArray(response.data)) {
          setProducts(response.data);
        } else if (Array.isArray(response)) {
          setProducts(response);
        } else {
          console.warn('Unexpected API response format:', response);
          setProducts([]);
        }
      } else {
        // If search is cleared, revert to current category or all products
        if (filters.category) {
          const response = await apiClient.commodities.getFilteredProducts(filters.category);
          // Check response format and extract products array
          if (response?.data && Array.isArray(response.data)) {
            setProducts(response.data);
          } else if (Array.isArray(response)) {
            setProducts(response);
          } else {
            console.warn('Unexpected API response format:', response);
            setProducts([]);
          }
        } else {
          const response = await apiClient.products.getAllProducts();
          // Check response format and extract products array
          if (response?.data && Array.isArray(response.data)) {
            setProducts(response.data);
          } else if (Array.isArray(response)) {
            setProducts(response);
          } else {
            console.warn('Unexpected API response format:', response);
            setProducts([]);
          }
        }
      }

      setProductsError(null);
    } catch (err) {
      console.error("Error searching products:", err);
      setProductsError("Failed to search products.");
    } finally {
      setLoadingProducts(false);
    }
  };

  // Handle location toggle
  const toggleLocation = (location) => {
    setFilters(prevFilters => {
      const locations = [...prevFilters.locations];

      if (locations.includes(location)) {
        return {
          ...prevFilters,
          locations: locations.filter(loc => loc !== location)
        };
      } else {
        return {
          ...prevFilters,
          locations: [...locations, location]
        };
      }
    });
  };

  // Reset all filters
  const resetFilters = async () => {
    setFilters({
      search: "",
      category: "",
      organic: false,
      companyMaintained: false,
      authenticated: false,
      priceRange: [0, 20],
      locations: []
    });

    // Fetch all products again
    try {
      setLoadingProducts(true);
      const response = await apiClient.products.getAllProducts();
      // Check response format and extract products array
      if (response?.data && Array.isArray(response.data)) {
        setProducts(response.data);
      } else if (Array.isArray(response)) {
        setProducts(response);
      } else {
        console.warn('Unexpected API response format:', response);
        setProducts([]);
      }
      setProductsError(null);
    } catch (err) {
      console.error("Error resetting products:", err);
      setProductsError("Failed to reset products.");
    } finally {
      setLoadingProducts(false);
    }
  };

  // Apply client-side filtering for the other filter criteria
  const filteredProducts = products.filter(product => {
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
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button
                    className="rounded-l-none bg-earth-olive hover:bg-earth-olive-dark text-white"
                    onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Categories Section - Now Dynamic */}
          <div className="py-6 bg-white border-b">
            <div className="container mx-auto px-4 md:px-6">
              {loading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-earth-olive"></div>
                  </div>
              ) : error ? (
                  <div className="text-earth-terracotta text-center py-4">
                    {error}
                  </div>
              ) : (
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Button
                        variant={filters.category === "" ? "default" : "outline"}
                        className={`rounded-full ${filters.category === "" ? "bg-earth-olive text-white" : "text-earth-olive-dark border-earth-olive/30 hover:bg-earth-olive/5"}`}
                        onClick={() => handleFilterChange('category', '')}
                    >
                      All
                    </Button>

                    {categories?.map((category) => (
                        <Button
                            key={category.id}
                            variant={filters.category === category.name ? "default" : "outline"}
                            className={`rounded-full ${filters.category === category.name ? "bg-earth-olive text-white" : "text-earth-olive-dark border-earth-olive/30 hover:bg-earth-olive/5"}`}
                            onClick={() => handleFilterChange('category', category.name)}
                        >
                    <span className="mr-2">
                      {getIconComponent(category.iconName)}
                    </span>
                          {category.name}
                        </Button>
                    ))}
                  </div>
              )}
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
                        <span>OMR{filters.priceRange[0].toFixed(2)}</span>
                        <span>OMR{filters.priceRange[1].toFixed(2)}</span>
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
                  {loadingProducts ? (
                      <div className="flex justify-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-earth-olive"></div>
                      </div>
                  ) : productsError ? (
                      <div className="text-earth-terracotta text-center py-4">
                        {productsError}
                      </div>
                  ) : filteredProducts.length === 0 ? (
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
                                    src={product.featured_image_url}
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
                                    OMR{product.price} <span className="text-xs font-normal">/ {product.unit}</span>
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