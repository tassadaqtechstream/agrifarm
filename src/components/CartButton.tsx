
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const CartButton: React.FC = () => {
  const { totalItems } = useCart();
  
  return (
    <Link to="/cart">
      <Button variant="outline" size="icon" className="relative">
        <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
        {totalItems > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
            {totalItems > 99 ? "99+" : totalItems}
          </Badge>
        )}
      </Button>
    </Link>
  );
};

export default CartButton;
