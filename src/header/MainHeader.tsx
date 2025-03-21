import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Image } from "react-bootstrap";
import logoImg from "../assets/logo.png";

export default function MainHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();

    return (
        <Container>
            <nav className="navbar navbar-expand-lg navbar-light bg-white main-header">
                <Link to="/" className="navbar-brand p-0 m-0">
                    <Image src={logoImg} alt="logo" width={80} height={80} />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-controls="navbarNav"
                    aria-expanded={isOpen}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === "/commodities" ? "active" : ""}`}
                                to="/commodities"
                            >
                                Market
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/tools" ? "active" : ""}`} to="/tools">
                                Crop Converter
                            </Link>
                        </li>
                        <li
                            className={`nav-item dropdown ${dropdownOpen ? "show" : ""}`}
                            onMouseEnter={() => setDropdownOpen(true)}
                            onMouseLeave={() => setDropdownOpen(false)}
                        >
                            <Link
                                to="/"
                                className="nav-link dropdown-toggle"
                                role="button"
                                aria-expanded={dropdownOpen}
                            >
                                About us
                            </Link>
                            <ul className={`dropdown-menu dropdopwn-hover ${dropdownOpen ? "show" : ""}`}>
                                <li>
                                    <Link to="/comapny" className="dropdown-item">
                                        Our Company
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/mission" className="dropdown-item">
                                        Our People
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/faq" className="dropdown-item">
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </Container>
    );
}
