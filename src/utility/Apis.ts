

import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { env } from '../config/env';

/**
 * Environment configuration
 */
export const envCont = {
    apiUrl:env.apiUrl || 'http://localhost:8000/api',
    apiVersion: env?.API_VERSION || 'v1',
};

// =========================================================
// Type Definitions
// =========================================================

/**
 * User related interfaces
 */
export interface User {
    id: number;
    name: string;
    email: string;
    business_id?: number;
    profile?: UserProfile;
    roles?: Role[];
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

export interface Role {
    id: number;
    name: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface SignupFormData {
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

/**
 * Product related interfaces
 */
export interface ProductItem {
    id: number;
    name: string;
    description: string;
    // Add other product fields as needed
}

export interface ApiData {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    image_url: string | null;
    commodity_id: number;
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: number;
    name: string;
    category: string;
    sub_category: string;
    price: string;
    weight: string;
    incoterm: string;
    country: string;
    description: string;
    image: string;
    stock: number;
    verified: boolean;
    expirationDate: string;
    apiData: ApiData;
}
export interface FeaturedProduct {
    id: number;
    title: string;
    price: string;
    unit: string;
    image: string;
    category: string;
}
/**
 * Deal related interfaces
 */
export interface DealItem {
    id: number;
    title: string;
    // Add other deal fields as needed
}

export interface BidData {
    amount: number;
    notes?: string;
    // Add other bid fields as needed
}

/**
 * Commodity related interfaces
 */
export interface CommodityProduct {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image_url?: string;
    commodity_id: number;
    created_at?: string;
    updated_at?: string;
}

export interface Commodity {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image_url: string;
    products: CommodityProduct[];
    created_at?: string;
    updated_at?: string;
}

export interface CommoditiesResponse {
    data: Commodity[];
    links?: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta?: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

export interface TreeCategory {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image: string | null;
    children: TreeCategory[];
}

export interface TreeResponse {
    tree: TreeCategory[];
}

/**
 * Error related interfaces
 */
export interface ErrorResponse {
    message: string;
    status: number;
/**
 * Error related interfaces
 */
export interface ErrorResponse {
    message: string;
    status: number;
}
export interface ProductDetail {
    id: string | number;
    name: string;
    category: string;
    price: number;
    unit: string;
    seller: string;
    location: string;
    rating: number;
    reviews: number;
    availability: string;
    organic: boolean;
    minQuantity: number;
    description: string;
    short_description?: string;
    images: string[];
    specifications: {
        name: string;
        value: string;
    }[];
    isAuthenticated: boolean;
    isCompanyMaintained: boolean;
    isPartnerFarm: boolean;
    stock: number;
    meta: {
        meta_title?: string;
        meta_description?: string;
        meta_keywords?: string;
    };
}
// =========================================================
// API Client Core
// =========================================================

/**
 * Creates and configures the API client with interceptors
 * for authentication and error handling.
 */
export const createApiClient = (): AxiosInstance => {
    const apiClient = axios.create({
        baseURL: env.apiUrl,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    // Request interceptor for authentication
    apiClient.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    apiClient.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response) {
                const { status, data } = error.response;

                // Handle authentication errors
                if (status === 401) {
                 /*   localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';*/
                }

                // Handle validation errors
                if (status === 422) {
                    return Promise.reject({
                        ...data,
                        isValidationError: true
                    });
                }

                // Handle rate limiting
                if (status === 429) {
                    return Promise.reject({
                        message: 'Too many requests. Please try again later.',
                        status,
                    });
                }

                // Handle server errors
                if (status >= 500) {
                    return Promise.reject({
                        message: 'Server error. Please try again later.',
                        status,
                        originalError: data,
                    });
                }

                return Promise.reject(data);
            }

            // Handle network errors
            return Promise.reject({
                message: 'Network error. Please check your connection.',
                isNetworkError: true,
            });
        }
    );

    return apiClient;
};

// Initialize the API client
export const api = createApiClient();

// =========================================================
// Authentication API
// =========================================================

export const authAPI = {
    /**
     * Authenticates a user with email and password
     *
     * @param email User email
     * @param password User password
     * @returns Login response with token and user data
     */
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/b2b/login', { email, password });

        // Store authentication data
        if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        return response.data;
    },

    /**
     * Logs out the current user
     */
    logout: async (): Promise<void> => {
        try {
            await api.post('/logout');
        } catch (error) {
            console.error('Logout API error:', error);
        } finally {
            // Always clear local storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },

    /**
     * Initiates password reset flow
     *
     * @param email User email
     * @returns Response message
     */
    forgotPassword: async (email: string): Promise<{ message: string }> => {
        const response = await api.post<{ message: string }>('/password/reset', { email });
        return response.data;
    },

    /**
     * Registers a new user
     *
     * @param formData User registration data
     * @param userType Type of user (seller or buyer)
     * @returns Response message
     */
    signup: async (formData: SignupFormData, userType?: 'seller' | 'buyer'): Promise<{ message: string }> => {
        // Determine user type
        const apiData = {
            ...formData,
            user_type: userType || formData.user_type || 'seller'
        };

        // Choose the correct endpoint
        const endpoint = apiData.user_type === 'buyer'
            ? '/b2b/register-buyer'
            : '/b2b/register';

        const response = await api.post<{ message: string }>(endpoint, apiData);
        return response.data;
    },

    /**
     * Gets the current authenticated user
     *
     * @returns User data or null if not authenticated
     */
    getCurrentUser: (): User | null => {
        const userJson = localStorage.getItem('user');
        if (userJson) {
            try {
                return JSON.parse(userJson);
            } catch (error) {
                console.error('Error parsing user data:', error);
                return null;
            }
        }
        return null;
    },

    /**
     * Checks if user is authenticated
     *
     * @returns Boolean indicating authentication status
     */
    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('token');
    },

    /**
     * Updates user profile
     *
     * @param userId User ID
     * @param profileData Updated profile data
     * @returns Updated user data
     */
    updateProfile: async (userId: number, profileData: Partial<UserProfile>): Promise<User> => {
        const response = await api.put<{ data: User }>(`/users/${userId}/profile`, profileData);

        // Update stored user data
        if (response.data && response.data.data) {
            localStorage.setItem('user', JSON.stringify(response.data.data));
        }

        return response.data.data;
    }
};

// =========================================================
// Products API
// =========================================================

export const productsAPI = {
    /**
     * Gets all products
     *
     * @param page Page number for pagination
     * @param perPage Items per page
     * @returns Array of product items
     */
    getAll: async (page: number = 1, perPage: number = 20): Promise<ProductItem[]> => {
        const response = await api.get<ProductItem[]>('/products', {
            params: { page, per_page: perPage }
        });
        return response.data;
    },

    /**
     * Gets a product by ID
     *
     * @param id Product ID
     * @returns Product item
     */
    getById: async (id: number): Promise<ProductItem> => {
        const response = await api.get<ProductItem>(`/products/${id}`);
        return response.data;
    },

    /**
     * Creates a new product
     *
     * @param productData Product data
     * @returns Created product
     */
    create: async (productData: Partial<ProductItem>): Promise<ProductItem> => {
        const response = await api.post<ProductItem>('/products', productData);
        return response.data;
    },

    /**
     * Updates a product
     *
     * @param id Product ID
     * @param productData Updated product data
     * @returns Updated product
     */
    update: async (id: number, productData: Partial<ProductItem>): Promise<ProductItem> => {
        const response = await api.put<ProductItem>(`/products/${id}`, productData);
        return response.data;
    },

    /**
     * Deletes a product
     *
     * @param id Product ID
     * @returns Success message
     */
    delete: async (id: number): Promise<{ message: string }> => {
        const response = await api.delete<{ message: string }>(`/products/${id}`);
        return response.data;
    },

    /**
     * Searches for products
     *
     * @param query Search query
     * @returns Array of matching products
     */
    search: async (query: string): Promise<ProductItem[]> => {
        const response = await api.get<ProductItem[]>('/products/search', {
            params: { query }
        });
        return response.data;
    }
    /**
     * Creates a new product
     *
     * @param productData Product data
     * @returns Created product
     */
    create: async (productData: Partial<ProductItem>): Promise<ProductItem> => {
        const response = await api.post<ProductItem>('/products', productData);
        return response.data;
    },

    /**
     * Updates a product
     *
     * @param id Product ID
     * @param productData Updated product data
     * @returns Updated product
     */
    update: async (id: number, productData: Partial<ProductItem>): Promise<ProductItem> => {
        const response = await api.put<ProductItem>(`/products/${id}`, productData);
        return response.data;
    },

    /**
     * Deletes a product
     *
     * @param id Product ID
     * @returns Success message
     */
    delete: async (id: number): Promise<{ message: string }> => {
        const response = await api.delete<{ message: string }>(`/products/${id}`);
        return response.data;
    },

    /**
     * Searches for products
     *
     * @param query Search query
     * @returns Array of matching products
     */
    search: async (query: string): Promise<ProductItem[]> => {
        const response = await api.get<ProductItem[]>('/products/search', {
            params: { query }
        });
        return response.data;
    },

    /**
     * Gets featured products
     *
     * @returns Array of featured products
     */
    getFeatured: async (): Promise<FeaturedProduct[]> => {
        try {
            const response = await api.get<{status: string, data: FeaturedProduct[]}>('/b2b/products/featured');
            return response.data.data;
        } catch (error) {
            console.error('Error fetching featured products:', error);
            return [];
        }
    },
    /**
     * Gets detailed product information
     *
     * @param id Product ID
     * @returns Detailed product information
     */
    getProductDetail: async (id: string | number): Promise<ProductDetail | null> => {
        try {
            const response = await api.get<{status: string, data: ProductDetail}>(`/b2b/products/${id}`);

            if (response.data.status === 'success') {
                return response.data.data;
            }
            return null;
        } catch (error) {
            console.error('Error fetching product details:', error);
            return null;
        }
    },
};

// =========================================================
// Deals API
// =========================================================

export const dealsAPI = {
    /**
     * Gets all deals
     *
     * @param page Page number for pagination
     * @param perPage Items per page
     * @returns Array of deal items
     */
    getAll: async (page: number = 1, perPage: number = 20): Promise<DealItem[]> => {
        const response = await api.get<DealItem[]>('/deals', {
            params: { page, per_page: perPage }
        });
        return response.data;
    },

    /**
     * Creates a bid for a deal
     *
     * @param dealId Deal ID
     * @param bidData Bid data
     * @returns Created bid
     */
    createBid: async (dealId: number, bidData: BidData): Promise<any> => {
        const response = await api.post(`/deals/${dealId}/bids`, bidData);
        return response.data;
    },

    /**
     * Gets a deal by ID
     *
     * @param id Deal ID
     * @returns Deal item
     */
    getById: async (id: number): Promise<DealItem> => {
        const response = await api.get<DealItem>(`/deals/${id}`);
        return response.data;
    },

    /**
     * Creates a new deal
     *
     * @param dealData Deal data
     * @returns Created deal
     */
    create: async (dealData: Partial<DealItem>): Promise<DealItem> => {
        const response = await api.post<DealItem>('/deals', dealData);
        return response.data;
    },

    /**
     * Gets bids for a deal
     *
     * @param dealId Deal ID
     * @returns Array of bids
     */
    getBids: async (dealId: number): Promise<any[]> => {
        const response = await api.get(`/deals/${dealId}/bids`);
        return response.data;
    }
};

// =========================================================
// Commodities API
// =========================================================

export const commoditiesAPI = {
    /**
     * Gets all commodities with their products
     *
     * @param includeProducts Whether to include products in the response
     * @returns Array of commodities
     */
    getAll: async (includeProducts: boolean = true): Promise<Commodity[]> => {
        const url = '/all-categories';
        const response = await api.get<CommoditiesResponse>(url);
        return response.data.data;
    },

    /**
     * Gets hierarchical tree of categories and their subcategories
     *
     * @returns Tree-structured category data
     */
    getCategoryTree: async (): Promise<TreeResponse> => {
        const response = await api.get<TreeResponse>('/all-categories');
        return response.data;
    },

    /**
     * Gets filtered products by category and subcategory
     *
     * @param category Category slug
     * @param sub_category Subcategory slug
     * @returns Array of filtered products
     */
    getFilteredProducts: async (category?: string, sub_category?: string): Promise<Product[]> => {
        try {
            // Build the URL with query parameters
            const params = new URLSearchParams();
            if (category) params.set('category', category);
            if (sub_category) params.set('sub_category', sub_category);

            const url = `get-filter-products?${params.toString()}`;
            const response = await api.get(url);

            // Handle different response formats
            if (response.data) {
                if (response.data.data && Array.isArray(response.data.data)) {
                    return response.data.data;
                } else if (Array.isArray(response.data)) {
                    return response.data;
                }
            }

            console.warn('Unexpected API response format');
            return [];
        } catch (error) {
            console.error('Error fetching filtered products:', error);
            return [];
        }
    },

    /**
     * Gets a specific commodity by ID
     *
     * @param id Commodity ID
     * @param includeProducts Whether to include products in the response
     * @returns Commodity data
     */
    getById: async (id: number, includeProducts: boolean = true): Promise<Commodity> => {
        const url = includeProducts
            ? `/commodities/${id}?include=products`
            : `/commodities/${id}`;

        const response = await api.get<{ data: Commodity }>(url);
        return response.data.data;
    },

    /**
     * Gets a specific commodity by slug and subcategory
     *
     * @param slug Commodity slug
     * @param sub_category Subcategory slug
     * @returns Commodity data
     */
    getBySlug: async (slug: string, sub_category: string): Promise<Commodity> => {
        try {
            const url = `get-filter-products?category=${slug}&sub_category=${sub_category}`;
            const response = await api.get(url);

            // Handle different response formats
            if (response.data && response.data.data) {
                return response.data.data;
            } else if (response.data) {
                return response.data;
            }

            throw new Error('Invalid response format from API');
        } catch (error) {
            console.error('Error fetching commodity by slug:', error);
            // Return a minimal valid Commodity object
            return {
                id: 0,
                name: slug,
                slug: slug,
                description: '',
                image_url: '',
                products: []
            };
        }
    },

    /**
     * Gets products for a specific commodity
     *
     * @param commodityId Commodity ID
     * @returns Array of products
     */
    getProducts: async (commodityId: number): Promise<CommodityProduct[]> => {
        const response = await api.get<{ data: CommodityProduct[] }>(
            `/commodities/${commodityId}/products`
        );
        return response.data.data;
    },

    /**
     * Gets a specific product by ID
     *
     * @param productId Product ID
     * @returns Product data
     */
    getProductById: async (productId: number): Promise<CommodityProduct> => {
        const response = await api.get<{ data: CommodityProduct }>(
            `/commodity-products/${productId}`
        );
        return response.data.data;
    },

    /**
     * Gets a specific product by slug
     *
     * @param slug Product slug
     * @returns Product data
     */
    getProductBySlug: async (slug: string): Promise<CommodityProduct> => {
        const response = await api.get<{ data: CommodityProduct }>(
            `/commodity-products/slug/${slug}`
        );
        return response.data.data;
    }
};

// =========================================================
// Export default
// =========================================================

/**
 * Main API client with all modules
 */

console.log(authAPI);
const apiClient = {
    api,
    auth: authAPI,
    products: productsAPI,
    deals: dealsAPI,
    commodities: commoditiesAPI,
};

export default apiClient;