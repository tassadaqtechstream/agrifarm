import { Container } from 'react-bootstrap';

const OurValue = () => {
    return (
        <>
            <section className='our-solution-sec bg-white text-center'>
                <Container>
                    <div className="text-center text-holder mb-4">
                        <h2>Our <span>value</span> proposition</h2>
                        <p>
                            Agri Marketplace accommodates direct transactions between buyers and sellers. 
                            All intermediate supply chain stages are covered by Agri MP and our partnership network. 
                            See our premium partners for more information.
                        </p>
                    </div>
                    <div className='video-wrapper'>
                        <video 
                            className='container-value' 
                            width="80%" 
                            playsInline 
                            autoPlay 
                            muted 
                            loop 
                            src="https://agrimp-prod.s3.amazonaws.com/public/OVP_Video.mp4">
                        </video>
                    </div>
                </Container>
            </section>
        </>
    );
}

export default OurValue;
