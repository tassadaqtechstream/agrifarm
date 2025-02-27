import { Container } from "react-bootstrap";
import SignUpHeader from "./SignUpHeader";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
    return (
        <Container className="user-registration calculator-container mw-100">
            <SignUpHeader />
            <SignUpForm />
        </Container>
    );
};

export default SignUp;
