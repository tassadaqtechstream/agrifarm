
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { AlertCircle, Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDummyLoading, setIsDummyLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const from = location.state?.from?.pathname || "/";

  // Check if user was redirected after successful registration or password reset
  useEffect(() => {
    if (location.state?.registrationSuccessful) {
      setSuccessMessage("Registration successful! Please check your email for verification instructions before signing in.");
      if (location.state?.email) {
        setEmail(location.state.email);
      }
    }

    if (location.state?.verified) {
      setSuccessMessage("Email verified successfully! You can now sign in.");
      if (location.state?.email) {
        setEmail(location.state.email);
      }
    }

    if (location.state?.passwordReset) {
      setSuccessMessage("Password reset successful! You can now sign in with your new password.");
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {

      const { error: loginError } = await login(email, password);
      
      if (loginError) {
        setError(loginError.message || "Failed to sign in. Please check your credentials.");
      } else {
        toast({
          title: "Success!",
          description: "You have been signed in successfully.",
        });
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDummySellerLogin = async () => {
    setIsDummyLoading(true);
    setError(null);
    
    // Use predefined credentials for demo seller account
    const dummyEmail = "seller@harv3stmp.com";
    const dummyPassword = "password123";
    
    try {
      const { error } = await login(dummyEmail, dummyPassword);
      
      if (error) {
        toast({
          title: "Dummy login failed",
          description: "The demo seller account doesn't exist. Please create one first with these credentials.",
          variant: "destructive",
        });
      } else {
        navigate("/seller/dashboard", { replace: true });
      }
    } finally {
      setIsDummyLoading(false);
    }
  };

  return (
    <div className="container max-w-md mx-auto py-12 px-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-earth-olive-dark">Sign In</h1>
            <p className="text-earth-olive-dark/70 mt-2">
              Welcome back to Harv3st MP
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {successMessage && (
            <Alert variant="default" className="mb-4 border-green-500 bg-green-50">
              <Check className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-700">{successMessage}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-earth-terracotta hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-earth-terracotta hover:bg-earth-terracotta-dark"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="my-6">
            <Separator />
            <p className="text-center text-sm text-muted-foreground relative bg-white px-2 mx-auto w-fit -mt-3">
              Demo Access
            </p>
          </div>
          
          <Button
            type="button"
            variant="outline"
            className="w-full border-earth-terracotta text-earth-terracotta hover:bg-earth-terracotta/10"
            onClick={handleDummySellerLogin}
            disabled={isDummyLoading}
          >
            {isDummyLoading ? "Accessing..." : "Access Demo Seller Account"}
          </Button>

          <div className="text-center mt-6">
            <p className="text-earth-olive-dark/70">
              Don't have an account?{" "}
              <Link to="/join" className="text-earth-terracotta hover:underline">
                Join Now
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
