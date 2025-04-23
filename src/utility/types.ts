// Common type definitions for the application

export interface Product {
    id: number;
    name: string;
    price: string;
    weight: string;
    incoterm: string;
    country: string;
    verified: boolean;
    expirationDate: string;
}

export interface Category {
    id: number;
    name: string;
    description?: string;
    imageUrl?: string;
}

export interface ProductType {
    id: number;
    name: string;
    categoryId: number;
}

export interface FilterParams {
    category?: string;
    product?: string;
    productStatus?: string;
    variety?: string;
    productionMode?: string;
    packaging?: string;
    minPrice?: number;
    maxPrice?: number;
    minWeight?: number;
    maxWeight?: number;
    certification?: string;
    minDeliveryDate?: string;
    maxDeliveryDate?: string;
    logistics?: string;
    destinationCountry?: string;
    originCountry?: string;
    immediateDelivery?: boolean;
}

// API Response types
export interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
    success: boolean;
}

export interface ProductsResponse extends ApiResponse<Product[]> {
    total: number;
    page: number;
    pageSize: number;
}

export interface ProductDisplayItem {
    id: number;
    name: string;
    price: string;
    weight: string;
    incoterm: string;
    country: string;
    verified: boolean;
    expirationDate: string;
    image: string | null;

}
