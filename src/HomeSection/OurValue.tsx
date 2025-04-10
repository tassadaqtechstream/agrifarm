import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const OurValue = () => {
    const { t } = useTranslation();

    return (
        <>
            <section className="our-solution-sec bg-white text-center">
                <Container>
                    <div className="text-center text-holder mb-4">
                        <h2>
                            {t("components.ourValue.title")} <span>{t("components.ourValue.titleSpan")}</span>
                        </h2>
                        <p>{t("components.ourValue.description")}</p>
                    </div>
                    <div className="video-wrapper">
                        <video
                            className="container-value"
                            width="80%"
                            playsInline
                            autoPlay
                            muted
                            loop
                            src="https://agrimp-prod.s3.amazonaws.com/public/OVP_Video.mp4"
                        ></video>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default OurValue;
