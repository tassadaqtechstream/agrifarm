import { Col, Container, Row, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";

// ✅ Import images from src/assets
import baseImg from "../assets/base.png";
import key1Img from "../assets/key-1.png";
import key2Img from "../assets/key-2.png";
import key3Img from "../assets/key-3.png";
import key4Img from "../assets/key-4.png";

const Key = () => {
    const { t } = useTranslation();

    const features = [
        {
            id: "transparency",
            image: key1Img,
            alt: "Transparency",
        },
        {
            id: "fairTrade",
            image: key2Img,
            alt: "Fairtrade",
        },
        {
            id: "userFriendly",
            image: key3Img,
            alt: "User Friendly",
        },
        {
            id: "foodTraceability",
            image: key4Img,
            alt: "Food Traceability",
        },
    ];

    return (
        <section className="our-solution-sec bg-white text-center">
            <Container className="px-5">
                <div className="text-center text-holder mb-4">
                    <h2>
                        {t("components.key.title")} <span>{t("components.key.titleSpan")}</span>
                    </h2>
                    <p className="text-center">{t("components.key.description")}</p>
                </div>
                <Row className="features-row">
                    {features.map((feature) => (
                        <Col md={3} className="col__adv" key={feature.id}>
                            <div className="container--img">
                                <Image className="img--base" src={baseImg} alt="Oval" width={100} height={100} />
                                <Image
                                    className="img--top"
                                    src={feature.image}
                                    alt={feature.alt}
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <p className="container-features__subtitle">
                                {t(`components.key.features.${feature.id}.title`)}
                            </p>
                            <p className="container-features__text">
                                {t(`components.key.features.${feature.id}.description`)}
                            </p>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default Key;
