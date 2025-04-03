import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import arrow from "./assets/arrow-left.png";
import DealsDeatils from "./Commodities/AllDeals/DealsDeatils";
const AllDeals = () => {
    return (
        <>
            <section className="filter-sec offer-sec">
                <Container>
                    <Link to="/filter" className="d-block bckbtn mb-5">
                        <Image className="icn-arrow--left d-inline" src={arrow} alt="Grey arrow down" />
                        <span className="d-inline ms-2">Back to Search Results</span>
                    </Link>
                    <DealsDeatils />
                </Container>
            </section>
        </>
    );
};

export default AllDeals;
