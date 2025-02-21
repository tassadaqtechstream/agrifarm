import { Col, Row, Container, Image } from "react-bootstrap";

// ✅ Import images from src/assets
import aw1 from "../assets/aw-1.jpg";
import aw2 from "../assets/aw-2.jpg";
import aw3 from "../assets/aw-3.jpg";
import aw4 from "../assets/aw-4.jpg";
import aw5 from "../assets/aw-5.jpg";
import aw6 from "../assets/aw-6.jpg";

// ✅ Updated award data with imported images
const awards = [
  { title: "Web Summit 2016", description: "Alpha Startup Exhibitor", imgSrc: aw1 },
  { title: "Web Summit 2017", description: "Beta Startup Exhibitor", imgSrc: aw2 },
  { title: "Green Tech Challenge Lisbon 2017", description: "1 out of 17 startups selected", imgSrc: aw3 },
  { title: "Agri Innovation Summit Challenge Lisbon 2017", description: "Startup Exhibitor", imgSrc: aw4 },
  { title: "European Food Venture Forum 2017 at Aarhus", description: "Top 2017 Presenting Startup (1 out of 30)", imgSrc: aw5 },
  { title: "CropUp Accelerator Program 2017/2018", description: "Acceleration Program", imgSrc: aw6 },
  { title: "Web Summit 2016", description: "Alpha Startup Exhibitor", imgSrc: aw1 },
  { title: "Web Summit 2017", description: "Beta Startup Exhibitor", imgSrc: aw2 },
  { title: "Green Tech Challenge Lisbon 2017", description: "1 out of 17 startups selected", imgSrc: aw3 },
  { title: "Agri Innovation Summit Challenge Lisbon 2017", description: "Startup Exhibitor", imgSrc: aw4 },
  { title: "European Food Venture Forum 2017 at Aarhus", description: "Top 2017 Presenting Startup (1 out of 30)", imgSrc: aw5 },
  { title: "CropUp Accelerator Program 2017/2018", description: "Acceleration Program", imgSrc: aw6 },
  { title: "Agri Innovation Summit Challenge Lisbon 2017", description: "Startup Exhibitor", imgSrc: aw4 },
  { title: "European Food Venture Forum 2017 at Aarhus", description: "Top 2017 Presenting Startup (1 out of 30)", imgSrc: aw5 },
  { title: "CropUp Accelerator Program 2017/2018", description: "Acceleration Program", imgSrc: aw6 },
];

const Award = () => {
  return (
      <section className="our-solution-sec text-center container-awards">
        <Container className="px-5">
          <div className="text-center text-holder mb-4">
            <h2>Awards</h2>
          </div>
          <Row>
            {awards.map((award, index) => (
                <Col key={index} lg="2" md="3" className="card col-6 text-center">
                  <div className="card-body d-flex align-items-center" style={{ minHeight: "110px" }}>
                    <Image src={award.imgSrc} alt={award.title} width={100} height={100} className="img-fluid img__awards" />
                  </div>
                  <h6 className="text-success mt-3">{award.title}</h6>
                  <p className="card-text mb-3">{award.description}</p>
                </Col>
            ))}
          </Row>
        </Container>
      </section>
  );
};

export default Award;
