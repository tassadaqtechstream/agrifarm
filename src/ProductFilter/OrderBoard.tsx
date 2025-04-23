import React from "react";
import { Card, Col, Row, Badge, Spinner } from "react-bootstrap";
import defaultProductImage from "../assets/placeholder.png"; // Default image
import { ProductDisplayItem } from "../utility/types.ts";



interface OrderBoardProps {
    products: ProductDisplayItem[];
    loading: boolean;
}

const OrderBoard: React.FC<OrderBoardProps> = ({ products, loading }) => {
    const getImageUrl = (product: ProductDisplayItem) => {
        if (product.image) {
            console.log(product.image);
            if (product.image.startsWith("http")) {
                return product.image;
            } else {
                return `${import.meta.env.VITE_API_URL || ""}/${product.image}`;
            }
        }
        return defaultProductImage;
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
