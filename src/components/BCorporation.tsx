import { Container, Image } from "react-bootstrap";
import biCrop from "../assets/b-crop-img.png";

const BCorporation = () => {
    return (
        <section>
            <Container>
                <h2 className="display-4 mb-4 text-center">
                    CERTIFIED <span className="text-success">B CORPORATION</span>
                </h2>
                <h3 className="h4 mb-4 text-center">AGRI MARKETPLACE IS PART OF A GLOBAL COMMUNITY OF LEADERS</h3>
                <div className="row  align-items-center">
                    <div className="col-md-2">
                        <Image src={biCrop} alt="Services Diagram" className="img-fluid bicrop" />
                    </div>
                    <div className="col-md-10">
                        <p className="lead text-left">
                            The B Corporations are a new kind of business that balances purpose and profit. They are
                            legally required to consider the impact of their decisions on their workers, customers,
                            suppliers, community, and the environment. This is a community of leaders, driving a global
                            movement of people using business as a force for good.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default BCorporation;
