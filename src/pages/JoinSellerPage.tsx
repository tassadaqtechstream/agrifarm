import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

// Updated schema to match API requirements
const sellerFormSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().min(1, "Phone number is required"),
    companyName: z.string().min(1, "Company or farm name is required"),
    businessType: z.string().min(1, "Business type is required"),
    country: z.string().min(1, "Country is required"),
    city: z.string().optional(),
    address: z.string().min(1, "Address is required"),
    description: z.string().optional(),
    products: z.string().optional(),
    termsAccepted: z.boolean().refine(val => val === true, {
        message: "You must accept the terms and conditions"
    })
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

type SellerFormValues = z.infer<typeof sellerFormSchema>;

const JoinSellerPage = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<SellerFormValues>({
        resolver: zodResolver(sellerFormSchema),
        defaultValues: {
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
            description: "",
            products: "",
            termsAccepted: false
        }
    });

    const onSubmit = async (values: SellerFormValues) => {
        setIsSubmitting(true);

        try {
            // Properly structure user data for API
            const userData = {
                email: values.email,
                password: values.password,
                password_confirmation: values.confirmPassword,
                first_name: values.firstName,
                last_name: values.lastName,
                user_type: "seller",
                company: values.companyName,
                business_type: values.businessType,
                phone_number: values.phone,
                country: values.country,
                address: values.address,
                city: values.city || null,
                description: values.description,
                product_category: values.products
            };

            // Fixed: Properly call signup with the userData object
            const result = await signup(userData);

            if (result?.error) {
                toast({
                    title: "Registration failed",
                    description: result.error.message || "Failed to create account. Please try again.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Registration successful!",
                    description: "Please check your email for verification instructions.",
                });

                // Navigate to sign-in page with success message
                navigate('/signin', {
                    state: {
                        registrationSuccessful: true,
                        email: values.email
                    }
                });
            }
        } catch (error: any) {
            // Handle unexpected errors
            toast({
                title: "Registration failed",
                description: error?.message || "An unexpected error occurred. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="container mx-auto py-12 px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <Link to="/join" className="text-earth-terracotta hover:underline inline-flex items-center">
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Back to account options
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-earth-olive-dark mb-2">
                            Join as a Seller
                        </h1>
                        <p className="text-earth-olive-dark/80">
                            Create your seller account and start listing your agricultural products.
                        </p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-earth-olive-dark">
                                    Account Information
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your first name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your last name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="Enter your email address"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Create a password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Confirm your password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your phone number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-earth-olive-dark">
                                    Business Information
                                </h2>

                                <FormField
                                    control={form.control}
                                    name="companyName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Company/Farm Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your company or farm name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="businessType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Business Type</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select business type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="individual">Individual Farmer</SelectItem>
                                                    <SelectItem value="cooperative">Agricultural Cooperative</SelectItem>
                                                    <SelectItem value="distributor">Distributor</SelectItem>
                                                    <SelectItem value="exporter">Exporter</SelectItem>
                                                    <SelectItem value="processor">Processor/Manufacturer</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Country</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select your country" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {/* Fixed: Use full country names instead of codes for API */}
                                                        <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                                                        <SelectItem value="United Arab Emirates">United Arab Emirates</SelectItem>
                                                        <SelectItem value="Kuwait">Kuwait</SelectItem>
                                                        <SelectItem value="Qatar">Qatar</SelectItem>
                                                        <SelectItem value="Bahrain">Bahrain</SelectItem>
                                                        <SelectItem value="Oman">Oman</SelectItem>
                                                        <SelectItem value="Pakistan">Pakistan</SelectItem>
                                                        <SelectItem value="India">India</SelectItem>
                                                        <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>City</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your city"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Enter your business address"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="products"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Main Products</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select your main product category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="fruits">Fruits</SelectItem>
                                                    <SelectItem value="vegetables">Vegetables</SelectItem>
                                                    <SelectItem value="grains">Grains</SelectItem>
                                                    <SelectItem value="spices">Spices</SelectItem>
                                                    <SelectItem value="dates">Dates</SelectItem>
                                                    <SelectItem value="dairy">Dairy Products</SelectItem>
                                                    <SelectItem value="meat">Meat & Poultry</SelectItem>
                                                    <SelectItem value="herbs">Herbs</SelectItem>
                                                    <SelectItem value="flowers">Flowers</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Business Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell us about your business, products, and certifications"
                                                    rows={4}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-earth-olive-dark">
                                    Verification & Terms
                                </h2>

                                <div className="space-y-2">
                                    <Label>Documentation</Label>
                                    <p className="text-sm text-earth-olive-dark/70 mb-2">
                                        To verify your seller account, we'll need the following documents:
                                    </p>
                                    <ul className="text-sm text-earth-olive-dark/70 space-y-1 ml-4 list-disc">
                                        <li>Business License/Registration</li>
                                        <li>Agricultural Certifications (if applicable)</li>
                                        <li>Export License (if applicable)</li>
                                        <li>Identity Verification</li>
                                    </ul>
                                    <p className="text-sm text-earth-olive-dark/70 mt-2">
                                        You'll be prompted to upload these documents after creating your account.
                                    </p>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="termsAccepted"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="text-sm cursor-pointer">
                                                    I agree to the{" "}
                                                    <Link to="/terms" className="text-earth-terracotta hover:underline">
                                                        Terms of Service
                                                    </Link>
                                                    {" "}and{" "}
                                                    <Link to="/privacy" className="text-earth-terracotta hover:underline">
                                                        Privacy Policy
                                                    </Link>
                                                </FormLabel>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-earth-terracotta hover:bg-earth-terracotta-dark"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Creating Account..." : "Create Seller Account"}
                            </Button>

                            <div className="text-center text-sm text-earth-olive-dark/70">
                                Already have an account?{" "}
                                <Link to="/signin" className="text-earth-terracotta hover:underline font-medium">
                                    Sign In
                                </Link>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </main>
    );
};

export default JoinSellerPage;