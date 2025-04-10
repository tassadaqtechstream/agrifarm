import { Container } from "react-bootstrap";
import CommoditiesTabs from "./CommoditiesTabs";
import { useTranslation } from "react-i18next";

const CommoditiesBanner = () => {
    const { t } = useTranslation();

    return (
        <>
            <section className="commodities-section">
                <Container>
                    <h2 className="text-center text-white text-uppercase">{t("home.hero.selectProduct")}</h2>
                    <CommoditiesTabs />
                </Container>
            </section>
        </>
    );
};

export default CommoditiesBanner;
