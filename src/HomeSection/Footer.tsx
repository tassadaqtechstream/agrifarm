const Footer = () => {
    return (
        <footer className="bg-earth-olive-dark text-white">
            <div className="container mx-auto px-4 py-12 md:py-16 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center mb-5">
                            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center mr-2">
                                <div className="h-6 w-6 rounded-full bg-earth-olive"></div>
                            </div>
                            <span className="font-bold text-xl">
                                Oasis<span className="text-earth-terracotta">Trade</span>
                            </span>
                        </div>
                        <p className="text-white/80 mb-5">
                            Connecting agricultural producers and buyers across the GCC region and beyond through our
                            innovative marketplace platform.
                        </p>
                        <div className="flex space-x-3">
                            <a
                                href="#"
                                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
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
                                    className="lucide lucide-facebook h-4 w-4"
                                >
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
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
                                    className="lucide lucide-twitter h-4 w-4"
                                >
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
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
                                    className="lucide lucide-instagram h-4 w-4"
                                >
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
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
                                    className="lucide lucide-linkedin h-4 w-4"
                                >
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect width="4" height="12" x="2" y="9"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-5">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-white/80 hover:text-white flex items-center">
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
                                        className="lucide lucide-chevron-right h-4 w-4 mr-1"
                                    >
                                        <path d="m9 18 6-6-6-6"></path>
                                    </svg>
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/80 hover:text-white flex items-center">
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
                                        className="lucide lucide-chevron-right h-4 w-4 mr-1"
                                    >
                                        <path d="m9 18 6-6-6-6"></path>
                                    </svg>
                                    How It Works
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/80 hover:text-white flex items-center">
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
                                        className="lucide lucide-chevron-right h-4 w-4 mr-1"
                                    >
                                        <path d="m9 18 6-6-6-6"></path>
                                    </svg>
                                    Product Categories
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/80 hover:text-white flex items-center">
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
                                        className="lucide lucide-chevron-right h-4 w-4 mr-1"
                                    >
                                        <path d="m9 18 6-6-6-6"></path>
                                    </svg>
                                    Pre-Harvest Contracts
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/80 hover:text-white flex items-center">
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
                                        className="lucide lucide-chevron-right h-4 w-4 mr-1"
                                    >
                                        <path d="m9 18 6-6-6-6"></path>
                                    </svg>
                                    Terms &amp; Conditions
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/80 hover:text-white flex items-center">
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
                                        className="lucide lucide-chevron-right h-4 w-4 mr-1"
                                    >
                                        <path d="m9 18 6-6-6-6"></path>
                                    </svg>
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-5">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex">
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
                                    className="lucide lucide-map-pin h-5 w-5 mr-3 flex-shrink-0"
                                >
                                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                <span className="text-white/80">
                                    Dubai Internet City, Building 12
                                    <br />
                                    Dubai, United Arab Emirates
                                </span>
                            </li>
                            <li className="flex items-center">
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
                                    className="lucide lucide-phone h-5 w-5 mr-3 flex-shrink-0"
                                >
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                                <span className="text-white/80">+971 4 123 4567</span>
                            </li>
                            <li className="flex items-center">
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
                                    className="lucide lucide-mail h-5 w-5 mr-3 flex-shrink-0"
                                >
                                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </svg>
                                <span className="text-white/80">info@oasistrade.com</span>
                            </li>
                            <li className="flex items-center">
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
                                    className="lucide lucide-globe h-5 w-5 mr-3 flex-shrink-0"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                                    <path d="M2 12h20"></path>
                                </svg>
                                <div className="flex items-center">
                                    <button className="text-white/80 hover:text-white">English</button>
                                    <span className="mx-2">|</span>
                                    <button className="text-white/80 hover:text-white">عربي</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-5">Newsletter</h3>
                        <p className="text-white/80 mb-4">
                            Subscribe to our newsletter for the latest updates on agricultural trends and marketplace
                            features.
                        </p>
                        <div className="flex mb-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-white/10 py-2 px-3 rounded-l-md w-full placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-earth-terracotta"
                            />
                            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 bg-earth-terracotta hover:bg-earth-terracotta-dark rounded-l-none">
                                Subscribe
                            </button>
                        </div>
                        <div className="flex items-center">
                            <svg
                                className="w-5 h-5 mr-1 text-earth-terracotta"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </svg>
                            <span className="text-sm text-white/80">We respect your privacy</span>
                        </div>
                        <div className="mt-5">
                            <h4 className="font-semibold mb-2">Download Our App</h4>
                            <div className="flex space-x-3">
                                <a
                                    href="#"
                                    className="bg-white/10 hover:bg-white/20 transition-colors rounded-md px-3 py-2 flex items-center"
                                >
                                    <span className="mr-2">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M17.0499 0H6.94995C3.11995 0 0 3.12 0 6.95V17.05C0 20.88 3.11995 24 6.94995 24H17.0499C20.8799 24 23.9999 20.88 23.9999 17.05V6.95C23.9999 3.12 20.8799 0 17.0499 0Z"
                                                fill="white"
                                            ></path>
                                            <path
                                                d="M17.5099 12.0099C17.4999 12.2899 17.4699 12.5699 17.3899 12.8399C17.1999 13.4899 16.7999 14.0299 16.2599 14.4299C15.8699 14.7199 15.4399 14.9099 14.9799 14.9999C14.7999 15.0299 14.6299 15.0599 14.4499 15.0599C14.0799 15.0599 13.6999 14.9699 13.3699 14.8199L12.4999 15.0999L11.4799 15.4199C11.4699 15.4199 11.4699 15.4199 11.4599 15.4199C11.3699 15.4499 11.2799 15.3799 11.2699 15.2899V15.2799L11.3199 14.3699C11.3399 14.0299 11.3599 13.6499 11.3799 13.3599C11.3799 13.3399 11.3799 13.3199 11.3799 13.2999C11.3799 13.2599 11.3699 13.2099 11.3499 13.1699C11.1799 12.8399 11.0999 12.4599 11.0999 12.0799C11.0999 10.4099 12.4599 9.04995 14.1299 9.04995C15.7999 9.04995 17.1599 10.4099 17.1599 12.0799C17.5099 12.0099 17.5099 12.0099 17.5099 12.0099ZM9.85993 12.0799C9.85993 12.5599 9.96993 13.0199 10.1599 13.4399C10.1899 13.5099 10.2099 13.5899 10.2099 13.6599C10.2099 13.6999 10.2099 13.7399 10.2099 13.7899C10.1999 13.9999 10.1899 14.2899 10.1599 14.6499L10.0899 15.8999C10.0799 16.0299 10.1399 16.1699 10.2699 16.2199C10.3999 16.2799 10.5399 16.2399 10.6099 16.1199L11.9999 14.0099C12.0599 14.0199 12.1299 14.0399 12.1899 14.0499C12.3799 14.0999 12.5699 14.1199 12.7699 14.1199C13.0399 14.1199 13.3099 14.0799 13.5699 14.0099C13.9799 13.8799 14.3499 13.6599 14.6499 13.3699C15.0199 13.0399 15.2899 12.6199 15.4299 12.1299C15.4799 11.9699 15.5199 11.7999 15.5299 11.6299C15.5399 11.4499 15.5399 11.2699 15.5299 11.0899C15.4699 10.1999 15.0099 9.38995 14.2999 8.87995C13.9699 8.63995 13.5899 8.45995 13.1799 8.36995C12.9799 8.32995 12.7799 8.30995 12.5799 8.30995C11.7099 8.30995 10.8899 8.67995 10.3099 9.25995C10.0099 9.55995 9.77993 9.92995 9.62993 10.3399C9.47993 10.7499 9.39993 11.1999 9.39993 11.6599C9.85993 12.0799 9.85993 12.0799 9.85993 12.0799Z"
                                                fill="#5C6D35"
                                            ></path>
                                        </svg>
                                    </span>
                                    App Store
                                </a>
                                <a
                                    href="#"
                                    className="bg-white/10 hover:bg-white/20 transition-colors rounded-md px-3 py-2 flex items-center"
                                >
                                    <span className="mr-2">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.84995 0.95C4.63995 1.16 4.49995 1.5 4.49995 1.93V22.05C4.49995 22.48 4.63995 22.82 4.84995 23.03L4.91995 23.1L15.2999 12.72V12.27L4.91995 1.89L4.84995 0.95Z"
                                                fill="white"
                                            ></path>
                                            <path
                                                d="M19.0499 16.4999L15.2999 12.7499V12.2999L19.0499 8.54995L19.1499 8.59995L23.5499 11.1499C24.7499 11.8499 24.7499 12.9499 23.5499 13.6499L19.1499 16.1999L19.0499 16.4999Z"
                                                fill="white"
                                            ></path>
                                            <path
                                                d="M19.15 16.1999L15.3 12.4999L4.85 22.9999C5.23 23.3999 5.85 23.4499 6.54 23.0499L19.15 16.1999Z"
                                                fill="#5C6D35"
                                            ></path>
                                            <path
                                                d="M19.1499 8.79993L6.5399 1.94993C5.8499 1.54993 5.2299 1.59993 4.8499 1.99993L15.2999 12.4999L19.1499 8.79993Z"
                                                fill="#C65F46"
                                            ></path>
                                        </svg>
                                    </span>
                                    Google Play
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/20 text-center text-white/60 text-sm">
                    <p>
                        &copy; 2025 Green Oasis AG MarketPlace. All rights reserved. The premier agricultural
                        marketplace for the GCC region.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
