import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import arrow from "./assets/arrow-left.png";
import BidDeatils from "./Commodities/Bid/BidDeatils";
const Bidpage = () => {
    return (
        <>
            <section className="filter-sec offer-sec">
                <Container>
                    <Link to="/filter" className="d-block bckbtn mb-5">
                        <Image className="icn-arrow--left d-inline" src={arrow} alt="Grey arrow down" />
                        <span className="d-inline ms-2">Return to order board</span>
                    </Link>
                    <BidDeatils />
                </Container>
            </section>
        </>
    );
};

export default Bidpage;
