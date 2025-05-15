import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Plus, Edit, Archive, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
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

const ListingsPage: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [minQuantity, setMinQuantity] = useState<number>(0);
  const [showMinQuantityDialog, setShowMinQuantityDialog] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setListings(mockListings);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const openMinQuantityDialog = (listing: Listing) => {
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

      toast({
        title: "Success",
        description: "Minimum quantity updated successfully",
      });

      setShowMinQuantityDialog(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update minimum quantity",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleArchiveListing = (listing: Listing) => {
    const newStatus = listing.status === 'active' ? 'inactive' : 'active';

    // Update the status in our state
    const updatedListings = listings.map(item =>
        item.id === listing.id
            ? { ...item, status: newStatus }
            : item
    );

    setListings(updatedListings);

    toast({
      title: `Listing ${newStatus === 'active' ? 'Activated' : 'Archived'}`,
      description: `"${listing.title}" has been ${newStatus === 'active' ? 'activated' : 'archived'}.`,
    });
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
                Please sign in to view and manage your listings.
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

  return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="container mx-auto py-12 px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-earth-olive-dark">
                My Listings
              </h1>
              <p className="text-sm text-earth-olive-dark/70 mt-1">
                Manage your product listings and B2B settings
              </p>
            </div>
            <Button asChild className="bg-earth-terracotta hover:bg-earth-terracotta-dark">
              <Link to="/seller/listings/new">
                <Plus className="mr-2" />
                Add New Listing
              </Link>
            </Button>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-earth-olive-dark mb-1">B2B Settings</h3>
                  <p className="text-sm text-earth-olive-dark/70">
                    Set minimum order quantities for your B2B customers. This helps ensure orders are economically viable and meet your business requirements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {isLoading ? (
                <div className="p-8 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-earth-terracotta mx-auto mb-4"></div>
                  <p>Loading listings...</p>
                </div>
            ) : listings.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No listings found. Create your first listing by clicking the "Add New Listing" button above.
                </div>
            ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Min. Order (B2B)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {listings.map((listing) => (
                        <TableRow key={listing.id}>
                          <TableCell className="font-medium">{listing.title}</TableCell>
                          <TableCell className="capitalize">{listing.category}</TableCell>
                          <TableCell>{listing.quantity} {listing.unit}</TableCell>
                          <TableCell>OMR {listing.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span>{listing.min_quantity || 1} {listing.unit}</span>
                              <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={() => openMinQuantityDialog(listing)}
                              >
                                <Edit className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          listing.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                      }`}>
                        {listing.status}
                      </span>
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/seller/listings/${listing.id}/edit`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleArchiveListing(listing)}
                            >
                              <Archive className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
            )}
          </div>
        </main>

        {/* Minimum Quantity Dialog */}
        <Dialog open={showMinQuantityDialog} onOpenChange={setShowMinQuantityDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Set Minimum Order Quantity</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-3">
              <p className="text-sm text-earth-olive-dark/70">
                Set the minimum quantity that B2B customers must order for this product.
              </p>

              <div className="space-y-2">
                <Label htmlFor="min-quantity">Minimum Quantity ({selectedListing?.unit})</Label>
                <Input
                    id="min-quantity"
                    type="number"
                    min="1"
                    value={minQuantity}
                    onChange={(e) => setMinQuantity(parseInt(e.target.value) || 1)}
                />
                <p className="text-xs text-earth-olive-dark/70">
                  We recommend setting appropriate minimums based on shipping costs and margins.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button
                  variant="outline"
                  onClick={() => setShowMinQuantityDialog(false)}
              >
                Cancel
              </Button>
              <Button
                  onClick={updateMinQuantity}
                  disabled={isUpdating}
                  className="bg-earth-terracotta hover:bg-earth-terracotta-dark"
              >
                {isUpdating ? "Updating..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Footer />
      </div>
  );
};

export default ListingsPage;