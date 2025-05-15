import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  min_quantity: number;
  unit: string;
}

const listing: Listing = {
  id: "123",
  title: "Organic Olive Oil",
  description: "High-quality cold-pressed olive oil.",
  price: 5.99,
  quantity: 100,
  min_quantity: 2,
  unit: "Litre",
};

const PlaceOrderPage: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [shippingAddress, setShippingAddress] = useState<string>("");
  const [shippingCity, setShippingCity] = useState<string>("");
  const [shippingCountry, setShippingCountry] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const handlePlaceOrder = (): void => {
    alert(`Order Placed:\n
    Quantity: ${quantity}\n
    Shipping Address: ${shippingAddress}, ${shippingCity}, ${shippingCountry}\n
    Notes: ${notes}`);
  };

  return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto py-12 px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-earth-olive-dark mb-8">
              Place Order
            </h1>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{listing.title}</h2>
                <p className="text-earth-olive-dark/70 mb-4">
                  {listing.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-lg font-medium">
                      OMR {listing.price} / {listing.unit}
                    </div>
                    <div className="text-sm text-earth-olive-dark/70">
                      Minimum order: {listing.min_quantity} {listing.unit}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="quantity" className="block text-right mb-1">
                      Quantity
                    </Label>
                    <Input
                        id="quantity"
                        type="number"
                        min={listing.min_quantity}
                        max={listing.quantity}
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-24 text-right"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="shippingAddress">Shipping Address</Label>
                    <Input
                        id="shippingAddress"
                        type="text"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shippingCity">City</Label>
                      <Input
                          id="shippingCity"
                          type="text"
                          value={shippingCity}
                          onChange={(e) => setShippingCity(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="shippingCountry">Country</Label>
                      <Input
                          id="shippingCountry"
                          type="text"
                          value={shippingCountry}
                          onChange={(e) => setShippingCountry(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Additional Notes</h3>
                <Textarea
                    placeholder="Add any special instructions or notes for the seller"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                  className="bg-earth-terracotta hover:bg-earth-terracotta-dark"
                  onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
  );
};

export default PlaceOrderPage;
