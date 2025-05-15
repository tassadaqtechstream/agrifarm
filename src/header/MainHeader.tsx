import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useAuth } from "@contexts/AuthContext.tsx";

const MainHeader = () => {
    const { isAuthenticated, logout: performLogout, currentUser } = useAuth();

    const getUserInitials = (name: string) => {
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <nav className="bg-white/90 backdrop-blur-sm py-4 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-earth-olive flex items-center justify-center mr-2">
                            <div className="h-6 w-6 rounded-full bg-earth-sand"></div>
                        </div>
                        <span className="font-bold text-xl text-earth-olive">
                            Oasis<span className="text-earth-terracotta">Trade</span>
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/categories"
                            className="text-earth-olive-dark hover:text-earth-terracotta transition-colors"
                        >
                            Categories
                        </Link>
                        <Link
                            to="/pre-harvest"
                            className="text-earth-olive-dark hover:text-earth-terracotta transition-colors"
                        >
                            Pre-Harvest
                        </Link>
                        <Link to="/" className="text-earth-olive-dark hover:text-earth-terracotta transition-colors">
                            How It Works
                        </Link>
                        <Link to="/" className="text-earth-olive-dark hover:text-earth-terracotta transition-colors">
                            Global Reach
                        </Link>
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="link"
                                className="flex items-center text-earth-olive-dark hover:text-earth-terracotta transition-colors p-0 border-0 bg-transparent"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-globe h-4 w-4 mr-1"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20"></path>
                                    <path d="M2 12h20"></path>
                                </svg>
                                <span>Language</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-chevron-down h-4 w-4 ml-1"
                                >
                                    <path d="m6 9 6 6 6-6"></path>
                                </svg>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="w-24 right-0 mt-2 py-2 bg-white rounded-md shadow-lg">
                                <Dropdown.Item
                                    as={Link}
                                    to="/"
                                    className="px-4 py-2 text-earth-olive-dark hover:text-earth-terracotta hover:bg-gray-50"
                                >
                                    English
                                </Dropdown.Item>
                                <Dropdown.Item
                                    as={Link}
                                    to="/"
                                    className="px-4 py-2 text-earth-olive-dark hover:text-earth-terracotta hover:bg-gray-50"
                                >
                                    Arabic
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {isAuthenticated ? (
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="link"
                                    className="flex items-center text-earth-olive-dark hover:text-earth-terracotta transition-colors p-0 border-0 bg-transparent"
                                >
                                    <div className="h-8 w-8 rounded-full bg-earth-olive flex items-center justify-center mr-2">
                                        <span className="text-white font-medium">
                                            {currentUser?.name ? getUserInitials(currentUser.name) : "U"}
                                        </span>
                                    </div>
                                    <span>{currentUser?.name || "User"}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-chevron-down h-4 w-4 ml-1"
                                    >
                                        <path d="m6 9 6 6 6-6"></path>
                                    </svg>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="w-48 right-0 mt-2 py-2 bg-white rounded-md shadow-lg">
                                    <Dropdown.Item
                                        as={Link}
                                        to="/account"
                                        className="px-4 py-2 text-earth-olive-dark hover:text-earth-terracotta hover:bg-gray-50"
                                    >
                                        My Account
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        as={Link}
                                        to="/deals"
                                        className="px-4 py-2 text-earth-olive-dark hover:text-earth-terracotta hover:bg-gray-50"
                                    >
                                        My Deals
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        as={Link}
                                        to="/notifications"
                                        className="px-4 py-2 text-earth-olive-dark hover:text-earth-terracotta hover:bg-gray-50"
                                    >
                                        Notifications
                                    </Dropdown.Item>
                                    <Dropdown.Divider className="my-1" />
                                    <Dropdown.Item
                                        onClick={performLogout}
                                        className="px-4 py-2 text-earth-olive-dark hover:text-earth-terracotta hover:bg-gray-50"
                                    >
                                        Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-earth-terracotta hover:bg-earth-terracotta-dark text-white"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-earth-olive hover:bg-earth-olive-dark text-white"
                                >
                                    Join Now
                                </Link>
                            </>
                        )}
                    </div>
                    <button className="md:hidden text-earth-olive-dark hover:text-earth-terracotta">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-menu h-6 w-6"
                        >
                            <line x1="4" x2="20" y1="12" y2="12"></line>
                            <line x1="4" x2="20" y1="6" y2="6"></line>
                            <line x1="4" x2="20" y1="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default MainHeader;
