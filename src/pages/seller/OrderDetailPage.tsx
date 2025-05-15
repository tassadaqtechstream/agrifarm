import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface BuyerProfile {
  first_name: string | null;
  last_name: string | null;
  company_name: string | null;
  phone_number: string | null;
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
  buyer: BuyerProfile | null;
  items: OrderItem[];
}

interface OrderItem {
  id: string;
  listing_id: string;
  quantity: number;
  price_per_unit: number;
  total_price: number;
  listing_title: string;
}

// Mock data for static implementation
const mockOrders: Record<string, Order> = {
  "order123": {
    id: "order123",
    created_at: "2025-04-28T10:30:00Z",
    updated_at: "2025-04-30T14:15:00Z",
    total_amount: 126.50,
    status: "shipped",
    payment_status: "fully_paid",
    buyer_id: "buyer456",
    seller_id: "seller123",
    shipping_address: "123 Palm Street",
    shipping_city: "Muscat",
    shipping_country: "Oman",
    shipping_method: "Standard Shipping",
    tracking_number: "OM123456789",
    notes: "Please leave package at the front door if no one answers.",
    buyer: {
      first_name: "Mohammed",
      last_name: "Al-Hadhrami",
      company_name: null,
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
    created_at: "2025-05-01T14:20:00Z",
    updated_at: "2025-05-01T14:20:00Z",
    total_amount: 85.75,
    status: "pending",
    payment_status: "unpaid",
    buyer_id: "buyer789",
    seller_id: "seller123",
    shipping_address: "456 Oasis Avenue",
    shipping_city: "Salalah",
    shipping_country: "Oman",
    shipping_method: "Express Shipping",
    tracking_number: null,
    notes: null,
    buyer: {
      first_name: "Aisha",
      last_name: "Al-Balushi",
      company_name: "Coastal Traders LLC",
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
  }
};

const SellerOrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<string>("");
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      if (id && id in mockOrders) {
        const fetchedOrder = mockOrders[id];
        setOrder(fetchedOrder);
        setStatus(fetchedOrder.status);
        setTrackingNumber(fetchedOrder.tracking_number || "");
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  const handleUpdateOrder = async () => {
    if (!order) return;

    setIsUpdating(true);

    try {
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update the order in our state
      const updatedOrder = {
        ...order,
        status,
        tracking_number: trackingNumber || null,
        updated_at: new Date().toISOString()
      };

      // Update the local mock data
      mockOrders[order.id] = updatedOrder;

      // Update the state
      setOrder(updatedOrder);

      toast({
        title: "Order updated",
        description: "Order details have been updated successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update order",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle unauthenticated users
  if (!user && !isLoading) {
    return (
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto py-12 px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-earth-olive-dark mb-4">
                Seller Dashboard
              </h1>
              <p className="mb-6 text-muted-foreground">
                Please sign in to view and manage your orders.
              </p>
              <Button
                  onClick={() => window.location.href = '/signin'}
                  className="bg-earth-terracotta hover:bg-earth-terracotta-dark"
              >
                Sign In
              </Button>
            </div>
          </main>
          <Footer />
        </div>
    );
  }

  if (isLoading) {
    return (
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto py-12 px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <Skeleton className="h-10 w-1/3 mb-4" />
              <Skeleton className="h-6 w-1/4 mb-8" />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Skeleton className="h-40" />
                <Skeleton className="h-40" />
                <Skeleton className="h-40" />
              </div>

              <Skeleton className="h-64 mb-8" />
              <Skeleton className="h-56" />
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
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-xl font-semibold">Order not found</h2>
              <p className="mt-2 text-earth-olive-dark/70 mb-4">
                The order you're looking for doesn't exist or you don't have permission to view it.
              </p>
              <Button
                  onClick={() => navigate('/seller/orders')}
                  className="bg-earth-terracotta hover:bg-earth-terracotta-dark"
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
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-between items-start mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-earth-olive-dark">
                  Order #{order.id.substring(0, 8)}
                </h1>
                <p className="text-earth-olive-dark/70">
                  Placed on {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <Button
                  onClick={() => navigate('/seller/orders')}
                  variant="outline"
                  className="mt-2 md:mt-0"
              >
                Back to Orders
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Customer Information</h3>
                  <p className="font-medium">
                    {order.buyer?.company_name ||
                        (order.buyer ? `${order.buyer.first_name || ''} ${order.buyer.last_name || ''}` : 'Unknown Customer')}
                  </p>
                  {order.buyer?.phone_number && (
                      <p className="text-earth-olive-dark/70 mt-1">
                        {order.buyer.phone_number}
                      </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Shipping Address</h3>
                  <p>{order.shipping_address || 'Not specified'}</p>
                  {(order.shipping_city || order.shipping_country) && (
                      <p className="mt-1">
                        {order.shipping_city}{order.shipping_city && order.shipping_country && ', '}{order.shipping_country}
                      </p>
                  )}
                  {order.shipping_method && (
                      <p className="text-earth-olive-dark/70 mt-1">
                        Shipping method: {order.shipping_method}
                      </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Order Summary</h3>
                  <div className="flex justify-between mb-1">
                    <span className="text-earth-olive-dark/70">Total Amount</span>
                    <span className="font-medium">OMR {order.total_amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-earth-olive-dark/70">Payment Status</span>
                    <span className="font-medium capitalize">
                    {order.payment_status.replace('_', ' ')}
                  </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-earth-olive-dark/70">Order Status</span>
                    <span className="font-medium capitalize">{order.status}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Order Items</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order.items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.listing_title}</TableCell>
                            <TableCell className="text-right">OMR {item.price_per_unit.toFixed(2)}</TableCell>
                            <TableCell className="text-right">{item.quantity}</TableCell>
                            <TableCell className="text-right">OMR {item.total_price.toFixed(2)}</TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Update Order</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="status">Order Status</Label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tracking">Tracking Number</Label>
                    <Input
                        id="tracking"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder="Enter tracking number"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                      onClick={handleUpdateOrder}
                      disabled={isUpdating}
                      className="bg-earth-terracotta hover:bg-earth-terracotta-dark"
                  >
                    {isUpdating ? "Updating..." : "Update Order"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
  );
};

export default SellerOrderDetailPage;