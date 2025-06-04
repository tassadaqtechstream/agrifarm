import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from '@/utility/Apis.ts';

// Form validation schema
const validateForm = (values) => {
    const errors = {};

    if (!values.firstName) errors.firstName = "First name is required";
    if (!values.lastName) errors.lastName = "Last name is required";
    if (!values.email) errors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = "Invalid email address";
    if (!values.password || values.password.length < 6) errors.password = "Password must be at least 6 characters";
    if (values.password !== values.confirmPassword) errors.confirmPassword = "Passwords do not match";
    if (!values.phone) errors.phone = "Phone number is required";
    if (!values.businessType) errors.businessType = "Business type is required";
    if (!values.country) errors.country = "Country is required";
    if (!values.address) errors.address = "Address is required";
    if (!values.termsAccepted) errors.termsAccepted = "You must accept the terms and conditions";

    return errors;
};

const JoinBuyerPage = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        companyName: "",
        businessType: "",
        country: "",
        city: "",
        address: "",
        fiscalAddress: "",
        zipCode: "",
        description: "",
        interests: "",
        preferredLanguage: "en",
        vatin: "",
        termsAccepted: false
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ""
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            // Structure user data to match backend expectations exactly
            const userData = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.confirmPassword,
                phone_number: formData.phone,
                company: formData.companyName || "Individual Buyer", // Default for individual buyers
                business_type: formData.businessType,
                country: formData.country,
                city: formData.city || null,
                address: formData.address,
                fiscal_address: formData.fiscalAddress || formData.address, // Use address as fiscal if not provided
                zip_code: formData.zipCode || null,
                description: formData.description || null,
                product_category: formData.interests || null,
                company_activity_id: null, // Not required for buyers
                preferred_language: formData.preferredLanguage || 'en',
                vatin: formData.vatin || null,
                user_type: "buyer", // This is the key field for buyer registration
                preferred_product_ids: [], // Can be added later
                other_preferred_products: formData.interests || null
            };

            console.log('Sending buyer registration data:', userData);

            // Use the registerBusiness endpoint
            const result = await apiClient.auth.registerSeller(userData);

            // Registration successful
            alert("Registration successful! Your buyer account has been created.");
            console.log('Registration result:', result);

            // Reset form
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone: "",
                companyName: "",
                businessType: "",
                country: "",
                city: "",
                address: "",
                fiscalAddress: "",
                zipCode: "",
                description: "",
                interests: "",
                preferredLanguage: "en",
                vatin: "",
                termsAccepted: false
            });

            // Navigate to sign-in page with success message
            setTimeout(() => {
                window.location.href = '/buyer/orders';
            }, 1500);
        } catch (error) {
            console.error('Registration error:', error);

            // Handle validation errors from API
            if (error?.response?.status === 422 && error?.response?.data?.errors) {
                // Map backend field names to frontend field names
                const fieldMapping = {
                    'first_name': 'firstName',
                    'last_name': 'lastName',
                    'phone_number': 'phone',
                    'company': 'companyName',
                    'business_type': 'businessType',
                    'product_category': 'interests',
                    'preferred_language': 'preferredLanguage',
                    'fiscal_address': 'fiscalAddress',
                    'zip_code': 'zipCode'
                };

                const frontendErrors = {};
                Object.keys(error.response.data.errors).forEach(backendField => {
                    const frontendField = fieldMapping[backendField] || backendField;
                    const errorMessage = Array.isArray(error.response.data.errors[backendField])
                        ? error.response.data.errors[backendField][0]
                        : error.response.data.errors[backendField];
                    frontendErrors[frontendField] = errorMessage;
                });

                setErrors(frontendErrors);
            } else {
                // Handle other types of errors
                const errorMessage = error?.response?.data?.message || error?.message || "An unexpected error occurred. Please try again.";
                alert(errorMessage);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="container mx-auto py-12 px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <Link to="/join" className="text-orange-600 hover:underline inline-flex items-center">
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Back to account options
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            Join as a Buyer
                        </h1>
                        <p className="text-gray-600">
                            Create your buyer account to access agricultural products from across the GCC region.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Account Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your first name"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                    />
                                    {errors.firstName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your last name"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                    />
                                    {errors.lastName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Preferred Language
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    value={formData.preferredLanguage}
                                    onChange={(e) => handleInputChange('preferredLanguage', e.target.value)}
                                >
                                    <option value="en">English</option>
                                    <option value="ar">Arabic</option>
                                    <option value="ur">Urdu</option>
                                    <option value="hi">Hindi</option>
                                    <option value="bn">Bengali</option>
                                    <option value="fr">French</option>
                                    <option value="es">Spanish</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Create a password"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        value={formData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Confirm your password"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                )}
                            </div>
                        </div>

                        <hr className="border-gray-200" />

                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Business Information
                            </h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Company/Business Name
                                    <span className="text-gray-500 text-xs ml-1">(Leave empty if individual buyer)</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your company name or leave empty for individual"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    value={formData.companyName}
                                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Business Type
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    value={formData.businessType}
                                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                                >
                                    <option value="">Select business type</option>
                                    <option value="individual">Individual Buyer</option>
                                    <option value="restaurant">Restaurant/Food Service</option>
                                    <option value="retailer">Retailer</option>
                                    <option value="wholesaler">Wholesaler</option>
                                    <option value="processor">Food Processor</option>
                                    <option value="exporter">Exporter</option>
                                    <option value="distributor">Distributor</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.businessType && (
                                    <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Country
                                    </label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        value={formData.country}
                                        onChange={(e) => handleInputChange('country', e.target.value)}
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
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.country && (
                                        <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your city"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        value={formData.city}
                                        onChange={(e) => handleInputChange('city', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address
                                </label>
                                <textarea
                                    placeholder="Enter your address"
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    value={formData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                />
                                {errors.address && (
                                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Fiscal Address
                                        <span className="text-gray-500 text-xs ml-1">(Optional - will use main address if empty)</span>
                                    </label>
                                    <textarea
                                        placeholder="Enter fiscal address if different from main address"
                                        rows={2}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        value={formData.fiscalAddress}
                                        onChange={(e) => handleInputChange('fiscalAddress', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        ZIP/Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter ZIP/postal code"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        value={formData.zipCode}
                                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    VAT/Tax ID
                                    <span className="text-gray-500 text-xs ml-1">(Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your VAT/Tax identification number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    value={formData.vatin}
                                    onChange={(e) => handleInputChange('vatin', e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Product Interests
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    value={formData.interests}
                                    onChange={(e) => handleInputChange('interests', e.target.value)}
                                >
                                    <option value="">Select product categories you're interested in</option>
                                    <option value="fruits">Fruits</option>
                                    <option value="vegetables">Vegetables</option>
                                    <option value="grains">Grains</option>
                                    <option value="spices">Spices</option>
                                    <option value="dates">Dates</option>
                                    <option value="dairy">Dairy Products</option>
                                    <option value="meat">Meat & Poultry</option>
                                    <option value="herbs">Herbs</option>
                                    <option value="flowers">Flowers</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Business Description
                                    <span className="text-gray-500 text-xs ml-1">(Optional)</span>
                                </label>
                                <textarea
                                    placeholder="Tell us about your business and purchasing needs"
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                />
                            </div>
                        </div>

                        <hr className="border-gray-200" />

                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Terms & Conditions
                            </h2>

                            <div className="flex items-start space-x-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={formData.termsAccepted}
                                    onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                                    className="mt-1"
                                />
                                <label htmlFor="terms" className="text-sm cursor-pointer">
                                    I agree to the{" "}
                                    <Link to="/terms" className="text-orange-600 hover:underline">
                                        Terms of Service
                                    </Link>
                                    {" "}and{" "}
                                    <Link to="/privacy" className="text-orange-600 hover:underline">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>
                            {errors.termsAccepted && (
                                <p className="text-red-500 text-sm">{errors.termsAccepted}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating Account..." : "Create Buyer Account"}
                        </button>

                        <div className="text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link to="/signin" className="text-orange-600 hover:underline font-medium">
                                Sign In
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default JoinBuyerPage;