import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryDetail from "./pages/CategoryDetail";
import ProductDetailPage from "./pages/ProductDetailPage";
import PreHarvestPage from "./pages/PreHarvestPage";
import PreHarvestDetailPage from "./pages/PreHarvestDetailPage";
import PreHarvestReservePage from "./pages/PreHarvestReservePage";
import SignInPage from "./pages/SignInPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import JoinPage from "./pages/JoinPage";
import JoinSellerPage from "./pages/JoinSellerPage";
import JoinBuyerPage from "./pages/JoinBuyerPage";
import ListingsPage from "./pages/seller/ListingsPage";
import NewListingPage from "./pages/seller/NewListingPage";
import EditListingPage from "./pages/seller/EditListingPage";
import SellerDashboard from "./pages/seller/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminListingsPage from "./pages/admin/AdminListingsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import OrdersPage from "./pages/buyer/OrdersPage";
import PlaceOrderPage from "./pages/buyer/PlaceOrderPage";
import OrderDetailPage from "./pages/buyer/OrderDetailPage";
import SellerOrdersPage from "./pages/seller/OrdersPage";
import SellerOrderDetailPage from "./pages/seller/OrderDetailPage";
import ProfilePage from "./pages/ProfilePage";
import AuthLayout from "./components/layouts/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <LanguageProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/categories/:categoryName" element={<CategoryDetail />} />
                  <Route path="/product/:productId" element={<ProductDetailPage />} />
                  <Route path="/pre-harvest" element={<PreHarvestPage />} />
                  <Route path="/pre-harvest/:id" element={<PreHarvestDetailPage />} />
                  <Route path="/pre-harvest/:id/reserve" element={<PreHarvestReservePage />} />
                  <Route path="/join" element={<JoinPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
                  
                  <Route element={<AuthLayout />}>
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/join/seller" element={<JoinSellerPage />} />
                    <Route path="/join/buyer" element={<JoinBuyerPage />} />
                  </Route>
                  
                  <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<ProfilePage />} />
                    
                    <Route path="/seller/dashboard" element={<SellerDashboard />} />
                    <Route path="/seller/listings" element={<ListingsPage />} />
                    <Route path="/seller/listings/new" element={<NewListingPage />} />
                    <Route path="/seller/listings/:id/edit" element={<EditListingPage />} />
                    <Route path="/seller/orders" element={<SellerOrdersPage />} />
                    <Route path="/seller/orders/:id" element={<SellerOrderDetailPage />} />
                    
                    <Route path="/buyer/orders" element={<OrdersPage />} />
                    <Route path="/buyer/orders/:id" element={<OrderDetailPage />} />
                    <Route path="/buyer/place-order/:listingId" element={<PlaceOrderPage />} />
                  </Route>
                  
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/listings" element={<AdminListingsPage />} />
                  <Route path="/admin/users" element={<AdminUsersPage />} />
                  <Route path="/admin/categories" element={<AdminCategoriesPage />} />
                  <Route path="/admin/orders" element={<AdminOrdersPage />} />
                  
                  <Route path="/verify-email" element={<EmailVerificationPage />} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </LanguageProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
