
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { AlertCircle, Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updatePassword } = useAuth();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Get the token from the URL
  const accessToken = searchParams.get("access_token");
  const refreshToken = searchParams.get("refresh_token");
  const expiresIn = searchParams.get("expires_in");
  const tokenType = searchParams.get("token_type");

  useEffect(() => {
    if (!accessToken) {
      setError("Invalid or missing reset token. Please try requesting a new password reset.");
    }
  }, [accessToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate password
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setIsSubmitting(false);
      return;
    }

    // Validate password matching
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    try {
      if (!accessToken) {
        setError("No reset token provided.");
        return;
      }

      const { error: updateError } = await updatePassword(password, accessToken);

      if (updateError) {
        setError(updateError.message || "Failed to update password. Please try again.");
      } else {
        setSuccess(true);
        toast({
          title: "Success!",
          description: "Your password has been reset successfully.",
        });

        // Redirect to signin after 3 seconds
        setTimeout(() => {
          navigate("/signin", { state: { passwordReset: true } });
        }, 3000);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-md mx-auto py-12 px-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-earth-olive-dark">Set New Password</h1>
            <p className="text-earth-olive-dark/70 mt-2">
              Enter your new password to complete the reset process
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success ? (
            <Alert variant="default" className="mb-4 border-green-500 bg-green-50">
              <Check className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-700">
                Your password has been reset successfully. Redirecting to login...
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={!accessToken}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={!accessToken}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-earth-terracotta hover:bg-earth-terracotta-dark"
                disabled={isSubmitting || !accessToken}
              >
                {isSubmitting ? "Updating..." : "Reset Password"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
