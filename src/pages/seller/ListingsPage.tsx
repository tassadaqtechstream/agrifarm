import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { sellerAPI, type CreateProductData, type Commodity } from "../../utility/Apis.ts";

// Updated interface to match your actual API response
interface SellerProduct {
  id: number;
  name: string;
  slug: string;
  short_description?: string;
  description: string;
  category_id: number;
  sku: string;
  barcode?: string;
  brand?: string;
  model?: string;
  price: string; // API returns string
  cost_price?: string;
  compare_at_price?: string;
  b2b_price?: string;
  stock: number;
  stock_status: string;
  track_inventory: boolean;
  low_stock_threshold: number;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  is_b2b_available: boolean;
  b2b_min_quantity: number;
  is_bulk_pricing_eligible: boolean;
  featured_image?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  is_active: boolean;
  is_featured: boolean;
  published_at?: string;
  notes?: string;
  attributes?: any;
  meta_data?: {
    unit?: string;
    currency?: string;
    min_quantity?: number;
    created_via?: string;
    seller_created?: boolean;
    [key: string]: any;
  };
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  seller_id: number;
  approval_status: string;
  commission_rate?: number;
  view_count: number;
  wishlist_count: number;
  purchase_count: number;
  average_rating: string; // API returns string
  total_reviews: number;
  category?: {
    id: number;
    name: string;
    slug: string;
    description?: string;
    parent_id?: number;
    image?: string;
    sort_order: number;
    is_active: boolean;
    is_featured: boolean;
    is_b2b_visible: boolean;
    meta_data: any[];
    created_at: string;
    updated_at: string;
  };
}

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

