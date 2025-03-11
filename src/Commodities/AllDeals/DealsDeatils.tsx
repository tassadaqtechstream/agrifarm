import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import rice from "../../assets/ricebanner.jpg";

const DealsDeatils = () => {
    return (
        <>
            <div className="filter-sdiebar mt-3">
                <div className="mb-3 d-flex justify-content-between align-items-center">
                    <h3 className="text-uppercase font-weight-bold">
                        All Deals <small style={{ opacity: "0.8", fontSize: "70%" }}>Medium Grain, Seed, Arborío</small>
                    </h3>

                    <Link to="/new-offer">
                        <Button
                            className="btn btn-header  ms-0 border-0 btn btn-primary"
                            style={{ height: "35px", backgroundColor: "#00a9dc", minWidth: "auto" }}
                        >
                            Add new offer
                        </Button>
                    </Link>
                </div>

                <div className="filter-wrappper deals-wrapper">
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/">
                                <h2 className="text-warning mb-4">Sell</h2>
                                <div className="deal-card p-4 bg-white rounded shadow-sm">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <Image
                                                src={rice}
                                                alt="Rice Background"
                                                className="img-fluid rounded mb-3"
                                                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                                            />
                                        </div>
                                        <div className="col-md-9">
                                            <div className="d-flex justify-content-between align-items-start mb-4">
                                                <div>
                                                    <h3 className="mb-0">
                                                        Total: <span className="text-success">€1.450.000,00</span>
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <div className="text-muted font-weight-bold">Lot Weight:</div>
                                                        <div>1000.0 Ton</div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="text-muted font-weight-bold">
                                                            Price per weight unit:
                                                        </div>
                                                        <div>€1.450,00</div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="text-muted font-weight-bold">Logistics:</div>
                                                        <div>FCA - Free Carrier</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <div className="text-muted font-weight-bold">
                                                            Initial Delivery Date:
                                                        </div>
                                                        <div>25 Dec 2024</div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="text-muted font-weight-bold">
                                                            Final Delivery Date:
                                                        </div>
                                                        <div>21 Mar 2025</div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="text-muted font-weight-bold">
                                                            Offer Expiration Date:
                                                        </div>
                                                        <div>18 Mar 2025</div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="text-muted font-weight-bold">Location:</div>
                                                        <div>Kyiv, Ukraine</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="col-md-6">
                            <Link to="/">
                                <h2 className="text-primary mb-4">Buy</h2>
                                <div className="deal-card p-4 bg-white rounded shadow-sm">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <Image
                                                src={rice}
                                                alt="Rice Background"
                                                className="img-fluid rounded mb-3"
                                                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                                            />
                                        </div>
                                        <div className="col-md-9">
                                            <div className="d-flex justify-content-between align-items-start mb-4">
                                                <div>
                                                    <h3 className="mb-0">
                                                        Total: <span className="text-success">€1.450.000,00</span>
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <div className="text-muted font-weight-bold">Lot Weight:</div>
                                                        <div>1000.0 Ton</div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="text-muted font-weight-bold">
                                                            Price per weight unit:
                                                        </div>
                                                        <div>€1.450,00</div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="text-muted font-weight-bold">Logistics:</div>
                                                        <div>FCA - Free Carrier</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <div className="text-muted font-weight-bold">
                                                            Initial Delivery Date:
                                                        </div>
                                                        <div>25 Dec 2024</div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="text-muted font-weight-bold">
                                                            Final Delivery Date:
                                                        </div>
                                                        <div>21 Mar 2025</div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="text-muted font-weight-bold">
                                                            Offer Expiration Date:
                                                        </div>
                                                        <div>18 Mar 2025</div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="text-muted font-weight-bold">Location:</div>
                                                        <div>Kyiv, Ukraine</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DealsDeatils;
