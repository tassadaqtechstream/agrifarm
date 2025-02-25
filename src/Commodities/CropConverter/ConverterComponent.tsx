import { Button, Col, Container, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";

const ConverterComponent = () => {
    return (
        <>
            <section className="converter-section">
                <Container>
                    <div className="text-center text-holder mb-5">
                        <h2>
                            <span>Crop Converter</span>
                        </h2>
                    </div>
                    <div className="calculator-container mx-auto w-100 ">
                        <div className="top-calculator">
                            <Row className="align-items-center">
                                <Col md={3}>
                                    <Form.Label className="text-uppercase text-center d-block mb-0">Product</Form.Label>
                                </Col>
                                <Col md={9}>
                                    <Form.Select className="form-control" aria-label="Default select example">
                                        <option>Almond</option>
                                        <option>Hazelnut</option>
                                        <option>Triticale</option>
                                        <option>Barley</option>
                                        <option>Rice</option>
                                        <option>Wheat</option>
                                        <option>Cashew</option>
                                        <option>Peanut</option>
                                        <option>Specialty Coffee</option>
                                        <option>Walnut</option>
                                        <option>Olive Oil</option>
                                        <option>Cocoa</option>
                                        <option>Coffee</option>
                                        <option>Pistachio</option>
                                        <option>Pine Nut</option>
                                        <option>Refined Sunflower Oil</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row className="align-items-center">
                                <Col md={3}>
                                    <Form.Label className="text-uppercase text-center d-block mb-0">
                                        Price / Unit
                                    </Form.Label>
                                </Col>
                                <Col md={3}>
                                    <Form.Control type="number" />
                                </Col>

                                <Col md={2}>
                                    <Form.Label className="text-uppercase text-center d-block mb-0">
                                        Currency
                                    </Form.Label>
                                </Col>

                                <Col md={2}>
                                    <label className="container-checkbox">
                                        Euro
                                        <input name="radio" type="radio" defaultChecked={true} />
                                        <span className="checkmark"></span>
                                    </label>
                                </Col>
                                <Col md={2}>
                                    <label className="container-checkbox">
                                        USD
                                        <input name="radio" type="radio" />
                                        <span className="checkmark"></span>
                                    </label>
                                </Col>
                            </Row>

                            <Row className="align-items-center">
                                <Col md={3}>
                                    <Form.Label className="text-uppercase text-center d-block mb-0">
                                        Quantity
                                    </Form.Label>
                                </Col>
                                <Col md={3}>
                                    <Form.Control type="number" />
                                </Col>

                                <Col md={2}>
                                    <Form.Label className="text-uppercase text-center d-block mb-0">Unit</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Select className="form-control" aria-label="Default select example">
                                        <option>Metric Ton</option>
                                        <option>Pound</option>
                                        <option>Kilograms</option>
                                    </Form.Select>
                                </Col>
                            </Row>

                            <Row className="align-items-center">
                                <Col md={3}>
                                    <Form.Label className="text-uppercase text-center d-block mb-0">
                                        Total Price
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
                                        Price / Unit
                                    </Form.Label>
                                </Col>
                                <Col md={3}>
                                    <Form.Control type="number" disabled />
                                </Col>

                                <Col md={2}>
                                    <Form.Label className="text-uppercase text-center d-block mb-0">
                                        Currency
                                    </Form.Label>
                                </Col>

                                <Col md={2}>
                                    <label className="container-checkbox">
                                        Euro
                                        <input name="radio" type="radio" defaultChecked={true} />
                                        <span className="checkmark"></span>
                                    </label>
                                </Col>
                                <Col md={2}>
                                    <label className="container-checkbox">
                                        USD
                                        <input name="radio" type="radio" />
                                        <span className="checkmark"></span>
                                    </label>
                                </Col>
                            </Row>

                            <Row className="align-items-center">
                                <Col md={3}>
                                    <Form.Label className="text-uppercase text-center d-block mb-0">
                                        Quantity
                                    </Form.Label>
                                </Col>
                                <Col md={3}>
                                    <Form.Control type="number" disabled />
                                </Col>

                                <Col md={2}>
                                    <Form.Label className="text-uppercase text-center d-block mb-0">Unit</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Select className="form-control" aria-label="Default select example">
                                        <option>Metric Ton</option>
                                        <option>Pound</option>
                                        <option>Kilograms</option>
                                    </Form.Select>
                                </Col>
                            </Row>

                            <Row className="align-items-center">
                                <Col md={3}>
                                    <Form.Label className="text-uppercase text-center d-block mb-0">
                                        Total Price
                                    </Form.Label>
                                </Col>
                                <Col md={9}>
                                    <Form.Control type="number" disabled />
                                </Col>
                            </Row>
                        </div>

                        <Row>
                            <Col md={12} className="text-center mt-5">
                                <Button className="btn btn-primary outlinebtn px-5">Convert</Button>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default ConverterComponent;
