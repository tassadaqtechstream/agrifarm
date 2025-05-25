import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface Listing {
  id: string;
  title: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  status: string;
  min_quantity?: number;
}

// Mock data for static implementation
const mockListings: Listing[] = [
  {
    id: "listing123",
    title: "Fresh Organic Dates",
    category: "dates",
    quantity: 100,
    unit: "kg",
    price: 5.5,
    status: "active",
    min_quantity: 10
  },
  {
    id: "listing456",
    title: "Heirloom Tomatoes",
    category: "vegetables",
    quantity: 50,
    unit: "kg",
    price: 3.25,
    status: "active",
    min_quantity: 5
  },
  {
    id: "listing789",
    title: "Omani Honey",
    category: "other",
    quantity: 30,
    unit: "kg",
    price: 12.75,
    status: "active",
    min_quantity: 3
  },
  {
    id: "listing012",
    title: "Basmati Rice",
    category: "grains",
    quantity: 200,
    unit: "kg",
    price: 2.5,
    status: "inactive",
    min_quantity: 20
  },
  {
    id: "listing345",
    title: "Pomegranates",
    category: "fruits",
    quantity: 75,
    unit: "kg",
    price: 4.75,
    status: "active",
    min_quantity: 8
  }
];

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedListing, setSelectedListing] = useState(null);
  const [minQuantity, setMinQuantity] = useState(0);
  const [showMinQuantityDialog, setShowMinQuantityDialog] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { currentUser, userProfile, isAuthenticated, isLoading: authLoading, hasRole } = useAuth();

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setListings(mockListings);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const openMinQuantityDialog = (listing) => {
    setSelectedListing(listing);
    setMinQuantity(listing.min_quantity || 1);
    setShowMinQuantityDialog(true);
  };

  const updateMinQuantity = async () => {
    if (!selectedListing) return;

    setIsUpdating(true);

    try {
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update the listing in our state
      const updatedListings = listings.map(listing =>
          listing.id === selectedListing.id
              ? { ...listing, min_quantity: minQuantity }
              : listing
      );

      setListings(updatedListings);

      alert("Minimum quantity updated successfully");
      setShowMinQuantityDialog(false);
    } catch (error) {
      alert("Failed to update minimum quantity");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleArchiveListing = (listing) => {
    const newStatus = listing.status === 'active' ? 'inactive' : 'active';

    // Update the status in our state
    const updatedListings = listings.map(item =>
        item.id === listing.id
            ? { ...item, status: newStatus }
            : item
    );

    setListings(updatedListings);

    alert(`Listing ${newStatus === 'active' ? 'activated' : 'archived'} successfully`);
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
                Please sign in to view and manage your listings.
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
                <h1 className="text-2xl font-bold text-gray-900">Welcome, {userProfile?.first_name || currentUser?.name || 'Seller'}</h1>
                <p className="text-gray-600">Manage your product listings</p>
              </div>
              <a href="/" className="text-orange-600 hover:text-orange-700">← Back to Marketplace</a>
            </div>
          </div>
        </div>

        <main className="container mx-auto py-12 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Listings</h2>
              <p className="text-gray-600 mt-1">
                Manage your product listings and B2B settings
              </p>
            </div>
            <button className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Listing
            </button>
          </div>

          {/* Info Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">B2B Settings</h3>
                <p className="text-sm text-gray-600">
                  Set minimum order quantities for your B2B customers. This helps ensure orders are economically viable and meet your business requirements.
                </p>
              </div>
            </div>
          </div>

          {/* Listings Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {isLoading ? (
                <div className="p-8 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                  <p>Loading listings...</p>
                </div>
            ) : listings.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No listings found. Create your first listing by clicking the "Add New Listing" button above.
                </div>
            ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min. Order (B2B)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {listings.map((listing) => (
                        <tr key={listing.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{listing.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900 capitalize">{listing.category}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">{listing.quantity} {listing.unit}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">OMR {listing.price.toFixed(2)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-900">{listing.min_quantity || 1} {listing.unit}</span>
                              <button
                                  onClick={() => openMinQuantityDialog(listing)}
                                  className="p-1 text-gray-400 hover:text-gray-600"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            listing.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                        }`}>
                          {listing.status}
                        </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button className="text-indigo-600 hover:text-indigo-900 p-1 border rounded">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                  onClick={() => handleArchiveListing(listing)}
                                  className="text-gray-600 hover:text-gray-900 p-1 border rounded"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l4 4 4-4m6-2h-1V5a2 2 0 00-2-2H8a2 2 0 00-2 2v1H5" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
            )}
          </div>
        </main>

        {/* Minimum Quantity Dialog */}
        {showMinQuantityDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Set Minimum Order Quantity</h3>

                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Set the minimum quantity that B2B customers must order for this product.
                  </p>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Minimum Quantity ({selectedListing?.unit})
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={minQuantity}
                        onChange={(e) => setMinQuantity(parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <p className="text-xs text-gray-500">
                      We recommend setting appropriate minimums based on shipping costs and margins.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-6">
                  <button
                      onClick={() => setShowMinQuantityDialog(false)}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                      onClick={updateMinQuantity}
                      disabled={isUpdating}
                      className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50"
                  >
                    {isUpdating ? "Updating..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default ListingsPage;