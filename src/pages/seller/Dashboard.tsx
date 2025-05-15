
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Package, ShoppingBag, Truck, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const SellerDashboard = () => {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto py-12 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-earth-olive-dark">
            Seller Dashboard
          </h1>
          <p className="text-earth-olive-dark/70 mt-2">
            Welcome back, {profile?.company_name || `${profile?.first_name} ${profile?.last_name}`}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  <Package className="h-8 w-8 text-earth-terracotta mb-1" />
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/seller/listings">View All</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  <ShoppingBag className="h-8 w-8 text-earth-terracotta mb-1" />
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/seller/orders">View All</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Shipments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  <Truck className="h-8 w-8 text-earth-terracotta mb-1" />
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/seller/orders">Manage</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-10">
          <Button asChild className="bg-earth-terracotta hover:bg-earth-terracotta-dark">
            <Link to="/seller/listings/new">
              <Plus className="mr-2 h-4 w-4" /> Add New Product
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/seller/orders">Manage Orders</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-earth-olive-dark/70">
                No recent orders found. When customers place orders, they'll appear here.
              </p>
              <Button asChild variant="link" className="p-0 mt-2 text-earth-terracotta">
                <Link to="/seller/orders">View all orders</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Popular Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-earth-olive-dark/70">
                Add products to your inventory to see which ones are most popular.
              </p>
              <Button asChild variant="link" className="p-0 mt-2 text-earth-terracotta">
                <Link to="/seller/listings">View all products</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellerDashboard;
