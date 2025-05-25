import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = () => {
  const { currentUser, userProfile, isLoading, isAuthenticated, hasRole } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-700">Loading...</p>
          </div>
        </div>
    );
  }

  // Redirect to signin if not authenticated
  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Check user roles for route protection
  const isSeller = hasRole('seller') || userProfile?.user_type === 'seller';
  const isBuyer = hasRole('buyer') || userProfile?.user_type === 'buyer';

  // If the user is authenticated and trying to access a seller route
  // but they are not a seller, redirect them to appropriate dashboard
  if (location.pathname.startsWith("/seller") && !isSeller) {
    if (isBuyer) {
      return <Navigate to="/buyer/orders" replace />;
    }
    // If user has no specific role, redirect to profile
    return <Navigate to="/profile" replace />;
  }

  // If the user is authenticated and trying to access a buyer route
  // but they are not a buyer, redirect them to appropriate dashboard
  if (location.pathname.startsWith("/buyer") && !isBuyer) {
    if (isSeller) {
      return <Navigate to="/seller/dashboard" replace />;
    }
    // If user has no specific role, redirect to profile
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;