import React from "react";

interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    unit: string;
    seller: string;
    location: string;
    rating: number;
    isVerified: boolean;
    isFeatured?: boolean;
    isOrganic?: boolean;
    stockStatus?: "In Stock" | "Limited Stock" | "Pre-Order";
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const getStockStatusColor = (status: string) => {
        switch (status) {
            case "In Stock":
                return "bg-green-100 text-green-800";
            case "Limited Stock":
                return "bg-amber-100 text-amber-800";
            case "Pre-Order":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-green-100 text-green-800";
        }
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm transition-transform hover:shadow-md hover:-translate-y-1 cursor-pointer">
            <div className="h-48 overflow-hidden relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
                {product.isFeatured && (
                    <div className="absolute top-2 right-2 bg-earth-gold text-earth-olive-dark text-xs font-semibold px-2 py-1 rounded-full">
                        Featured
                    </div>
                )}
                {product.isOrganic && (
                    <div className="absolute top-2 left-2 bg-earth-olive text-white text-xs font-semibold px-2 py-1 rounded-full">
                        Organic
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-earth-olive-dark mb-1 line-clamp-1">{product.name}</h3>
                <div className="flex items-center text-earth-olive-dark/70 text-sm mb-2">
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
                        className="lucide lucide-map-pin h-3 w-3 mr-1"
                    >
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{product.location}</span>
                </div>
                <div className="flex justify-between items-center">
                    <div className="font-semibold text-earth-terracotta">
                        ${product.price.toFixed(2)} <span className="text-xs font-normal">/ {product.unit}</span>
                    </div>
                    {product.stockStatus && (
                        <div
                            className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStockStatusColor(
                                product.stockStatus
                            )}`}
                        >
                            {product.stockStatus}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
