import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ShippingInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user, profile, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isGuest, setIsGuest] = useState<boolean>(!isAuthenticated);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart");
      return;
    }

    // Set guest mode based on authentication status
    setIsGuest(!isAuthenticated);

    // Prefill form with user data if available and authenticated
    if (isAuthenticated && user && profile) {
      setShippingInfo({
        fullName: `${profile.first_name || ""} ${profile.last_name || ""}`.trim(),
        email: user.email || "",
        phoneNumber: profile.phone_number || "",
        address: profile.address || "",
        city: profile.city || "",
        country: profile.country || "",
      });
    }
  }, [user, profile, items.length, navigate, isAuthenticated]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ["fullName", "email", "phoneNumber", "address", "city", "country"];
    const missingFields = requiredFields.filter(field => !shippingInfo[field as keyof ShippingInfo]);

    if (missingFields.length > 0) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: `Please fill in all required fields: ${missingFields.join(", ")}`,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock order creation logic
      // In a real application, this would be an API call to your backend
      const orderDetails = {
        customer: {
          id: isGuest ? null : user?.id,
          isGuest: isGuest,
          ...shippingInfo,
        },
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity,
        })),
        totalAmount: totalPrice,
        orderDate: new Date().toISOString(),
        paymentMethod: "cash_on_delivery",
        status: "pending",
      };

      // For demo purposes, log the order details
      console.log("Order placed:", orderDetails);

      // Clear the cart
      clearCart();

      toast({
        title: "Order Successful",
        description: "Your order has been placed successfully!",
      });

      // Store order details in session storage for order confirmation page
      sessionStorage.setItem("lastOrder", JSON.stringify(orderDetails));
      navigate("/checkout/success");
    } catch (error) {
      console.error("Error processing order:", error);
      toast({
        variant: "destructive",
        title: "Order Failed",
        description: "There was a problem processing your order. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
          <h1 className="text-3xl font-bold text-earth-olive-dark mb-8">Checkout</h1>

          {isGuest && (
              <div className="mb-6 p-4 bg-muted rounded-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Checking out as a guest</h3>
                    <p className="text-sm text-muted-foreground">
                      Have an account? Sign in for a faster checkout experience.
                    </p>
                  </div>
                  <Button
                      variant="outline"
                      onClick={() => {
                        sessionStorage.setItem('redirectAfterLogin', '/checkout');
                        navigate('/signin');
                      }}
                  >
                    Sign In
                  </Button>
                </div>
              </div>
          )}

          <div className="grid gap-8 md:grid-cols-5">
            <div className="md:col-span-3 space-y-8">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            value={shippingInfo.fullName}
                            onChange={handleInputChange}
                            required
                        />
                      </div>

                      {isGuest && (
                          <div className="grid gap-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={shippingInfo.email}
                                onChange={handleInputChange}
                                required
                            />
                          </div>
                      )}

                      <div className="grid gap-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            value={shippingInfo.phoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            name="address"
                            value={shippingInfo.address}
                            onChange={handleInputChange}
                            required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                              id="city"
                              name="city"
                              value={shippingInfo.city}
                              onChange={handleInputChange}
                              required
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="country">Country</Label>
                          <Input
                              id="country"
                              name="country"
                              value={shippingInfo.country}
                              onChange={handleInputChange}
                              required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      For demo purposes, we'll assume Cash on Delivery. No payment information is required.
                    </p>
                    <div className="flex items-center bg-muted/50 p-4 rounded-md">
                      <div className="flex-1">
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-sm text-muted-foreground">
                          Pay when your order arrives
                        </p>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                      </div>
                    </div>
                  </div>

                  <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                    ) : (
                        "Complete Order"
                    )}
                  </Button>
                </div>
              </form>
            </div>

            <div className="md:col-span-2">
              <div className="border rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold">Order Summary</h2>

                <div className="space-y-4">
                  {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded"
                          />
                        </div>

                        <div className="flex-grow">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.quantity} x OMR {item.price.toFixed(2)}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-medium">
                            OMR {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                  ))}
                </div>

                <Separator />

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
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
  );
};

export default CheckoutPage;