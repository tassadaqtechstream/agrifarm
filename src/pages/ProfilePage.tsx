import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  companyName: string;
  phoneNumber: string;
  address: string;
  fiscalAddress: string;
  zipCode: string;
  city: string;
  country: string;
  businessType: string;
  description: string;
  preferredLanguage: string;
}

const ProfilePage = () => {
  const { currentUser, userProfile, isAuthenticated, isLoading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    phoneNumber: "",
    address: "",
    fiscalAddress: "",
    zipCode: "",
    city: "",
    country: "",
    businessType: "",
    description: "",
    preferredLanguage: "en"
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        firstName: userProfile.first_name || "",
        lastName: userProfile.last_name || "",
        companyName: userProfile.company || "",
        phoneNumber: userProfile.phone_number || "",
        address: userProfile.address || "",
        fiscalAddress: userProfile.fiscal_address || "",
        zipCode: userProfile.zip_code || "",
        city: userProfile.city || "",
        country: userProfile.country || "",
        businessType: userProfile.business_type || "",
        description: userProfile.description || "",
        preferredLanguage: userProfile.preferred_language || "en"
      });
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("You must be logged in to update your profile");
      return;
    }

    setIsSubmitting(true);

    try {
      // Structure the update data to match backend expectations
      const updateData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        company: formData.companyName,
        phone_number: formData.phoneNumber,
        address: formData.address,
        fiscal_address: formData.fiscalAddress,
        zip_code: formData.zipCode,
        city: formData.city,
        country: formData.country,
        business_type: formData.businessType,
        description: formData.description,
        preferred_language: formData.preferredLanguage
      };

      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log("Profile update data:", updateData);

      // In a real implementation, you would call your API here:
      // const result = await authAPI.updateProfile(currentUser.id, updateData);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
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

  // Render guest view if no user is logged in
  if (!isAuthenticated || !currentUser) {
    return (
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto py-12 px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                My Profile
              </h1>
              <p className="mb-6 text-gray-600">
                Please sign in to view and edit your profile information.
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

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                <p className="text-gray-600">Manage your account information</p>
              </div>
              <a href="/" className="text-orange-600 hover:text-orange-700">← Back to Home</a>
            </div>
          </div>
        </div>

        <main className="container mx-auto py-8 px-4">
          <div className="max-w-2xl mx-auto">
            {/* User Info Summary */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {userProfile?.first_name} {userProfile?.last_name}
                  </h2>
                  <p className="text-gray-600">{currentUser?.email}</p>
                  {userProfile?.company && (
                      <p className="text-sm text-gray-500">{userProfile.company}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Profile Information</h3>

              <div onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-900">Personal Information</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
                    <select
                        name="preferredLanguage"
                        value={formData.preferredLanguage}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="en">English</option>
                      <option value="ar">Arabic</option>
                      <option value="ur">Urdu</option>
                      <option value="hi">Hindi</option>
                      <option value="bn">Bengali</option>
                    </select>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Business Information */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-900">Business Information</h4>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                    <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select business type</option>
                      <option value="individual">Individual Farmer</option>
                      <option value="cooperative">Agricultural Cooperative</option>
                      <option value="distributor">Distributor</option>
                      <option value="exporter">Exporter</option>
                      <option value="processor">Processor/Manufacturer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Tell us about your business, products, and certifications"
                    />
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Address Information */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-900">Address Information</h4>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fiscal Address</label>
                      <textarea
                          name="fiscalAddress"
                          value={formData.fiscalAddress}
                          onChange={handleChange}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="Leave empty if same as business address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
                      <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Select your country</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Oman">Oman</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="India">India</option>
                        <option value="Bangladesh">Bangladesh</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
};

export default ProfilePage;