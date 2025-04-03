import { Container, Row, Col } from "react-bootstrap";
import Team from "./components/Team";
import team from "./assets/team-1.jpg";
import team2 from "./assets/team-2.jpg";

const teamMembers = [
    {
        image: team,
        name: "TIAGO PESSOA",
        position: "CO-FOUNDER",
    },
    {
        image: team2,
        name: "FILIPE NÚNCIO",
        position: "CO-FOUNDER & CEO",
    },
    {
        image: team,
        name: "LUÍS ALBERTO SILVA",
        position: "CO-FOUNDER & CFO",
    },
    {
        image: team2,
        name: "JOSÉ EDUARDO MAGALHÃES",
        position: "CO-FOUNDER",
    },
];

const OurPeople = () => {
    return (
        <>
            <section className="our-solution-sec">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="section-title">TEAM</h2>
                        <p className="section-description">
                            Essa é nossa equipa que diariamente trabalha para ligar os agricultores à agro-industria.
                        </p>
                        <p className="section-description">
                            A nossa proximidade onde a transação tem total transparência e permite a que ambas as partes
                            acedam a um mercado muito mais vasto a custo zero.
                        </p>
                    </div>

                    <Row className="g-4">
                        {teamMembers.map((member, index) => (
                            <Col key={index} lg={3} md={6}>
                                <Team image={member.image} name={member.name} position={member.position} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default OurPeople;
