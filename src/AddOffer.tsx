import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import arrow from "./assets/arrow-left.png";
import OfferDetails from "./Commodities/AddOffer/OfferDetails";

const AddOffer = () => {
    return (
        <>
            <section className="filter-sec offer-sec">
                <Container>
                    <Link to="/commodities" className="d-block bckbtn mb-3">
                        <Image className="icn-arrow--left d-inline" src={arrow} alt="Grey arrow down" />
                        <span className="d-inline ms-2">Back to the order board</span>
                    </Link>
                    <OfferDetails />
                </Container>
            </section>
        </>
    );
};

export default AddOffer;
