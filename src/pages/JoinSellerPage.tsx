import React, { useState } from "react";
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
    if (!values.companyName) errors.companyName = "Company or farm name is required";
    if (!values.businessType) errors.businessType = "Business type is required";
    if (!values.country) errors.country = "Country is required";
    if (!values.address) errors.address = "Address is required";
    if (!values.companyActivity) errors.companyActivity = "Company activity is required";
    if (!values.termsAccepted) errors.termsAccepted = "You must accept the terms and conditions";

    return errors;
};

const JoinSellerPage = () => {
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
        products: "",
        companyActivity: "",
        preferredLanguage: "en",
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
                company: formData.companyName,
                business_type: formData.businessType,
                country: formData.country,
                city: formData.city || null,
                address: formData.address,
                fiscal_address: formData.fiscalAddress || formData.address, // Use address as fiscal if not provided
                zip_code: formData.zipCode || null,
                description: formData.description || null,
                product_category: formData.products || null,
                company_activity_id: parseInt(formData.companyActivity) || 1,
                preferred_language: formData.preferredLanguage || 'en',
                user_type: "seller"
            };

            console.log('Sending registration data:', userData);

            // Use the API client method
            const result = await apiClient.auth.registerSeller(userData);

            // Registration successful
            alert("Registration successful! Your seller account has been created.");
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
                products: "",
                companyActivity: "",
                preferredLanguage: "en",
                termsAccepted: false
            });

            // Redirect to dashboard after successful registration
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);

        } catch (error) {
            console.error('Registration error:', error);

            // Handle validation errors from API
            if (error?.isValidationError && error?.errors) {
                // Map backend field names to frontend field names
                const fieldMapping = {
                    'first_name': 'firstName',
                    'last_name': 'lastName',
                    'phone_number': 'phone',
                    'company': 'companyName',
                    'business_type': 'businessType',
                    'product_category': 'products',
                    'company_activity_id': 'companyActivity',
                    'preferred_language': 'preferredLanguage',
                    'fiscal_address': 'fiscalAddress',
                    'zip_code': 'zipCode'
                };

                const frontendErrors = {};
                Object.keys(error.errors).forEach(backendField => {
                    const frontendField = fieldMapping[backendField] || backendField;
                    const errorMessage = Array.isArray(error.errors[backendField])
                        ? error.errors[backendField][0]
                        : error.errors[backendField];
                    frontendErrors[frontendField] = errorMessage;
                });

                setErrors(frontendErrors);
            } else {
                // Handle other types of errors
                alert(error?.message || "An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="container mx-auto py-12 px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <button
                        className="text-blue-600 hover:underline inline-flex items-center"
                        onClick={() => window.history.back()}
                    >
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Back to account options
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            Join as a Seller
                        </h1>
                        <p className="text-gray-600">
                            Create your seller account and start listing your agricultural products.
                        </p>
                    </div>

                    <div onSubmit={handleSubmit} className="space-y-6">
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
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    Company/Farm Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your company or farm name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.companyName}
                                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                                />
                                {errors.companyName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Business Type
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.businessType}
                                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                                >
                                    <option value="">Select business type</option>
                                    <option value="individual">Individual Farmer</option>
                                    <option value="cooperative">Agricultural Cooperative</option>
                                    <option value="distributor">Distributor</option>
                                    <option value="exporter">Exporter</option>
                                    <option value="processor">Processor/Manufacturer</option>
                                </select>
                                {errors.businessType && (
                                    <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Company Activity
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.companyActivity}
                                    onChange={(e) => handleInputChange('companyActivity', e.target.value)}
                                >
                                    <option value="">Select company activity</option>
                                    <option value="1">Agriculture & Farming</option>
                                    <option value="2">Food Processing</option>
                                    <option value="3">Import/Export</option>
                                    <option value="4">Wholesale Distribution</option>
                                    <option value="5">Retail Sales</option>
                                    <option value="6">Organic Farming</option>
                                    <option value="7">Livestock</option>
                                    <option value="8">Dairy Production</option>
                                    <option value="9">Fruits & Vegetables</option>
                                    <option value="10">Grains & Cereals</option>
                                </select>
                                {errors.companyActivity && (
                                    <p className="text-red-500 text-sm mt-1">{errors.companyActivity}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Country
                                    </label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.city}
                                        onChange={(e) => handleInputChange('city', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Business Address
                                </label>
                                <textarea
                                    placeholder="Enter your business address"
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                        <span className="text-gray-500 text-xs ml-1">(Optional - will use business address if empty)</span>
                                    </label>
                                    <textarea
                                        placeholder="Enter fiscal address if different from business address"
                                        rows={2}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.zipCode}
                                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Main Products
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.products}
                                    onChange={(e) => handleInputChange('products', e.target.value)}
                                >
                                    <option value="">Select your main product category</option>
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
                                </label>
                                <textarea
                                    placeholder="Tell us about your business, products, and certifications"
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                />
                            </div>
                        </div>

                        <hr className="border-gray-200" />

                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Verification & Terms
                            </h2>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Documentation</label>
                                <p className="text-sm text-gray-600 mb-2">
                                    To verify your seller account, we'll need the following documents:
                                </p>
                                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                                    <li>Business License/Registration</li>
                                    <li>Agricultural Certifications (if applicable)</li>
                                    <li>Export License (if applicable)</li>
                                    <li>Identity Verification</li>
                                </ul>
                                <p className="text-sm text-gray-600 mt-2">
                                    You'll be prompted to upload these documents after creating your account.
                                </p>
                            </div>

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
                                    <a href="/terms" className="text-blue-600 hover:underline">
                                        Terms of Service
                                    </a>
                                    {" "}and{" "}
                                    <a href="/privacy" className="text-blue-600 hover:underline">
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>
                            {errors.termsAccepted && (
                                <p className="text-red-500 text-sm">{errors.termsAccepted}</p>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating Account..." : "Create Seller Account"}
                        </button>

                        <div className="text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <a href="/signin" className="text-blue-600 hover:underline font-medium">
                                Sign In
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default JoinSellerPage;