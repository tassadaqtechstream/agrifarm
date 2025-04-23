import { useState, FormEvent, ChangeEvent } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone_number: string;
    company: string;
    business_type: string;
    country: string;
    address: string;
    main_products: string;
    description: string;
    terms_and_conditions: boolean;
    marketing_emails: boolean;
}

const SignUpSeller = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [formData, setFormData] = useState<FormData>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone_number: "",
        company: "",
        business_type: "",
        country: "",
        address: "",
        main_products: "",
        description: "",
        terms_and_conditions: false,
        marketing_emails: false,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        if (type === "checkbox") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: checked,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const apiData = {
                user_type: "seller",
                ...formData,
            };

            const response = await axios.post("http://apnafarm.com/api/b2b/register", apiData);
            console.log("Registration successful:", response.data);
            navigate("/login", {
                state: {
                    message: "Registration successful! Please log in.",
                },
            });
        } catch (error) {
            console.error("Registration error:", error);
            const apiError = error as Error;
            if (apiError instanceof Error) {
                setErrorMessage(apiError.message || "An error occurred during registration.");
            } else {
                setErrorMessage("An unexpected error occurred during registration.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="container mx-auto py-12 px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <Link to="/signup" className="text-earth-terracotta hover:underline inline-flex items-center">
                        <svg
                            className="mr-2 h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19 12H5M5 12L12 19M5 12L12 5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Back to account options
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-earth-olive-dark mb-2">Join as a Seller</h1>
                        <p className="text-earth-olive-dark/80">
                            Create your seller account and start listing your agricultural products.
                        </p>
                    </div>

                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                    <Form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-earth-olive-dark">Account Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Form.Label className="text-sm font-medium">First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        placeholder="Enter your first name"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Form.Label className="text-sm font-medium">Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        placeholder="Enter your last name"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Form.Label className="text-sm font-medium">Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email address"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Form.Label className="text-sm font-medium">Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Create a password"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                        required
                                        minLength={6}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Form.Label className="text-sm font-medium">Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password_confirmation"
                                        value={formData.password_confirmation}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                        required
                                        minLength={6}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Form.Label className="text-sm font-medium">Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="shrink-0 bg-border h-[1px] w-full"></div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-earth-olive-dark">Business Information</h2>
                            <div className="space-y-2">
                                <Form.Label className="text-sm font-medium">Company/Farm Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="Enter your company or farm name"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Form.Label className="text-sm font-medium">Business Type</Form.Label>
                                <Form.Select
                                    name="business_type"
                                    value={formData.business_type}
                                    onChange={handleChange}
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                >
                                    <option value="">Select business type</option>
                                    <option value="individual">Individual Farmer</option>
                                    <option value="cooperative">Agricultural Cooperative</option>
                                    <option value="distributor">Distributor</option>
                                    <option value="exporter">Exporter</option>
                                    <option value="processor">Processor/Manufacturer</option>
                                </Form.Select>
                            </div>

                            <div className="space-y-2">
                                <Form.Label className="text-sm font-medium">Country</Form.Label>
                                <Form.Select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                >
                                    <option value="">Select your country</option>
                                    <option value="sa">Saudi Arabia</option>
                                    <option value="ae">United Arab Emirates</option>
                                    <option value="kw">Kuwait</option>
                                    <option value="qa">Qatar</option>
                                    <option value="bh">Bahrain</option>
                                    <option value="om">Oman</option>
                                </Form.Select>
                            </div>

                            <div className="space-y-2">
                                <Form.Label className="text-sm font-medium">Address</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter your business address"
                                    rows={3}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Form.Label className="text-sm font-medium">Main Products</Form.Label>
                                <Form.Select
                                    name="main_products"
                                    value={formData.main_products}
                                    onChange={handleChange}
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
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
                                </Form.Select>
                            </div>

                            <div className="space-y-2">
                                <Form.Label className="text-sm font-medium">Business Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Tell us about your business, products, and certifications"
                                    rows={4}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                />
                            </div>
                        </div>

                        <div className="shrink-0 bg-border h-[1px] w-full"></div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-earth-olive-dark">Verification & Terms</h2>
                            <div className="space-y-2">
                                <Form.Label className="text-sm font-medium">Documentation</Form.Label>
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

                            <div className="space-y-4">
                                <div className="flex items-start space-x-2">
                                    <Form.Check
                                        type="checkbox"
                                        name="terms_and_conditions"
                                        checked={formData.terms_and_conditions}
                                        onChange={handleChange}
                                        label={
                                            <span className="font-medium text-sm">
                                                I agree to the{" "}
                                                <Link to="/terms" className="text-earth-terracotta hover:underline">
                                                    Terms of Service
                                                </Link>{" "}
                                                and{" "}
                                                <Link to="/privacy" className="text-earth-terracotta hover:underline">
                                                    Privacy Policy
                                                </Link>
                                            </span>
                                        }
                                        required
                                    />
                                </div>

                                <div className="flex items-start space-x-2">
                                    <Form.Check
                                        type="checkbox"
                                        name="marketing_emails"
                                        checked={formData.marketing_emails}
                                        onChange={handleChange}
                                        label="I would like to receive marketing emails about products, services, and promotions"
                                        className="font-medium text-sm cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 w-full bg-earth-terracotta hover:bg-earth-terracotta-dark"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating Account..." : "Create Seller Account"}
                        </button>

                        <div className="text-center text-sm text-earth-olive-dark/70">
                            Already have an account?{" "}
                            <Link to="/login" className="text-earth-terracotta hover:underline font-medium">
                                Sign In
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </main>
    );
};

export default SignUpSeller;
