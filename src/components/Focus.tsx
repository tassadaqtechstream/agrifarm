import { Container, Image } from "react-bootstrap";
import servicediagram from "../assets/service-diagram.png";

const Focus = () => {
    return (
        <section className="text-center ">
            <Container>
                <h2 className="display-4 mb-4">
                    OUR <span className="text-success">FOCUS & EXPERIENCE</span>
                </h2>
                <p className="lead mb-5">
                    Agri Marketplace is a group of experts who leverage their knowledge & experience in Farming,
                    Industry Procurement, Digital Business, and Disruptive Innovation at all times. We aim at
                    redistributing value through the agriculture supply chain, to do so requires us to be agile,
                    reliable and transparent. We promote these values throughout all of our actions, operations and
                    services.
                </p>
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <Image src={servicediagram} alt="Services Diagram" className="img-fluid" />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Focus;
