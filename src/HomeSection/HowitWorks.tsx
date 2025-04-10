import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const HowitWorks = () => {
    const { t } = useTranslation();

    return (
        <>
            <section className="our-solution-sec">
                <Container>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <div className="text-holder mb-4 text-start">
                                <h2>
                                    {t("components.howItWorks.title")}{" "}
                                    <span>{t("components.howItWorks.titleSpan")}</span>
                                </h2>
                                <h5>
                                    {t("components.howItWorks.subtitle")}{" "}
                                    <span>{t("components.howItWorks.subtitleSpan")}</span>
                                </h5>
                            </div>
                            <ul className="solution-box-text">
                                <li>
                                    <p>{t("components.howItWorks.steps.signup")}</p>
                                </li>
                                <li>
                                    <p>{t("components.howItWorks.steps.createOffer")}</p>
                                </li>
                                <li>
                                    <p>{t("components.howItWorks.steps.setQuantity")}</p>
                                </li>
                                <li>
                                    <p>{t("components.howItWorks.steps.provideDetails")}</p>
                                </li>
                                <li>
                                    <p>{t("components.howItWorks.steps.incoterm")}</p>
                                </li>
                                <li>
                                    <p>{t("components.howItWorks.steps.services")}</p>
                                </li>
                                <li>
                                    <p>{t("components.howItWorks.steps.post")}</p>
                                </li>
                                <li>
                                    <p>{t("components.howItWorks.steps.stayUpdated")}</p>
                                </li>
                            </ul>
                        </Col>
                        <Col md={6} id="video_div">
                            <video
                                playsInline
                                autoPlay
                                muted
                                loop
                                src="https://agrimp-prod.s3.amazonaws.com/public/AgriMarketPlace_howitworks_demo.mov"
                            ></video>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default HowitWorks;
