import { FC } from "react";

const HowItWorks: FC = () => {
    return (
        <section id="how-it-works" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-earth-olive-dark mb-4">
                        How Green Oasis AG MarketPlace Works
                    </h2>
                    <p className="text-lg text-earth-olive-dark/80 max-w-3xl mx-auto">
                        Our streamlined process makes agricultural trading simple, secure, and efficient for both buyers
                        and sellers.
                    </p>
                </div>
                <div className="relative">
                    <div className="hidden md:block absolute left-0 right-0 h-1 bg-earth-sand-dark/50 z-0 linebar-gray"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div
                            className="relative flex flex-col items-center text-center animate-slide-up"
                            style={{ animationDelay: "0s" }}
                        >
                            <div className="bg-earth-olive w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg z-10">
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
                                    className="lucide lucide-user-plus h-8 w-8 text-white"
                                >
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <line x1="19" x2="19" y1="8" y2="14"></line>
                                    <line x1="22" x2="16" y1="11" y2="11"></line>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-earth-olive-dark mb-3">Register</h3>
                            <p className="text-earth-olive-dark/70">
                                Create your account as a buyer or seller with verified business credentials
                            </p>
                            <div className="absolute top-0 -right-2 bg-earth-olive text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center md:hidden">
                                1
                            </div>
                        </div>
                        <div
                            className="relative flex flex-col items-center text-center animate-slide-up"
                            style={{ animationDelay: "0.2s" }}
                        >
                            <div className="bg-earth-gold w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg z-10">
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
                                    className="lucide lucide-search h-8 w-8 text-white"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-earth-olive-dark mb-3">Browse or List</h3>
                            <p className="text-earth-olive-dark/70">
                                Search for produce or list your agricultural products with detailed specifications
                            </p>
                            <div className="absolute top-0 -right-2 bg-earth-gold text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center md:hidden">
                                2
                            </div>
                        </div>
                        <div
                            className="relative flex flex-col items-center text-center animate-slide-up"
                            style={{ animationDelay: "0.4s" }}
                        >
                            <div className="bg-earth-terracotta w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg z-10">
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
                                    className="lucide lucide-circle-check-big h-8 w-8 text-white"
                                >
                                    <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                                    <path d="m9 11 3 3L22 4"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-earth-olive-dark mb-3">Trade Securely</h3>
                            <p className="text-earth-olive-dark/70">
                                Finalize deals with our secure payment system and logistics support
                            </p>
                            <div className="absolute top-0 -right-2 bg-earth-terracotta text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center md:hidden">
                                3
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-20 bg-earth-sand/30 rounded-2xl p-8 md:p-10 max-w-4xl mx-auto relative">
                    <div className="absolute -top-5 -left-5 text-5xl text-earth-gold">"</div>
                    <blockquote className="text-lg md:text-xl text-earth-olive-dark/90 text-center mb-6">
                        Green Oasis AG MarketPlace has transformed how we source our agricultural supplies. The
                        pre-harvest contracts feature allows us to secure the highest quality produce well in advance,
                        giving both us and the farmers peace of mind.
                    </blockquote>
                    <div className="flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                            <img
                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                alt="Customer testimonial"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <p className="font-semibold text-earth-olive-dark">Ahmed Al-Farsi</p>
                            <p className="text-sm text-earth-olive-dark/70">Procurement Manager, Gulf Fresh Foods</p>
                        </div>
                    </div>
                    <div className="absolute -bottom-5 -right-5 text-5xl text-earth-gold rotate-180">"</div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
