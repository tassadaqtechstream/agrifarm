import axios from 'axios';
import { env } from '../config/env';
// Create an axios instance with defaults
export const api = axios.create({
    baseURL: env.apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Request interceptor to add auth token to all requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
// Response interceptor to handle common errors
api.interceptors.response.use((response) => response, (error) => {
    // Handle 401 Unauthorized errors (token expired, etc.)
    if (error.response && error.response.status === 401) {
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect to login page if not already there
        if (window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
    }
    return Promise.reject(error);
});
// Auth related API calls
export const authAPI = {
    login: async (email, password) => {
        const response = await api.post('/b2b/login', { email, password });
        return response.data;
    },
    logout: async () => {
        try {
            await api.post('/logout');
        }
        finally {
            // Clear storage regardless of API response
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },
    forgotPassword: async (email) => {
        const response = await api.post('/password/reset', { email });
        return response.data;
    }
};
// Example of other API modules you might want to create
export const productsAPI = {
    getAll: async () => {
        const response = await api.get('/products');
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },
    // ...other product-related API calls
};
export const dealsAPI = {
    getAll: async () => {
        const response = await api.get('/deals');
        return response.data;
    },
    createBid: async (dealId, bidData) => {
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
    getAll: async (includeProducts = true) => {
        const url = includeProducts ? '/all-categories' : '/all-categories';
        const response = await api.get(url);
        return response.data.data;
    },
    /**
     * Get hierarchical tree of categories and their subcategories
     * @returns Promise with tree-structured category data
     */
    getCategoryTree: async () => {
        const response = await api.get('/all-categories');
        return response.data;
    },
    /**
     * Updated method for the commoditiesAPI object
     * This handles the actual response format from your backend
     */
    getFilteredProducts: async (category, sub_category) => {
        try {
            // Build the URL with query parameters
            const params = new URLSearchParams();
            if (category)
                params.set('category', category);
            if (sub_category)
                params.set('sub_category', sub_category);
            const url = `get-filter-products?${params.toString()}`;
            const response = await api.get(url);
            // Check response format and extract the products array
            if (response.data) {
                if (response.data.data && Array.isArray(response.data.data)) {
                    // Backend returns { data: [...products], meta: {...} }
                    return response.data.data;
                }
                else if (Array.isArray(response.data)) {
                    // Backend returns direct array of products
                    return response.data;
                }
            }
            // If we reach this point, return empty array
            console.warn('Unexpected API response format');
            return [];
        }
        catch (error) {
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
    getById: async (id, includeProducts = true) => {
        const url = includeProducts ? `/commodities/${id}?include=products` : `/commodities/${id}`;
        const response = await api.get(url);
        return response.data.data;
    },
    /**
     * Get a specific commodity by slug
     * @param slug Commodity slug
     * @param includeProducts Whether to include products in the response
     * @returns Promise with commodity data
     */
    // Update the getBySlug method in the commoditiesAPI object
    getBySlug: async (slug, sub_category) => {
        try {
            const url = `get-filter-products?category=${slug}&sub_category=${sub_category}`;
            const response = await api.get(url);
            // Check if the response has the expected structure
            if (response.data && response.data.data) {
                return response.data.data;
            }
            else if (response.data) {
                // If the response is flattened without a data property
                return response.data;
            }
            else {
                // If no valid data is returned, throw an error to trigger the fallback
                throw new Error('Invalid response format from API');
            }
        }
        catch (error) {
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
    getProducts: async (commodityId) => {
        const response = await api.get(`/commodities/${commodityId}/products`);
        return response.data.data;
    },
    /**
     * Get a specific product by ID
     * @param productId Product ID
     * @returns Promise with product data
     */
    getProductById: async (productId) => {
        const response = await api.get(`/commodity-products/${productId}`);
        return response.data.data;
    },
    /**
     * Get a specific product by slug
     * @param slug Product slug
     * @returns Promise with product data
     */
    getProductBySlug: async (slug) => {
        const response = await api.get(`/commodity-products/slug/${slug}`);
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
