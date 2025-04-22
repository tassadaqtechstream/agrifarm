import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Services: React.FC = () => {
    const { t } = useTranslation();

    const services = [
        {
            title: t("home.services.farmers.title"),
            description: t("home.services.farmers.description"),
            icon: "🌾",
        },
        {
            title: t("home.services.businesses.title"),
            description: t("home.services.businesses.description"),
            icon: "🏢",
        },
        {
            title: t("home.services.quality.title"),
            description: t("home.services.quality.description"),
            icon: "✅",
        },
        {
            title: t("home.services.transparency.title"),
            description: t("home.services.transparency.description"),
            icon: "📊",
        },
    ];

    return (
        <section className="services-section py-5">
            <Container>
                <h2 className="text-center mb-5">{t("home.services.title")}</h2>
                <Row>
                    {services.map((service, index) => (
                        <Col md={3} key={index}>
                            <Card className="service-card h-100">
                                <Card.Body>
                                    <div className="service-icon">{service.icon}</div>
                                    <Card.Title>{service.title}</Card.Title>
                                    <Card.Text>{service.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default Services;
