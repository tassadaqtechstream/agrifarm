
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export type CartItemType = {
  id: string;
  type: "product" | "pre-harvest";
  name: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
  sellerId: string;
  sellerName?: string;
};

interface CartContextType {
  items: CartItemType[];
  addToCart: (item: CartItemType) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItemType[]>([]);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
        localStorage.removeItem("cart");
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);
  
  const addToCart = (newItem: CartItemType) => {
    setItems(currentItems => {
      // Check if the item already exists in the cart
      const existingItemIndex = currentItems.findIndex(item => item.id === newItem.id && item.type === newItem.type);
      
      if (existingItemIndex >= 0) {
        // Update the quantity of the existing item
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity
        };
        
        toast({
          title: "Cart updated",
          description: `${newItem.name} quantity increased to ${updatedItems[existingItemIndex].quantity}`,
        });
        
        return updatedItems;
      } else {
        // Add the new item
        toast({
          title: "Added to cart",
          description: `${newItem.name} added to your cart`,
        });
        
        return [...currentItems, newItem];
      }
    });
  };
  
  const removeFromCart = (id: string) => {
    setItems(currentItems => {
      const removedItem = currentItems.find(item => item.id === id);
      const newItems = currentItems.filter(item => item.id !== id);
      
      if (removedItem) {
        toast({
          title: "Item removed",
          description: `${removedItem.name} removed from your cart`,
        });
      }
      
      return newItems;
    });
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    setItems(currentItems => 
      currentItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };
  
  // Calculate total items and price
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};
