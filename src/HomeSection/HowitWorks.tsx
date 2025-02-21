import { Col, Container, Row } from 'react-bootstrap';

const HowitWorks = () => {
  return (
    <>
      <section className='our-solution-sec'>
        <Container>
          <Row className='align-items-center'>
            <Col md={6}>
              <div className="text-holder mb-4 text-start">
                <h2><span>How</span> it works</h2>
                <h5>Take a look at our <span>platform demo.</span></h5>
              </div>
              <ul className='solution-box-text'>
                <li>
                  <p>Sign-up to the platform</p>
                </li>
                <li>
                  <p>Create your offer or bid</p>
                </li>
                <li>
                  <p>Set a quantity & price</p>
                </li>
                <li>
                  <p>Provide us with crop characteristics & details</p>
                </li>
                <li>
                  <p>Decide upon your preferred incoterm</p>
                </li>
                <li>
                  <p>Decide upon logistic and/or crop quality check services</p>
                </li>
                <li>
                  <p>Post your seller offer or buyer bid</p>
                </li>
                <li>
                  <p>Stay updated by email or notification centre</p>
                </li>
              </ul>
            </Col>
            <Col md={6} id="video_div">
              <video
                playsInline
                autoPlay
                muted
                loop
                src="https://agrimp-prod.s3.amazonaws.com/public/AgriMarketPlace_howitworks_demo.mov">
              </video>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default HowitWorks;
