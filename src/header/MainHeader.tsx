const MainHeader = () => {
    return (
        <nav className="bg-white/90 backdrop-blur-sm py-4 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center">
                    <a href="/" className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-earth-olive flex items-center justify-center mr-2">
                            <div className="h-6 w-6 rounded-full bg-earth-sand"></div>
                        </div>
                        <span className="font-bold text-xl text-earth-olive">
                            Oasis<span className="text-earth-terracotta">Trade</span>
                        </span>
                    </a>
                    <div className="hidden md:flex items-center space-x-8">
                        <a
                            href="#categories"
                            className="text-earth-olive-dark hover:text-earth-terracotta transition-colors"
                        >
                            Categories
                        </a>
                        <a
                            href="#pre-harvest"
                            className="text-earth-olive-dark hover:text-earth-terracotta transition-colors"
                        >
                            Pre-Harvest
                        </a>
                        <a
                            href="#how-it-works"
                            className="text-earth-olive-dark hover:text-earth-terracotta transition-colors"
                        >
                            How It Works
                        </a>
                        <a
                            href="#global-reach"
                            className="text-earth-olive-dark hover:text-earth-terracotta transition-colors"
                        >
                            Global Reach
                        </a>
                        <div className="relative inline-block">
                            <button className="flex items-center text-earth-olive-dark hover:text-earth-terracotta transition-colors">
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
                                    className="lucide lucide-globe h-4 w-4 mr-1"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                                    <path d="M2 12h20"></path>
                                </svg>
                                <span>English</span>
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
                                    className="lucide lucide-chevron-down h-4 w-4 ml-1"
                                >
                                    <path d="m6 9 6 6 6-6"></path>
                                </svg>
                            </button>
                        </div>
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-earth-terracotta hover:bg-earth-terracotta-dark text-white">
                            Sign In
                        </button>
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-earth-olive hover:bg-earth-olive-dark text-white">
                            Join Now
                        </button>
                    </div>
                    <button className="md:hidden text-earth-olive-dark hover:text-earth-terracotta">
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
                            className="lucide lucide-menu h-6 w-6"
                        >
                            <line x1="4" x2="20" y1="12" y2="12"></line>
                            <line x1="4" x2="20" y1="6" y2="6"></line>
                            <line x1="4" x2="20" y1="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default MainHeader;
