import { Link } from "react-router-dom";
import { Container, Dropdown, Image } from "react-bootstrap";
import { useState } from "react";

// ✅ Import images from src/assets
import englishFlag from "../assets/english.svg";
import arabicFlag from "../assets/english.svg";
import userIcon from "../assets/user-i.png";
import mail from "../assets/mail.png";
import logout from "../assets/logout.ico";

export default function TopHeader() {
    const languages = [
        { name: "English", flag: englishFlag },
        { name: "Arabic", flag: arabicFlag },
    ];

    const [language, setLanguage] = useState<string>(languages[0].name);
    const [isLoggedIn] = useState<boolean>(false);

    // ✅ Correctly handle the selected language from the dropdown
    const handleSelect = (eventKey: string | null) => {
        if (eventKey) {
            setLanguage(eventKey);
        }
    };

    return (
        <div className="top-header-wrapper">
            <div className="topbar d-flex align-items-center">
                <Container className="d-flex justify-content-between align-items-center">
                    <Dropdown onSelect={handleSelect}>
                        <Dropdown.Toggle variant="light" id="language-dropdown">
                            <Image
                                src={languages.find((l) => l.name === language)?.flag || englishFlag}
                                alt={language}
                                width={15}
                                height={15}
                                className="me-2"
                            />
                            {language}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {languages.map((lang, index) => (
                                <Dropdown.Item key={index} eventKey={lang.name} as="button">
                                    <Image src={lang.flag} alt={lang.name} width={20} height={15} className="me-2" />
                                    {lang.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* Login & Signup */}
                    <div className="d-flex align-items-center header-right">
                        {isLoggedIn ? (
                            <>
                                <Link to="/" className="login-a border-end pe-3 d-inline-block">
                                    <Image src={userIcon} alt="Login Icon" width={13} height={17} />
                                    My Account
                                </Link>
                                <Link to="/" className="login-a border-end pe-3 d-inline-block">
                                    My Deals
                                </Link>
                                <Link to="/" className="login-a border-end pe-3 d-inline-block">
                                    <Image src={mail} alt="Login Icon" width={20} height={14} />
                                    Notification
                                </Link>
                                <Link to="/" className="login-a border-end pe-3 d-inline-block">
                                    <Image src={logout} alt="Login Icon" width={16} height={16} />
                                    Logout
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="login-a border-end pe-3 d-inline-block">
                                    <Image src={userIcon} alt="Login Icon" width={13} height={17} />
                                    Login
                                </Link>
                                <Link to="/signup" className="btn btn-header d-inline-block">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </Container>
            </div>
        </div>
    );
}
