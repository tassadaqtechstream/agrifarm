import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";

// Sample product data - replace with actual data from API
const sampleProducts = [
    {
        id: 1,
        name: "Fresh Tomatoes",
        image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        price: 2.99,
        unit: "kg",
        seller: "Green Farms",
        location: "Riyadh, Saudi Arabia",
        rating: 4.5,
        isVerified: true,
        isFeatured: true,
        isOrganic: true,
    },
    {
        id: 2,
        name: "Organic Apples",
        image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        price: 3.49,
        unit: "kg",
        seller: "Nature's Best",
        location: "Dubai, UAE",
        rating: 4.2,
        isVerified: true,
        isOrganic: true,
    },
    {
        id: 3,
        name: "Organic Apples",
        image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        price: 3.49,
        unit: "kg",
        seller: "Nature's Best",
        location: "Dubai, UAE",
        rating: 4.2,
        isVerified: true,
        isFeatured: true,
    },
    {
        id: 4,
        name: "Organic Apples",
        image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        price: 3.49,
        unit: "kg",
        seller: "Nature's Best",
        location: "Dubai, UAE",
        rating: 4.2,
        isVerified: true,
    },
    {
        id: 5,
        name: "Organic Apples",
        image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        price: 3.49,
        unit: "kg",
        seller: "Nature's Best",
        location: "Dubai, UAE",
        rating: 4.2,
        isVerified: true,
        isFeatured: true,
        isOrganic: true,
    },
    // Add more sample products as needed
];

const ProductGrid: React.FC = () => {
    return (
        <div>
            <Row xs={1} sm={2} lg={4} className="g-4">
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
