import { FC } from "react";

const OurValue: FC = () => {
    return (
        <section id="pre-harvest" className="py-16 md:py-24 bg-earth-sand-light">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2 relative animate-fade-in">
                        <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                                alt="Pre-harvest agricultural field"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        </div>
                        <div className="absolute -top-5 -left-5 w-24 h-24 bg-earth-gold rounded-lg rotate-12 -z-10"></div>
                        <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-earth-terracotta/20 rounded-full -z-10"></div>
                        <div
                            className="absolute bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 max-w-xs animate-slide-up"
                            style={{ animationDelay: "0.3s" }}
                        >
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-earth-gold-light rounded-full">
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
                                        className="lucide lucide-calendar h-5 w-5 text-earth-gold-dark"
                                    >
                                        <path d="M8 2v4"></path>
                                        <path d="M16 2v4"></path>
                                        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                                        <path d="M3 10h18"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-earth-olive-dark">Plan Ahead</h4>
                                    <p className="text-sm text-earth-olive-dark/70">
                                        Secure contracts up to 6 months before harvest time
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 animate-slide-in-right">
                        <div className="inline-block bg-earth-terracotta/10 px-4 py-1 rounded-full text-earth-terracotta font-medium mb-4">
                            UNIQUE FEATURE
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-earth-olive-dark mb-6">
                            Secure Produce Before It's Harvested
                        </h2>
                        <p className="text-lg text-earth-olive-dark/80 mb-8">
                            Our Pre-Harvest Contracts feature allows buyers to secure agricultural products months
                            before they're harvested. Plan ahead, lock in prices, and build reliable supply chains.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-earth-olive/10 rounded-full">
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
                                        className="lucide lucide-clock h-5 w-5 text-earth-olive"
                                    >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-earth-olive-dark">Plan Ahead</h4>
                                    <p className="text-sm text-earth-olive-dark/70">
                                        Lock in future supplies with advance contracts
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-earth-olive/10 rounded-full">
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
                                        className="lucide lucide-credit-card h-5 w-5 text-earth-olive"
                                    >
                                        <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                                        <line x1="2" x2="22" y1="10" y2="10"></line>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-earth-olive-dark">Flexible Pricing</h4>
                                    <p className="text-sm text-earth-olive-dark/70">
                                        Options for fixed, variable, or market-based pricing
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-earth-olive/10 rounded-full">
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
                                        className="lucide lucide-shield-check h-5 w-5 text-earth-olive"
                                    >
                                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                                        <path d="m9 12 2 2 4-4"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-earth-olive-dark">Secure Agreements</h4>
                                    <p className="text-sm text-earth-olive-dark/70">
                                        Protected by our verification and escrow services
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-earth-olive/10 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-earth-olive"
                                    >
                                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                        <path d="m9 12 2 2 4-4"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-earth-olive-dark">Quality Assurance</h4>
                                    <p className="text-sm text-earth-olive-dark/70">
                                        Agreements include quality standards and verification
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 btn-accent">
                            Explore Pre-Harvest Deals
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurValue;
