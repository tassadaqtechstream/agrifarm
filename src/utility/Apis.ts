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

export interface CreateProductData {
    name: string;
    description: string;
    category_id: number;
    price: number;
    stock: number;
    unit: string;
    currency: string;
    weight?: number;
    brand?: string;
    model?: string;
    short_description?: string;
}

export interface SellerProduct {
    id: number;
    name: string;
    slug: string;
    description: string;
    short_description?: string;
    category_id: number;
    seller_id: number;
    sku: string;
    price: number;
    stock: number;
    stock_status: string;
    approval_status: 'pending' | 'approved' | 'rejected';
    commission_rate: number;
    is_active: boolean;
    view_count: number;
    wishlist_count: number;
    purchase_count: number;
    average_rating: number;
    total_reviews: number;
    weight?: number;
    brand?: string;
    model?: string;
    meta_data?: {
        unit?: string;
        currency?: string;
        [key: string]: any;
    };
    category?: {
        id: number;
        name: string;
        slug: string;
    };
    created_at: string;
    updated_at: string;
}

export interface SellerProductsResponse {
    data: SellerProduct[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface ProductCreateResponse {
    success: boolean;
    message: string;
    data: {
        product: SellerProduct;
        approval_status: string;
    };
}

export interface SellerDashboardStats {
    total_products: number;
    active_products: number;
    pending_approval: number;
    out_of_stock: number;
    low_stock: number;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    parent_id?: number;
    is_active: boolean;
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

export interface SellerSignupFormData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone_number: string;
    company: string;
    business_type: string;
    country: string;
    city?: string;
    address: string;
    description?: string;
    product_category?: string;
    user_type: 'seller' | 'buyer' | 'both';
    vatin?: string;
    preferred_language?: string;
    preferred_product_ids?: number[];
    other_preferred_products?: string;
}

export interface RegistrationResponse {
    message: string;
    user: User;
    token: string;
    role: string;
}

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

    // Updated signup method for general registration
    signup: async (formData: SignupFormData, userType?: 'seller' | 'buyer'): Promise<{ message: string }> => {
        const apiData = { ...formData, user_type: userType || formData.user_type || 'seller' };
        const endpoint = apiData.user_type === 'buyer' ? '/b2b/register' : '/b2b/register';
        const response = await api.post<{ message: string }>(endpoint, apiData);
        return response.data;
    },

    // New method specifically for seller registration with business details
    registerSeller: async (formData: SellerSignupFormData): Promise<RegistrationResponse> => {
        try {
            const response = await api.post<RegistrationResponse>('/b2b/register', {
                ...formData,
                user_type: formData.user_type,
            });

            // Store authentication data if successful
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }

            return response.data;
        } catch (error: any) {
            // Handle specific error cases
            if (error?.isValidationError) {
                throw {
                    message: 'Validation failed',
                    errors: error.errors,
                    isValidationError: true
                };
            }

            if (error?.status === 422) {
                throw {
                    message: error.message || 'Validation failed',
                    errors: error.errors || {},
                    isValidationError: true
                };
            }

            // Re-throw other errors
            throw error;
        }
    },

