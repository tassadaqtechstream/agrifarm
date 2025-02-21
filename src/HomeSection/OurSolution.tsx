import solutionImage from '../assets/our-solution.png';


import {Link} from "react-router-dom"
import { Col, Container, Row,Image } from 'react-bootstrap';

const OurSolution = () => {
    return (
        <>
            <section className='our-solution-sec'>
                <Container>
                    <div className="text-center text-holder mb-4">
                        <h2>Our <span>solution</span></h2>
                        <p>Agri Marketplace is a digital B2B market solution that brings together Farmers and Industrial Buyers.</p>
                    </div>

                    <Row className='mb-4'>
                        <Col md={6}>
                            <div className="solution-box-img">
                                <Image src={solutionImage} alt="solution" width={200} height={200} />

                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="solution-box-text">
                                <p>We drive agricultural transactions through our digital platform in combination with our service partnership network. Agri Marketplace accommodates online payments between buyer and seller, product quality check options, and end-to-end logistic services.</p>
                                <p><b>Agri Marketplace does not buy or sell crops and is not a broker. Instead, we offer you the ability to effortlessly market your crop via our platform.</b></p>
                                <Row>
                                    <Col md={6}>
                                        <Link to="/" className='btn btn-primary outlinebtn w-100'>Explore the marketplace</Link>
                                    </Col>
                                    <Col md={6}>
                                        <Link to="/" className='btn btn-primary outlinebtn w-100'>Learn more about us</Link>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <ul className='solution-box-text'>
                                <li>
                                    <p>A user-friendly platform that generates market opportunity for farmers and industry buyers.</p>
                                </li>
                                <li>
                                    <p>Unlimited access to a global market from anywhere, at anytime.</p>
                                </li>
                                <li>
                                    <p>Transparent and reliable market information, deal creation and negotiation.</p>
                                </li>
                                <li>
                                    <p>Integrated and secure platform payment processes.</p>
                                </li>
                                <li>
                                    <p>Tailored product quality verification and logistic services.</p>
                                </li>
                                <li>
                                    <p>A market with only verified buyers and sellers.</p>
                                </li>
                                <li>
                                    <p>Customer support & insight.</p>
                                </li>
                            </ul>
                        </Col>
                        <Col md={6}>
                            <div className="solution-box-video ms-auto">
                                <iframe className="resp-iframe" src="https://www.youtube.com/embed/FAvIa27RcyU?rel=0" frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default OurSolution;
