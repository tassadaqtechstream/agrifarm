import { Button, Col, Container, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ConverterComponent = () => {
    const { t } = useTranslation();

    // Product options with their translation keys
    const productOptions = [
        { value: "almond", label: t("converter.products.almond") },
        { value: "hazelnut", label: t("converter.products.hazelnut") },
        { value: "triticale", label: t("converter.products.triticale") },
        { value: "barley", label: t("converter.products.barley") },
        { value: "rice", label: t("converter.products.rice") },
        { value: "wheat", label: t("converter.products.wheat") },
        { value: "cashew", label: t("converter.products.cashew") },
        { value: "peanut", label: t("converter.products.peanut") },
        { value: "specialtyCoffee", label: t("converter.products.specialtyCoffee") },
        { value: "walnut", label: t("converter.products.walnut") },
        { value: "oliveOil", label: t("converter.products.oliveOil") },
        { value: "cocoa", label: t("converter.products.cocoa") },
        { value: "coffee", label: t("converter.products.coffee") },
        { value: "pistachio", label: t("converter.products.pistachio") },
        { value: "pineNut", label: t("converter.products.pineNut") },
        { value: "refinedSunflowerOil", label: t("converter.products.refinedSunflowerOil") },
    ];

    // Unit options with their translation keys
    const unitOptions = [
        { value: "metricTon", label: t("converter.units.metricTon") },
        { value: "pound", label: t("converter.units.pound") },
        { value: "kilograms", label: t("converter.units.kilograms") },
    ];

    return (
        <>
            <section className="converter-section">
                <Container>
                    <div className="text-center text-holder mb-5">
                        <h2>
                            <span>{t("converter.title")}</span>
                        </h2>
                    </div>
                    <div className="calculator-container mx-auto w-100 ">
                        <div className="top-calculator">
                            <Row className="align-items-center">
                                <Col md={3}>
                                    <Form.Label className="text-uppercase text-center d-block mb-0">
                                        {t("converter.product")}
                                    </Form.Label>
                                </Col>
                                <Col md={9}>
                                    <Form.Select className="form-control" aria-label="Default select example">
                                        {productOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row className="align-items-center">
                                <Col md={3}>
                                    <Form.Label className="text-uppercase text-center d-block mb-0">
                                        {t("converter.pricePerUnit")}
                                    </Form.Label>
                                </Col>
                                <Col md={3}>
                                    <Form.Control type="number" />
                                </Col>

                                <Col md={2}>
                                    <Form.Label className="text-uppercase text-center d-block mb-0">
                                        {t("converter.currency")}
                                    </Form.Label>
                                </Col>

                                <Col md={2}>
                                    <label className="container-checkbox">
                                        {t("converter.euro")}
                                        <input name="radio" type="radio" defaultChecked={true} />
                                        <span className="checkmark"></span>
                                    </label>
                                </Col>
                                <Col md={2}>
                                    <label className="container-checkbox">
                                        {t("converter.usd")}
                                        <input name="radio" type="radio" />
                                        <span className="checkmark"></span>
                                    </label>
                                </Col>
                            </Row>

                            <Row className="align-items-center">
                                <Col md={3}>
                                    <Form.Label className="text-uppercase text-center d-block mb-0">
                                        {t("converter.quantity")}
                                    </Form.Label>
                                </Col>
                                <Col md={3}>
                                    <Form.Control type="number" />
                                </Col>

                                <Col md={2}>
                                    <Form.Label className="text-uppercase text-center d-block mb-0">
                                        {t("converter.unit")}
                                    </Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Select className="form-control" aria-label="Default select example">
                                        {unitOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>

                            <Row className="align-items-center">
                                <Col md={3}>
                                    <Form.Label className="text-uppercase text-center d-block mb-0">
                                        {t("converter.totalPrice")}
                                    </Form.Label>
                                </Col>
                                <Col md={9}>
                                    <Form.Control type="number" disabled />
                                </Col>
                            </Row>
                            <Row className="align-items-center">
                                <Col md={1}></Col>
                                <Col md={11}>
                                    <hr />
                                </Col>
                            </Row>
                        </div>

                        <div className="top-calculator mt-4">
                            <Row className="align-items-center">
                                <Col md={3}>
                                    <Form.Label className="text-uppercase text-center d-block mb-0">
                                        {t("converter.pricePerUnit")}
                                    </Form.Label>
                                </Col>
                                <Col md={3}>
                                    <Form.Control type="number" disabled />
                                </Col>

                                <Col md={2}>
                                    <Form.Label className="text-uppercase text-center d-block mb-0">
                                        {t("converter.currency")}
                                    </Form.Label>
                                </Col>

                                <Col md={2}>
                                    <label className="container-checkbox">
                                        {t("converter.euro")}
                                        <input name="radio" type="radio" defaultChecked={true} />
                                        <span className="checkmark"></span>
                                    </label>
                                </Col>
                                <Col md={2}>
                                    <label className="container-checkbox">
                                        {t("converter.usd")}
                                        <input name="radio" type="radio" />
                                        <span className="checkmark"></span>
                                    </label>
                                </Col>
                            </Row>

                            <Row className="align-items-center">
                                <Col md={3}>
                                    <Form.Label className="text-uppercase text-center d-block mb-0">
                                        {t("converter.quantity")}
                                    </Form.Label>
                                </Col>
                                <Col md={3}>
                                    <Form.Control type="number" disabled />
                                </Col>

                                <Col md={2}>
                                    <Form.Label className="text-uppercase text-center d-block mb-0">
                                        {t("converter.unit")}
                                    </Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Select className="form-control" aria-label="Default select example">
                                        {unitOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>

                            <Row className="align-items-center">
                                <Col md={3}>
                                    <Form.Label className="text-uppercase text-center d-block mb-0">
                                        {t("converter.totalPrice")}
                                    </Form.Label>
                                </Col>
                                <Col md={9}>
                                    <Form.Control type="number" disabled />
                                </Col>
                            </Row>
                        </div>

                        <Row>
                            <Col md={12} className="text-center mt-5">
                                <Button className="btn btn-primary outlinebtn px-5">{t("converter.convert")}</Button>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default ConverterComponent;
