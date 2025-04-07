import React, { useState, FormEvent, ChangeEvent } from "react";
import { Button, Container, Form, Image, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../assets/logo.png";
import { useAuth } from "../context/AuthProvider";

interface FormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            // Use the login function from AuthContext
            const result = await login(formData.email, formData.password);

            if (result.success) {
                // Redirect to home page on successful login
                navigate("/");
            } else {
                setError(result.error || "Login failed");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <section className="login-section p-0 calculator-container mw-100 vh-100">
                <Container className="login-container">
                    <div className="login-sessionlogo text-center">
                        <Link to="/">
                            <Image src={logoImg} alt="logo" width={120} height={120} />
                        </Link>
                    </div>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form className="login-sessionform" onSubmit={handleSubmit}>
                        <h2 className="text-uppercase mb-2 text-center">Login</h2>
                        <Form.Group className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button
                            type="submit"
                            className="btn btn-header w-100 ms-0"
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </Form>
                    <div className="login-sessionlinks text-center">
                        <Link to="/forget">Forgot your password?</Link>
                        <br />

                        <Link to="/signup">Not registered yet? Sign up</Link>
                        <br />

                        <Link to="/confirmation">Didn't receive confirmation instructions?</Link>
                        <br />
                    </div>
                </Container>
            </section>
        </>
    );
};

export default Login;