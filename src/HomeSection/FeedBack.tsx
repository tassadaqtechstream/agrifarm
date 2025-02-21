
import { Container } from 'react-bootstrap';
import FeddbackSlider from './FeddbackSlider';


const FeedBack = () => {
    return (
        <>
            <section className='our-solution-sec bg-white text-left'>
                <Container className='px-5'>
                    <div className="text-center text-holder mb-4">
                        <h2>What <span>People Say</span></h2>
                        <p className='text-center'>
                            Discover how Agri Marketplace can benefit you and all other food supply chain actors.
                        </p>
                    </div>
                    <FeddbackSlider />
                </Container>
            </section>
        </>
    );
}

export default FeedBack;
