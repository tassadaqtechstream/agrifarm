
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = () => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

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

  // Redirect to signin if not authenticated
  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If the user is authenticated and trying to access a seller route
  // but they are a buyer, redirect them to the buyer dashboard
  if (
    location.pathname.startsWith("/seller") && 
    profile?.user_type === "buyer"
  ) {
    return <Navigate to="/buyer/orders" replace />;
  }

  // If the user is authenticated and trying to access a buyer route
  // but they are a seller, redirect them to the seller dashboard
  if (
    location.pathname.startsWith("/buyer") && 
    profile?.user_type === "seller"
  ) {
    return <Navigate to="/seller/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
