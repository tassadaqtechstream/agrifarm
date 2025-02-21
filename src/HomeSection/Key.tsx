import { Col, Container, Row, Image } from "react-bootstrap";

// ✅ Import images from src/assets
import baseImg from "../assets/base.png";
import key1Img from "../assets/key-1.png";
import key2Img from "../assets/key-2.png";
import key3Img from "../assets/key-3.png";
import key4Img from "../assets/key-4.png";

const Key = () => {
    return (
        <section className="our-solution-sec bg-white text-center">
            <Container className="px-5">
                <div className="text-center text-holder mb-4">
                    <h2>KEY <span>FEATURES</span></h2>
                    <p className="text-center">
                        Discover how Agri Marketplace can benefit you and all other food supply chain actors.
                    </p>
                </div>
                <Row className="text-center features-row">
                    <Col md={3} className="col__adv">
                        <div className="container--img">
                            <Image className="img--base" src={baseImg} alt="Oval" width={100} height={100} />
                            <Image className="img--top" src={key1Img} alt="Transparency" width={100} height={100} />
                        </div>
                        <p className="container-features__subtitle">Transparency</p>
                        <p className="container-features__text">Direct transactions between farmers and industry/retail</p>
                    </Col>
                    <Col md={3} className="col__adv">
                        <div className="container--img">
                            <Image className="img--base" src={baseImg} alt="Oval" width={100} height={100} />
                            <Image className="img--top" src={key2Img} alt="Fairtrade" width={100} height={100} />
                        </div>
                        <p className="container-features__subtitle">Fairtrade</p>
                        <p className="container-features__text">Redistribution of value in food supply chain</p>
                    </Col>
                    <Col md={3} className="col__adv">
                        <div className="container--img">
                            <Image className="img--base" src={baseImg} alt="Oval" width={100} height={100} />
                            <Image className="img--top" src={key3Img} alt="User Friendly" width={100} height={100} />
                        </div>
                        <p className="container-features__subtitle">User Friendly</p>
                        <p className="container-features__text">Reduce costs to buyers without losing reliability</p>
                    </Col>
                    <Col md={3} className="col__adv">
                        <div className="container--img">
                            <Image className="img--base" src={baseImg} alt="Oval" width={100} height={100} />
                            <Image className="img--top" src={key4Img} alt="Food Traceability" width={100} height={100} />
                        </div>
                        <p className="container-features__subtitle">Food Traceability</p>
                        <p className="container-features__text">Crop reliability through supply chain traceability<br />(coming soon)</p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Key;
