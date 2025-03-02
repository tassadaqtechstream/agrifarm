import solutionImage from "../assets/our-solution.png";

import { Link } from "react-router-dom";
import { Col, Container, Row, Image } from "react-bootstrap";

const OurSolution = () => {
    return (
        <>
            <section className="our-solution-sec">
                <Container>
                    <div className="text-center text-holder mb-4">
                        <h2>
                            Our <span>solution</span>
                        </h2>
                        <p>
                            Green Oasis AG MarketPlace is a digital B2B market solution that brings together Farmers and
                            Industrial Buyers.
                        </p>
                    </div>

                    <Row className="mb-4">
                        <Col md={6}>
                            <div className="solution-box-img">
                                <Image src={solutionImage} alt="solution" width={200} height={200} />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="solution-box-text">
                                <p>
                                    We drive agricultural transactions through our digital platform in combination with
                                    our service partnership network. Green Oasis AG MarketPlace accommodates online
                                    payments between buyer and seller, product quality check options, and end-to-end
                                    logistic services.
                                </p>
                                <p>
                                    <b>
                                        Green Oasis AG MarketPlace does not buy or sell crops and is not a broker.
                                        Instead, we offer you the ability to effortlessly market your crop via our
                                        platform.
                                    </b>
                                </p>
                                <Row>
                                    <Col md={6}>
                                        <Link to="/commodities" className="btn btn-primary outlinebtn w-100">
                                            Explore the marketplace
                                        </Link>
                                    </Col>
                                    <Col md={6}>
                                        <Link to="/" className="btn btn-primary outlinebtn w-100">
                                            Learn more about us
                                        </Link>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    <Row className="mt-5 quailty-section">
                        <Col md={4} className="text-center mt-5">
                            <svg
                                className="mb-2"
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#4caf50"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3 11L12 2L21 11" />
                                <path d="M5 10V21H19V10" />
                                <path d="M9 21V13H15V21" />
                            </svg>
                            <h5>Market Opportunities</h5>
                            <p>
                                A user-friendly platform that generates market opportunity for farmers and industry
                                buyers.
                            </p>
                        </Col>

                        <Col md={4} className="text-center mt-5">
                            <svg
                                className="mb-2"
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#4caf50"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M8 12L12 16L16 12" />
                                <path d="M12 16V8" />
                            </svg>
                            <h5>Global Market Access</h5>
                            <p>Unlimited access to a global market from anywhere, at any time.</p>
                        </Col>

                        <Col md={4} className="text-center mt-5">
                            <svg
                                className="mb-2"
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#4caf50"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M6 10H18" />
                                <path d="M6 14H18" />
                                <path d="M10 18H14" />
                            </svg>
                            <h5>Transparency & Reliability</h5>
                            <p>Transparent and reliable market information, deal creation, and negotiation.</p>
                        </Col>

                        <Col md={3} className="text-center mt-5">
                            <svg
                                className="mb-2"
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#4caf50"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M8 12L12 16L16 12" />
                                <path d="M12 16V8" />
                                <rect x="9" y="10" width="6" height="4" rx="1" />
                            </svg>
                            <h5>Secure Payments</h5>
                            <p>Integrated and secure platform payment processes.</p>
                        </Col>

                        <Col md={3} className="text-center mt-5">
                            <svg
                                className="mb-2"
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#4caf50"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M6 15L10 12L14 15L18 12" />
                                <path d="M12 8V12" />
                                <rect x="9" y="10" width="6" height="4" rx="1" />
                            </svg>
                            <h5>Quality & Logistics</h5>
                            <p>Tailored product quality verification and logistic services.</p>
                        </Col>

                        <Col md={3} className="text-center mt-5">
                            <svg
                                className="mb-2"
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#4caf50"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M8 12L12 16L16 12" />
                                <path d="M6 8H18V16H6Z" />
                                <path d="M9 10H15V14H9Z" />
                            </svg>
                            <h5>Verified Buyers & Sellers</h5>
                            <p>A market with only verified buyers and sellers.</p>
                        </Col>

                        <Col md={3} className="text-center mt-5">
                            <svg
                                className="mb-2"
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#4caf50"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 8V12" />
                                <path d="M9 12H15" />
                                <path d="M8 16H16" />
                            </svg>
                            <h5>Customer Support</h5>
                            <p>Customer support & insight.</p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default OurSolution;
