import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

// ✅ Import images from src/assets
import fbIcon from "../assets/fb.png";
import instaIcon from "../assets/insta.png";
import linkIcon from "../assets/link.png";
import twitterIcon from "../assets/twi.png";
import youtubeIcon from "../assets/you.png";

import grains1 from "../assets/grans-1.png";
import grains2 from "../assets/grans-2.png";
import grains3 from "../assets/grans-3.png";
import grains4 from "../assets/grans-4.png";

const Hero = () => {
    return (
        <section className="hero-section text-white p-0">
            <Container>
                <Row>
                    <Col md={8}>
                        <div className="hero-content-left">
                            <h1>
                                Empowering businesses and customers to source fresh, high-quality produce directly from
                                farmers. Our integrated ERP-powered marketplace ensures transparency, efficiency, and
                                sustainability in every transaction. “The Future of Agri-Commerce , Green Oasis AG
                                MarketPlace"
                            </h1>
                            <h2 className="text-white my-5">
                                Seamless Farm-to-Market Access – Farmers list their produce effortlessly while
                                businesses source high-quality agri-products with real-time data.
                            </h2>
                            <div className="hero-footer d-flex align-items-center justify-content-between pe-4">
                                <Link to="/signup" className="btn btn-header btn-white">
                                    Join Now
                                </Link>
                                <ul className="d-flex m-0 p-0">
                                    <li className="ms-2">
                                        <Link to="/">
                                            <Image src={fbIcon} width={40} height={40} alt="Facebook" />
                                        </Link>
                                    </li>
                                    <li className="ms-2">
                                        <Link to="/">
                                            <Image src={instaIcon} width={40} height={40} alt="Instagram" />
                                        </Link>
                                    </li>
                                    <li className="ms-2">
                                        <Link to="/">
                                            <Image src={linkIcon} width={40} height={40} alt="LinkedIn" />
                                        </Link>
                                    </li>
                                    <li className="ms-2">
                                        <Link to="/">
                                            <Image src={twitterIcon} width={40} height={40} alt="Twitter" />
                                        </Link>
                                    </li>
                                    <li className="ms-2">
                                        <Link to="/">
                                            <Image src={youtubeIcon} width={40} height={40} alt="YouTube" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Col>

                    <Col md={4} className="hero-content-right">
                        <div className="hero-content-right-inner text-center text-uppercase">
                            <h3>Select a product to buy/sell</h3>
                            <div className="product-card">
                                <Link to="/commodities" className="product-card-link">
                                    <div className="circle-white">
                                        <Image
                                            className="product__img"
                                            src={grains1}
                                            alt="Grains"
                                            width={74}
                                            height={74}
                                        />
                                    </div>
                                    <p>Grains</p>
                                </Link>
                                <Link to="/commodities" className="product-card-link">
                                    <div className="circle-white">
                                        <Image
                                            className="product__img"
                                            src={grains2}
                                            alt="Nuts"
                                            width={74}
                                            height={74}
                                        />
                                    </div>
                                    <p>Nuts</p>
                                </Link>
                                <Link to="/commodities" className="product-card-link">
                                    <div className="circle-white">
                                        <Image
                                            className="product__img"
                                            src={grains3}
                                            alt="Green Coffee"
                                            width={74}
                                            height={74}
                                        />
                                    </div>
                                    <p>Green Coffee</p>
                                </Link>
                                <Link to="/commodities" className="product-card-link">
                                    <div className="circle-white">
                                        <Image
                                            className="product__img"
                                            src={grains4}
                                            alt="Olive Oil & Other Oils"
                                            width={74}
                                            height={74}
                                        />
                                    </div>
                                    <p>Olive Oil & Other Oils</p>
                                </Link>
                            </div>

                            <div style={{ marginTop: "40px" }}>
                                <h6 className="mb-3">Can&apos;t find the Product you are looking for?</h6>
                                <Button className="btn btn-header btn-white px-5">Talk to us</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Hero;
