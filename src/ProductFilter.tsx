import { Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import arrow from "./assets/arrow-left.png";
import FilterSidebar from "./ProductFilter/FilterSidebar";
import OrderBoard from "./ProductFilter/OrderBoard";

const ProductFilter = () => {
    return (
        <>
            <section className="filter-sec">
                <Container>
                    <Link to="/commodities" className="d-block bckbtn mb-3">
                        <Image className="icn-arrow--left d-inline" src={arrow} alt="Grey arrow down" />
                        <span className="d-inline ms-2">Back to Products</span>
                    </Link>
                    <Row>
                        <Col md={3}>
                            <FilterSidebar />
                        </Col>

                        <Col md={9}>
                            <OrderBoard />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default ProductFilter;
