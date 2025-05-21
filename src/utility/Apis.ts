import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { env } from '../config/env';

/**
 * Environment configuration
 */
export const envCont = {
    apiUrl: env.apiUrl || 'http://localhost:8000/api',
    apiVersion: env.apiVersion || 'v1',
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
}

export interface BidData {
    amount: number;
    notes?: string;
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
// Helper function to ensure /b2b/ prefix in URLs
// =========================================================

const ensureB2BPrefix = (url: string): string => {
    // Skip if URL already starts with /b2b/
    if (url.startsWith('/b2b/')) {
        return url;
    }

    // Skip if URL already starts with /
    if (url.startsWith('/')) {
        return `/b2b${url}`;
    }

    // If URL doesn't start with /, add /b2b/
    return `/b2b/${url}`;
};

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
                config.headers = (config.headers || {}) as any;
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
                if (status === 401) {
                    // Authentication error handling
                }
                if (status === 422) {
                    return Promise.reject({ ...data, isValidationError: true });
                }
                if (status === 429) {
                    return Promise.reject({ message: 'Too many requests. Please try again later.', status });
                }
                if (status >= 500) {
                    return Promise.reject({ message: 'Server error. Please try again later.', status, originalError: data });
                }
                return Promise.reject(data);
            }
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
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/b2b/login', { email, password });
        if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },
    logout: async (): Promise<void> => {
        try {
            await api.post(ensureB2BPrefix('/logout'));
        } catch (error) {
            console.error('Logout API error:', error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },
    forgotPassword: async (email: string): Promise<{ message: string }> => {
        const response = await api.post<{ message: string }>(ensureB2BPrefix('/password/reset'), { email });
        return response.data;
    },
    signup: async (formData: SignupFormData, userType?: 'seller' | 'buyer'): Promise<{ message: string }> => {
        const apiData = { ...formData, user_type: userType || formData.user_type || 'seller' };
        const endpoint = apiData.user_type === 'buyer' ? '/b2b/register-buyer' : '/b2b/register';
        const response = await api.post<{ message: string }>(endpoint, apiData);
        return response.data;
    },
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
    isAuthenticated: (): boolean => !!localStorage.getItem('token'),
    updateProfile: async (userId: number, profileData: Partial<UserProfile>): Promise<User> => {
        const response = await api.put<{ data: User }>(ensureB2BPrefix(`/users/${userId}/profile`), profileData);
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
    getAllProducts: async (page: number = 1, perPage: number = 20): Promise<ProductItem[]> => {
        const response = await api.get<ProductItem[]>(ensureB2BPrefix('/get-all-products'), { params: { page, per_page: perPage } });
        return response.data;
    },
    getById: async (id: number): Promise<ProductItem> => {
        const response = await api.get<ProductItem>(ensureB2BPrefix(`/products/${id}`));
        return response.data;
    },
    create: async (productData: Partial<ProductItem>): Promise<ProductItem> => {
        const response = await api.post<ProductItem>(ensureB2BPrefix('/products'), productData);
        return response.data;
    },
    update: async (id: number, productData: Partial<ProductItem>): Promise<ProductItem> => {
        const response = await api.put<ProductItem>(ensureB2BPrefix(`/products/${id}`), productData);
        return response.data;
    },
    delete: async (id: number): Promise<{ message: string }> => {
        const response = await api.delete<{ message: string }>(ensureB2BPrefix(`/products/${id}`));
        return response.data;
    },
    search: async (query: string): Promise<ProductItem[]> => {
        const response = await api.get<ProductItem[]>(ensureB2BPrefix('/products/search'), { params: { query } });
        return response.data;
    },
    getFeatured: async (): Promise<FeaturedProduct[]> => {
        try {
            const response = await api.get<{ status: string, data: FeaturedProduct[] }>('/b2b/products/featured');
            return response.data.data;
        } catch (error) {
            console.error('Error fetching featured products:', error);
            return [];
        }
    },
    getProductDetail: async (id: string | number): Promise<ProductDetail | null> => {
        try {
            const response = await api.get<{ status: string, data: ProductDetail }>(`/b2b/products/${id}`);
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


// Add these to your API client utility file (src/utility/Apis.ts)

// Order service functions
const orders = {
    // Create a new order
    createOrder: async (orderData) => {
        try {
            const response = await api.post('/b2b/orders', orderData);
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },

    // Get order details by ID
    getOrderDetails: async (orderId) => {
        try {
            const response = await api.get(`/b2b/orders/${orderId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching order ${orderId}:`, error);
            throw error;
        }
    },

    // Get all orders for the current user
    getUserOrders: async () => {
        try {
            const response = await api.get('/api/user/orders');
            return response.data;
        } catch (error) {
            console.error('Error fetching user orders:', error);
            throw error;
        }
    }
};


// =========================================================
// Deals API
// =========================================================

export const dealsAPI = {
    getAll: async (page: number = 1, perPage: number = 20): Promise<DealItem[]> => {
        const response = await api.get<DealItem[]>(ensureB2BPrefix('/deals'), { params: { page, per_page: perPage } });
        return response.data;
    },
    createBid: async (dealId: number, bidData: BidData): Promise<any> => {
        const response = await api.post(ensureB2BPrefix(`/deals/${dealId}/bids`), bidData);
        return response.data;
    },
    getById: async (id: number): Promise<DealItem> => {
        const response = await api.get<DealItem>(ensureB2BPrefix(`/deals/${id}`));
        return response.data;
    },
    create: async (dealData: Partial<DealItem>): Promise<DealItem> => {
        const response = await api.post<DealItem>(ensureB2BPrefix('/deals'), dealData);
        return response.data;
    },
    getBids: async (dealId: number): Promise<any[]> => {
        const response = await api.get(ensureB2BPrefix(`/deals/${dealId}/bids`));
        return response.data;
    }
};
// =========================================================
// Commodities API
// =========================================================

export const commoditiesAPI = {
    getAll: async (includeProducts: boolean = true): Promise<Commodity[]> => {
        const url = ensureB2BPrefix('/all-categories');
        const response = await api.get<CommoditiesResponse>(url);
        return response.data.data;
    },
    getCategoryTree: async (): Promise<TreeResponse> => {
        const response = await api.get<TreeResponse>(ensureB2BPrefix('/all-categories'));
        return response.data;
    },
    getFilteredProducts: async (category?: string, sub_category?: string): Promise<Product[]> => {
        try {
            const params = new URLSearchParams();
            if (category) params.set('category', category);
            if (sub_category) params.set('sub_category', sub_category);
            const url = ensureB2BPrefix(`get-filter-products?${params.toString()}`);
            const response = await api.get(url);
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
    getById: async (id: number, includeProducts: boolean = true): Promise<Commodity> => {
        const url = includeProducts
            ? ensureB2BPrefix(`/commodities/${id}?include=products`)
            : ensureB2BPrefix(`/commodities/${id}`);
        const response = await api.get<{ data: Commodity }>(url);
        return response.data.data;
    },
    getBySlug: async (slug: string, sub_category: string): Promise<Commodity> => {
        try {
            const url = ensureB2BPrefix(`get-filter-products?category=${slug}&sub_category=${sub_category}`);
            const response = await api.get(url);
            if (response.data && response.data.data) {
                return response.data.data;
            } else if (response.data) {
                return response.data;
            }
            throw new Error('Invalid response format from API');
        } catch (error) {
            console.error('Error fetching commodity by slug:', error);
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
    getProducts: async (commodityId: number): Promise<CommodityProduct[]> => {
        const response = await api.get<{ data: CommodityProduct[] }>(ensureB2BPrefix(`/commodities/${commodityId}/products`));
        return response.data.data;
    },
    getProductById: async (productId: number): Promise<CommodityProduct> => {
        const response = await api.get<{ data: CommodityProduct }>(ensureB2BPrefix(`/commodity-products/${productId}`));
        return response.data.data;
    },
    getProductBySlug: async (slug: string): Promise<CommodityProduct> => {
        const response = await api.get<{ data: CommodityProduct }>(ensureB2BPrefix(`/commodity-products/slug/${slug}`));
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
    orders,
};

export default apiClient;