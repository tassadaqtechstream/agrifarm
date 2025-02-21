import { Link } from "react-router-dom";
import { Col, Container, Row, Image } from "react-bootstrap";

// ✅ Import images from src/assets
import partner1 from "../assets/p-1.png";
import partner2 from "../assets/p-2.png";
import partner3 from "../assets/p-3.png";
import partner4 from "../assets/p-4.png";

const PremiumPartners = () => {
    return (
        <section className="our-solution-sec bg-white">
            <Container>
                <div className="text-center text-holder mb-5">
                    <h2 className="mb-5"> <span>Premium</span> Partners</h2>
                </div>
                <Row className="py-5">
                    <Col md={3}>
                        <Link to="/" className="text-center d-block premium-partner-card">
                            <Image src={partner1} className="premium-img" alt="Premium Partner SGS" width={200} height={200} />
                            <p>SGS</p>
                            <h6>Quality Certification</h6>
                            <p>Premium Partner</p>
                        </Link>
                    </Col>
                    <Col md={3}>
                        <Link to="/" className="text-center d-block premium-partner-card">
                            <Image src={partner2} className="premium-img" alt="Premium Partner Orey Shipping" width={200} height={200} />
                            <p>Orey Shipping</p>
                            <h6>Logistics & Transportation</h6>
                            <p>Premium Partner</p>
                        </Link>
                    </Col>
                    <Col md={3}>
                        <Link to="/" className="text-center d-block premium-partner-card">
                            <Image src={partner3} className="premium-img cca-logo" alt="Premium Partner CCA Law Firm" width={200} height={200} />
                            <p>CCA Law Firm</p>
                            <h6>Legal Services</h6>
                            <p>Premium Partner</p>
                        </Link>
                    </Col>
                    <Col md={3}>
                        <Link to="/" className="text-center d-block premium-partner-card">
                            <Image src={partner4} className="premium-img" alt="Premium Partner Mangopay" width={200} height={200} />
                            <p>Mangopay</p>
                            <h6>Payments</h6>
                            <p>Premium Partner</p>
                        </Link>
                    </Col>
                </Row>
                <div className="text-center">
                    <Link to="/" className="btn btn-primary outlinebtn mt-5">Become a partner</Link>
                </div>
            </Container>
        </section>
    );
}

export default PremiumPartners;
