import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Mission = () => {
    const { t } = useTranslation();

    return (
        <section className="text-center  our-solution-sec">
            <Container>
                <h2 className="display-4 mb-4">{t("components.mission.title")}</h2>
                <p className="lead">{t("components.mission.description")}</p>
            </Container>
        </section>
    );
};

export default Mission;
