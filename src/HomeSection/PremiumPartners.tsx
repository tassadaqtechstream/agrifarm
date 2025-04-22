import { Link } from "react-router-dom";
import { Col, Container, Row, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";

// ✅ Import images from src/assets
import partner1 from "../assets/p-1.png";
import partner2 from "../assets/p-2.png";
import partner3 from "../assets/p-3.png";
import partner4 from "../assets/p-4.png";

const PremiumPartners = () => {
    const { t } = useTranslation();

    const partners = [
        {
            id: "sgs",
            image: partner1,
            alt: "Premium Partner SGS",
        },
        {
            id: "orey",
            image: partner2,
            alt: "Premium Partner Orey Shipping",
        },
        {
            id: "cca",
            image: partner3,
            alt: "Premium Partner CCA Law Firm",
            imgClass: "cca-logo",
        },
        {
            id: "mangopay",
            image: partner4,
            alt: "Premium Partner Mangopay",
        },
    ];

    const getTranslation = (key: string) => {
        try {
            const translation = t(key);
            return translation === key ? t(`${key}`) : translation;
        } catch (error) {
            console.error(`Translation error for key: ${key}`, error);
            return key.split(".").pop() || key;
        }
    };

    return (
        <section className="our-solution-sec bg-white">
            <Container>
                <div className="text-center text-holder mb-5">
                    <h2 className="mb-5">
                        <span>{getTranslation("components.premiumPartners.title")}</span>{" "}
                        {getTranslation("components.premiumPartners.titleSpan")}
                    </h2>
                </div>
                <Row className="py-5">
                    {partners.map((partner) => (
                        <Col md={3} key={partner.id}>
                            <Link to="/" className="text-center d-block premium-partner-card">
                                <Image
                                    src={partner.image}
                                    className={`premium-img ${partner.imgClass || ""}`}
                                    alt={getTranslation(`components.premiumPartners.partners.${partner.id}.name`)}
                                    width={200}
                                    height={200}
                                />
                                <p>{getTranslation(`components.premiumPartners.partners.${partner.id}.name`)}</p>
                                <h6>{getTranslation(`components.premiumPartners.partners.${partner.id}.service`)}</h6>
                                <p>{getTranslation(`components.premiumPartners.partners.${partner.id}.type`)}</p>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default PremiumPartners;
