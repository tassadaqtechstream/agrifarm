import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Get = () => {
    const { t } = useTranslation();

    return (
        <>
            <section className="our-solution-sec bg-white text-center">
                <Container className="px-5">
                    <div className="text-center text-holder mb-4">
                        <h2>{t("components.get.title")}</h2>
                        <p className="text-justify">{t("components.get.description")}</p>
                    </div>
                    <Row>
                        <Col md={6}>
                            <div className="solution-box-text text-start ps-0">
                                <h6 className="mb-3">{t("components.get.seller.title")}</h6>
                                <p className="mb-5">{t("components.get.seller.description")}</p>
                                <Row>
                                    <Col md={6}>
                                        <Link to="/signup" className="btn btn-primary outlinebtn w-100">
                                            {t("components.get.seller.button")}
                                        </Link>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="solution-box-text text-start ps-0">
                                <h6 className="mb-3">{t("components.get.buyer.title")}</h6>
                                <p className="mb-5">{t("components.get.buyer.description")}</p>
                                <Row>
                                    <Col md={6}>
                                        <Link to="/signup" className="btn btn-primary outlinebtn w-100">
                                            {t("components.get.buyer.button")}
                                        </Link>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Get;
