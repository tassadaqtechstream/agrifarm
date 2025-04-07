import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import arrow from "./assets/arrow-left.png";
import FilterSidebar from "./ProductFilter/FilterSidebar";
import OrderBoard from "./ProductFilter/OrderBoard";
import { commoditiesAPI } from "./utility/Apis";

// Product interface matching your backend response
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

const ProductFilter: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [useDummyData, setUseDummyData] = useState<boolean>(false);
    const location = useLocation();

    // Dummy products for fallback - matches the structure from your backend
    const dummyProducts: Product[] = [
        {
            id: 1,
            name: "Medium Grain, Seed, Arborío",
            price: "70.00",
            weight: "1000.0 MT",
            incoterm: "FCA",
            country: "UA",
            verified: true,
            expirationDate: "2025-03-18",
            apiData: {
                id: 1,
                name: "Medium Grain, Seed, Arborío",
                slug: "medium-grain-seed-arborio",
                description: null,
                image_url: null,
                commodity_id: 1,
                created_at: "2025-03-18T00:00:00.000000Z",
                updated_at: "2025-03-18T00:00:00.000000Z"
            }
        },
        {
            id: 2,
            name: "Japonica / Long A",
            price: "80.00",
            weight: "800.0 MT",
            incoterm: "EXW",
            country: "IT",
            verified: true,
            expirationDate: "2025-03-22",
            apiData: {
                id: 2,
                name: "Japonica / Long A",
                slug: "japonica-long-a",
                description: null,
                image_url: null,
                commodity_id: 1,
                created_at: "2025-03-18T00:00:00.000000Z",
                updated_at: "2025-03-18T00:00:00.000000Z"
            }
        }
    ];

    useEffect(() => {
        const fetchProducts = async (): Promise<void> => {
            try {
                setLoading(true);
                setUseDummyData(false);

                // Get query parameters from URL
                const queryParams = new URLSearchParams(location.search);
                const category = queryParams.get("category");
                const sub_category = queryParams.get("sub_category");

                try {
                    // Use the API to fetch filtered products
                    const data = await commoditiesAPI.getFilteredProducts(
                        category || undefined,
                        sub_category || undefined
                    );

                    if (Array.isArray(data) && data.length > 0) {
                        setProducts(data);
                    } else {
                        // If API returns empty data, throw error to use dummy data
                        throw new Error("No products found or empty response");
                    }
                } catch (apiError) {
                    console.error("API call failed:", apiError);

                    // Filter dummy products if sub_category is specified
                    let filteredProducts = [...dummyProducts];

                    if (sub_category) {
                        filteredProducts = dummyProducts.filter(p =>
                            p.name.toLowerCase().includes(sub_category.toLowerCase()) ||
                            p.apiData.slug.includes(sub_category.toLowerCase())
                        );

                        // If no matches, fallback to all dummy products
                        if (filteredProducts.length === 0) {
                            filteredProducts = dummyProducts;
                        }
                    }

                    setProducts(filteredProducts);
                    setUseDummyData(true);
                }
            } catch (err) {
                console.error("Unhandled error in fetchProducts:", err);
                setProducts(dummyProducts);
                setUseDummyData(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [location.search]);

    return (
        <>
            <section className="filter-sec">
                <Container>
                    <Link to="/commodities" className="d-block bckbtn mb-3">
                        <Image className="icn-arrow--left d-inline" src={arrow} alt="Back arrow" />
                        <span className="d-inline ms-2">Back to Products</span>
                    </Link>

                    {useDummyData && (
                        <div className="alert alert-warning mb-3">
                            <strong>Note:</strong> Using sample product data. API connection failed.
                        </div>
                    )}

                    <Row>
                        <Col md={3}>
                            <FilterSidebar
                                category={new URLSearchParams(location.search).get("category")}
                                sub_category={new URLSearchParams(location.search).get("sub_category")}
                            />
                        </Col>

                        <Col md={9}>
                            <OrderBoard
                                products={products}
                                loading={loading}
                            />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default ProductFilter;