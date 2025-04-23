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
    buyer_type: string;
    company: string;
    country: string;
    address: string;
    preferred_product_ids: string[];
    notify_new_products: boolean;
    notify_pre_harvest: boolean;
    notify_deals: boolean;
    terms_and_conditions: boolean;
}

const SignUpBuyer = () => {
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
        buyer_type: "",
        company: "",
        country: "",
        address: "",
        preferred_product_ids: [],
        notify_new_products: false,
        notify_pre_harvest: false,
        notify_deals: false,
        terms_and_conditions: false,
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
                user_type: "buyer",
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
                        <h1 className="text-2xl md:text-3xl font-bold text-earth-olive-dark mb-2">Join as a Buyer</h1>
                        <p className="text-earth-olive-dark/80">
                            Create your buyer account to access agricultural products from across the GCC region.
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
                            <h2 className="text-xl font-semibold text-earth-olive-dark">Buyer Information</h2>
                            <div className="space-y-2">
                                <Form.Label className="text-sm font-medium">Buyer Type</Form.Label>
                                <Form.Select
                                    name="buyer_type"
                                    value={formData.buyer_type}
                                    onChange={handleChange}
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                >
                                    <option value="">Select buyer type</option>
                                    <option value="individual">Individual</option>
                                    <option value="restaurant">Restaurant/Food Service</option>
                                    <option value="retailer">Retailer</option>
                                    <option value="wholesaler">Wholesaler</option>
                                    <option value="processor">Food Processor</option>
                                    <option value="exporter">Exporter</option>
                                    <option value="other">Other</option>
                                </Form.Select>
                            </div>

                            <div className="space-y-2">
                                <Form.Label className="text-sm font-medium">Company Name (if applicable)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="Enter your company name"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                />
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
                                    <option value="other">Other</option>
                                </Form.Select>
                            </div>

                            <div className="space-y-2">
                                <Form.Label className="text-sm font-medium">Address</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter your address"
                                    rows={3}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Form.Label className="text-sm font-medium">Product Interests</Form.Label>
                                <Form.Select
                                    name="preferred_product_ids"
                                    value={formData.preferred_product_ids}
                                    onChange={handleChange}
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
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
                                </Form.Select>
                                <p className="text-xs text-earth-olive-dark/60 mt-1">
                                    You'll be able to update your preferences later
                                </p>
                            </div>
                        </div>

                        <div className="shrink-0 bg-border h-[1px] w-full"></div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-earth-olive-dark">Preferences & Terms</h2>
                            <div className="space-y-2">
                                <Form.Label className="text-sm font-medium">Communication Preferences</Form.Label>
                                <div className="space-y-2">
                                    <div className="flex items-start space-x-2">
                                        <Form.Check
                                            type="checkbox"
                                            name="notify_new_products"
                                            checked={formData.notify_new_products}
                                            onChange={handleChange}
                                            label="Notify me when new products matching my interests are available"
                                            className="font-medium text-sm cursor-pointer"
                                        />
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <Form.Check
                                            type="checkbox"
                                            name="notify_pre_harvest"
                                            checked={formData.notify_pre_harvest}
                                            onChange={handleChange}
                                            label="Send me pre-harvest opportunities"
                                            className="font-medium text-sm cursor-pointer"
                                        />
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <Form.Check
                                            type="checkbox"
                                            name="notify_deals"
                                            checked={formData.notify_deals}
                                            onChange={handleChange}
                                            label="Send me special deals and promotions"
                                            className="font-medium text-sm cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 mt-4">
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
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 w-full bg-earth-terracotta hover:bg-earth-terracotta-dark"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating Account..." : "Create Buyer Account"}
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

export default SignUpBuyer;
