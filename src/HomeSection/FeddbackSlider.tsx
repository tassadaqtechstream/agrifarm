import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "react-bootstrap";

// ✅ Import images from src/assets
import feedback1 from "../assets/f-1.jpg";
import feedback2 from "../assets/f-2.jpg";

const FeddbackSlider = () => {
    const settings = {
        rtl: false,
        speed: 1000,
        arrows: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        loop: true,
        autoplay: true,
        autoplaySpeed: 3000, // Adjust autoplay speed (3 seconds)
    };

    return (
        <Slider {...settings}>
            <div>
                <div className="testimonial-wrap">
                    <div className="testimonial-item">
                        <Image
                            width={200}
                            height={200}
                            className="testimonial-img"
                            src={feedback1}
                            alt="Logo coopenoix"
                        />
                        <h3>Christine Bonnet</h3>
                        <h4>Commercial Attaché | Coopenoix</h4>
                        <p>
                            <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                            Practical to use and very clear platform with a sober but
                            effective design. I recommend.
                            <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <div className="testimonial-wrap">
                    <div className="testimonial-item">
                        <Image
                            width={200}
                            height={200}
                            className="testimonial-img"
                            src={feedback2}
                            alt="Logo coopenoix"
                        />
                        <h3>Christine Bonnet</h3>
                        <h4>Commercial Attaché | Coopenoix</h4>
                        <p>
                            <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                            Practical to use and very clear platform with a sober but
                            effective design. I recommend.
                            <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                        </p>
                    </div>
                </div>
            </div>
        </Slider>
    );
};

export default FeddbackSlider;
