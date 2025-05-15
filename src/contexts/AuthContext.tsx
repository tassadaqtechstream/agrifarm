import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import {authAPI} from "@/utility/Apis.ts";
console.log(authAPI);

// Define interfaces for our user data types
interface Role {
    id: number;
    name: string;
}

interface UserProfile {
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    company: string;
    vatin?: string;
    phone_number: string;
    fiscal_address: string;
    zip_code: string;
    country: string;
    company_activity_id: number;
    preferred_language?: string;
    preferred_product_ids?: number[];
    other_preferred_products?: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    business_id?: number;
    profile?: UserProfile;
    roles?: Role[];
}

// Define the signup form data interface
interface SignupFormData {
    email: string;
    password: string;
    password_confirmation: string;
    first_name: string;
    last_name: string;
    company: string;
    phone_number: string;
    fiscal_address: string;
    zip_code: string;
    country: string;
    company_activity_id: number;
    user_type?: 'seller' | 'buyer';
    [key: string]: string | number | boolean | undefined;
}

interface AuthContextType {
    currentUser: User | null;
    userProfile: UserProfile | null;
    userRoles: Role[];
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    hasRole: (roleName: string) => boolean;
    signup: (formData: SignupFormData, userType?: 'seller' | 'buyer') => Promise<{ success: boolean; error?: string }>;
}

interface AuthProviderProps {
    children: ReactNode;
}

// Create auth context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [userRoles, setUserRoles] = useState<Role[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Initialize auth state from localStorage on app load
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    // Get user data from localStorage
                    const userDataString = localStorage.getItem("user");

                    if (userDataString) {
                        const userData = JSON.parse(userDataString) as User;
                        setCurrentUser(userData);
                        setUserProfile(userData.profile || null);
                        setUserRoles(userData.roles || []);
                        setIsAuthenticated(true);
                    }
                }
            } catch (error) {
                console.error("Auth initialization error:", error);
                logout();
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    // Login function
    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        try {
            // Use the authAPI utility
            const { token, user } = await authAPI.login(email, password);

            // Store in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            // Update state
            setCurrentUser(user);
            setUserProfile(user.profile || null);
            setUserRoles(user.roles || []);
            setIsAuthenticated(true);

            return { success: true };
        } catch (error: any) {
            if (error.response) {
                return {
                    success: false,
                    error: error.response.data.message || "Login failed",
                };
            }
            return {
                success: false,
                error: "Network error",
            };
        }
    };

    // Updated signup function to support different user types
    const signup = async (
        formData: SignupFormData,
        userType?: 'seller' | 'buyer'
    ): Promise<{ success: boolean; error?: string }> => {
        try {
            // Use the updated authAPI utility with userType parameter
            await authAPI.signup(formData, userType);

            // Return success response
            return { success: true };
        } catch (error: any) {
            console.error("Registration error:", error);

            // Handle API error response
            if (error.response) {
                return {
                    success: false,
                    error: error.response.data.message || "Registration failed",
                };
            }

            // Handle network/other errors
            return {
                success: false,
                error: error.message || "An unexpected error occurred during registration",
            };
        }
    };

    // Logout function
    const logout = () => {
        try {
            if (isAuthenticated) {
                // Use the authAPI utility
                authAPI.logout();
            }
        } catch (error) {
            console.error("Logout error:", error);
        }

        // Clear state
        setCurrentUser(null);
        setUserProfile(null);
        setUserRoles([]);
        setIsAuthenticated(false);
    };

    // Check if user has a specific role
    const hasRole = (roleName: string): boolean => {
        return userRoles.some((role) => role.name === roleName);
    };

    // Context value
    const value: AuthContextType = {
        currentUser,
        userProfile,
        userRoles,
        isAuthenticated,
        isLoading,
        login,
        logout,
        hasRole,
        signup, // Updated signup function in context value
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;