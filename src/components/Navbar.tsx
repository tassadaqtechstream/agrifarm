import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const LanguageToggle = () => {
  const [language, setLanguage] = useState('en');

  const changeLanguage = (lng) => {
    setLanguage(lng);
  };

  return (
      <div className="relative">
        <button
            className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
            onClick={() => changeLanguage(language === 'en' ? 'ar' : 'en')}
        >
          {language}
        </button>
      </div>
  );
};

const Navbar = () => {
  const { isAuthenticated, currentUser, userProfile, logout, hasRole } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Mock cart items count
  const totalItems = 3;

  const isActive = (path) => {
    return window.location.pathname === path;
  };

  // Check if user is a seller
  const isSeller = hasRole('seller') || userProfile?.user_type === 'seller';

  return (
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-4 flex h-14 items-center">
          <a href="/" className="mr-4 flex items-center">
            <div className="font-bold text-2xl flex flex-col">
              <div>
                <span className="text-orange-600">Harv</span>
                <span className="text-green-700">3</span>
                <span className="text-orange-600">st</span>
                <span className="text-green-700 ml-1">MP</span>
              </div>
              <span className="text-xs text-gray-600 font-normal mt-[-2px]">sow, sell, secure</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-5 text-sm font-medium ml-4">
            <a
                href="/categories"
                className={`${isActive('/categories') ? 'text-orange-600 border-orange-600' : 'text-gray-700 border-transparent'} hover:text-orange-600 transition-colors py-2 border-b-2 hover:border-orange-600 hover:scale-105 transform transition-transform duration-300`}
            >
              Categories
            </a>
            <a
                href="/pre-harvest"
                className={`${isActive('/pre-harvest') ? 'text-orange-600 border-orange-600' : 'text-gray-700 border-transparent'} hover:text-orange-600 transition-colors py-2 border-b-2 hover:border-orange-600 hover:scale-105 transform transition-transform duration-300`}
            >
              Pre-Harvest
            </a>
            <a
                href="/how-it-works"
                className={`${isActive('/how-it-works') ? 'text-orange-600 border-orange-600' : 'text-gray-700 border-transparent'} hover:text-orange-600 transition-colors py-2 border-b-2 hover:border-orange-600 hover:scale-105 transform transition-transform duration-300`}
            >
              How It Works
            </a>
            <a
                href="/contact"
                className={`${isActive('/contact') ? 'text-orange-600 border-orange-600' : 'text-gray-700 border-transparent'} hover:text-orange-600 transition-colors py-2 border-b-2 hover:border-orange-600 hover:scale-105 transform transition-transform duration-300`}
            >
              Contact Us
            </a>
            {isAuthenticated && isSeller && (
                <a
                    href="/seller/listings"
                    className={`${isActive('/seller/listings') ? 'text-orange-600 border-orange-600' : 'text-gray-700 border-transparent'} hover:text-orange-600 transition-colors py-2 border-b-2 hover:border-orange-600 hover:scale-105 transform transition-transform duration-300`}
                >
                  My Listings
                </a>
            )}
          </nav>

          <div className="flex flex-1 items-center justify-end space-x-3">
            <nav className="flex items-center space-x-2">
              {/* Cart Button with Dynamic Count */}
              <a href="/cart">
                <button className={`relative flex items-center px-3 py-1 text-sm border rounded ${isActive('/cart') ? 'text-orange-600 border-orange-600' : 'text-gray-700 border-gray-300'} hover:text-orange-600 hover:border-orange-600 hover:bg-orange-50 transition-all duration-300 hover:scale-105`}>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6.5M7 13h10" />
                  </svg>
                  <span className="ml-1 hidden sm:inline">Cart</span>
                  {totalItems > 0 && (
                      <span className="ml-1 bg-orange-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                  )}
                </button>
              </a>

              <LanguageToggle />

              {!isAuthenticated ? (
                  <>
                    <a href="/signin">
                      <button className="px-3 py-1 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-medium transition-all duration-300 hover:scale-105 rounded">
                        Sign In
                      </button>
                    </a>
                    <a href="/join">
                      <button className="px-3 py-1 text-sm bg-orange-600 text-white hover:bg-orange-700 font-medium transition-all duration-300 hover:scale-105 rounded">
                        Join
                      </button>
                    </a>
                  </>
              ) : (
                  <div className="relative">
                    <button
                        className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded hover:scale-105 transition-all duration-300"
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    >
                      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {userProfile?.first_name || currentUser?.name || 'User'}
                    </button>

                    {isUserMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                          <div className="py-1">
                            <div className="px-4 py-2 text-sm text-gray-700 font-medium border-b">My Account</div>
                            <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</a>

                            {isSeller && (
                                <a href="/seller/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Seller Dashboard</a>
                            )}

                            <a href="/buyer/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Orders</a>

                            <a href="/cart" className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <span>My Cart</span>
                              {totalItems > 0 && (
                                  <span className="bg-orange-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                            {totalItems}
                          </span>
                              )}
                            </a>

                            <button
                                onClick={() => {
                                  logout();
                                  setIsUserMenuOpen(false);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              Logout
                            </button>
                          </div>
                        </div>
                    )}
                  </div>
              )}
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button
              className="md:hidden ml-2 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
              <div className="absolute top-14 left-0 right-0 bg-white border-b border-gray-200 shadow-lg md:hidden z-40">
                <div className="px-4 py-2 space-y-2">
                  <a href="/categories" className="block py-2 text-gray-700 hover:text-orange-600 border-b border-gray-100">Categories</a>
                  <a href="/pre-harvest" className="block py-2 text-gray-700 hover:text-orange-600 border-b border-gray-100">Pre-Harvest</a>
                  <a href="/how-it-works" className="block py-2 text-gray-700 hover:text-orange-600 border-b border-gray-100">How It Works</a>
                  <a href="/contact" className="block py-2 text-gray-700 hover:text-orange-600 border-b border-gray-100">Contact Us</a>

                  {/* Cart Link in Mobile Menu */}
                  <a href="/cart" className="flex items-center justify-between py-2 text-gray-700 hover:text-orange-600 border-b border-gray-100">
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6.5M7 13h10" />
                      </svg>
                      My Cart
                    </div>
                    {totalItems > 0 && (
                        <span className="bg-orange-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                    )}
                  </a>

                  {isAuthenticated && isSeller && (
                      <a href="/seller/listings" className="block py-2 text-gray-700 hover:text-orange-600 border-b border-gray-100">My Listings</a>
                  )}

                  {!isAuthenticated ? (
                      <>
                        <a href="/signin" className="block py-2 text-gray-700 hover:text-orange-600 border-b border-gray-100">Sign In</a>
                        <a href="/join" className="block py-2 text-gray-700 hover:text-orange-600 border-b border-gray-100">Join</a>
                      </>
                  ) : (
                      <>
                        <a href="/profile" className="block py-2 text-gray-700 hover:text-orange-600 border-b border-gray-100">Profile</a>
                        {isSeller && (
                            <a href="/seller/dashboard" className="block py-2 text-gray-700 hover:text-orange-600 border-b border-gray-100">Seller Dashboard</a>
                        )}
                        <a href="/buyer/orders" className="block py-2 text-gray-700 hover:text-orange-600 border-b border-gray-100">My Orders</a>
                        <button
                            onClick={() => {
                              logout();
                              setIsMobileMenuOpen(false);
                            }}
                            className="w-full text-left py-2 text-red-600 hover:text-red-700"
                        >
                          Logout
                        </button>
                      </>
                  )}
                </div>
              </div>
          )}
        </div>
      </header>
  );
};

export default Navbar;