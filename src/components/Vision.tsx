import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Vision = () => {
    const { t } = useTranslation();

    return (
        <section className="text-center our-solution-sec mt-3 pb-0">
            <Container>
                <h2 className="display-4 mb-4">{t("components.vision.title")}</h2>
                <p className="lead mb-0">{t("components.vision.description")}</p>
            </Container>
        </section>
    );
};

export default Vision;
