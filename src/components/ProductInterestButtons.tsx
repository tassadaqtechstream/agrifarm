
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { MessageSquarePlus, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface ProductInterestButtonsProps {
  productId: string;
  productName: string;
  // Add custom button rendering option
  renderCustomButtons?: boolean;
}

const ProductInterestButtons: React.FC<ProductInterestButtonsProps> = ({
  productId,
  productName,
  renderCustomButtons = false
}) => {
  const { toast } = useToast();
  const { user, profile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"interest" | "quote">("interest");
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    quantity: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openDialog = (type: "interest" | "quote") => {
    // For "interest" type, authentication is required
    if (type === "interest" && !isAuthenticated) {
      // Show authentication dialog
      setShowAuthDialog(true);
      return;
    }
    
    // Remove authentication check for "quote" type

    // For any dialog type, if user is authenticated, pre-fill the form
    if (isAuthenticated && user && profile) {
      setFormData({
        ...formData,
        name: `${profile.first_name || ""} ${profile.last_name || ""}`.trim(),
        email: user.email || "",
        phone: profile.phone_number || "",
      });
    }
    
    setDialogType(type);
    setShowDialog(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real application, you would make an API call here
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: dialogType === "interest" ? "Interest registered!" : "Quote request sent!",
        description: "Our team will contact you shortly.",
      });
      
      setShowDialog(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        quantity: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignIn = () => {
    navigate('/signin', { state: { from: `/product/${productId}` } });
    setShowAuthDialog(false);
  };

  const handleSignUp = () => {
    navigate('/join/buyer', { state: { from: `/product/${productId}` } });
    setShowAuthDialog(false);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3">
        {!renderCustomButtons && (
          <>
            <Button 
              variant="outline" 
              className="border-earth-olive text-earth-olive hover:bg-earth-olive hover:text-white"
              onClick={() => openDialog("interest")}
            >
              <MessageSquarePlus className="mr-2 h-4 w-4" />
              I'm Interested
            </Button>
            
            <Button 
              variant="outline" 
              className="border-earth-terracotta text-earth-terracotta hover:bg-earth-terracotta hover:text-white"
              onClick={() => openDialog("quote")}
            >
              <Mail className="mr-2 h-4 w-4" />
              Request Custom Quote
            </Button>
          </>
        )}
      </div>

      {/* Authentication Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Authentication Required</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              You need to sign in or register as a buyer to express interest in this product.
            </p>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAuthDialog(false)}
            >
              Cancel
            </Button>
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline"
                onClick={handleSignUp}
              >
                Register as Buyer
              </Button>
              <Button onClick={handleSignIn}>Sign In</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {dialogType === "interest" 
                ? `Register Interest in ${productName}`
                : `Request Custom Quote for ${productName}`
              }
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              
              {dialogType === "quote" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="e.g., 100 kg"
                    required
                  />
                </div>
              )}
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="message" className="text-right">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder={dialogType === "interest" 
                    ? "Please let us know what specifically interests you about this product..."
                    : "Please provide details about your requirements..."
                  }
                  required
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting 
                  ? "Submitting..." 
                  : dialogType === "interest" 
                    ? "Register Interest" 
                    : "Request Quote"
                }
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Add public methods to the component for direct dialog opening
export const openInterestDialog = (productId: string, productName: string) => {
  // This is a placeholder - in practice we would need a more sophisticated solution
  // like a context or event system to trigger dialogs from outside the component
  console.log(`Would open interest dialog for product ${productId}: ${productName}`);
};

export const openQuoteDialog = (productId: string, productName: string) => {
  // This is a placeholder - same limitation as above
  console.log(`Would open quote dialog for product ${productId}: ${productName}`);
};

export default ProductInterestButtons;
