
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const EmailVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();
  
  const email = location.state?.email || "";
  
  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter the complete verification code");
      return;
    }
    
    setIsVerifying(true);
    setError(null);
    
    try {
      const { error } = await verifyEmail(email, otp);
      
      if (error) {
        setError(error.message || "Failed to verify email. Please try again.");
      } else {
        toast({
          title: "Success!",
          description: "Your email has been verified. You can now sign in.",
        });
        navigate("/signin", { 
          state: { 
            verified: true,
            email
          } 
        });
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    // This would typically call a function to resend the verification code
    toast({
      title: "Verification code sent",
      description: "A new verification code has been sent to your email.",
    });
  };

  return (
    <div className="container max-w-md mx-auto py-12 px-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-earth-olive-dark">Verify Your Email</h1>
            <p className="text-earth-olive-dark/70 mt-2">
              We've sent a verification code to{" "}
              <span className="font-medium">{email}</span>
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Enter verification code</Label>
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              type="button"
              className="w-full bg-earth-terracotta hover:bg-earth-terracotta-dark"
              onClick={handleVerify}
              disabled={isVerifying}
            >
              {isVerifying ? "Verifying..." : "Verify Email"}
            </Button>

            <div className="text-center">
              <Button 
                variant="link" 
                className="text-earth-terracotta hover:text-earth-terracotta-dark"
                onClick={handleResendCode}
              >
                Didn't receive a code? Resend
              </Button>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="text-center">
            <p className="text-earth-olive-dark/70">
              Already verified?{" "}
              <Link to="/signin" className="text-earth-terracotta hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerificationPage;
