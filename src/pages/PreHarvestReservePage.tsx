import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, AlertCircle, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

// Define our schema for form validation
const reservationSchema = z.object({
  quantity: z.coerce.number()
    .min(100, { message: "Minimum order quantity is 100kg for B2B orders" })
    .max(10000, { message: "Maximum order quantity is 10,000kg. Contact us for larger orders." }),
  deliveryDate: z.string().min(1, { message: "Delivery date is required" }),
  specialRequirements: z.string().optional(),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  companyName: z.string().min(1, { message: "Company name is required" }),
  billingAddress: z.string().min(1, { message: "Billing address is required" }),
  shippingAddress: z.string().min(1, { message: "Shipping address is required" }),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

const PreHarvestReservePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, user, profile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [orderSummary, setOrderSummary] = useState<{
    subtotal: number;
    shippingCost: number;
    commission: number;
    total: number;
  }>({
    subtotal: 0,
    shippingCost: 0,
    commission: 0,
    total: 0,
  });
  
  const [showShippingInfo, setShowShippingInfo] = useState(false);

  // Check if the user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      // Store the current URL to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', `/pre-harvest/${id}/reserve`);
      navigate('/signin', { state: { from: `/pre-harvest/${id}/reserve` } });
    } else if (user && profile) {
      // Pre-fill form with user data if available
      form.setValue('firstName', profile.first_name || '');
      form.setValue('lastName', profile.last_name || '');
      form.setValue('email', user.email || '');
      form.setValue('phone', profile.phone_number || '');
      form.setValue('companyName', profile.company_name || '');
    }
  }, [isAuthenticated, navigate, id, user, profile]);
  
  // If not authenticated, don't render the reservation form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto py-20 px-4 text-center">
          <h2 className="text-2xl font-semibold text-earth-olive-dark mb-4">
            Authentication Required
          </h2>
          <p className="text-earth-olive-dark/80 mb-6">
            You need to sign in or register to make pre-harvest reservations.
          </p>
          <Button 
            onClick={() => navigate('/signin', { state: { from: `/pre-harvest/${id}/reserve` } })}
            className="bg-earth-terracotta hover:bg-earth-terracotta-dark text-white"
          >
            Sign In / Register
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  // Mock product data - in a real app this would come from the database
  const product = {
    id: id,
    name: "Premium Organic Wheat",
    price: 28.00,
    minQuantity: 100,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1c5a6ec32?w=400",
  };

  // Commission rate (5% in this example)
  const COMMISSION_RATE = 0.05;
  
  // Base shipping rate and per kg rate
  const BASE_SHIPPING_RATE = 50;
  const PER_KG_SHIPPING_RATE = 0.15;

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      quantity: product.minQuantity,
      deliveryDate: "",
      specialRequirements: "",
      firstName: profile?.first_name || "",
      lastName: profile?.last_name || "",
      email: user?.email || "",
      phone: profile?.phone_number || "",
      companyName: profile?.company_name || "",
      billingAddress: "",
      shippingAddress: "",
    },
  });

  // Calculate order totals when quantity changes
  const watchedQuantity = form.watch("quantity");
  
  React.useEffect(() => {
    const quantity = watchedQuantity || product.minQuantity;
    const subtotal = quantity * product.price;
    const shippingCost = calculateShipping(quantity);
    const commission = subtotal * COMMISSION_RATE;
    const total = subtotal + shippingCost;
    
    setOrderSummary({
      subtotal,
      shippingCost,
      commission,
      total,
    });
  }, [watchedQuantity, product.price, product.minQuantity]);

  const calculateShipping = (quantity: number) => {
    // Base rate plus per kg rate
    return BASE_SHIPPING_RATE + (quantity * PER_KG_SHIPPING_RATE);
  };

  const onSubmit = (data: ReservationFormValues) => {
    // Show confirmation before final submission
    setShowConfirm(true);
  };

  const finalizeOrder = async () => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would submit to your database
      // For now we'll just simulate it with a timeout
      const orderDetails = {
        ...form.getValues(),
        productId: product.id,
        productName: product.name,
        unitPrice: product.price,
        subtotal: orderSummary.subtotal,
        shippingCost: orderSummary.shippingCost,
        commission: orderSummary.commission,
        totalAmount: orderSummary.total,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      toast({
        title: "Reservation Submitted",
        description: "Your reservation has been submitted successfully. We'll contact you shortly.",
        duration: 5000,
      });
      
      // Navigate back to pre-harvest page
      navigate('/pre-harvest');
    } catch (error) {
      console.error("Error submitting reservation:", error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your reservation. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4 md:px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-earth-olive-dark hover:text-earth-olive mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Product Details
        </button>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-earth-olive-dark mb-6">
            Reserve Pre-Harvest Product
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Reservation Form */}
            <div className="lg:col-span-2">
              <Card>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader>
                      <CardTitle>Reservation Details</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      {/* Product Information */}
                      <div className="flex items-center p-4 rounded-lg bg-earth-sand-light/30 border border-earth-sand">
                        <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-earth-olive-dark">{product.name}</h3>
                          <p className="text-earth-olive-dark/70 text-sm">
                            ${product.price.toFixed(2)} / {product.unit}
                          </p>
                          <p className="text-xs text-earth-olive-dark/60 mt-1">
                            Minimum order: {product.minQuantity} {product.unit}
                          </p>
                        </div>
                      </div>
                      
                      {/* Order Quantity */}
                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity (kg)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder={`Minimum ${product.minQuantity}kg`}
                                min={product.minQuantity}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Delivery Date */}
                      <FormField
                        control={form.control}
                        name="deliveryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Delivery Date</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                min={new Date().toISOString().split('T')[0]}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Special Requirements */}
                      <FormField
                        control={form.control}
                        name="specialRequirements"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Requirements</FormLabel>
                            <FormControl>
                              <textarea
                                className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background"
                                placeholder="Any specific requirements or notes"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Separator />

                      {/* Company Information */}
                      <div>
                        <h3 className="font-semibold text-earth-olive-dark mb-4">Company Information</h3>
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Separator />

                      {/* Contact Information */}
                      <div>
                        <h3 className="font-semibold text-earth-olive-dark mb-4">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input type="tel" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <Separator />

                      {/* Address Information */}
                      <div>
                        <h3 className="font-semibold text-earth-olive-dark mb-4">Address Information</h3>
                        
                        <FormField
                          control={form.control}
                          name="billingAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Billing Address</FormLabel>
                              <FormControl>
                                <textarea
                                  className="w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="mt-4">
                          <FormField
                            control={form.control}
                            name="shippingAddress"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Shipping Address</FormLabel>
                                <FormControl>
                                  <textarea
                                    className="w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <Separator />

                      {/* Terms & Conditions */}
                      <div>
                        <h3 className="font-semibold text-earth-olive-dark mb-2">Terms & Conditions</h3>
                        <FormField
                          control={form.control}
                          name="agreeTerms"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  className="mt-1"
                                  checked={field.value}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm text-earth-olive-dark/80">
                                  I agree to the terms and conditions, including the deposit requirement and payment schedule.
                                  I understand that this reservation is subject to availability and final confirmation.
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex justify-end space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate(-1)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        Review Order
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </Card>
            </div>
            
            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-earth-olive-dark/70">Product</span>
                    <span className="font-medium">{product.name}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-earth-olive-dark/70">Quantity</span>
                    <span className="font-medium">{watchedQuantity || product.minQuantity} {product.unit}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-earth-olive-dark/70">Price Per Unit</span>
                    <span className="font-medium">${product.price.toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-earth-olive-dark/70">Subtotal</span>
                    <span className="font-medium">${orderSummary.subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-sm text-earth-olive-dark/70 mr-1">Shipping</span>
                      <Info 
                        className="h-4 w-4 text-earth-olive-dark/50 cursor-pointer" 
                        onClick={() => setShowShippingInfo(true)}
                      />
                    </div>
                    <span className="font-medium">${orderSummary.shippingCost.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-earth-olive-dark/60">
                    <span>Platform Commission ({(COMMISSION_RATE * 100).toFixed(0)}%)</span>
                    <span>${orderSummary.commission.toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl">${orderSummary.total.toFixed(2)}</span>
                  </div>
                  
                  <div className="p-3 bg-amber-50 rounded-md text-xs text-amber-800 mt-4">
                    <div className="flex items-start">
                      <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <p>
                        This is a pre-harvest reservation. A 30% deposit will be required upon confirmation, 
                        with the remaining balance due before delivery.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Order Confirmation Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Confirm Your Reservation</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 my-4">
            <p>Please review your order details before finalizing your reservation:</p>
            
            <div className="p-4 rounded-md bg-gray-50 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-earth-olive-dark/70">Product:</span>
                <span>{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-earth-olive-dark/70">Quantity:</span>
                <span>{watchedQuantity || product.minQuantity} {product.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-earth-olive-dark/70">Price Per Unit:</span>
                <span>${product.price.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between">
                <span className="text-sm text-earth-olive-dark/70">Subtotal:</span>
                <span>${orderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-earth-olive-dark/70">Shipping:</span>
                <span>${orderSummary.shippingCost.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>${orderSummary.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-purple-700 text-sm">
                <span>Required Deposit (30%):</span>
                <span>${(orderSummary.total * 0.3).toFixed(2)}</span>
              </div>
            </div>
            
            <p className="text-sm text-earth-olive-dark/70">
              By proceeding, you agree to place this reservation for the pre-harvest product.
              Our team will contact you shortly to confirm availability and arrange payment details.
            </p>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirm(false)}
              disabled={isSubmitting}
            >
              Back to Edit
            </Button>
            <Button
              onClick={finalizeOrder}
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isSubmitting ? "Processing..." : "Confirm Reservation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
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
              <p className="font-medium">Shipping Cost = Base Rate + (Per Kg Rate × Quantity)</p>
              <div className="mt-2 text-sm space-y-1">
                <p>Base Rate: ${BASE_SHIPPING_RATE.toFixed(2)}</p>
                <p>Per Kg Rate: ${PER_KG_SHIPPING_RATE.toFixed(2)}</p>
              </div>
              
              <div className="mt-4 p-3 border-t pt-3">
                <p className="text-sm">Your Calculation:</p>
                <p className="text-xs text-earth-olive-dark/70 mt-1">
                  ${BASE_SHIPPING_RATE.toFixed(2)} + (${PER_KG_SHIPPING_RATE.toFixed(2)} × {watchedQuantity || product.minQuantity}kg) = ${orderSummary.shippingCost.toFixed(2)}
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
    </div>
  );
};

export default PreHarvestReservePage;
