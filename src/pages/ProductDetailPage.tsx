import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Heart, Share2, Star, Shield, Truck, Award, Info, X, ChevronLeft, ChevronRight, Expand, ShieldCheck, Leaf, Building } from "lucide-react";
import ProductInterestButtons, { openInterestDialog, openQuoteDialog } from "@/components/ProductInterestButtons";
import { useCart } from "@/contexts/CartContext";
import apiClient from '@/utility/Apis.ts';

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  rating: number;
  reviews: number;
  images: string[];
  category: string;
  organic?: boolean;
  availability: string;
  minQuantity: number;
  seller: string;
  location: string;
  isAuthenticated?: boolean;
  isCompanyMaintained?: boolean;
  isPartnerFarm?: boolean;
  description: string;
  specifications: { name: string; value: string }[];
}

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showShippingInfo, setShowShippingInfo] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  const COMMISSION_RATE = 0.05;
  const BASE_SHIPPING_RATE = 50;
  const PER_UNIT_SHIPPING_RATE = 0.15;

  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shippingCost: 0,
    commission: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) return;
      setLoading(true);
      try {
        const productData = await apiClient.products.getProductDetail(productId);
        if (productData) {
          setProduct(productData);
          if (productData.minQuantity && productData.minQuantity > 0) {
            setQuantity(productData.minQuantity);
          }
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    if (!product) return;
    const subtotal = quantity * product.price;
    const shippingCost = calculateShipping(quantity);
    const commission = subtotal * COMMISSION_RATE;
    const total = subtotal + shippingCost;
    setOrderSummary({ subtotal, shippingCost, commission, total });
  }, [quantity, product]);

  const calculateShipping = (quantity: number) => {
    return BASE_SHIPPING_RATE + (quantity * PER_UNIT_SHIPPING_RATE);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (product && quantity > product.minQuantity) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && product && value >= product.minQuantity) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      type: "product",
      name: product.name,
      price: product.price,
      quantity,
      unit: product.unit,
      image: product.images[0],
      sellerId: "seller-id",
      sellerName: product.seller,
    });
    setShowConfirm(true);
  };

  const finalizeOrder = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowConfirm(false);
      setTimeout(() => {
        toast({
          title: "Added to Cart",
          description: "Product has been added to your cart.",
          duration: 5000,
        });
      }, 300);
    } catch (error) {
      setShowConfirm(false);
      setTimeout(() => {
        toast({
          title: "Error",
          description: "There was an error adding this item to your cart.",
          variant: "destructive",
          duration: 5000,
        });
      }, 300);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openImageViewer = (index: number) => {
    setSelectedImageIndex(index);
    setImageViewerOpen(true);
  };

  const navigateImages = (direction: 'next' | 'prev') => {
    if (!product || !product.images.length) return;
    setSelectedImageIndex(prev => {
      if (direction === 'next') return prev === product.images.length - 1 ? 0 : prev + 1;
      return prev === 0 ? product.images.length - 1 : prev - 1;
    });
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!product) return null;
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div 
              className="border rounded-xl overflow-hidden bg-white relative cursor-pointer group"
              onClick={() => openImageViewer(selectedImageIndex)}
            >
              <AspectRatio ratio={4/3}>
                <img 
                  src={product?.images[selectedImageIndex]}
                  alt={product?.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </AspectRatio>
              <div className="absolute top-2 left-2 flex gap-2">
                {product.isAuthenticated && (
                  <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full flex items-center">
                    <ShieldCheck className="h-3 w-3 mr-1" />
                    Authenticated
                  </div>
                )}
                {product.isCompanyMaintained && (
                  <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full flex items-center">
                    <Leaf className="h-3 w-3 mr-1" />
                    Company Farm
                  </div>
                )}
                {product.isPartnerFarm && (
                  <div className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full flex items-center">
                    <Building className="h-3 w-3 mr-1" />
                    Partner Farm
                  </div>
                )}
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                <Expand className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${selectedImageIndex === index ? 'ring-2 ring-earth-terracotta' : ''}`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <AspectRatio ratio={1/1}>
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </AspectRatio>
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <div className="bg-white p-6 rounded-xl shadow-sm mb-4">
              <div className="flex items-center text-sm text-earth-terracotta mb-2">
                <span className="mr-2 px-2 py-0.5 bg-earth-terracotta/10 rounded-full font-medium">
                  {product.category}
                </span>
                {product.organic && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">
                    Organic
                  </span>
                )}
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-earth-olive-dark mb-2">
                {product.name}
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-none'}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              
              <div className="mb-6">
                <div className="text-xl md:text-2xl font-bold text-earth-olive-dark">
                  OMR {product.price} <span className="text-sm font-normal">/per {product.unit}</span>
                </div>
                <p className="text-sm text-green-600 flex items-center">
                  {product.availability}
                  <span className="ml-2 text-earth-olive-dark/70 text-xs">
                    (Min. order: {product.minQuantity} {product.unit})
                  </span>
                </p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center text-sm text-earth-olive-dark/70 mb-2">
                  <span className="font-medium mr-2">Seller:</span> {product.seller}
                </div>
                <div className="flex items-center text-sm text-earth-olive-dark/70">
                  <span className="font-medium mr-2">Location:</span> {product.location}
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <div className="flex items-center p-1.5 rounded-full bg-green-50 text-green-600 mr-3">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Quality guaranteed or full refund</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center p-1.5 rounded-full bg-blue-50 text-blue-600 mr-3">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Tracked shipping with export documentation</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center p-1.5 rounded-full bg-amber-50 text-amber-600 mr-3">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Verified seller with export license</span>
                </div>
              </div>
              
              {/* B2B Quantity Selector with Validation */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex items-center border rounded-md">
                  <button 
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-md"
                    onClick={decrementQuantity}
                    disabled={quantity <= product.minQuantity}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={product.minQuantity}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 text-center border-x p-2 focus:outline-none"
                  />
                  <button 
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-md"
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                </div>
                <Button className="bg-earth-terracotta hover:bg-earth-terracotta-dark flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </div>

              {/* B2B Order Summary */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-earth-olive-dark mb-2">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-earth-olive-dark/70">Subtotal ({quantity} {product.unit})</span>
                    <span>OMR {orderSummary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <span className="text-earth-olive-dark/70 mr-1">Estimated Shipping</span>
                      <Info 
                        className="h-4 w-4 text-earth-olive-dark/50 cursor-pointer" 
                        onClick={() => setShowShippingInfo(true)}
                      />
                    </div>
                    <span>OMR {orderSummary.shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-earth-olive-dark/60">
                    <span>Platform Commission ({(COMMISSION_RATE * 100).toFixed(0)}%)</span>
                    <span>OMR {orderSummary.commission.toFixed(2)}</span>
                  </div>
                  <Separator className="my-1" />
                  <div className="flex justify-between font-medium">
                    <span>Estimated Total</span>
                    <span>OMR {orderSummary.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Add the new Interest and Quote buttons */}
              <Separator className="my-4" />
              <p className="text-sm text-earth-olive-dark/70 mb-4">
                Need more information or a custom solution? Our team is ready to help:
              </p>
              <div className="flex gap-4 flex-wrap">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => handleRequireAuth('contact seller') || openInterestDialog(product.id as string, product.name)}
                >
                  Contact Seller
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => handleRequireAuth('request quote') || openQuoteDialog(product.id as string, product.name)}
                >
                  Request Quote
                </Button>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-earth-olive-dark"
                  onClick={() => handleRequireAuth('save') || toast({ title: "Product saved", description: "This product has been saved to your wishlist." })}
                >
                  <Heart className="mr-2 h-4 w-4" /> Save
                </Button>
                <Button variant="outline" size="sm" className="text-earth-olive-dark">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-12 overflow-hidden">
          <Tabs defaultValue="description">
            <TabsList className="w-full bg-gray-50 p-0 rounded-none">
              <TabsTrigger value="description" className="py-4 flex-1 data-[state=active]:bg-white rounded-none data-[state=active]:shadow-none">
                Description
              </TabsTrigger>
              <TabsTrigger value="specifications" className="py-4 flex-1 data-[state=active]:bg-white rounded-none data-[state=active]:shadow-none">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="reviews" className="py-4 flex-1 data-[state=active]:bg-white rounded-none data-[state=active]:shadow-none">
                Reviews
              </TabsTrigger>
              <TabsTrigger value="shipping" className="py-4 flex-1 data-[state=active]:bg-white rounded-none data-[state=active]:shadow-none">
                Shipping
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="p-6">
              <p className="text-earth-olive-dark/80 leading-relaxed">
                {product.description}
              </p>
            </TabsContent>
            
            <TabsContent value="specifications" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="border-b pb-2 last:border-b-0">
                    <div className="text-sm font-semibold text-earth-olive-dark">
                      {spec.name}
                    </div>
                    <div className="text-earth-olive-dark/80">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="p-6">
              <div className="text-center py-8">
                <p className="text-earth-olive-dark/70">Reviews will be available soon.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="p-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-earth-olive-dark">Shipping Information</h3>
                <p className="text-earth-olive-dark/80">
                  Our shipping costs are calculated based on the following formula:
                </p>
                
                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="font-medium">Shipping Cost = Base Rate + (Per {product.unit} Rate × Quantity)</p>
                  <div className="mt-2 text-sm space-y-1">
                    <p>Base Rate: OMR {BASE_SHIPPING_RATE.toFixed(2)}</p>
                    <p>Per {product.unit} Rate: OMR {PER_UNIT_SHIPPING_RATE.toFixed(2)}</p>
                  </div>
                  
                  <div className="mt-4 p-3 border-t pt-3">
                    <p className="text-sm">Your Calculation:</p>
                    <p className="text-xs text-earth-olive-dark/70 mt-1">
                      OMR {BASE_SHIPPING_RATE.toFixed(2)} + (OMR {PER_UNIT_SHIPPING_RATE.toFixed(2)} × {quantity} {product.unit}) = OMR {orderSummary.shippingCost.toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-earth-olive-dark/80">
                  Shipping costs may vary based on location and special handling requirements.
                  For international shipping or custom delivery options, please contact our team.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-earth-olive-dark mb-6">
            Related Products
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  <AspectRatio ratio={4/3}>
                    <img
                      src={`https://images.unsplash.com/photo-15607368${80 + item}7-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80`}
                      alt="Related product"
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                  <div className="absolute top-2 right-2">
                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-white/80 hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="text-xs font-medium text-earth-terracotta mb-1">
                    Fruits
                  </div>
                  <h3 className="font-semibold text-earth-olive-dark mb-1 truncate">
                    Green Apples ({item} kg Pack)
                  </h3>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <span>Al-Ahsa Farms</span>
                    <span className="mx-1">•</span>
                    <span>UAE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-earth-olive-dark">
                      OMR {(9.99 + item).toFixed(2)}
                    </div>
                    <Button size="sm" className="h-8 bg-earth-terracotta hover:bg-earth-terracotta-dark">
                      <ShoppingCart className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />

      {/* Order Confirmation Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Confirm Your Order</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 my-4">
            <p>Please review your order details before finalizing:</p>
            
            <div className="p-4 rounded-md bg-gray-50 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-earth-olive-dark/70">Product:</span>
                <span>{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-earth-olive-dark/70">Quantity:</span>
                <span>{quantity} {product.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-earth-olive-dark/70">Price Per Unit:</span>
                <span>OMR {product.price.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between">
                <span className="text-sm text-earth-olive-dark/70">Subtotal:</span>
                <span>OMR {orderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-earth-olive-dark/70">Shipping:</span>
                <span>OMR {orderSummary.shippingCost.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>OMR {orderSummary.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-purple-700 text-sm">
                <span>Required Deposit (30%):</span>
                <span>OMR {(orderSummary.total * 0.3).toFixed(2)}</span>
              </div>
            </div>
            
            <p className="text-sm text-earth-olive-dark/70">
              By proceeding, you agree to place this order.
              Our team will contact you shortly to confirm availability and arrange payment details.
            </p>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirm(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={finalizeOrder}
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isSubmitting ? "Processing..." : "Confirm Order"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Authentication Alert Dialog */}
     {/* <Dialog open={showAuthAlert} onOpenChange={setShowAuthAlert}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Authentication Required</DialogTitle>
          </DialogHeader>
          
          <div className="my-6 text-center space-y-4">
            <AlertCircle className="mx-auto h-12 w-12 text-earth-terracotta opacity-80" />
            <p>You need to sign in or register to continue with this action.</p>
            <p className="text-sm text-muted-foreground">
              B2B transactions require an account for order tracking, shipping details, and business verification.
            </p>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="sm:flex-1"
              onClick={() => setShowAuthAlert(false)}
            >
              Cancel
            </Button>
            <Button
              className="sm:flex-1 bg-earth-terracotta hover:bg-earth-terracotta-dark"
              onClick={redirectToSignIn}
            >
              Sign In / Register
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>*/}
      
      {/* Shipping Info Sheet */}
      <Sheet open={showShippingInfo} onOpenChange={setShowShippingInfo}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Shipping Information</SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-4">
            <p className="text-sm text-earth-olive-dark/80">
              Our shipping costs are calculated based on the following formula:
            </p>
            
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="font-medium">Shipping Cost = Base Rate + (Per {product.unit} Rate × Quantity)</p>
              <div className="mt-2 text-sm space-y-1">
                <p>Base Rate: OMR {BASE_SHIPPING_RATE.toFixed(2)}</p>
                <p>Per {product.unit} Rate: OMR {PER_UNIT_SHIPPING_RATE.toFixed(2)}</p>
              </div>
              
              <div className="mt-4 p-3 border-t pt-3">
                <p className="text-sm">Your Calculation:</p>
                <p className="text-xs text-earth-olive-dark/70 mt-1">
                  OMR {BASE_SHIPPING_RATE.toFixed(2)} + (OMR {PER_UNIT_SHIPPING_RATE.toFixed(2)} × {quantity} {product.unit}) = OMR {orderSummary.shippingCost.toFixed(2)}
                </p>
              </div>
            </div>
            
            <p className="text-sm text-earth-olive-dark/80">
              Shipping costs may vary based on location and special handling requirements.
              For international shipping or custom delivery options, please contact our team.
            </p>
          </div>
          
          <SheetFooter className="absolute bottom-0 left-0 right-0 p-6">
            <Button 
              onClick={() => setShowShippingInfo(false)}
              className="w-full"
            >
              Close
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
      {/* Image Viewer Dialog */}
      <Dialog open={imageViewerOpen} onOpenChange={setImageViewerOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black/95">
          <div className="relative w-full h-full">
            {/* Close button */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setImageViewerOpen(false)}
              className="absolute top-2 right-2 z-10 text-white hover:bg-white/20 rounded-full"
            >
              <X className="h-6 w-6" />
            </Button>
            
            <div className="flex items-center justify-center min-h-[50vh] p-2">
              <img 
                src={product.images[selectedImageIndex]} 
                alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                className="max-h-[70vh] max-w-full object-contain"
              />
            </div>
            
            {/* Navigation Controls */}
            <div className="absolute inset-y-0 left-2 flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigateImages('prev')}
                className="text-white hover:bg-white/20 rounded-full"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            </div>
            <div className="absolute inset-y-0 right-2 flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigateImages('next')}
                className="text-white hover:bg-white/20 rounded-full"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
            
            {/* Image Indicators */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${selectedImageIndex === index ? 'bg-white' : 'bg-white/40'}`}
                  onClick={() => setSelectedImageIndex(index)}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetailPage;