    // New method for buyer registration (if needed)
    registerBuyer: async (formData: SellerSignupFormData): Promise<RegistrationResponse> => {
        try {
            const response = await api.post<RegistrationResponse>('/b2b/register', {
                ...formData,
                user_type: 'buyer'
            });

            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }

            return response.data;
        } catch (error: any) {
            if (error?.isValidationError) {
                throw {
                    message: 'Validation failed',
                    errors: error.errors,
                    isValidationError: true
                };
            }

            if (error?.status === 422) {
                throw {
                    message: error.message || 'Validation failed',
                    errors: error.errors || {},
                    isValidationError: true
                };
            }

            throw error;
        }
    },

    // Register for both seller and buyer
    registerBoth: async (formData: SellerSignupFormData): Promise<RegistrationResponse> => {
        try {
            const response = await api.post<RegistrationResponse>('/b2b/register-business', {
                ...formData,
                user_type: 'both'
            });

            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }

            return response.data;
        } catch (error: any) {
            if (error?.isValidationError) {
                throw {
                    message: 'Validation failed',
                    errors: error.errors,
                    isValidationError: true
                };
            }

            if (error?.status === 422) {
                throw {
                    message: error.message || 'Validation failed',
                    errors: error.errors || {},
                    isValidationError: true
                };
            }

            throw error;
        }
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
    },

    // Helper method to check user roles
    hasRole: (roleName: string): boolean => {
        const user = authAPI.getCurrentUser();
        return user?.roles?.some(role => role.name === roleName) || false;
    },

    // Helper method to check if user is a seller
    isSeller: (): boolean => authAPI.hasRole('seller'),

    // Helper method to check if user is a buyer
    isBuyer: (): boolean => authAPI.hasRole('buyer'),

    // Method to refresh user data from server
    refreshUser: async (): Promise<User | null> => {
        try {
            const response = await api.get<{ data: User }>('/b2b/user/profile');
            if (response.data && response.data.data) {
                localStorage.setItem('user', JSON.stringify(response.data.data));
                return response.data.data;
            }
        } catch (error) {
            console.error('Error refreshing user data:', error);
        }
        return null;
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


// Updated sellerAPI with ensureB2BPrefix for all endpoints
export const sellerAPI = {
    // Create a new product
    createProduct: async (productData: FormData | CreateProductData): Promise<ProductCreateResponse> => {
        try {
            const url = ensureB2BPrefix('/store-products');

            // Determine if we're sending FormData (with files) or regular data
            const isFormData = productData instanceof FormData;

            const config = isFormData ? {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            } : {};

            const response = await api.post<ProductCreateResponse>(url, productData, config);
            return response.data;
        } catch (error: any) {
            if (error?.isValidationError) {
                throw {
                    message: 'Validation failed',
                    errors: error.errors,
                    isValidationError: true
                };
            }

            // Handle axios errors specifically for file uploads
            if (error?.response?.status === 422) {
                throw {
                    message: error.response.data?.message || 'Validation failed',
                    errors: error.response.data?.errors || {},
                    isValidationError: true
                };
            }

            throw error;
        }
    },
    // Get seller's products
    getSellerProducts: async (filters: {
        page?: number;
        per_page?: number;
        status?: string;
        category_id?: number;
        search?: string;
    } = {}): Promise<SellerProductsResponse> => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params.append(key, value.toString());
            }
        });

        const url = ensureB2BPrefix(`/products?${params.toString()}`);
        const response = await api.get<{ success: boolean; data: SellerProductsResponse }>(url);
        return response.data.data;
    },

    // Get specific product
    getProduct: async (productId: number): Promise<SellerProduct> => {
        const url = ensureB2BPrefix(`/seller/products/${productId}`);
        const response = await api.get<{ success: boolean; data: SellerProduct }>(url);
        return response.data.data;
    },

    // Update product
    updateProduct: async (productId: number, productData: Partial<CreateProductData>): Promise<SellerProduct> => {
        try {
            const url = ensureB2BPrefix(`/seller/products/${productId}`);
            const response = await api.put<{ success: boolean; data: SellerProduct }>(
                url,
                productData
            );
            return response.data.data;
        } catch (error: any) {
            if (error?.isValidationError) {
                throw {
                    message: 'Validation failed',
                    errors: error.errors,
                    isValidationError: true
                };
            }
            throw error;
        }
    },

    // Delete product
    deleteProduct: async (productId: number): Promise<{ message: string }> => {
        const url = ensureB2BPrefix(`/seller/products/${productId}`);
        const response = await api.delete<{ success: boolean; message: string }>(url);
        return { message: response.data.message };
    },

    // Get categories for product creation - using the same endpoint as commodities
    getCategories: async (): Promise<Commodity[]> => {
        try {
            // Use the same endpoint as commoditiesAPI.getAll()
            const url = ensureB2BPrefix('/all-categories');
            const response = await api.get<CommoditiesResponse>(url);
             return response.data.tree;
        } catch (error: any) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },

    // Get seller dashboard statistics
    getDashboardStats: async (): Promise<SellerDashboardStats> => {
        const url = ensureB2BPrefix('/seller/dashboard/stats');
        const response = await api.get<{ success: boolean; data: SellerDashboardStats }>(url);
        return response.data.data;
    },

    // Toggle product active status
    toggleProductStatus: async (productId: number, isActive: boolean): Promise<SellerProduct> => {
        const url = ensureB2BPrefix(`/seller/products/${productId}/status`);
        const response = await api.patch<{ success: boolean; data: SellerProduct }>(
            url,
            { is_active: isActive }
        );
        return response.data.data;
    },

    // Get low stock products
    getLowStockProducts: async (): Promise<SellerProduct[]> => {
        const url = ensureB2BPrefix('/seller/products/low-stock');
        const response = await api.get<{ success: boolean; data: SellerProduct[] }>(url);
        return response.data.data;
    },

    // Update product stock
    updateStock: async (productId: number, stock: number): Promise<SellerProduct> => {
        const url = ensureB2BPrefix(`/seller/products/${productId}/stock`);
        const response = await api.patch<{ success: boolean; data: SellerProduct }>(
            url,
            { stock }
        );
        return response.data.data;
    }
};
const apiClient = {
    api,
    auth: authAPI,
    products: productsAPI,
    deals: dealsAPI,
    commodities: commoditiesAPI,
    orders,
    seller: sellerAPI
};

export default apiClient;