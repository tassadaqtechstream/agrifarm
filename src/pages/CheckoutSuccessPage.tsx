
import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const CheckoutSuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 md:px-6 py-16 flex items-center justify-center">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="rounded-full bg-green-100 p-3 w-16 h-16 mx-auto flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-earth-olive-dark">
            Order Successful!
          </h1>
          
          <p className="text-muted-foreground">
            Thank you for your purchase. We've received your order and will process it as soon as possible.
          </p>
          
          <div className="bg-muted/50 rounded-lg p-6 text-left">
            <p className="text-sm mb-2">
              A confirmation email will be sent shortly with your order details.
            </p>
            <p className="text-sm">
              You can track the status of your order in the "My Orders" section of your account.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild className="w-full">
              <Link to="/buyer/orders">View My Orders</Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link to="/categories">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutSuccessPage;
