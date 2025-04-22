import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";

// ✅ Import images from src/assets
import feedback1 from "../assets/f-1.jpg";
import feedback2 from "../assets/f-2.jpg";

const FeddbackSlider = () => {
    const { t } = useTranslation();

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

    const testimonials = [
        {
            id: "testimonial1",
            image: feedback1,
            alt: "Logo coopenoix",
        },
        {
            id: "testimonial2",
            image: feedback2,
            alt: "Logo coopenoix",
        },
    ];

    return (
        <Slider {...settings}>
            {testimonials.map((testimonial) => (
                <div key={testimonial.id}>
                    <div className="testimonial-wrap">
                        <div className="testimonial-item">
                            <Image
                                width={200}
                                height={200}
                                className="testimonial-img"
                                src={testimonial.image}
                                alt={testimonial.alt}
                            />
                            <h3>{t(`components.feedback.testimonials.${testimonial.id}.name`)}</h3>
                            <h4>{t(`components.feedback.testimonials.${testimonial.id}.position`)}</h4>
                            <p>
                                <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                                {t(`components.feedback.testimonials.${testimonial.id}.text`)}
                                <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default FeddbackSlider;
