import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import flag from "../assets/flag.svg";
import OfferCountdown from "./OfferCountdown";

const OrderBoard = () => {
    return (
        <>
            <div className="filter-sdiebar">
                <div className="mb-2 d-flex justify-content-between align-items-center">
                    <h3 className="text-uppercase font-weight-bold">Order Board</h3>

                    <Link to="/new-offer">
                        <Button
                            className="btn btn-header  ms-0 border-0 btn btn-primary"
                            style={{ height: "35px", backgroundColor: "#00a9dc" }}
                        >
                            Add new offer
                        </Button>
                    </Link>
                </div>
                <div className="filter-wrappper">
                    <div className="filter-board-header d-flex justify-content-between align-items-center">
                        <p className="mb-0">Results</p>

                        <div className="perpage-box d-flex align-items-center w-50 justify-content-end">
                            <span>Show</span>
                            <select className="form-control mx-2" style={{ width: "80px" }}>
                                <option value="">10</option>
                                <option value="">20</option>
                                <option value="">30</option>
                            </select>
                            <span>Lines Per Page</span>
                        </div>
                    </div>

                    <div className="row py-4">
                        <div className="col-md-2">
                            <label>
                                <span
                                    className="translation_missing"
                                    title="translation missing: en.products.filter.commodities"
                                >
                                    Commodities
                                </span>
                            </label>
                        </div>
                        <div className="col-md-10 d-flex p-0">
                            <div className="col-md-3">
                                <label>
                                    Bids by Buyers
                                    <span className="products-index__list-info">(Currency per weight unit)</span>
                                </label>
                            </div>
                            <div className="col-md-9">
                                <label>
                                    Offers by Sellers
                                    <span className="products-index__list-info">(Currency per weight unit)</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="row py-4">
                        <div className="col-md-3">
                            <label className="mb-4">
                                <span
                                    className="translation_missing "
                                    title="translation missing: en.products.filter.commodities"
                                >
                                    <b>Medium Grain, Seed, Arborío</b>
                                </span>
                            </label>
                            <Link to="/deals">
                                <Button className="btn btn-primary outlinebtn ">Show All Deals</Button>
                            </Link>
                        </div>
                        <div className="col-md-3">
                            <Link className="products-index__buy__col" to="/">
                                <div className="bid-sell-hover">
                                    <div>
                                        <p className="product-order__ppt_buy mb-0">€1.450</p>
                                        <p className="product-order__weight mb-0">1000.0 MT</p>
                                        <p className="product-order__incoterm_country mb-0">
                                            FCA UA
                                            <img
                                                className="bid_country_flag_image ms-2"
                                                width="18"
                                                src={flag}
                                                alt="Ua"
                                            />
                                        </p>
                                        <p className=" mb-0" style={{ textTransform: "uppercase" }}>
                                            <small>Verified seller</small>
                                        </p>
                                        <p className=" mb-0">Expires in</p>
                                        <OfferCountdown expirationDate="2025-03-18" />
                                        <p className=" mb-0">
                                            <i>Click for details</i>
                                        </p>
                                    </div>
                                    <p className="bid-sell-hover__info mb-0">
                                        <span className="info">Free Carrier Kyiv, Ukraine</span>
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-3">
                            <Link className="products-index__sell__col" to="/">
                                <div className="bid-sell-hover">
                                    <div>
                                        <p className="product-order__ppt_sell mb-0">€1.450</p>
                                        <p className="product-order__weight mb-0">1000.0 MT</p>
                                        <p className="product-order__incoterm_country mb-0">
                                            FCA UA
                                            <img
                                                className="bid_country_flag_image ms-2"
                                                width="18"
                                                src={flag}
                                                alt="Ua"
                                            />
                                        </p>
                                        <p className=" mb-0" style={{ textTransform: "uppercase" }}>
                                            <small>Verified seller</small>
                                        </p>
                                        <p className=" mb-0">Expires in</p>
                                        <OfferCountdown expirationDate="2025-03-18" />
                                        <p className=" mb-0">
                                            <i>Click for details</i>
                                        </p>
                                    </div>
                                    <p className="bid-sell-hover__info mb-0">
                                        <span className="info">Free Carrier Kyiv, Ukraine</span>
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderBoard;
