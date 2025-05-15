import { Link, useNavigate } from "react-router-dom";
import { Container, Dropdown, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useAuth } from "@contexts/AuthContext.tsx";
import { useTranslation } from "react-i18next";

// Import images from src/assets
import englishFlag from "../assets/english.svg";
import arabicFlag from "../assets/english.svg";
import userIcon from "../assets/user-i.png";
import mail from "../assets/mail.png";
import logout from "../assets/logout.ico";

export default function TopHeader() {
    const { t, i18n } = useTranslation();
    const languages = [
        { name: "English", code: "en", flag: englishFlag },
        { name: "العربية", code: "ar", flag: arabicFlag },
    ];

    const [language, setLanguage] = useState(languages[0]);

    // Use the auth contexts instead of local state
    const { isAuthenticated, logout: handleLogout } = useAuth();
    const navigate = useNavigate();

    // Handle language change
    const handleLanguageChange = async (selectedLang: (typeof languages)[0]) => {
        try {
            setLanguage(selectedLang);
            await i18n.changeLanguage(selectedLang.code);
            document.documentElement.dir = selectedLang.code === "ar" ? "rtl" : "ltr";
            document.documentElement.lang = selectedLang.code;
            localStorage.setItem("i18nextLng", selectedLang.code);
        } catch (error) {
            console.error("Error changing language:", error);
        }
    };

    // Set initial language and direction
    useEffect(() => {
        const savedLang = localStorage.getItem("i18nextLng") || "en";
        const currentLang = languages.find((lang) => lang.code === savedLang) || languages[0];
        setLanguage(currentLang);
        document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = savedLang;
    }, []);

    // Handle logout action
    const performLogout = () => {
        handleLogout();
        navigate("/login");
    };

    return (
        <div className="top-header-wrapper">
            <div className="topbar d-flex align-items-center">
                <Container className="d-flex justify-content-between align-items-center">
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="language-dropdown">
                            <Image src={language.flag} alt={language.name} width={15} height={15} className="me-2" />
                            {language.name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {languages.map((lang) => (
                                <Dropdown.Item key={lang.code} onClick={() => handleLanguageChange(lang)}>
                                    <Image src={lang.flag} alt={lang.name} width={20} height={15} className="me-2" />
                                    {lang.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* Login & Signup */}
                    <div className="d-flex align-items-center header-right">
                        {isAuthenticated ? (
                            <>
                                <Link to="/account" className="login-a border-end pe-3 d-inline-block">
                                    <Image src={userIcon} alt="User Icon" width={13} height={17} />
                                    {t("header.myAccount")}
                                </Link>
                                <Link to="/deals" className="login-a border-end pe-3 d-inline-block">
                                    {t("header.myDeals")}
                                </Link>
                                <Link to="/notifications" className="login-a border-end pe-3 d-inline-block">
                                    <Image src={mail} alt="Notification Icon" width={20} height={14} />
                                    {t("header.notifications")}
                                </Link>
                                <button
                                    onClick={performLogout}
                                    className="login-a border-end pe-3 d-inline-block"
                                    style={{ background: "none", border: "none", cursor: "pointer" }}
                                >
                                    <Image src={logout} alt="Logout Icon" width={16} height={16} />
                                    {t("header.logout")}
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="login-a border-end pe-3 d-inline-block">
                                    <Image src={userIcon} alt="Login Icon" width={13} height={17} />
                                    {t("header.login")}
                                </Link>
                                <Link to="/signup" className="btn btn-header d-inline-block">
                                    {t("header.signup")}
                                </Link>
                            </>
                        )}
                    </div>
                </Container>
            </div>
        </div>
    );
}
