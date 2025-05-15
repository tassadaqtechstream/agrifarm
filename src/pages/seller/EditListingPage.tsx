import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";

interface Listing {
  id: string;
  title: string;
  description: string | null;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  location: string;
}

// Mock data for static implementation
const mockListings: Record<string, Listing> = {
  "listing123": {
    id: "listing123",
    title: "Fresh Organic Dates",
    description: "Premium quality organic dates harvested from our family farm. Sweet, tender and packed with nutrients.",
    category: "dates",
    quantity: 100,
    unit: "kg",
    price: 5.5,
    location: "Nizwa, Oman"
  },
  "listing456": {
    id: "listing456",
    title: "Heirloom Tomatoes",
    description: "Locally grown heirloom tomatoes. Variety of colors and flavors. Perfect for salads and cooking.",
    category: "vegetables",
    quantity: 50,
    unit: "kg",
    price: 3.25,
    location: "Salalah, Oman"
  },
  "listing789": {
    id: "listing789",
    title: "Omani Honey",
    description: "Pure, natural honey produced from our apiaries in the mountains of Oman.",
    category: "other",
    quantity: 30,
    unit: "kg",
    price: 12.75,
    location: "Jebel Akhdar, Oman"
  }
};

const EditListingPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      if (id && id in mockListings) {
        setListing({...mockListings[id]});
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!listing) return;

    setIsSaving(true);

    try {
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update the listing in our mock data
      if (id) {
        mockListings[id] = {...listing};
      }

      toast({
        title: "Success",
        description: "Listing updated successfully",
      });

      navigate("/seller/listings");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update listing",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
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
                Please sign in to edit your listings.
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
            <div className="max-w-2xl mx-auto">
              <Skeleton className="h-12 w-3/4 mb-8" />
              <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-24 w-full" />
                <div className="flex justify-end space-x-4">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
    );
  }

  if (!listing) {
    return (
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto py-12 px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-700">Listing not found</h2>
              <p className="mt-2 text-gray-600">The listing you're looking for doesn't exist or may have been removed.</p>
              <Button
                  onClick={() => navigate("/seller/listings")}
                  className="mt-4 bg-earth-terracotta hover:bg-earth-terracotta-dark"
              >
                Back to Listings
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
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-earth-olive-dark mb-8">
              Edit Listing
            </h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input
                    id="productName"
                    value={listing.title}
                    onChange={(e) => setListing({ ...listing, title: e.target.value })}
                    required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                    value={listing.category}
                    onValueChange={(value) => setListing({ ...listing, category: value })}
                    required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fruits">Fruits</SelectItem>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="grains">Grains</SelectItem>
                    <SelectItem value="dates">Dates</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Amount</Label>
                  <Input
                      id="stock"
                      type="number"
                      min="0"
                      step="any"
                      value={listing.quantity}
                      onChange={(e) => setListing({ ...listing, quantity: Number(e.target.value) })}
                      required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select
                      value={listing.unit}
                      onValueChange={(value) => setListing({ ...listing, unit: value })}
                      required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      <SelectItem value="ton">Metric Tons</SelectItem>
                      <SelectItem value="piece">Pieces</SelectItem>
                      <SelectItem value="box">Boxes</SelectItem>
                      <SelectItem value="crate">Crates</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Unit Price (OMR)</Label>
                <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={listing.price}
                    onChange={(e) => setListing({ ...listing, price: Number(e.target.value) })}
                    required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                    id="location"
                    value={listing.location}
                    onChange={(e) => setListing({ ...listing, location: e.target.value })}
                    required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Product Description</Label>
                <Textarea
                    id="description"
                    value={listing.description || ''}
                    onChange={(e) => setListing({ ...listing, description: e.target.value })}
                    rows={4}
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/seller/listings")}
                    disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                    type="submit"
                    className="bg-earth-terracotta hover:bg-earth-terracotta-dark"
                    disabled={isSaving}
                >
                  {isSaving ? "Updating..." : "Update Listing"}
                </Button>
              </div>
            </form>
          </div>
        </main>

        <Footer />
      </div>
  );
};

export default EditListingPage;