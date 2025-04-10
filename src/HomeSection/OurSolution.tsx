import solutionImage from "../assets/our-solution.png";
import { Link } from "react-router-dom";
import { Col, Container, Row, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const OurSolution = () => {
    const { t } = useTranslation();

    return (
        <>
            <section className="our-solution-sec">
                <Container>
                    <div className="text-center text-holder mb-4">
                        <h2>
                            {t("components.ourSolution.title")} <span>{t("components.ourSolution.titleSpan")}</span>
                        </h2>
                        <p>{t("components.ourSolution.description")}</p>
                    </div>

                    <Row className="mb-4">
                        <Col md={6}>
                            <div className="solution-box-img">
                                <Image
                                    src={solutionImage}
                                    alt={t("components.ourSolution.imageAlt")}
                                    width={200}
                                    height={200}
                                />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="solution-box-text">
                                <p>{t("components.ourSolution.mainText")}</p>
                                <p>
                                    <b>{t("components.ourSolution.notice")}</b>
                                </p>
                                <Row>
                                    <Col md={6}>
                                        <Link to="/commodities" className="btn btn-primary outlinebtn w-100">
                                            {t("components.ourSolution.exploreMarketplace")}
                                        </Link>
                                    </Col>
                                    <Col md={6}>
                                        <Link to="/" className="btn btn-primary outlinebtn w-100">
                                            {t("components.ourSolution.learnMore")}
                                        </Link>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    <Row>
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
                            <h5>{t("components.ourSolution.features.marketOpportunities.title")}</h5>
                            <p>{t("components.ourSolution.features.marketOpportunities.description")}</p>
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
                            <h5>{t("components.ourSolution.features.globalMarket.title")}</h5>
                            <p>{t("components.ourSolution.features.globalMarket.description")}</p>
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
                            <h5>{t("components.ourSolution.features.transparency.title")}</h5>
                            <p>{t("components.ourSolution.features.transparency.description")}</p>
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
                                <rect x="9" y="10" width="6" height="4" rx="1" />
                            </svg>
                            <h5>{t("components.ourSolution.features.securePayments.title")}</h5>
                            <p>{t("components.ourSolution.features.securePayments.description")}</p>
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
                                <path d="M6 15L10 12L14 15L18 12" />
                                <path d="M12 8V12" />
                                <rect x="9" y="10" width="6" height="4" rx="1" />
                            </svg>
                            <h5>{t("components.ourSolution.features.qualityLogistics.title")}</h5>
                            <p>{t("components.ourSolution.features.qualityLogistics.description")}</p>
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
                                <path d="M6 8H18V16H6Z" />
                                <path d="M9 10H15V14H9Z" />
                            </svg>
                            <h5>{t("components.ourSolution.features.verifiedUsers.title")}</h5>
                            <p>{t("components.ourSolution.features.verifiedUsers.description")}</p>
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
                                <path d="M12 8V12" />
                                <path d="M9 12H15" />
                                <path d="M8 16H16" />
                            </svg>
                            <h5>{t("components.ourSolution.features.customerSupport.title")}</h5>
                            <p>{t("components.ourSolution.features.customerSupport.description")}</p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default OurSolution;
