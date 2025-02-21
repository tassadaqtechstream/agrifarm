import {Link} from "react-router-dom"
import { Col, Container, Row } from 'react-bootstrap';

const Get = () => {
    return (
        <>
            <section className='our-solution-sec bg-white text-center'>
                <Container className='px-5'>
                    <div className="text-center text-holder mb-4">
                        <h2>Get Started
                        </h2>
                        <p className='text-justify'>
                        We open the door to thousands of approved buyers and sellers. Post your crop bid as a registered buyer, or create your crop offer as a platform verified seller. Through our rigorous customer compliance we make sure that only reliable users gain access to our digital marketplace. There are two ways to get started:
                        </p>
                    </div>
                    <Row>
                        <Col md={6} >
                        <div className="solution-box-text text-start ps-0">
                              <h6 className='mb-3'>Post offer as a seller
                              </h6>
                                <p className='mb-5'>As a seller, post offers for the agricultural crop you are looking to sell, and gain immediate access to credit-verified buyers. Or simply react to an existing buyer’s bid and start your transaction.

</p>
                                <Row>
                                    <Col md={6}>
                                        <Link to="/" className='btn btn-primary outlinebtn w-100'>Register as a seller</Link>
                                    </Col>
                                    <Col md={6}>
                                        <Link to="/" className='btn btn-primary outlinebtn w-100'>Selling offer video</Link>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col md={6} >
                        <div className="solution-box-text text-start ps-0">
                              <h6 className='mb-3'>Post bid as a buyer

                              </h6>
                                <p className='mb-5'>As a buyer, post bids for the agricultural crop you are looking to buy. Communicate to the market what you are looking for, and get rapid reactions from interested farmers or sellers.


</p>
                                <Row>
                                    <Col md={6}>
                                        <Link to="/" className='btn btn-primary outlinebtn w-100'>Register as a buyer</Link>
                                    </Col>
                                    <Col md={6}>
                                        <Link to="/" className='btn btn-primary outlinebtn w-100'>Buying bid video</Link>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
 

                    </Row>
                   
                </Container>
            </section>
        </>
    );
}

export default Get;
