import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface BuyerProfile {
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
  buyer_id: string;
  buyer: BuyerProfile | null;
}

// Mock data for static implementation
const mockOrders: Order[] = [
  {
    id: "order123456",
    created_at: "2025-04-28T10:30:00Z",
    total_amount: 126.50,
    status: "shipped",
    payment_status: "fully_paid",
    buyer_id: "buyer456",
    buyer: {
      first_name: "Mohammed",
      last_name: "Al-Hadhrami",
      company_name: null
    }
  },
  {
    id: "order789012",
    created_at: "2025-05-01T14:20:00Z",
    total_amount: 85.75,
    status: "pending",
    payment_status: "unpaid",
    buyer_id: "buyer789",
    buyer: {
      first_name: "Aisha",
      last_name: "Al-Balushi",
      company_name: "Coastal Traders LLC"
    }
  },
  {
    id: "order345678",
    created_at: "2025-04-15T09:10:00Z",
    total_amount: 210.00,
    status: "delivered",
    payment_status: "fully_paid",
    buyer_id: "buyer123",
    buyer: {
      first_name: "Abdullah",
      last_name: "Al-Farsi",
      company_name: null
    }
  },
  {
    id: "order901234",
    created_at: "2025-04-22T16:45:00Z",
    total_amount: 75.00,
    status: "confirmed",
    payment_status: "deposit_paid",
    buyer_id: "buyer234",
    buyer: {
      first_name: "Layla",
      last_name: "Al-Kindi",
      company_name: "Layla's Boutique"
    }
  },
  {
    id: "order567890",
    created_at: "2025-03-30T11:25:00Z",
    total_amount: 45.50,
    status: "cancelled",
    payment_status: "refunded",
    buyer_id: "buyer567",
    buyer: {
      first_name: "Yusuf",
      last_name: "Al-Maskari",
      company_name: null
    }
  }
];

const SellerOrdersPage = () => {
  const { currentUser, userProfile, isAuthenticated, isLoading: authLoading, hasRole } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setOrders(mockOrders);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentUser]);

  useEffect(() => {
    // Filter orders based on status and search query
    let filtered = [...orders];

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Apply search filter - search by ID, customer name, or company name
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order =>
          order.id.toLowerCase().includes(query) ||
          (order.buyer?.company_name && order.buyer.company_name.toLowerCase().includes(query)) ||
          (order.buyer?.first_name && order.buyer.first_name.toLowerCase().includes(query)) ||
          (order.buyer?.last_name && order.buyer.last_name.toLowerCase().includes(query))
      );
    }

    setFilteredOrders(filtered);
  }, [orders, statusFilter, searchQuery]);

  const getStatusColor = (status) => {
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

  const getPaymentStatusColor = (status) => {
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

  // Show loading while auth is being checked
  if (authLoading) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
    );
  }

  // Handle unauthenticated users
  if (!isAuthenticated || !currentUser) {
    return (
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto py-12 px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Seller Dashboard
              </h1>
              <p className="mb-6 text-gray-600">
                Please sign in to view and manage your orders.
              </p>
              <button
                  onClick={() => window.location.href = '/signin'}
                  className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
    );
  }

  // Check if user is a seller
  const isSeller = hasRole('seller') || userProfile?.user_type === 'seller';

  if (!isSeller) {
    return (
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto py-12 px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Access Denied
              </h1>
              <p className="mb-6 text-gray-600">
                You need seller privileges to access this page.
              </p>
              <button
                  onClick={() => window.location.href = '/'}
                  className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
                <p className="text-gray-600">View and fulfill customer orders</p>
              </div>
              <a href="/seller/listings" className="text-orange-600 hover:text-orange-700">Manage Listings →</a>
            </div>
          </div>
        </div>

        <main className="container mx-auto py-8 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Search and Filter Controls */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="flex flex-wrap gap-4 justify-between items-center">
                <div className="relative w-full md:w-64">
                  <svg className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                      type="text"
                      placeholder="Search orders..."
                      className="pl-8 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="w-full md:w-auto">
                  <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="all">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Orders Content */}
            {isLoading ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading orders...</p>
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="h-8 w-8 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Found</h3>
                  <p className="text-gray-600 mb-4">
                    {statusFilter !== "all"
                        ? `You don't have any ${statusFilter} orders.`
                        : searchQuery
                            ? "No orders match your search criteria."
                            : "You haven't received any orders yet. When buyers place orders for your products, they'll appear here."}
                  </p>
                  {(statusFilter !== "all" || searchQuery) ? (
                      <button
                          onClick={() => {
                            setStatusFilter("all");
                            setSearchQuery("");
                          }}
                          className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 mr-2"
                      >
                        Clear Filters
                      </button>
                  ) : (
                      <a href="/seller/listings" className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
                        Manage Listings
                      </a>
                  )}
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                      {filteredOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium text-gray-900">{order.id.substring(0, 8)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-gray-900">{new Date(order.created_at).toLocaleDateString()}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-gray-900">
                                {order.buyer?.company_name ||
                                    (order.buyer ? `${order.buyer.first_name || ''} ${order.buyer.last_name || ''}` : 'Unknown Customer')}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-gray-900">OMR {order.total_amount.toFixed(2)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.payment_status)}`}>
                            {order.payment_status.replace('_', ' ')}
                          </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a
                                  href={`/seller/orders/${order.id}`}
                                  className="inline-flex items-center px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                              >
                                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View
                              </a>
                            </td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>
            )}
          </div>
        </main>
      </div>
  );
};

export default SellerOrdersPage;