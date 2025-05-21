import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import axios from "axios"; // Import axios for direct API calls
import apiClient from '@/utility/Apis.ts'
const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user, profile, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isGuest, setIsGuest] = useState<boolean>(!isAuthenticated);

  // Form state for shipping and billing information
  const [formData, setFormData] = useState({
    shipping_address: "",
    billing_address: "",
    payment_method: "credit", // Default to credit for both guest and authenticated users
    shipping_method: "standard", // Default shipping method
    notes: "",

    // Guest specific fields
    guest_name: "",
    guest_email: "",
    guest_phone: "",

    // B2B specific fields (if user is B2B)
    purchase_order_number: "",
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
      setFormData(prev => ({
        ...prev,
        shipping_address: profile.address || "",
        billing_address: profile.address || "", // Default billing to same as shipping
        guest_name: `${profile.first_name || ""} ${profile.last_name || ""}`.trim(),
        guest_email: user.email || "",
        guest_phone: profile.phone_number || "",
      }));
    }
  }, [user, profile, items.length, navigate, isAuthenticated]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form fields
    const requiredFields = ["shipping_address", "billing_address", "payment_method", "shipping_method"];

    // Add guest-specific required fields if guest
    if (isGuest) {
      requiredFields.push("guest_name", "guest_email", "guest_phone");
    }

    // Check if user is B2B (would need to be determined from user profile)
    const isB2BUser = isAuthenticated && profile?.business_id;

    // Add B2B specific required fields
    if (isB2BUser && formData.payment_method === 'invoice') {
      requiredFields.push("purchase_order_number");
    }

    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

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
      // Format products array according to backend expectations
      const productsData = items.map(item => ({
        id: item.id,
        quantity: item.quantity,
      }));

      // Create order request data
      const orderData = {
        products: productsData,
        shipping_address: formData.shipping_address,
        billing_address: formData.billing_address,
        payment_method: formData.payment_method,
        shipping_method: formData.shipping_method,
        notes: formData.notes,
      };

      // Add guest fields if guest checkout
      if (isGuest) {
        Object.assign(orderData, {
          guest_name: formData.guest_name,
          guest_email: formData.guest_email,
          guest_phone: formData.guest_phone,
        });
      }

      // Add B2B fields if B2B user
      if (isB2BUser) {
        Object.assign(orderData, {
          purchase_order_number: formData.purchase_order_number,
        });
      }
      const response = await apiClient.orders.createOrder(orderData);


      // Handle successful order
      clearCart();

      toast({
        title: "Order Successful",
        description: "Your order has been placed successfully!",
      });

      // Navigate to order success page with order ID
      navigate(`/checkout/success?order_id=${response.data.order.id}`);

    } catch (error) {
      console.error("Error creating order:", error);

      // Show appropriate error message based on API response
      const errorMessage = error.response?.data?.error ||
          error.response?.data?.message ||
          "There was a problem processing your order. Please try again.";

      toast({
        variant: "destructive",
        title: "Order Failed",
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine available payment methods based on user type
  const getPaymentMethods = () => {
    const isB2BUser = isAuthenticated && profile?.business_id;

    if (isB2BUser) {
      return [
        { value: "credit", label: "Credit Card" },
        { value: "invoice", label: "Invoice (Net 30)" },
        { value: "bank_transfer", label: "Bank Transfer" }
      ];
    } else if (isGuest) {
      return [
        { value: "credit", label: "Credit Card" },
        { value: "bank_transfer", label: "Bank Transfer" }
      ];
    } else {
      return [
        { value: "credit", label: "Credit Card" },
        { value: "bank_transfer", label: "Bank Transfer" }
      ];
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
                  {/* Customer Information Section (Guest Only) */}
                  {isGuest && (
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="guest_name">Full Name</Label>
                            <Input
                                id="guest_name"
                                name="guest_name"
                                value={formData.guest_name}
                                onChange={handleInputChange}
                                required
                            />
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="guest_email">Email Address</Label>
                            <Input
                                id="guest_email"
                                name="guest_email"
                                type="email"
                                value={formData.guest_email}
                                onChange={handleInputChange}
                                required
                            />
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="guest_phone">Phone Number</Label>
                            <Input
                                id="guest_phone"
                                name="guest_phone"
                                value={formData.guest_phone}
                                onChange={handleInputChange}
                                required
                            />
                          </div>
                        </div>
                      </div>
                  )}

                  {/* Shipping Information */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="shipping_address">Shipping Address</Label>
                        <Input
                            id="shipping_address"
                            name="shipping_address"
                            value={formData.shipping_address}
                            onChange={handleInputChange}
                            placeholder="Enter your full shipping address"
                            required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="billing_address">Billing Address</Label>
                        <Input
                            id="billing_address"
                            name="billing_address"
                            value={formData.billing_address}
                            onChange={handleInputChange}
                            placeholder="Enter your billing address (if different from shipping)"
                            required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="shipping_method">Shipping Method</Label>
                        <Select
                            value={formData.shipping_method}
                            onValueChange={(value) => handleSelectChange("shipping_method", value)}
                        >
                          <SelectTrigger id="shipping_method">
                            <SelectValue placeholder="Select a shipping method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard Shipping (3-5 days)</SelectItem>
                            <SelectItem value="express">Express Shipping (1-2 days)</SelectItem>
                            <SelectItem value="pickup">Local Pickup</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* B2B Purchase Order (Only for B2B users) */}
                  {isAuthenticated && profile?.business_id && (
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Business Information</h2>
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="purchase_order_number">Purchase Order Number</Label>
                            <Input
                                id="purchase_order_number"
                                name="purchase_order_number"
                                value={formData.purchase_order_number}
                                onChange={handleInputChange}
                                placeholder="Enter your PO number"
                                required={formData.payment_method === 'invoice'}
                            />
                          </div>
                        </div>
                      </div>
                  )}

                  {/* Payment Method */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="payment_method">Select Payment Method</Label>
                        <Select
                            value={formData.payment_method}
                            onValueChange={(value) => handleSelectChange("payment_method", value)}
                        >
                          <SelectTrigger id="payment_method">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            {getPaymentMethods().map(method => (
                                <SelectItem key={method.value} value={method.value}>{method.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Payment method specific details */}
                      {formData.payment_method === 'credit' && (
                          <div className="p-4 bg-muted/50 rounded-md">
                            <p className="text-sm">
                              Credit card payment will be processed securely after you complete your order.
                            </p>
                          </div>
                      )}

                      {formData.payment_method === 'invoice' && (
                          <div className="p-4 bg-muted/50 rounded-md">
                            <p className="text-sm">
                              Invoice will be generated and sent to your business email. Payment terms apply according to your business agreement.
                            </p>
                          </div>
                      )}

                      {formData.payment_method === 'bank_transfer' && (
                          <div className="p-4 bg-muted/50 rounded-md">
                            <p className="text-sm">
                              Bank transfer details will be provided after order confirmation. Your order will be processed once payment is received.
                            </p>
                          </div>
                      )}
                    </div>
                  </div>

                  {/* Order Notes */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                    <div className="grid gap-2">
                      <Label htmlFor="notes">Order Notes (Optional)</Label>
                      <Input
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          placeholder="Any special instructions for your order"
                      />
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

                {/* Additional payment info for invoice */}
                {formData.payment_method === 'invoice' && (
                    <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700">
                      <p className="font-medium">B2B Invoice Payment:</p>
                      <p>This order will be billed according to your business payment terms. An invoice will be sent to your registered email.</p>
                    </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
  );
};

export default CheckoutPage;