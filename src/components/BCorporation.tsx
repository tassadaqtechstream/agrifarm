import { Container, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import biCrop from "../assets/b-crop-img.png";

const BCorporation = () => {
    const { t } = useTranslation();

    return (
        <section>
            <Container>
                <h2 className="display-4 mb-4 text-center">{t("components.bcorporation.title")}</h2>
                <h3 className="h4 mb-4 text-center">{t("components.bcorporation.description")}</h3>
                <div className="row align-items-center">
                    <div className="col-md-2">
                        <Image src={biCrop} alt={t("components.bcorporation.title")} className="img-fluid bicrop" />
                    </div>
                    <div className="col-md-10">
                        <p className="lead text-left">{t("components.bcorporation.description")}</p>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default BCorporation;
