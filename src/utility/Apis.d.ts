import { AxiosInstance } from 'axios';
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
}
interface DealItem {
    id: number;
    title: string;
}
interface BidData {
    amount: number;
    notes?: string;
}
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
export declare const api: AxiosInstance;
export declare const authAPI: {
    login: (email: string, password: string) => Promise<LoginResponse>;
    logout: () => Promise<void>;
    forgotPassword: (email: string) => Promise<{
        message: string;
    }>;
};
export declare const productsAPI: {
    getAll: () => Promise<ProductItem[]>;
    getById: (id: number) => Promise<ProductItem>;
};
export declare const dealsAPI: {
    getAll: () => Promise<DealItem[]>;
    createBid: (dealId: number, bidData: BidData) => Promise<any>;
};
export declare const commoditiesAPI: {
    /**
     * Get all commodities with their products
     * @param includeProducts Whether to include products in the response
     * @returns Promise with commodities data
     */
    getAll: (includeProducts?: boolean) => Promise<Commodity[]>;
    /**
     * Get hierarchical tree of categories and their subcategories
     * @returns Promise with tree-structured category data
     */
    getCategoryTree: () => Promise<TreeResponse>;
    /**
     * Updated method for the commoditiesAPI object
     * This handles the actual response format from your backend
     */
    getFilteredProducts: (category?: string, sub_category?: string) => Promise<Product[]>;
    /**
     * Get a specific commodity by ID
     * @param id Commodity ID
     * @param includeProducts Whether to include products in the response
     * @returns Promise with commodity data
     */
    getById: (id: number, includeProducts?: boolean) => Promise<Commodity>;
    /**
     * Get a specific commodity by slug
     * @param slug Commodity slug
     * @param includeProducts Whether to include products in the response
     * @returns Promise with commodity data
     */
    getBySlug: (slug: string, sub_category: string) => Promise<Commodity>;
    /**
     * Get products for a specific commodity
     * @param commodityId Commodity ID
     * @returns Promise with products data
     */
    getProducts: (commodityId: number) => Promise<CommodityProduct[]>;
    /**
     * Get a specific product by ID
     * @param productId Product ID
     * @returns Promise with product data
     */
    getProductById: (productId: number) => Promise<CommodityProduct>;
    /**
     * Get a specific product by slug
     * @param slug Product slug
     * @returns Promise with product data
     */
    getProductBySlug: (slug: string) => Promise<CommodityProduct>;
};
export declare const envConfig: {
    env: {
        apiUrl: any;
    };
};
export {};
