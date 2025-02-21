import { Container, Image } from "react-bootstrap";

// ✅ Import the image from src/assets
import serviceImage from "../assets/service.png";

const OurServices = () => {
    return (
        <section className="our-solution-sec">
            <Container>
                <div className="text-center text-holder mb-4">
                    <h2>Our <span>Services</span></h2>
                    <p>
                        Agri marketplace provides all of the following services through internal operations
                        in combination with our specialized partnership network.
                    </p>
                </div>

                <div className="text-center OurServices-img">
                    <Image src={serviceImage} alt="solution" width={200} height={200} />
                </div>
            </Container>
        </section>
    );
}

export default OurServices;
