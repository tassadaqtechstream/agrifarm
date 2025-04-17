const OurSolution = () => {
    return (
        <section id="categories" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-earth-olive-dark mb-4">
                        Discover Our Product Categories
                    </h2>
                    <p className="text-lg text-earth-olive-dark/80 max-w-3xl mx-auto">
                        Browse through our diverse range of agricultural products from trusted suppliers across the GCC
                        region and beyond.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-red-50 rounded-xl p-6 card-hover" style={{ animationDelay: "0s" }}>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 p-3 rounded-full bg-white/80 shadow-sm">
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
                                    className="lucide lucide-apple h-8 w-8 text-earth-terracotta"
                                >
                                    <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
                                    <path d="M10 2c1 .5 2 2 2 5"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-earth-olive-dark mb-2">Fruits</h3>
                            <p className="text-earth-olive-dark/70">Fresh seasonal fruits from local farms</p>
                            <a
                                href="#"
                                className="mt-4 text-earth-terracotta hover:text-earth-terracotta-dark font-medium inline-flex items-center"
                            >
                                Explore
                                <svg
                                    className="w-4 h-4 ml-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5 12H19M19 12L12 5M19 12L12 19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6 card-hover" style={{ animationDelay: "0.1s" }}>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 p-3 rounded-full bg-white/80 shadow-sm">
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
                                    className="lucide lucide-carrot h-8 w-8 text-earth-terracotta"
                                >
                                    <path d="M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM8.64 14l-2.05-2.04M15.34 15l-2.46-2.46"></path>
                                    <path d="M22 9s-1.33-2-3.5-2C16.86 7 15 9 15 9s1.33 2 3.5 2S22 9 22 9z"></path>
                                    <path d="M15 2s-2 1.33-2 3.5S15 9 15 9s2-1.84 2-3.5C17 3.33 15 2 15 2z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-earth-olive-dark mb-2">Vegetables</h3>
                            <p className="text-earth-olive-dark/70">Organic and conventional vegetables</p>
                            <a
                                href="#"
                                className="mt-4 text-earth-terracotta hover:text-earth-terracotta-dark font-medium inline-flex items-center"
                            >
                                Explore
                                <svg
                                    className="w-4 h-4 ml-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5 12H19M19 12L12 5M19 12L12 19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-6 card-hover" style={{ animationDelay: "0.2s" }}>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 p-3 rounded-full bg-white/80 shadow-sm">
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
                                    className="lucide lucide-wheat h-8 w-8 text-earth-terracotta"
                                >
                                    <path d="M2 22 16 8"></path>
                                    <path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"></path>
                                    <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"></path>
                                    <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"></path>
                                    <path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"></path>
                                    <path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"></path>
                                    <path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"></path>
                                    <path d="M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-earth-olive-dark mb-2">Grains</h3>
                            <p className="text-earth-olive-dark/70">Premium quality wheat, rice, and cereals</p>
                            <a
                                href="#"
                                className="mt-4 text-earth-terracotta hover:text-earth-terracotta-dark font-medium inline-flex items-center"
                            >
                                Explore
                                <svg
                                    className="w-4 h-4 ml-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5 12H19M19 12L12 5M19 12L12 19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-6 card-hover" style={{ animationDelay: "0.3s" }}>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 p-3 rounded-full bg-white/80 shadow-sm">
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
                                    className="lucide lucide-leaf h-8 w-8 text-earth-terracotta"
                                >
                                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-earth-olive-dark mb-2">Spices</h3>
                            <p className="text-earth-olive-dark/70">Authentic regional spices and herbs</p>
                            <a
                                href="#"
                                className="mt-4 text-earth-terracotta hover:text-earth-terracotta-dark font-medium inline-flex items-center"
                            >
                                Explore
                                <svg
                                    className="w-4 h-4 ml-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5 12H19M19 12L12 5M19 12L12 19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="bg-pink-50 rounded-xl p-6 card-hover" style={{ animationDelay: "0.4s" }}>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 p-3 rounded-full bg-white/80 shadow-sm">
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
                                    className="lucide lucide-flower2 h-8 w-8 text-earth-terracotta"
                                >
                                    <path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"></path>
                                    <circle cx="12" cy="8" r="2"></circle>
                                    <path d="M12 10v12"></path>
                                    <path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"></path>
                                    <path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-earth-olive-dark mb-2">Flowers</h3>
                            <p className="text-earth-olive-dark/70">Ornamental plants and cut flowers</p>
                            <a
                                href="#"
                                className="mt-4 text-earth-terracotta hover:text-earth-terracotta-dark font-medium inline-flex items-center"
                            >
                                Explore
                                <svg
                                    className="w-4 h-4 ml-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5 12H19M19 12L12 5M19 12L12 19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="bg-yellow-50 rounded-xl p-6 card-hover" style={{ animationDelay: "0.5s" }}>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 p-3 rounded-full bg-white/80 shadow-sm">
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
                                    className="lucide lucide-beef h-8 w-8 text-earth-terracotta"
                                >
                                    <circle cx="12.5" cy="8.5" r="2.5"></circle>
                                    <path d="M12.5 2a6.5 6.5 0 0 0-6.22 4.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3A6.5 6.5 0 0 0 12.5 2Z"></path>
                                    <path d="m18.5 6 2.19 4.5a6.48 6.48 0 0 1 .31 2 6.49 6.49 0 0 1-2.6 5.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-earth-olive-dark mb-2">Livestock</h3>
                            <p className="text-earth-olive-dark/70">Responsibly raised livestock products</p>
                            <a
                                href="#"
                                className="mt-4 text-earth-terracotta hover:text-earth-terracotta-dark font-medium inline-flex items-center"
                            >
                                Explore
                                <svg
                                    className="w-4 h-4 ml-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5 12H19M19 12L12 5M19 12L12 19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-6 card-hover" style={{ animationDelay: "0.6s" }}>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 p-3 rounded-full bg-white/80 shadow-sm">
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
                                    className="lucide lucide-egg h-8 w-8 text-earth-terracotta"
                                >
                                    <path d="M12 22c6.23-.05 7.87-5.57 7.5-10-.36-4.34-3.95-9.96-7.5-10-3.55.04-7.14 5.66-7.5 10-.37 4.43 1.27 9.95 7.5 10z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-earth-olive-dark mb-2">Dairy &amp; Eggs</h3>
                            <p className="text-earth-olive-dark/70">Farm-fresh dairy products and eggs</p>
                            <a
                                href="#"
                                className="mt-4 text-earth-terracotta hover:text-earth-terracotta-dark font-medium inline-flex items-center"
                            >
                                Explore
                                <svg
                                    className="w-4 h-4 ml-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5 12H19M19 12L12 5M19 12L12 19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6 card-hover" style={{ animationDelay: "0.7s" }}>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 p-3 rounded-full bg-white/80 shadow-sm">
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
                                    className="lucide lucide-circle-ellipsis h-8 w-8 text-earth-terracotta"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M17 12h.01"></path>
                                    <path d="M12 12h.01"></path>
                                    <path d="M7 12h.01"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-earth-olive-dark mb-2">More</h3>
                            <p className="text-earth-olive-dark/70">Explore other agricultural categories</p>
                            <a
                                href="#"
                                className="mt-4 text-earth-terracotta hover:text-earth-terracotta-dark font-medium inline-flex items-center"
                            >
                                Explore
                                <svg
                                    className="w-4 h-4 ml-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5 12H19M19 12L12 5M19 12L12 19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurSolution;
