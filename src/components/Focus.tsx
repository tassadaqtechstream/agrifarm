import { Container, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import servicediagram from "../assets/service-diagram.png";

const Focus = () => {
    const { t } = useTranslation();

    return (
        <section className="text-center">
            <Container>
                <h2 className="display-4 mb-4">{t("components.focus.title")}</h2>
                <p className="lead mb-5">{t("components.focus.description")}</p>
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <Image src={servicediagram} alt={t("components.focus.title")} className="img-fluid" />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Focus;
