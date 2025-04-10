import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Button } from "react-bootstrap";

const TranslationTest: React.FC = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = async (lng: string) => {
        await i18n.changeLanguage(lng);
        document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = lng;
        window.location.reload();
    };

    return (
        <Container className="my-5 text-center">
            <h1>{t("home.welcome")}</h1>
            <p>{t("home.findProducts")}</p>

            <div className="mt-4">
                <Button variant="primary" className="mx-2" onClick={() => changeLanguage("en")}>
                    English
                </Button>
                <Button variant="primary" className="mx-2" onClick={() => changeLanguage("ar")}>
                    العربية
                </Button>
            </div>

            <div className="mt-4">
                <p>Current language: {i18n.language}</p>
                <p>Direction: {document.documentElement.dir}</p>
            </div>
        </Container>
    );
};

export default TranslationTest;
