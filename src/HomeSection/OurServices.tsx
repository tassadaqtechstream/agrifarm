import { Container, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";

// ✅ Import the image from src/assets
import serviceImage from "../assets/service.png";

const OurServices = () => {
    const { t } = useTranslation();

    return (
        <section className="our-solution-sec">
            <Container>
                <div className="text-center text-holder mb-4">
                    <h2>
                        {t("components.ourServices.title")} <span>{t("components.ourServices.titleSpan")}</span>
                    </h2>
                    <p>{t("components.ourServices.description")}</p>
                </div>

                <div className="text-center OurServices-img">
                    <Image src={serviceImage} alt={t("components.ourServices.imageAlt")} width={200} height={200} />
                </div>
            </Container>
        </section>
    );
};

export default OurServices;
