import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface SellerProfile {
  first_name: string | null;
  last_name: string | null;
  company_name: string | null;
}

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  payment_status: string;
  seller_id: string;
  seller: SellerProfile | null;
}

// Mock data for static implementation
const mockOrders: Order[] = [
  {
    id: "order123",
    created_at: "2025-04-28T10:30:00Z",
    total_amount: 126.50,
    status: "shipped",
    payment_status: "fully_paid",
    seller_id: "seller456",
    seller: {
      first_name: "Ahmed",
      last_name: "Al-Balushi",
      company_name: "Desert Craftworks"
    }
  },
  {
    id: "order456",
    created_at: "2025-04-25T14:15:00Z",
    total_amount: 85.75,
    status: "delivered",
    payment_status: "fully_paid",
    seller_id: "seller789",
    seller: {
      first_name: "Fatima",
      last_name: "Al-Zadjali",
      company_name: "Omani Heritage Crafts"
    }
  },
  {
    id: "order789",
    created_at: "2025-05-01T08:45:00Z",
    total_amount: 52.25,
    status: "pending",
    payment_status: "unpaid",
    seller_id: "seller321",
    seller: {
      first_name: "Khalid",
      last_name: "Al-Rawahi",
      company_name: null
    }
  },
  {
    id: "order321",
    created_at: "2025-04-20T16:20:00Z",
    total_amount: 75.00,
    status: "cancelled",
    payment_status: "refunded",
    seller_id: "seller123",
    seller: {
      first_name: "Maryam",
      last_name: "Al-Habsi",
      company_name: "Maryam's Crafts"
    }
  },
  {
    id: "order654",
    created_at: "2025-04-15T09:10:00Z",
    total_amount: 120.00,
    status: "confirmed",
    payment_status: "deposit_paid",
    seller_id: "seller456",
    seller: {
      first_name: "Ahmed",
      last_name: "Al-Balushi",
      company_name: "Desert Craftworks"
    }
  }
];

const OrdersPage: React.FC = () => {
  // Use proper AuthContext properties
  const { currentUser, userProfile, isAuthenticated, isLoading: authLoading, hasRole } = useAuth();
  const { toast } = useToast();

  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Check user type using AuthContext methods
  const isBuyer = hasRole('buyer') || userProfile?.user_type === 'buyer' ||
      (isAuthenticated && !hasRole('seller') && userProfile?.user_type !== 'seller');

  useEffect(() => {
    // Only fetch orders if user is authenticated and not loading
    if (isAuthenticated && !authLoading) {
      // Simulate API call delay
      const timer = setTimeout(() => {
        // In a real implementation, you would filter orders by current user ID
        // For now, we'll show all mock orders for authenticated users
        setOrders(mockOrders);
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (!authLoading && !isAuthenticated) {
      // If not loading and not authenticated, don't show loading state
      setIsLoading(false);
    }
  }, [isAuthenticated, authLoading, currentUser?.id]);

  useEffect(() => {
    // Filter orders based on status and search query
    let filtered = [...orders];

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Apply search filter - search by ID, seller name, or company name
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order =>
          order.id.toLowerCase().includes(query) ||
          (order.seller?.company_name && order.seller.company_name.toLowerCase().includes(query)) ||
          (order.seller?.first_name && order.seller.first_name.toLowerCase().includes(query)) ||
          (order.seller?.last_name && order.seller.last_name.toLowerCase().includes(query))
      );
    }

    setFilteredOrders(filtered);
  }, [orders, statusFilter, searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'confirmed':
        return 'bg-purple-100 text-purple-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'fully_paid':
        return 'bg-green-100 text-green-700';
      case 'deposit_paid':
        return 'bg-blue-100 text-blue-700';
      case 'unpaid':
        return 'bg-red-100 text-red-700';
      case 'refunded':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Show loading state while auth is loading
  if (authLoading) {
    return (
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto py-12 px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-earth-terracotta mx-auto mb-4"></div>
              <p className="text-earth-olive-dark">Loading...</p>
            </div>
          </main>
          <Footer />
        </div>
    );
  }

  // Handle when no user is logged in
  if (!isAuthenticated) {
    return (
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto py-12 px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-earth-olive-dark mb-4">
                My Orders
              </h1>
              <p className="mb-6 text-muted-foreground">
                Please sign in to view your orders.
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

  // Check if user has permission to view orders (buyers can view orders)
  if (!isBuyer) {
    return (
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto py-12 px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-earth-olive-dark mb-4">
                My Orders
              </h1>
              <p className="mb-6 text-muted-foreground">
                This section is available for buyers. Please contact support if you need access.
              </p>
              <Button asChild className="bg-earth-terracotta hover:bg-earth-terracotta-dark">
                <Link to="/categories">Browse Products</Link>
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
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-earth-olive-dark">
                  My Orders
                </h1>
                <p className="text-sm text-earth-olive-dark/70 mt-1">
                  Track and manage your purchases
                  {userProfile && (
                      <span className="ml-2 text-earth-terracotta">
                      • Welcome, {userProfile.first_name || currentUser?.name || 'User'}!
                    </span>
                  )}
                </p>
              </div>
            </div>

            <Card className="mb-8">
              <CardContent className="p-6 flex flex-wrap gap-4 justify-between items-center">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                      placeholder="Search orders..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="w-full md:w-auto">
                  <Select
                      defaultValue="all"
                      onValueChange={setStatusFilter}
                      value={statusFilter}
                  >
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {isLoading ? (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-earth-terracotta mx-auto mb-4"></div>
                  <p className="text-earth-olive-dark">Loading your orders...</p>
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="h-8 w-8 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-earth-olive-dark mb-2">No Orders Found</h3>
                  <p className="text-earth-olive-dark/70 mb-4">
                    {statusFilter !== "all"
                        ? `You don't have any ${statusFilter} orders.`
                        : searchQuery
                            ? "No orders match your search criteria."
                            : "You haven't placed any orders yet."}
                  </p>
                  {(statusFilter !== "all" || searchQuery) ? (
                      <Button
                          onClick={() => {
                            setStatusFilter("all");
                            setSearchQuery("");
                          }}
                          className="bg-earth-terracotta hover:bg-earth-terracotta-dark mr-2"
                      >
                        Clear Filters
                      </Button>
                  ) : (
                      <Button asChild className="bg-earth-terracotta hover:bg-earth-terracotta-dark">
                        <Link to="/categories">Browse Products</Link>
                      </Button>
                  )}
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Seller</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id.substring(0, 8)}</TableCell>
                            <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                            <TableCell>
                              {order.seller?.company_name ||
                                  (order.seller ? `${order.seller.first_name || ''} ${order.seller.last_name || ''}`.trim() : 'Unknown Seller')}
                            </TableCell>
                            <TableCell>OMR {order.total_amount.toFixed(2)}</TableCell>
                            <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                            </TableCell>
                            <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusColor(order.payment_status)}`}>
                          {order.payment_status.replace('_', ' ')}
                        </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/buyer/orders/${order.id}`}>
                                  <Eye className="h-4 w-4 mr-1" /> View
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
  );
};

export default OrdersPage;