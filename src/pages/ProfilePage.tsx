import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  companyName: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
}

const ProfilePage: React.FC = () => {
  const { user, profile, loading } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    companyName: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: ""
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.first_name || "",
        lastName: profile.last_name || "",
        companyName: profile.company_name || "",
        phoneNumber: profile.phone_number || "",
        address: profile.address || "",
        city: profile.city || "",
        country: profile.country || ""
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to update your profile",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock profile update
      // In a real application, this would be an API call to your backend
      console.log("Profile data to update:", formData);

      // Update the profile in local storage for demo purposes
      const updatedProfile = {
        ...profile,
        first_name: formData.firstName,
        last_name: formData.lastName,
        company_name: formData.companyName,
        phone_number: formData.phoneNumber,
        address: formData.address,
        city: formData.city,
        country: formData.country
      };

      // You would typically update your auth context here
      // For demo purposes we're just showing a success message

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
              <Skeleton className="h-8 w-1/3 mb-8" />
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <Footer />
        </div>
    );
  }

  // Render guest view if no user is logged in
  if (!user) {
    return (
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto py-12 px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-earth-olive-dark mb-4">
                My Profile
              </h1>
              <p className="mb-6 text-muted-foreground">
                Please sign in to view and edit your profile information.
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
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-earth-olive-dark mb-8">
              My Profile
            </h1>

            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                        type="submit"
                        className="w-full bg-earth-terracotta hover:bg-earth-terracotta-dark"
                        disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
  );
};

export default ProfilePage;