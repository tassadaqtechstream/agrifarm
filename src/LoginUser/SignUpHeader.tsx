import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignUpHeader = () => {
    return (
        <Row>
            <Col md={12} className="user-registration__header">
                <h2 className="text-uppercase mb-3">Sign Up</h2>
                <p>
                    If you are already registered
                    <Link className="link-green ms-1" to="/login">
                        Login here
                    </Link>
                    . Otherwise, tell us more about you! Your sign up information will help us provide a great
                    experience. For sellers, additional information will be needed to receive funds.
                </p>
            </Col>
        </Row>
    );
};

export default SignUpHeader;
