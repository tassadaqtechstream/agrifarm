import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";

// Sample product data - replace with actual data from API
const sampleProducts = [
    {
        id: 1,
        name: "Fresh Tomatoes",
        image: "https://via.placeholder.com/300x200",
        price: 2.99,
        unit: "kg",
        seller: "Green Farms",
        location: "Riyadh, Saudi Arabia",
        rating: 4.5,
        isVerified: true,
    },
    {
        id: 2,
        name: "Organic Apples",
        image: "https://via.placeholder.com/300x200",
        price: 3.49,
        unit: "kg",
        seller: "Nature's Best",
        location: "Dubai, UAE",
        rating: 4.2,
        isVerified: true,
    },
    // Add more sample products as needed
];

const ProductGrid: React.FC = () => {
    return (
        <div>
            <Row xs={1} sm={2} lg={3} className="g-4">
                {sampleProducts.map((product) => (
                    <Col key={product.id}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProductGrid;
