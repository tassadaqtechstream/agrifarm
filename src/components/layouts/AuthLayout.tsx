
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const AuthLayout = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  // Check for redirect after login path in session storage
  const redirectPath = sessionStorage.getItem('redirectAfterLogin');
  const from = redirectPath || location.state?.from?.pathname || "/";
  
  // Clear the stored path after getting it
  useEffect(() => {
    if (user && redirectPath) {
      sessionStorage.removeItem('redirectAfterLogin');
    }
  }, [user, redirectPath]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-earth-terracotta mx-auto"></div>
          <p className="mt-4 text-earth-olive-dark">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to home or previous page if already authenticated
  if (user) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
