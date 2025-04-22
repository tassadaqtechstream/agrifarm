import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <main className="container mx-auto py-12 px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-earth-olive-dark mb-4">Join EarthTrade GCC</h1>
                    <p className="text-lg text-earth-olive-dark/80">
                        Connect with buyers and sellers across the GCC region and beyond. Choose the account type that
                        best fits your needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Buyer Card */}
                    <div className="rounded-lg bg-card text-card-foreground shadow-sm border-2 hover:border-earth-terracotta hover:shadow-md transition-all">
                        <div className="flex flex-col space-y-1.5 p-6 text-center pb-4">
                            <div className="w-16 h-16 flex items-center justify-center bg-earth-terracotta/10 rounded-full mx-auto mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-shopping-bag h-8 w-8 text-earth-terracotta"
                                >
                                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                                    <path d="M3 6h18"></path>
                                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                                </svg>
                            </div>
                            <h3 className="font-semibold tracking-tight text-xl text-earth-olive-dark">
                                Join as a Buyer
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Find quality agricultural products from verified producers in the GCC region and beyond
                            </p>
                        </div>
                        <div className="p-6 pt-0 pb-4">
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <svg
                                        className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        ></path>
                                    </svg>
                                    <span className="text-earth-olive-dark/80">
                                        Access thousands of agricultural products
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        ></path>
                                    </svg>
                                    <span className="text-earth-olive-dark/80">Secure pre-harvest contracts</span>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        ></path>
                                    </svg>
                                    <span className="text-earth-olive-dark/80">Direct communication with sellers</span>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        ></path>
                                    </svg>
                                    <span className="text-earth-olive-dark/80">Verified quality and compliance</span>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        ></path>
                                    </svg>
                                    <span className="text-earth-olive-dark/80">Secure payment system</span>
                                </li>
                            </ul>
                        </div>
                        <div className="flex items-center p-6 pt-0">
                            <Link
                                to="/signup/buyer"
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 w-full bg-earth-terracotta hover:bg-earth-terracotta-dark flex items-center justify-center"
                            >
                                Join as Buyer
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-chevron-right ml-2 h-4 w-4"
                                >
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Seller Card */}
                    <div className="rounded-lg bg-card text-card-foreground shadow-sm border-2 hover:border-earth-terracotta hover:shadow-md transition-all">
                        <div className="flex flex-col space-y-1.5 p-6 text-center pb-4">
                            <div className="w-16 h-16 flex items-center justify-center bg-earth-terracotta/10 rounded-full mx-auto mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-store h-8 w-8 text-earth-terracotta"
                                >
                                    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path>
                                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                                    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path>
                                    <path d="M2 7h20"></path>
                                    <path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2 2 0 0 1-2-2V7"></path>
                                </svg>
                            </div>
                            <h3 className="font-semibold tracking-tight text-xl text-earth-olive-dark">
                                Join as a Seller
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                List your agricultural products and connect with buyers globally
                            </p>
                        </div>
                        <div className="p-6 pt-0 pb-4">
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <svg
                                        className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        ></path>
                                    </svg>
                                    <span className="text-earth-olive-dark/80">
                                        Reach thousands of potential buyers
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        ></path>
                                    </svg>
                                    <span className="text-earth-olive-dark/80">Offer pre-harvest contracts</span>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        ></path>
                                    </svg>
                                    <span className="text-earth-olive-dark/80">Secure payments and escrow service</span>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        ></path>
                                    </svg>
                                    <span className="text-earth-olive-dark/80">Export documentation support</span>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        ></path>
                                    </svg>
                                    <span className="text-earth-olive-dark/80">
                                        Tools to manage your listings and inventory
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        ></path>
                                    </svg>
                                    <span className="text-earth-olive-dark/80">Analytics and market insights</span>
                                </li>
                            </ul>
                        </div>
                        <div className="flex items-center p-6 pt-0">
                            <Link
                                to="/signup/seller"
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 w-full bg-earth-terracotta hover:bg-earth-terracotta-dark flex items-center justify-center"
                            >
                                Join as Seller
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-chevron-right ml-2 h-4 w-4"
                                >
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                    <h2 className="text-xl font-semibold text-earth-olive-dark mb-4">Already have an account?</h2>
                    <p className="text-earth-olive-dark/80 mb-4">
                        If you already have an account with us, please sign in to access your dashboard.
                    </p>
                    <Link
                        to="/login"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    >
                        Sign In
                    </Link>
                </div>

                <div className="text-center">
                    <p className="text-sm text-earth-olive-dark/60">
                        By joining EarthTrade GCC, you agree to our{" "}
                        <Link to="/terms" className="text-earth-terracotta hover:underline">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-earth-terracotta hover:underline">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default SignUp;
