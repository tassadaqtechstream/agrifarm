import { useState, FormEvent, ChangeEvent } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../utility/Apis";

const ForgetPassword = () => {
    const [email, setEmail] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            await authAPI.forgotPassword(email);
            setSuccess("Password reset instructions have been sent to your email.");
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (err) {
            console.error("Forgot password error:", err);
            setError("Failed to send reset instructions. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="container max-w-md mx-auto py-12 px-4">
            <div className="bg-white rounded-xl shadow-sm p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-earth-olive-dark mb-2">Forgot your password?</h1>
                    <p className="text-earth-olive-dark/70">
                        Enter your email address and we'll send you instructions to reset your password.
                    </p>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Form.Label className="text-sm font-medium">Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 w-full bg-earth-terracotta hover:bg-earth-terracotta-dark"
                        disabled={isLoading}
                    >
                        {isLoading ? "Sending..." : "Send me reset password instructions"}
                    </button>
                </Form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-earth-olive-dark/70">
                        Remember your password?{" "}
                        <Link to="/login" className="text-earth-terracotta hover:underline font-medium">
                            Log in
                        </Link>
                    </p>
                    <p className="text-sm text-earth-olive-dark/70 mt-2">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-earth-terracotta hover:underline font-medium">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default ForgetPassword;
