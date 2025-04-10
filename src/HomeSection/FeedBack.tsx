import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FeddbackSlider from "./FeddbackSlider";

const FeedBack = () => {
    const { t } = useTranslation();

    return (
        <>
            <section className="our-solution-sec bg-white text-left">
                <Container className="px-5">
                    <div className="text-center text-holder mb-4">
                        <h2>
                            {t("components.feedback.title")} <span>{t("components.feedback.titleSpan")}</span>
                        </h2>
                        <p className="text-center">{t("components.feedback.description")}</p>
                    </div>
                    <FeddbackSlider />
                </Container>
            </section>
        </>
    );
};

export default FeedBack;
