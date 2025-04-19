import React from "react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-earth-sand-light via-earth-sand to-earth-sand-dark -z-10"></div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-96 h-96 rounded-full bg-earth-olive/10 -z-10"></div>
            <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-earth-terracotta/10 -z-10"></div>
            <div className="container mx-auto px-4 py-16 md:py-24 md:px-6">
                <div className="flex flex-col md:flex-row md:items-center">
                    <div className="md:w-1/2 md:pr-8 z-10">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-earth-olive-dark mb-4 animate-fade-in">
                            Where GCC Agriculture Meets Global Trade
                        </h1>
                        <p className="text-lg md:text-xl text-earth-olive mb-8 animate-slide-up">
                            Connect with farmers, wholesalers, and buyers across the region and beyond. From fresh
                            produce to pre-harvest contracts, Green Oasis AG MarketPlace helps you grow your
                            agricultural business.
                        </p>
                        <div
                            className="flex flex-col sm:flex-row gap-4 animate-slide-up"
                            style={{ animationDelay: "0.2s" }}
                        >
                            <button className="justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 btn-primary flex items-center">
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
                                    className="lucide lucide-shopping-bag mr-2 h-5 w-5"
                                >
                                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                                    <path d="M3 6h18"></path>
                                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                                </svg>
                                Browse Produce
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
                                    className="lucide lucide-arrow-right ml-2 h-5 w-5"
                                >
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </button>
                            <Link to="/signup/seller">
                                <button className="justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background h-10 px-4 py-2 border-earth-olive text-earth-olive hover:bg-earth-olive hover:text-white flex items-center">
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
                                        className="lucide lucide-users mr-2 h-5 w-5"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                    Join as Seller
                                </button>
                            </Link>
                        </div>
                        <div
                            className="mt-12 flex items-center space-x-8 animate-slide-up"
                            style={{ animationDelay: "0.4s" }}
                        >
                            <div className="flex flex-col items-center">
                                <span className="font-bold text-2xl text-earth-terracotta">500+</span>
                                <span className="text-sm text-earth-olive-dark">Verified Sellers</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-bold text-2xl text-earth-terracotta">15K+</span>
                                <span className="text-sm text-earth-olive-dark">Products</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-bold text-2xl text-earth-terracotta">6</span>
                                <span className="text-sm text-earth-olive-dark">GCC Countries</span>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 mt-12 md:mt-0 relative animate-fade-in">
                        <div className="relative h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                                alt="Agricultural scene in GCC region"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-earth-olive-dark/30 to-transparent"></div>
                        </div>
                        <div
                            className="absolute -bottom-5 right-10 bg-white rounded-lg shadow-xl p-4 animate-slide-up"
                            style={{ animationDelay: "0.6s" }}
                        >
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-earth-gold rounded-full flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">NEW</span>
                                </div>
                                <div>
                                    <p className="text-earth-olive font-semibold">Pre-Harvest Contracts</p>
                                    <p className="text-sm text-earth-olive-dark">Secure your produce early</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
