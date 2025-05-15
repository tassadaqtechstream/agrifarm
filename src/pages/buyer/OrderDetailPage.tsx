import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, PackageOpen, Truck, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface SellerProfile {
  first_name: string | null;
  last_name: string | null;
  company_name: string | null;
  phone_number: string | null;
}

interface OrderItem {
  id: string;
  listing_id: string;
  quantity: number;
  price_per_unit: number;
  total_price: number;
  listing_title: string;
}

interface Order {
  id: string;
  created_at: string;
  updated_at: string;
  total_amount: number;
  status: string;
  payment_status: string;
  buyer_id: string;
  seller_id: string;
  shipping_address: string | null;
  shipping_city: string | null;
  shipping_country: string | null;
  shipping_method: string | null;
  tracking_number: string | null;
  notes: string | null;
  seller: SellerProfile | null;
  items: OrderItem[];
}

// Mock data for static implementation
const mockOrders: Record<string, Order> = {
  "order123": {
    id: "order123",
    created_at: "2025-04-28T10:30:00Z",
    updated_at: "2025-04-28T10:30:00Z",
    total_amount: 126.50,
    status: "shipped",
    payment_status: "paid",
    buyer_id: "user123",
    seller_id: "seller456",
    shipping_address: "123 Palm Street",
    shipping_city: "Muscat",
    shipping_country: "Oman",
    shipping_method: "Standard Shipping",
    tracking_number: "OM123456789",
    notes: "Please leave package at the front door if no one answers.",
    seller: {
      first_name: "Ahmed",
      last_name: "Al-Balushi",
      company_name: "Desert Craftworks",
      phone_number: "+968 9123 4567"
    },
    items: [
      {
        id: "item1",
        listing_id: "listing1",
        quantity: 2,
        price_per_unit: 45.00,
        total_price: 90.00,
        listing_title: "Handmade Ceramic Bowl"
      },
      {
        id: "item2",
        listing_id: "listing2",
        quantity: 1,
        price_per_unit: 36.50,
        total_price: 36.50,
        listing_title: "Traditional Omani Incense Burner"
      }
    ]
  },
  "order456": {
    id: "order456",
    created_at: "2025-04-25T14:15:00Z",
    updated_at: "2025-04-26T09:20:00Z",
    total_amount: 85.75,
    status: "delivered",
    payment_status: "paid",
    buyer_id: "user123",
    seller_id: "seller789",
    shipping_address: "456 Oasis Avenue",
    shipping_city: "Salalah",
    shipping_country: "Oman",
    shipping_method: "Express Shipping",
    tracking_number: "OM987654321",
    notes: null,
    seller: {
      first_name: "Fatima",
      last_name: "Al-Zadjali",
      company_name: "Omani Heritage Crafts",
      phone_number: "+968 9876 5432"
    },
    items: [
      {
        id: "item3",
        listing_id: "listing3",
        quantity: 1,
        price_per_unit: 85.75,
        total_price: 85.75,
        listing_title: "Silver Khanjar Ornament"
      }
    ]
  },
  "order789": {
    id: "order789",
    created_at: "2025-05-01T08:45:00Z",
    updated_at: "2025-05-01T08:45:00Z",
    total_amount: 52.25,
    status: "pending",
    payment_status: "unpaid",
    buyer_id: "user123",
    seller_id: "seller321",
    shipping_address: "789 Date Palm Road",
    shipping_city: "Nizwa",
    shipping_country: "Oman",
    shipping_method: null,
    tracking_number: null,
    notes: "Please gift wrap if possible",
    seller: {
      first_name: "Khalid",
      last_name: "Al-Rawahi",
      company_name: null,
      phone_number: "+968 9567 1234"
    },
    items: [
      {
        id: "item4",
        listing_id: "listing4",
        quantity: 1,
        price_per_unit: 42.25,
        total_price: 42.25,
        listing_title: "Hand-woven Basket"
      },
      {
        id: "item5",
        listing_id: "listing5",
        quantity: 1,
        price_per_unit: 10.00,
        total_price: 10.00,
        listing_title: "Frankincense Pack (50g)"
      }
    ]
  }
};

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      if (id && id in mockOrders) {
        setOrder(mockOrders[id]);
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'delivered':
        return 4;
      case 'shipped':
        return 3;
      case 'confirmed':
        return 2;
      case 'pending':
        return 1;
      case 'cancelled':
        return 0;
      default:
        return 1;
    }
  };

  const renderStatusTimeline = (status: string) => {
    const step = getStatusStep(status);
    const isCancelled = status === 'cancelled';

    return (
        <div className="my-6">
          {isCancelled ? (
              <div className="flex items-center gap-3 text-red-500">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">This order has been cancelled</span>
              </div>
          ) : (
              <div className="relative">
                <div className="flex justify-between mb-2">
                  <div className="text-center">
                    <div className={`rounded-full w-8 h-8 flex items-center justify-center mb-1 ${step >= 1 ? 'bg-earth-terracotta text-white' : 'bg-gray-200'}`}>1</div>
                    <div className="text-xs">Pending</div>
                  </div>
                  <div className="text-center">
                    <div className={`rounded-full w-8 h-8 flex items-center justify-center mb-1 ${step >= 2 ? 'bg-earth-terracotta text-white' : 'bg-gray-200'}`}>2</div>
                    <div className="text-xs">Confirmed</div>
                  </div>
                  <div className="text-center">
                    <div className={`rounded-full w-8 h-8 flex items-center justify-center mb-1 ${step >= 3 ? 'bg-earth-terracotta text-white' : 'bg-gray-200'}`}>3</div>
                    <div className="text-xs">Shipped</div>
                  </div>
                  <div className="text-center">
                    <div className={`rounded-full w-8 h-8 flex items-center justify-center mb-1 ${step >= 4 ? 'bg-earth-terracotta text-white' : 'bg-gray-200'}`}>4</div>
                    <div className="text-xs">Delivered</div>
                  </div>
                </div>
                <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 -z-10">
                  <div
                      className="h-full bg-earth-terracotta transition-all"
                      style={{ width: `${(step - 1) * 33}%` }}
                  ></div>
                </div>
              </div>
          )}
        </div>
    );
  };

  const handleCancelOrder = () => {
    // Show confirmation toast
    toast({
      title: "Cancel Order?",
      description: "Are you sure you want to cancel this order?",
      action: (
          <div className="flex gap-2 mt-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Mock cancel order functionality
                  if (order) {
                    const updatedOrder = { ...order, status: 'cancelled' };
                    setOrder(updatedOrder);

                    toast({
                      title: "Order Cancelled",
                      description: "Your order has been cancelled successfully"
                    });
                  }
                }}
            >
              Yes, Cancel
            </Button>
            <Button
                size="sm"
                className="bg-earth-terracotta"
            >
              No, Keep Order
            </Button>
          </div>
      ),
    });
  };

  const handleContactSeller = () => {
    toast({
      title: "Contact Seller",
      description: "This feature is not available in the demo. In a real application, this would open a messaging interface.",
    });
  };

  if (isLoading) {
    return (
        <div className="min-h-screen bg-gray-50">
          <Navbar />

          <main className="container mx-auto py-12 px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <Skeleton className="h-6 w-40" />
              </div>

              <Skeleton className="h-12 w-64 mb-8" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Skeleton className="h-40" />
                <Skeleton className="h-40" />
                <Skeleton className="h-40" />
              </div>

              <Skeleton className="h-64 mb-6" />

              <Skeleton className="h-64" />
            </div>
          </main>

          <Footer />
        </div>
    );
  }

  if (!order) {
    return (
        <div className="min-h-screen bg-gray-50">
          <Navbar />

          <main className="container mx-auto py-12 px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-700">Order not found</h2>
              <p className="mt-2 text-gray-600">We couldn't find the order you're looking for.</p>
              <Button
                  onClick={() => navigate("/buyer/orders")}
                  className="mt-4 bg-earth-terracotta hover:bg-earth-terracotta-dark"
              >
                Back to Orders
              </Button>
            </div>
          </main>

          <Footer />
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="container mx-auto py-12 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Button
                  variant="ghost"
                  className="pl-0 hover:bg-transparent hover:text-earth-terracotta"
                  asChild
              >
                <Link to="/buyer/orders">
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back to Orders
                </Link>
              </Button>
            </div>

            <div className="flex justify-between items-start flex-wrap gap-4 mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-earth-olive-dark">
                  Order #{order.id.substring(0, 8)}
                </h1>
                <p className="text-sm text-earth-olive-dark/70 mt-1">
                  Placed on {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="space-x-2">
                {order.status === 'pending' && (
                    <Button
                        variant="outline"
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        onClick={handleCancelOrder}
                    >
                      Cancel Order
                    </Button>
                )}
                <Button
                    className="bg-earth-terracotta hover:bg-earth-terracotta-dark"
                    onClick={handleContactSeller}
                >
                  Contact Seller
                </Button>
              </div>
            </div>

            {renderStatusTimeline(order.status)}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Order Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-earth-olive-dark/70">Status</span>
                      <span className="font-medium capitalize">{order.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-earth-olive-dark/70">Payment</span>
                      <span className="font-medium capitalize">{order.payment_status.replace('_', ' ')}</span>
                    </div>
                    {order.shipping_method && (
                        <div className="flex justify-between">
                          <span className="text-earth-olive-dark/70">Shipping Method</span>
                          <span className="font-medium">{order.shipping_method}</span>
                        </div>
                    )}
                    {order.tracking_number && (
                        <div className="flex justify-between">
                          <span className="text-earth-olive-dark/70">Tracking #</span>
                          <span className="font-medium">{order.tracking_number}</span>
                        </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                  {order.shipping_address ? (
                      <div className="text-earth-olive-dark/90">
                        <p>{order.shipping_address}</p>
                        {order.shipping_city && <p>{order.shipping_city}</p>}
                        {order.shipping_country && <p>{order.shipping_country}</p>}
                      </div>
                  ) : (
                      <p className="text-earth-olive-dark/70">No shipping address provided</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Seller Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">
                      {order.seller?.company_name ||
                          (order.seller ? `${order.seller.first_name || ''} ${order.seller.last_name || ''}` : 'Unknown Seller')}
                    </p>
                    {order.seller?.phone_number && (
                        <p className="text-earth-olive-dark/90">{order.seller.phone_number}</p>
                    )}
                    <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 w-full"
                        onClick={handleContactSeller}
                    >
                      Contact Seller
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardHeader className="pb-3">
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b last:border-0 last:pb-0">
                        <div className="flex items-center mb-2 sm:mb-0">
                          <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-4">
                            <PackageOpen className="h-6 w-6 text-earth-olive-dark/70" />
                          </div>
                          <div>
                            <h4 className="font-medium">{item.listing_title}</h4>
                            <p className="text-sm text-earth-olive-dark/70">
                              OMR {item.price_per_unit.toFixed(2)} × {item.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="font-medium">
                          OMR {item.total_price.toFixed(2)}
                        </div>
                      </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>OMR {order.total_amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>OMR 0.00</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg pt-2">
                    <span>Total</span>
                    <span>OMR {order.total_amount.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {order.notes && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Order Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-earth-olive-dark/90">{order.notes}</p>
                  </CardContent>
                </Card>
            )}
          </div>
        </main>

        <Footer />
      </div>
  );
};

export default OrderDetailPage;