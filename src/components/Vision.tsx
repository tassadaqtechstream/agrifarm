import { Container } from "react-bootstrap";

const Vision = () => {
    return (
        <section className="text-center  our-solution-sec mt-3 pb-0">
            <Container>
                <h2 className="display-4 mb-4">
                    OUR <span className="text-success">VISION</span>
                </h2>
                <p className="lead mb-0">
                    Agri Marketplace's vision is to become the largest agricultural fair-trade platform, <br></br>{" "}
                    connecting farmers to industrial all around the world.
                </p>
            </Container>
        </section>
    );
};

export default Vision;
