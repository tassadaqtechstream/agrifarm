
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
        <h1 className="text-3xl font-bold text-earth-olive-dark mb-8">Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Browse our products and add some items to your cart.</p>
            <Link to="/categories">
              <Button>Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row gap-4 p-4">
                      <div className="flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-24 h-24 object-cover rounded"
                        />
                      </div>
                      
                      <div className="flex-grow space-y-2">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">Type: {item.type === "product" ? "Regular Product" : "Pre-Harvest"}</p>
                        <p className="text-sm text-muted-foreground">Seller: {item.sellerName || "Unknown Seller"}</p>
                      </div>
                      
                      <div className="flex flex-col items-end justify-between">
                        <p className="font-medium text-right text-earth-terracotta">
                          OMR {item.price.toFixed(2)} / {item.unit}
                        </p>
                        
                        <div className="flex items-center space-x-2">
                          <label className="text-sm">Qty:</label>
                          <Input 
                            type="number" 
                            min="1" 
                            value={item.quantity} 
                            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                            className="w-20 h-8 text-center"
                          />
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 size={16} />
                          <span className="ml-1">Remove</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="md:col-span-1">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>OMR {totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>OMR 0.00</span>
                    </div>
                    <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-earth-terracotta">OMR {totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col gap-4">
                  <Link to="/checkout" className="w-full">
                    <Button className="w-full"  >
                      Proceed to Checkout
                    </Button>
                  </Link>
                  

                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;
