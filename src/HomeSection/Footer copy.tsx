import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// ✅ Import images from src/assets
import phoneIcon from "../assets/phone.svg";
import mailIcon from "../assets/mail.svg";
import fbIcon from "../assets/fb.png";
import instaIcon from "../assets/insta.png";
import linkIcon from "../assets/link.png";
import twitterIcon from "../assets/twi.png";
import youtubeIcon from "../assets/you.png";

const Footer = () => {
    const { t } = useTranslation();

    const socialLinks = [
        { icon: fbIcon, alt: "Facebook", url: "https://facebook.com/agrimp" },
        { icon: instaIcon, alt: "Instagram", url: "https://instagram.com/agrimp" },
        { icon: linkIcon, alt: "LinkedIn", url: "https://linkedin.com/company/agrimp" },
        { icon: twitterIcon, alt: "Twitter", url: "https://twitter.com/agrimp" },
        { icon: youtubeIcon, alt: "YouTube", url: "https://youtube.com/agrimp" },
    ];

    return (
        <footer className="footer">
            <div className="footer-top">
                <Container>
                    <Row>
                        <Col xs={6} md={3} lg={3} className="footer-links">
                            <h4>{t("footer.menu.title")}</h4>
                            <ul>
                                <li>
                                    <Link to="/">{t("header.home")}</Link>
                                </li>
                                <li>
                                    <Link to="/market">{t("header.market")}</Link>
                                </li>
                                <li>
                                    <Link to="/tools">{t("header.cropConverter")}</Link>
                                </li>
                            </ul>
                        </Col>
                        <Col xs={6} md={3} lg={3} className="footer-links">
                            <h4>{t("footer.about.title")}</h4>
                            <ul>
                                <li>
                                    <Link to="/comapny">{t("header.ourCompany")}</Link>
                                </li>
                                <li>
                                    <Link to="/about">{t("header.ourPeople")}</Link>
                                </li>
                                <li>
                                    <Link to="/faq">{t("header.faq")}</Link>
                                </li>
                            </ul>
                        </Col>
                        <Col xs={6} md={3} lg={3} className="footer-links">
                            <h4>{t("footer.legal.title")}</h4>
                            <ul>
                                <li>
                                    <Link to="/terms">{t("footer.legal.terms")}</Link>
                                </li>
                                <li>
                                    <Link to="/privacy">{t("footer.legal.privacy")}</Link>
                                </li>
                                <li>
                                    <Link to="/cookies">{t("footer.legal.cookies")}</Link>
                                </li>
                            </ul>
                        </Col>
                        <Col xs={6} md={3} lg={3} className="footer-contact footer-links">
                            <h4>{t("footer.contact.title")}</h4>
                            <p>
                                <Image src={phoneIcon} alt={t("footer.contact.phone")} width={14} height={14} />
                                <Link className="strong" to="tel:+351964300963">
                                    +351 964 300 963
                                </Link>
                                <br />
                                <Image src={mailIcon} alt={t("footer.contact.email")} width={14} height={12} />
                                <Link to="mailto:info@agrimp.com"> info@agrimp.com </Link>
                            </p>
                            <div className="social-links">
                                {socialLinks.map((social, index) => (
                                    <Link key={index} to={social.url} target="_blank" rel="noopener noreferrer">
                                        <Image
                                            className="footer-image"
                                            src={social.icon}
                                            alt={social.alt}
                                            width={20}
                                            height={20}
                                        />
                                    </Link>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="container footer-bottom clearfix">
                <Row>
                    <Col lg={12} md={12} className="text-center mt-4 mb-4">
                        <span className="text-secondary">
                            {t("footer.copyright", { year: new Date().getFullYear() })}
                        </span>
                    </Col>
                </Row>
            </div>
        </footer>
    );
};

export default Footer;