const ListingsPage = () => {
  const [listings, setListings] = useState<SellerProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedListing, setSelectedListing] = useState<SellerProduct | null>(null);
  const [minQuantity, setMinQuantity] = useState(0);
  const [showMinQuantityDialog, setShowMinQuantityDialog] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentUser, userProfile, isAuthenticated, isLoading: authLoading, hasRole } = useAuth();

  // Fetch seller products from API
  const fetchSellerProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await sellerAPI.getSellerProducts({
        page: 1,
        per_page: 50, // Adjust as needed
      });

      setListings(response.data || []);
    } catch (error: any) {
      console.error('Error fetching seller products:', error);
      setError(error?.message || 'Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && hasRole('seller')) {
      fetchSellerProducts();
    }
  }, [isAuthenticated, hasRole]);

  const openMinQuantityDialog = (listing: SellerProduct) => {
    setSelectedListing(listing);
    // Use existing min quantity from meta_data, b2b_min_quantity, or default to 1
    const currentMinQuantity = listing.meta_data?.min_quantity || listing.b2b_min_quantity || 1;
    setMinQuantity(currentMinQuantity);
    setShowMinQuantityDialog(true);
  };

  const updateMinQuantity = async () => {
    if (!selectedListing) return;

    setIsUpdating(true);

    try {
      // Try to use the dedicated min quantity endpoint if it exists
      // Otherwise, update the product with new minimum quantity
      let updatedProduct;

      try {
        // First try the dedicated min quantity endpoint
        updatedProduct = await sellerAPI.updateMinQuantity?.(selectedListing.id, minQuantity);
      } catch (error) {
        // Fallback to general product update
        updatedProduct = await sellerAPI.updateProduct(selectedListing.id, {
          b2b_min_quantity: minQuantity,
          meta_data: {
            ...selectedListing.meta_data,
            min_quantity: minQuantity
          }
        } as any);
      }

      // Update the listing in our state
      const updatedListings = listings.map(listing =>
          listing.id === selectedListing.id
              ? {
                ...listing,
                b2b_min_quantity: minQuantity,
                meta_data: { ...listing.meta_data, min_quantity: minQuantity }
              }
              : listing
      );

      setListings(updatedListings);
      alert("Minimum quantity updated successfully");
      setShowMinQuantityDialog(false);
    } catch (error: any) {
      console.error('Error updating minimum quantity:', error);
      alert(error?.message || "Failed to update minimum quantity");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggleStatus = async (listing: SellerProduct) => {
    try {
      const newStatus = !listing.is_active;

      // Update product status via API
      const updatedProduct = await sellerAPI.toggleProductStatus(listing.id, newStatus);

      // Update the status in our state
      const updatedListings = listings.map(item =>
          item.id === listing.id
              ? { ...item, is_active: newStatus }
              : item
      );

      setListings(updatedListings);
      alert(`Product ${newStatus ? 'activated' : 'deactivated'} successfully`);
    } catch (error: any) {
      console.error('Error toggling product status:', error);
      alert(error?.message || 'Failed to update product status');
    }
  };

  // Helper function to get display values from SellerProduct
  const getDisplayValues = (product: SellerProduct) => {
    return {
      title: product.name,
      category: product.category?.name || 'Uncategorized',
      quantity: product.stock,
      unit: product.meta_data?.unit || 'units',
      price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
      status: product.is_active ? 'active' : 'inactive',
      min_quantity: product.meta_data?.min_quantity || product.b2b_min_quantity || 1,
      currency: product.meta_data?.currency || 'OMR'
    };
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
            <button
                onClick={() => window.location.href = '/seller/listings/new'}
                className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Listing
            </button>
          </div>

          {/* Error Display */}
          {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-red-100 text-red-600 rounded-full">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Error Loading Products</h3>
                    <p className="text-sm text-red-600">{error}</p>
                    <button
                        onClick={fetchSellerProducts}
                        className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
          )}

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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approval</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {listings.map((listing) => {
                      const display = getDisplayValues(listing);
                      return (
                          <tr key={listing.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium text-gray-900">{display.title}</div>
                              {listing.sku && (
                                  <div className="text-sm text-gray-500">SKU: {listing.sku}</div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-gray-900 capitalize">{display.category}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-gray-900">{display.quantity} {display.unit}</div>
                              {listing.stock <= 10 && (
                                  <div className="text-sm text-red-500">Low stock</div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-gray-900">{display.currency} {display.price.toFixed(2)}</div>
                            </td>
                            <td className="px-6 py-3 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-900">{display.min_quantity} {display.unit}</span>
                                <button
                                    onClick={() => openMinQuantityDialog(listing)}
                                    className="p-1 text-gray-400 hover:text-gray-600"
                                    title="Edit minimum quantity"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                listing.is_active
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                            }`}>
                              {listing.is_active ? 'Active' : 'Inactive'}
                            </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                listing.approval_status === 'approved'
                                    ? 'bg-green-100 text-green-800'
                                    : listing.approval_status === 'pending'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                            }`}>
                              {listing.approval_status}
                            </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => window.location.href = `/seller/products/${listing.id}/edit`}
                                    className="text-indigo-600 hover:text-indigo-900 p-1 border rounded"
                                    title="Edit product"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button
                                    onClick={() => handleToggleStatus(listing)}
                                    className="text-gray-600 hover:text-gray-900 p-1 border rounded"
                                    title={listing.is_active ? 'Deactivate' : 'Activate'}
                                >
                                  {listing.is_active ? (
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l4 4 4-4m6-2h-1V5a2 2 0 00-2-2H8a2 2 0 00-2 2v1H5" />
                                      </svg>
                                  ) : (
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                      </svg>
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                      );
                    })}
                    </tbody>
                  </table>
                </div>
            )}
          </div>
        </main>

        {/* Minimum Quantity Dialog */}
        {showMinQuantityDialog && selectedListing && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Set Minimum Order Quantity</h3>

                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Set the minimum quantity that B2B customers must order for "{selectedListing.name}".
                  </p>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Minimum Quantity ({getDisplayValues(selectedListing).unit})
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