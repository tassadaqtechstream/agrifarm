import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Languages, SupportedLanguage } from "@/i18n/settings";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext"; // Import the cart context
import { AlignJustify, User as UserIcon, LogOut, ShoppingCart } from "lucide-react";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useLanguage();

  const changeLanguage = (lng: string) => {
    if (lng === 'en' || lng === 'ar') {
      i18n.changeLanguage(lng);
      setLanguage(lng as SupportedLanguage);
    }
  };

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="font-medium">
            {language}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white shadow-xl border-earth-olive-light">
          <DropdownMenuLabel>Select a language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Languages.map((lng) => (
              <DropdownMenuItem key={lng} onClick={() => changeLanguage(lng)}>
                {lng}
              </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
  );
};

const Navbar = () => {
  const { isAuthenticated, profile, logout } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();
  const { totalItems } = useCart(); // Using totalItems directly from the context

  const isActive = (path: string) => {
    return location.hash === path || location.pathname === path;
  };

  return (
      <header className="sticky top-0 z-40 w-full border-b border-earth-olive-light/30 bg-white shadow-sm">
        <div className="container flex h-14 items-center">
          <Link to="/" className="mr-4 flex items-center">
            <div className="font-bold text-2xl flex flex-col">
              <div>
                <span className="text-earth-terracotta">Harv</span>
                <span className="text-earth-olive">3</span>
                <span className="text-earth-terracotta">st</span>
                <span className="text-earth-olive ml-1">MP</span>
              </div>
              <span className="text-xs text-earth-olive-dark/70 font-normal mt-[-2px]">sow, sell, secure</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium ml-4">
            <a
                href="/categories"
                className={`${isActive('/categories') ? 'text-earth-terracotta border-earth-terracotta' : 'text-earth-olive-dark border-transparent'} hover:text-earth-terracotta transition-colors py-2 border-b-2 hover:border-earth-terracotta hover:scale-105 transform transition-transform duration-300`}
            >
              {t('categories')}
            </a>
            <a
                href="/pre-harvest"
                className={`${isActive('/pre-harvest') ? 'text-earth-terracotta border-earth-terracotta' : 'text-earth-olive-dark border-transparent'} hover:text-earth-terracotta transition-colors py-2 border-b-2 hover:border-earth-terracotta hover:scale-105 transform transition-transform duration-300`}
            >
              {t('preHarvest')}
            </a>
            <a
                href="/how-it-works"
                className={`${isActive('/how-it-works') ? 'text-earth-terracotta border-earth-terracotta' : 'text-earth-olive-dark border-transparent'} hover:text-earth-terracotta transition-colors py-2 border-b-2 hover:border-earth-terracotta hover:scale-105 transform transition-transform duration-300`}
            >
              How It Works
            </a>
            <a
                href="/contact"
                className={`${isActive('/contact') ? 'text-earth-terracotta border-earth-terracotta' : 'text-earth-olive-dark border-transparent'} hover:text-earth-terracotta transition-colors py-2 border-b-2 hover:border-earth-terracotta hover:scale-105 transform transition-transform duration-300`}
            >
              Contact Us
            </a>
            {isAuthenticated && profile?.user_type === 'seller' && (
                <Link
                    to="/seller/listings"
                    className={`${isActive('/seller/listings') ? 'text-earth-terracotta border-earth-terracotta' : 'text-earth-olive-dark border-transparent'} hover:text-earth-terracotta transition-colors py-2 border-b-2 hover:border-earth-terracotta hover:scale-105 transform transition-transform duration-300`}
                >
                  {t('myListings')}
                </Link>
            )}
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-3">
            <nav className="flex items-center space-x-2">
              {/* Cart Button with Dynamic Count */}
              <Link to="/cart">
                <Button
                    variant="outline"
                    size="sm"
                    className={`relative flex items-center ${isActive('/cart') ? 'text-earth-terracotta border-earth-terracotta' : 'text-earth-olive-dark border-earth-olive-light'} hover:text-earth-terracotta hover:border-earth-terracotta hover:bg-earth-sand-light transition-all duration-300 hover:scale-105`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span className="ml-1 hidden sm:inline">Cart</span>
                  {totalItems > 0 && (
                      <span className="ml-1 bg-earth-terracotta text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                  )}
                </Button>
              </Link>

              <LanguageToggle />
              {!isAuthenticated ? (
                  <>
                    <Link to="/signin">
                      <Button variant="ghost" size="sm" className="text-earth-olive-dark hover:text-earth-terracotta hover:bg-earth-sand-light font-medium transition-all duration-300 hover:scale-105">
                        {t('signIn')}
                      </Button>
                    </Link>
                    <Link to="/join">
                      <Button variant="default" size="sm" className="bg-earth-terracotta hover:bg-earth-terracotta-dark font-medium transition-all duration-300 hover:scale-105">
                        {t('join')}
                      </Button>
                    </Link>
                  </>
              ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="border-earth-olive-light hover:scale-105 transition-all duration-300">
                        <UserIcon className="mr-2 h-4 w-4" />
                        {profile?.first_name || 'User'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white shadow-xl border-earth-olive-light">
                      <DropdownMenuLabel>{t('myAccount')}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/profile">{t('profile')}</Link>
                      </DropdownMenuItem>
                      {profile?.user_type === 'seller' && (
                          <DropdownMenuItem asChild>
                            <Link to="/seller/dashboard">{t('sellerDashboard')}</Link>
                          </DropdownMenuItem>
                      )}
                      <DropdownMenuItem asChild>
                        <Link to="/buyer/orders">My Orders</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/cart" className="flex items-center justify-between">
                          <span>My Cart</span>
                          {totalItems > 0 && (
                              <span className="bg-earth-terracotta text-white rounded-full h-5 w-5 flex items-center justify-center text-xs ml-2">
                          {totalItems}
                        </span>
                          )}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={logout} className="cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        {t('logout')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
              )}
            </nav>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden ml-2">
                <AlignJustify className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs bg-white">
              <SheetHeader>
                <SheetTitle className="text-earth-olive-dark">Menu</SheetTitle>
                <SheetDescription>
                  Explore the marketplace and manage your account.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-3 py-4">
                <a href="/#categories" className="hover:text-earth-terracotta text-earth-olive-dark transition-colors block py-2 px-2 font-medium border-b border-earth-sand">
                  {t('categories')}
                </a>
                <a href="/#pre-harvest" className="hover:text-earth-terracotta text-earth-olive-dark transition-colors block py-2 px-2 font-medium border-b border-earth-sand">
                  {t('preHarvest')}
                </a>
                <a href="/#how-it-works" className="hover:text-earth-terracotta text-earth-olive-dark transition-colors block py-2 px-2 font-medium border-b border-earth-sand">
                  How It Works
                </a>
                <a href="/#contact" className="hover:text-earth-terracotta text-earth-olive-dark transition-colors block py-2 px-2 font-medium border-b border-earth-sand">
                  Contact Us
                </a>
                {/* Cart Link in Mobile Menu with Updated Count */}
                <Link to="/cart" className="hover:text-earth-terracotta text-earth-olive-dark transition-colors block py-2 px-2 font-medium border-b border-earth-sand hover:bg-earth-sand-light/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      My Cart
                    </div>
                    {totalItems > 0 && (
                        <span className="bg-earth-terracotta text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                    )}
                  </div>
                </Link>
                {isAuthenticated && profile?.user_type === 'seller' && (
                    <Link to="/seller/listings" className="hover:text-earth-terracotta text-earth-olive-dark transition-colors block py-2 px-2 font-medium border-b border-earth-sand">
                      {t('myListings')}
                    </Link>
                )}
                {!isAuthenticated ? (
                    <>
                      <Link to="/signin" className="hover:text-earth-terracotta text-earth-olive-dark transition-colors block py-2 px-2 font-medium border-b border-earth-sand">
                        {t('signIn')}
                      </Link>
                      <Link to="/join" className="hover:text-earth-terracotta text-earth-olive-dark transition-colors block py-2 px-2 font-medium border-b border-earth-sand">
                        {t('join')}
                      </Link>
                    </>
                ) : (
                    <>
                      <Link to="/profile" className="hover:text-earth-terracotta text-earth-olive-dark transition-colors block py-2 px-2 font-medium border-b border-earth-sand">
                        {t('profile')}
                      </Link>
                      {profile?.user_type === 'seller' && (
                          <Link to="/seller/dashboard" className="hover:text-earth-terracotta text-earth-olive-dark transition-colors block py-2 px-2 font-medium border-b border-earth-sand">
                            {t('sellerDashboard')}
                          </Link>
                      )}
                      <Link to="/buyer/orders" className="hover:text-earth-terracotta text-earth-olive-dark transition-colors block py-2 px-2 font-medium border-b border-earth-sand">
                        My Orders
                      </Link>
                      <Button variant="destructive" size="sm" className="w-full mt-3" onClick={logout}>
                        {t('logout')}
                      </Button>
                    </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
  );
};

export default Navbar;