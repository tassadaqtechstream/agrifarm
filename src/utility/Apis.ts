import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { env } from '../config/env';

// Interface definitions
interface User {
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

interface Role {
    id: number;
    name: string;
}

interface LoginResponse {
    token: string;
    user: User;
}

interface ProductItem {
    id: number;
    name: string;
    description: string;
    // Add other product fields as needed
}

interface DealItem {
    id: number;
    title: string;
    // Add other deal fields as needed
}

interface BidData {
    amount: number;
    notes?: string;
    // Add other bid fields as needed
}

// Commodity interfaces
interface CommodityProduct {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image_url?: string;
    commodity_id: number;
    created_at?: string;
    updated_at?: string;
}

interface Commodity {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image_url: string;
    products: CommodityProduct[];
    created_at?: string;
    updated_at?: string;
}

interface CommoditiesResponse {
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

// Tree category interfaces
interface TreeCategory {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image: string | null;
    children: TreeCategory[];
}

interface TreeResponse {
    tree: TreeCategory[];
}

// Product interface
interface ApiData {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    image_url: string | null;
    commodity_id: number;
    created_at: string;
    updated_at: string;
}

interface Product {
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

// Error response interface
interface ErrorResponse {
    message: string;
    status: number;
}

// Create an axios instance with defaults
export const api: AxiosInstance = axios.create({
    baseURL: env.apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token to all requests
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
    (response) => response,
    (error: { response?: { data: ErrorResponse; status: number } }) => {
        if (error.response) {
            // Handle specific error cases
            if (error.response.status === 401) {
                // Handle unauthorized error
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
);

// Auth related API calls
export const authAPI = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/b2b/login', { email, password });
        return response.data;
    },

    logout: async (): Promise<void> => {
        try {
            await api.post('/logout');
        } finally {
            // Clear storage regardless of API response
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },

    forgotPassword: async (email: string): Promise<{ message: string }> => {
        const response = await api.post<{ message: string }>('/password/reset', { email });
        return response.data;
    }
};

// Example of other API modules you might want to create
export const productsAPI = {
    getAll: async (): Promise<ProductItem[]> => {
        const response = await api.get<ProductItem[]>('/products');
        return response.data;
    },

    getById: async (id: number): Promise<ProductItem> => {
        const response = await api.get<ProductItem>(`/products/${id}`);
        return response.data;
    },

    // ...other product-related API calls
};

export const dealsAPI = {
    getAll: async (): Promise<DealItem[]> => {
        const response = await api.get<DealItem[]>('/deals');
        return response.data;
    },

    createBid: async (dealId: number, bidData: BidData): Promise<any> => {
        const response = await api.post(`/deals/${dealId}/bids`, bidData);
        return response.data;
    },

    // ...other deal-related API calls
};

// Commodities related API calls
export const commoditiesAPI = {
    /**
     * Get all commodities with their products
     * @param includeProducts Whether to include products in the response
     * @returns Promise with commodities data
     */
    getAll: async (includeProducts: boolean = true): Promise<Commodity[]> => {
        const url = includeProducts ? '/all-categories' : '/all-categories';
        const response = await api.get<CommoditiesResponse>(url);
        return response.data.data;
    },

    /**
     * Get hierarchical tree of categories and their subcategories
     * @returns Promise with tree-structured category data
     */
    getCategoryTree: async (): Promise<TreeResponse> => {
        const response = await api.get<TreeResponse>('/all-categories');
        return response.data;
    },
    /**
     * Updated method for the commoditiesAPI object
     * This handles the actual response format from your backend
     */
    getFilteredProducts: async (category?: string, sub_category?: string): Promise<Product[]> => {
        try {
            // Build the URL with query parameters
            const params = new URLSearchParams();
            if (category) params.set('category', category);
            if (sub_category) params.set('sub_category', sub_category);

            const url = `get-filter-products?${params.toString()}`;
            const response = await api.get(url);

            // Check response format and extract the products array
            if (response.data) {
                if (response.data.data && Array.isArray(response.data.data)) {
                    // Backend returns { data: [...products], meta: {...} }
                    return response.data.data;
                } else if (Array.isArray(response.data)) {
                    // Backend returns direct array of products
                    return response.data;
                }
            }

            // If we reach this point, return empty array
            console.warn('Unexpected API response format');
            return [];
        } catch (error) {
            console.error('Error fetching filtered products:', error);
            return []; // Return empty array on error
        }
    },

    /**
     * Get a specific commodity by ID
     * @param id Commodity ID
     * @param includeProducts Whether to include products in the response
     * @returns Promise with commodity data
     */
    getById: async (id: number, includeProducts: boolean = true): Promise<Commodity> => {
        const url = includeProducts ? `/commodities/${id}?include=products` : `/commodities/${id}`;
        const response = await api.get<{ data: Commodity }>(url);
        return response.data.data;
    },

    /**
     * Get a specific commodity by slug
     * @param slug Commodity slug
     * @param includeProducts Whether to include products in the response
     * @returns Promise with commodity data
     */
    // Update the getBySlug method in the commoditiesAPI object
    getBySlug: async (slug: string, sub_category: string): Promise<Commodity> => {
        try {
            const url = `get-filter-products?category=${slug}&sub_category=${sub_category}`;
            const response = await api.get(url);

            // Check if the response has the expected structure
            if (response.data && response.data.data) {
                return response.data.data;
            } else if (response.data) {
                // If the response is flattened without a data property
                return response.data;
            } else {
                // If no valid data is returned, throw an error to trigger the fallback
                throw new Error('Invalid response format from API');
            }
        } catch (error) {
            console.error('Error fetching filtered products:', error);
            // Return a minimal valid Commodity object with an empty products array
            return {
                id: 0,
                name: slug,
                slug: slug,
                description: '',
                image_url: '',
                products: [] // Empty products array
            };
        }
    },

    /**
     * Get products for a specific commodity
     * @param commodityId Commodity ID
     * @returns Promise with products data
     */
    getProducts: async (commodityId: number): Promise<CommodityProduct[]> => {
        const response = await api.get<{ data: CommodityProduct[] }>(`/commodities/${commodityId}/products`);
        return response.data.data;
    },

    /**
     * Get a specific product by ID
     * @param productId Product ID
     * @returns Promise with product data
     */
    getProductById: async (productId: number): Promise<CommodityProduct> => {
        const response = await api.get<{ data: CommodityProduct }>(`/commodity-products/${productId}`);
        return response.data.data;
    },

    /**
     * Get a specific product by slug
     * @param slug Product slug
     * @returns Promise with product data
     */
    getProductBySlug: async (slug: string): Promise<CommodityProduct> => {
        const response = await api.get<{ data: CommodityProduct }>(`/commodity-products/slug/${slug}`);
        return response.data.data;
    }
};

// Define the environment configuration placeholder if not exists
// In production, make sure to create this file with the actual API URL
export const envConfig = {
    env: {
        apiUrl: env?.apiUrl || 'http://localhost:8000/api'
    }
};