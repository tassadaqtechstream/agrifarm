import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

// ✅ Import images from src/assets
import phoneIcon from "../assets/phone.svg";
import mailIcon from "../assets/mail.svg";
import fbIcon from "../assets/fb.png";
import instaIcon from "../assets/insta.png";
import linkIcon from "../assets/link.png";
import twitterIcon from "../assets/twi.png";
import youtubeIcon from "../assets/you.png";
import foodLogo from "../assets/food.png";
import prrLogo from "../assets/prr.png";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <Container>
                    <Row>
                        <Col xs={6} md={3} lg={3} className="footer-links">
                            <h4>Menu</h4>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/">Market</Link></li>
                                <li><Link to="/">Crop Converter</Link></li>
                            </ul>
                        </Col>
                        <Col xs={6} md={3} lg={3} className="footer-links">
                            <h4>About</h4>
                            <ul>
                                <li><Link to="/">Our Company</Link></li>
                                <li><Link to="/">Our People</Link></li>
                                <li><Link to="/">FAQ&apos;s</Link></li>
                            </ul>
                        </Col>
                        <Col xs={6} md={3} lg={3} className="footer-links">
                            <h4>Legal</h4>
                            <ul>
                                <li><Link to="/">Terms &amp; Conditions</Link></li>
                                <li><Link to="/">Privacy Policy</Link></li>
                                <li><Link to="/">Cookies Policy</Link></li>
                            </ul>
                        </Col>
                        <Col xs={6} md={3} lg={3} className="footer-contact footer-links">
                            <h4>Contact Us</h4>
                            <p>
                                <Image src={phoneIcon} alt="Phone icon" width={14} height={14} />
                                <Link className="strong" to="/">+351 964 300 963</Link>
                                <br />
                                <Image src={mailIcon} alt="Mail icon" width={14} height={12} />
                                <Link to="/"> info@agrimp.com </Link>
                            </p>
                            <div className="mt-3">
                                <Link to="/" target="_blank" className="facebook">
                                    <Image className="footer-image" src={fbIcon} alt="Facebook" width={20} height={20} />
                                </Link>
                                <Link to="/" target="_blank">
                                    <Image className="footer-image" src={instaIcon} alt="Instagram" width={20} height={20} />
                                </Link>
                                <Link to="/" target="_blank">
                                    <Image className="footer-image" src={linkIcon} alt="LinkedIn" width={20} height={20} />
                                </Link>
                                <Link to="/" target="_blank">
                                    <Image className="footer-image" src={twitterIcon} alt="Twitter" width={20} height={20} />
                                </Link>
                                <Link to="/" target="_blank">
                                    <Image className="footer-image" src={youtubeIcon} alt="YouTube" width={20} height={20} />
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="container footer-bottom clearfix">
                <Row>
                    <Col lg={4} md={12} className="center">
                        <Link target="_blank" to="/">
                            <Image className="footer-eit-food" src={foodLogo} alt="Eit food logo" width={100} height={50} />
                        </Link>
                    </Col>
                    <Col lg={4} md={12} className="center mt-4 mb-4">
                        <span className="text-secondary">©2025, Agri Marketplace - All rights Reserved</span>
                    </Col>
                    <Col lg={4} md={12} className="center">
                        Co-financed by: &nbsp;
                        <Link to="/">
                            <Image className="footer-cofinanced-bar" src={prrLogo} alt="Barra cofin feder24" width={100} height={50} />
                        </Link>
                    </Col>
                </Row>
            </div>
        </footer>
    );
}

export default Footer;
