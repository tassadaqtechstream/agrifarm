import { Link, useNavigate } from "react-router-dom";
import { Container, Dropdown, Image } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider"; // Import the auth hook

// Import images from src/assets
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

    // Use the auth context instead of local state
    const { isAuthenticated, logout: handleLogout } = useAuth();
    const navigate = useNavigate();

    // Correctly handle the selected language from the dropdown
    const handleSelect = (eventKey: string | null) => {
        if (eventKey) {
            setLanguage(eventKey);
        }
    };

    // Handle logout action
    const performLogout = () => {
        handleLogout();
        navigate('/login'); // Redirect to login page after logout
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
                        {isAuthenticated ? (
                            <>
                                <Link to="/account" className="login-a border-end pe-3 d-inline-block">
                                    <Image src={userIcon} alt="User Icon" width={13} height={17} />
                                    My Account
                                </Link>
                                <Link to="/deals" className="login-a border-end pe-3 d-inline-block">
                                    My Deals
                                </Link>
                                <Link to="/notifications" className="login-a border-end pe-3 d-inline-block">
                                    <Image src={mail} alt="Notification Icon" width={20} height={14} />
                                    Notification
                                </Link>
                                <button
                                    onClick={performLogout}
                                    className="login-a border-end pe-3 d-inline-block"
                                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    <Image src={logout} alt="Logout Icon" width={16} height={16} />
                                    Logout
                                </button>
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