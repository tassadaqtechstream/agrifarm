import { Col, Container, Row, Image } from "react-bootstrap";

// ✅ Import image from src/assets
import pricingImg from "../assets/pricing.png";

const Pricing = () => {
    return (
        <section className="our-solution-sec py-5">
            <Container>
                <Row className="align-items-center">
                    <Col md={8}>
                        <div className="text-justify text-holder mb-4">
                            <h2>Pricing</h2>
                            <p>
                                Both buyer and seller pay a small fee to Green Oasis AG MarketPlace once a transaction
                                is made. We price transparently and keep you updated through all steps of the process.
                                Our pricing is based on your transaction’s value & volume.
                            </p>
                        </div>
                    </Col>
                    <Col md={4} className="pricing-img">
                        <Image src={pricingImg} alt="Pricing" width={400} height={400} />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Pricing;
