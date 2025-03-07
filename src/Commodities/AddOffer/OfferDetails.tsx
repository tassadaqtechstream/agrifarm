import { Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput";

const OfferDetails = () => {
    return (
        <>
            <div className="filter-sdiebar">
                <h3 className="text-uppercase font-weight-bold mb-3">New Offer</h3>

                {/* Product Section */}
                <div className="offer-container">
                    <h5 className="text-uppercase mb-3">PRODUCT</h5>
                    <Row>
                        <Col md={3}>
                            <FormInput label="Product" type="select" options={[{ value: "rice", label: "Rice" }]} />
                        </Col>
                        <Col md={3}>
                            <FormInput label="Type of Offer" type="select" required />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <FormInput label="Total Weight" type="text" required />
                        </Col>
                        <Col md={3}>
                            <FormInput
                                label="Weight Unit"
                                type="select"
                                options={[{ value: "metric_ton", label: "Metric Ton (M Ton)" }]}
                            />
                        </Col>
                        <Col md={3}>
                            <FormInput label="Price per weight unit (€)" type="text" required />
                        </Col>
                        <Col md={3}>
                            <FormInput
                                label="Advanced payment (%)"
                                type="select"
                                options={[{ value: "0", label: "0 (%)" }]}
                            />
                        </Col>
                    </Row>
                </div>

                {/* Product Details Section */}
                <div className="offer-container">
                    <h5 className="text-uppercase mb-3">PRODUCT DETAILS</h5>
                    <Row>
                        <Col md={4}>
                            <FormInput label="Product Type" type="select" required />
                        </Col>
                        <Col md={4}>
                            <FormInput label="Product Status" type="select" required />
                        </Col>
                        <Col md={4}>
                            <FormInput label="Variety" type="select" required />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <FormInput label="Production Mode" type="select" />
                        </Col>
                        <Col md={4}>
                            <FormInput label="Crop Year" type="text" />
                        </Col>
                        <Col md={4}>
                            <FormInput label="Broken (Max. %)" type="text" required />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <FormInput label="Milling Yield Whole Grains (Min. %)" type="text" />
                        </Col>
                        <Col md={4}>
                            <FormInput label="Moisture (Max. %)" type="text" />
                        </Col>
                        <Col md={4}>
                            <FormInput label="Chalky Grains (Max. %)" type="text" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <FormInput label="Red Grains (Max. %)" type="text" />
                        </Col>
                        <Col md={4}>
                            <FormInput label="Spotted and Stained Grains (Max. %)" type="text" />
                        </Col>
                        <Col md={4}>
                            <FormInput label="Amber Grains (Max. %)" type="text" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <FormInput label="Yellow Grains (Max. %)" type="text" />
                        </Col>
                        <Col md={4}>
                            <FormInput label="Miscellaneous Impurities (Max. %)" type="text" />
                        </Col>
                        <Col md={4}>
                            <FormInput label="Parboiled Colour-Kett whiteness meter (16-31)" type="text" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <FormInput label="Packaging for Shipment" type="select" />
                        </Col>
                    </Row>
                </div>

                {/* Logistics Section */}
                <div className="offer-container">
                    <h5 className="text-uppercase mb-3">LOGISTICS</h5>
                    <Row className="align-items-center">
                        <Col md={3}>
                            <FormInput label="Initial Delivery Date" type="date" required />
                        </Col>
                        <Col md={3}>
                            <FormInput label="Final Delivery Date" type="date" required />
                        </Col>
                        <Col md={3}>
                            <FormInput label="Offer Expiration Date" type="date" required />
                        </Col>
                        <Col md={3} className="d-flex align-items-center">
                            <Form.Check
                                type="checkbox"
                                id="immediate-delivery"
                                label="Immediate delivery"
                                className="ms-3 mt-3"
                            />
                        </Col>
                    </Row>
                    <Row className="align-items-center">
                        <Col md={3}>
                            <FormInput label="Logistics Incoterms" type="select" />
                        </Col>
                    </Row>
                </div>

                {/* Additional Comments Section */}
                <div className="offer-container">
                    <Form.Group className="mb-3">
                        <Form.Label>Additional Comments</Form.Label>
                        <Form.Control as="textarea" className="textarea-box" cols={10} rows={5} />
                    </Form.Group>
                </div>

                {/* Terms and Conditions */}
                <div className="offer-container d-flex justify-content-between align-items-center">
                    <Form.Check
                        type="checkbox"
                        id="terms-conditions"
                        label={
                            <>
                                I agree with the{" "}
                                <Link to="/" className="text-success">
                                    Agri Marketplace Terms and Conditions
                                </Link>{" "}
                                for buy and sell offers
                            </>
                        }
                    />
                    {/* Submit Button */}
                    <div className="text-end">
                        <Button className="btn border-0 btn-header w-100">Submit Offer</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OfferDetails;
