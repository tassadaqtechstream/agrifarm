import React from "react";
import { Card, Col, Row, Badge, Spinner } from "react-bootstrap";
import defaultProductImage from "../assets/placeholder.png"; // Add a default image

// Interface for product data - matches your backend response
interface Product {
    id: number;
    name: string;
    price: string;
    weight: string;
    incoterm: string;
    country: string;
    verified: boolean;
    expirationDate: string;
    apiData: {
        id: number;
        name: string;
        slug: string;
        description: string | null;
        image_url: string | null;
        commodity_id: number;
        created_at: string;
        updated_at: string;
    };
}

interface OrderBoardProps {
    products: Product[];
    loading: boolean;
}

const OrderBoard: React.FC<OrderBoardProps> = ({ products, loading }) => {
    // Function to get image URL with fallback
    const getImageUrl = (product: Product) => {
        if (product.apiData?.image_url) {
            // Check if the image URL is a relative path or full URL
            if (product.apiData.image_url.startsWith('http')) {
                return product.apiData.image_url;
            } else {
                // For relative paths, prepend the API base URL
                return `${import.meta.env.VITE_API_URL || ''}/${product.apiData.image_url}`;
            }
        }
        return defaultProductImage; // Fallback to default image
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p className="mt-2">Loading products...</p>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="alert alert-info">
                No products found matching your criteria. Try adjusting your filters.
            </div>
        );
    }

    return (
        <div className="order-board">
            <h4 className="mb-4">Available Products ({products.length})</h4>
            <Row>
                {products.map((product) => (
                    <Col md={4} className="mb-4" key={product.id}>
                        <Card className="product-card h-100">
                            <div className="product-img-container">
                                <img
                                    src={getImageUrl(product)}
                                    alt={product.name}
                                    className="card-img-top product-img"
                                    onError={(e) => {
                                        // Fallback if image fails to load
                                        (e.target as HTMLImageElement).src = defaultProductImage;
                                    }}
                                />
                            </div>
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <div className="product-details">
                                    <p className="price">€{product.price} / MT</p>
                                    <p className="weight">Quantity: {product.weight}</p>
                                    <p className="incoterm">
                                        <Badge bg="secondary">{product.incoterm}</Badge>
                                        <Badge bg="info" className="ms-2">{product.country}</Badge>
                                    </p>
                                    {product.verified && (
                                        <Badge bg="success" className="verified-badge">
                                            Verified
                                        </Badge>
                                    )}
                                    <p className="expiration">
                                        <small>Available until: {product.expirationDate}</small>
                                    </p>
                                </div>
                                <button className="btn btn-primary mt-2 w-100">View Details</button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default OrderBoard;