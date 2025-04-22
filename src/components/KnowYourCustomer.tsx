import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const KnowYourCustomer = () => {
    const { t } = useTranslation();

    return (
        <section className="our-solution-sec">
            <Container>
                <h2 className="display-4 text-center mb-4">{t("components.knowYourCustomer.title")}</h2>
                <p className="lead text-center mb-5">{t("components.knowYourCustomer.description")}</p>

                <div className="row">
                    <div className="col-md-6">
                        <h3 className="text-success mb-2">{t("components.knowYourCustomer.sellersTitle")}</h3>
                        <p>{t("components.knowYourCustomer.sellersDescription")}</p>
                    </div>
                    <div className="col-md-6">
                        <h3 className="text-success mb-2">{t("components.knowYourCustomer.buyersTitle")}</h3>
                        <p>{t("components.knowYourCustomer.buyersDescription")}</p>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default KnowYourCustomer;
