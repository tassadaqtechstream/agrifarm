import { Button, Container, Form, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png";

const Login = () => {
    return (
        <>
            <section className="login-section p-0 calculator-container mw-100 vh-100">
                <Container className="login-container">
                    <div className="login-sessionlogo text-center">
                        <Link to="/">
                            <Image src={logoImg} alt="logo" width={120} height={120} />
                        </Link>
                    </div>

                    <Form className="login-sessionform ">
                        <h2 className="text-uppercase mb-2 text-center">Login</h2>
                        <Form.Group className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" />
                        </Form.Group>
                        <Button type="submit" className="btn btn-header w-100 ms-0">
                            Login
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
