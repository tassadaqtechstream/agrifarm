import { Row, Col, Image } from "react-bootstrap";
import ricebanner from "../../assets/ricebanner.jpg";
import remove from "../../assets/bi.png";
const BidDeatils = () => {
    return (
        <>
            <div className="bid-wrapper">
                <div className="filter-wrappper">
                    <Row>
                        <Col>
                            <h2 className="mb-1">Rice</h2>
                            <div className="d-flex align-items-center mb-4">
                                <span className="me-3">ID: 2045</span>
                                <span className="me-3">Status: Published</span>
                                <span>Seller's rating</span>
                                <span className="ms-auto">
                                    <a href="#" className="text-decoration-none text-muted">
                                        <Image src={remove} /> Remove From List
                                    </a>
                                    <span className="ms-2">( Feedbacks )</span>
                                </span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <img
                                src={ricebanner}
                                alt="Rice"
                                className="img-fluid"
                                style={{ width: "100%", objectFit: "cover", height: "200px" }}
                            />
                        </Col>
                        <Col md={9}>
                            <Row className="g-4">
                                <Col md={6}>
                                    <Row className="mb-3">
                                        <Col>
                                            <div className="d-flex justify-content-between">
                                                <div className="fw-bold">Initial Delivery Date:</div>
                                                <div className="text-secondary">25/12/2024</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <div className="d-flex justify-content-between">
                                                <div className="fw-bold">Final Delivery Date:</div>
                                                <div className="text-secondary">21/03/2025</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <div className="d-flex justify-content-between">
                                                <div className="fw-bold">Lot Weight:</div>
                                                <div className="text-secondary">1000.0 Metric Tons</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <div className="d-flex justify-content-between">
                                                <div className="fw-bold">Price per Metric Ton:</div>
                                                <div className="text-secondary">€1.450,00</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="d-flex justify-content-between">
                                                <div className="fw-bold">Offer Expiration Date:</div>
                                                <div className="text-secondary">18/03/2025</div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={6}>
                                    <Row className="mb-3">
                                        <Col>
                                            <div className="d-flex justify-content-between">
                                                <div className="fw-bold">Logistics:</div>
                                                <div className="text-secondary">FCA - Free Carrier</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="d-flex justify-content-between">
                                                <div className="fw-bold">Location:</div>
                                                <div className="text-secondary">Kyiv, Ukraine</div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col>
                            <h3 className="mb-3">Product Details</h3>
                            <Row>
                                <Col md={6}>
                                    <Row className="mb-3">
                                        <Col>
                                            <div className="d-flex justify-content-between">
                                                <div className="fw-bold">Product Type:</div>
                                                <div className="text-secondary">Medium Grain</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <div className="d-flex justify-content-between">
                                                <div className="fw-bold">Variety:</div>
                                                <div className="text-secondary">Arborio</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <div className="d-flex justify-content-between">
                                                <div className="fw-bold">Milling Yield Whole Grains (Min.%):</div>
                                                <div className="text-secondary">0.0</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <div className="d-flex justify-content-between">
                                                <div className="fw-bold">Chalky Grains (Max.%):</div>
                                                <div className="text-secondary">0.0</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <div className="d-flex justify-content-between">
                                                <div className="fw-bold">Spotted and Stained Grains (Max.%):</div>
                                                <div className="text-secondary">0.0</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="d-flex justify-content-between">
                                                <div className="fw-bold">Yellow Grains (Max.%):</div>
                                                <div className="text-secondary">0.0</div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={6}>
                                    <Row className="mb-3">
                                        <Col>
                                            <div className="d-flex justify-content-between">
                                                <div className="fw-bold">Product Status:</div>
                                                <div className="text-secondary">Seed</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <div className="d-flex justify-content-between">
                                                <div className="fw-bold">Broken (Max.%):</div>
                                                <div className="text-secondary">0.0</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <div className="d-flex justify-content-between">
                                                <div className="fw-bold">Moisture (Max.%):</div>
                                                <div className="text-secondary">0.0</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <div className="d-flex justify-content-between">
                                                <div className="fw-bold">Red Grains (Max.%):</div>
                                                <div className="text-secondary">0.0</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <div className="d-flex justify-content-between">
                                                <div className="fw-bold">Amber Grains (Max.%):</div>
                                                <div className="text-secondary">-1.0</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="d-flex justify-content-between">
                                                <div className="fw-bold">Miscellaneous Impurities (Max.%):</div>
                                                <div className="text-secondary">0.0</div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row className="mt-4 align-items-end">
                        <Col>
                            <div className="d-flex align-items-center mb-3">
                                <h3 className="mb-0">Counter Offer</h3>
                            </div>
                            <Row className="g-3 align-items-end">
                                <Col md={4}>
                                    <div>
                                        <label className="mb-2">Price per Metric Ton:</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Current: 1450.0€ per MT"
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div>
                                        <label className="mb-2">Lot Weight (MT):</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Current: 1000.0 MT"
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <button className="btn btn-success px-4 mb-1">Send Counter Offer</button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col>
                            <h3 className="mb-3">Logistics</h3>
                            <Row className="g-3">
                                <Col md={12} className="mb-3">
                                    <label className="mb-2">Incoterm</label>
                                    <div className="position-relative">
                                        <select className="form-select">
                                            <option>FCA - Free Carrier</option>
                                        </select>
                                    </div>
                                    <div className="mt-2 text-secondary" style={{ fontSize: "0.875rem" }}>
                                        "Free Carrier" means that the seller delivers the goods to the carrier or
                                        another person nominated by the buyer at the seller's premises or another named
                                        place. The parties are well advised to specify as clearly as possible the point
                                        within the named place of delivery, as the risk passes to the buyer at that
                                        point.
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div>
                                        <label className="mb-2">Destination Address*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter destination address"
                                        />
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div>
                                        <label className="mb-2">Region of Destination*</label>
                                        <input type="text" className="form-control" placeholder="Enter region" />
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div>
                                        <label className="mb-2">Country of Destination*</label>
                                        <select className="form-select">
                                            <option>Select one</option>
                                        </select>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div>
                                        <label className="mb-2">Additional Comments</label>
                                        <textarea
                                            className="form-control"
                                            rows={4}
                                            placeholder="Enter any additional comments"
                                        ></textarea>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="terms" />
                                        <label className="form-check-label" htmlFor="terms">
                                            I agree with the{" "}
                                            <a href="#" className="text-success text-decoration-none">
                                                Agri Marketplace Terms and Conditions
                                            </a>{" "}
                                            for buy and sell offers
                                        </label>
                                    </div>
                                </Col>
                                <Col md={12} className="text-center">
                                    <button className="btn btn-success px-4">Show EUR/USD</button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col>
                            <h3 className="mb-3">Total</h3>
                            <Row className="g-3">
                                <Col md={12}>
                                    <div className="border-bottom pb-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="fw-bold">Final Payment (100%):</div>
                                            <div className="text-secondary">€1.450.000,00</div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="border-bottom pb-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="fw-bold">Subtotal:</div>
                                            <div className="text-secondary">€1.450.000,00</div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="border-bottom pb-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="text-warning">Total fees (1):</div>
                                            <div className="text-warning">€7.250,00 (0.5%)</div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="pb-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="fw-bold fs-5 text-success">Total:</div>
                                            <div className="fw-bold fs-5 text-success">€1.457.250,00</div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="text-secondary" style={{ fontSize: "0.875rem" }}>
                                        Currently, this transaction can only be paid in EUROS. The amount in USD
                                        corresponds to the EU Central Bank exchange rate at the day of today. More info
                                        in{" "}
                                        <a
                                            href="https://www.ecb.europa.eu/"
                                            className="text-success text-decoration-none"
                                        >
                                            https://www.ecb.europa.eu/
                                        </a>
                                    </div>
                                    <div className="text-secondary mt-2" style={{ fontSize: "0.875rem" }}>
                                        (1): Agri Marketplace fees
                                    </div>
                                    <div className="text-secondary mt-2" style={{ fontSize: "0.875rem" }}>
                                        (2): VAT at the legal rate
                                    </div>
                                    <div className="text-secondary mt-2" style={{ fontSize: "0.875rem" }}>
                                        (3): Includes the amounts paid for the product, taxes, services and fees when
                                        applicable
                                    </div>
                                </Col>
                                <Col md={12} className="text-end">
                                    <button className="btn btn-success btn-lg px-4">Buy Product</button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
};

export default BidDeatils;
