import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import arrow from "./assets/arrow-left.png";
import FilterSidebar from "./ProductFilter/FilterSidebar";
import OrderBoard from "./ProductFilter/OrderBoard";
import { ProductDisplayItem } from "./utility/types.ts";

import { commoditiesAPI } from "./utility/Apis";

// Interface representing product from backend
interface CommodityProduct {
    id: number;
    name: string;
    slug?: string;
    price?: string;
    weight?: string;
    incoterm?: string;
    country?: string;
    verified?: boolean;
    expirationDate?: string;
    description?: string | null;
    image?: string | null;
    commodity_id?: number;
    created_at?: string;
    updated_at?: string;

}


const ProductFilter: React.FC = () => {
    const [products, setProducts] = useState<ProductDisplayItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [useDummyData, setUseDummyData] = useState<boolean>(false);
    const location = useLocation();

    const dummyProducts: ProductDisplayItem[] = [
        {
            id: 1,
            name: "Medium Grain, Seed, Arborío",
            price: "70.00",
            weight: "1000.0 MT",
            incoterm: "FCA",
            country: "UA",
            verified: true,
            expirationDate: "2025-03-18",
            image: "https://example.com/image1.jpg", // Dummy image URL

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
            image: "https://example.com/image2.jpg", // Dummy image URL

        }
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setUseDummyData(false);

                const params = new URLSearchParams(location.search);
                const category = params.get("category") || undefined;
                const sub_category = params.get("sub_category") || undefined;

                const data = await commoditiesAPI.getFilteredProducts(category, sub_category);

                if (Array.isArray(data) && data.length > 0) {
                    const mapped: ProductDisplayItem[] = data.map((item: CommodityProduct) => ({
                        id: item.id,
                        name: item.name,
                        price: item.price ?? "0.00",
                        weight: item.weight ?? "0.0 MT",
                        incoterm: item.incoterm ?? "-",
                        country: item.country ?? "-",
                        verified: item.verified ?? false,
                        expirationDate: item.expirationDate ?? "N/A",
                        image: item.image ? `${item.image}` : null,

                    }));

                    setProducts(mapped);
                } else {
                    console.warn("Empty response from API");
                    fallbackToDummy(sub_category);
                }
            } catch (error) {
                console.error("API Error:", error);
                fallbackToDummy();
            } finally {
                setLoading(false);
            }
        };

        const fallbackToDummy = (sub_category?: string | null) => {
            let fallback = dummyProducts;

            if (sub_category) {
                fallback = dummyProducts.filter(p =>
                    p.name.toLowerCase().includes(sub_category.toLowerCase()) ||
                    (p.name.toLowerCase().includes(sub_category.toLowerCase())?? false)
                );

                if (fallback.length === 0) fallback = dummyProducts;
            }

            setProducts(fallback);
            setUseDummyData(true);
        };

        fetchProducts();
    }, [location.search]);

    return (
        <section className="filter-sec">
            <Container>
                <Link to="/commodities" className="d-block bckbtn mb-3">
                    <Image className="icn-arrow--left d-inline" src={arrow} alt="Back arrow" />
                    <span className="d-inline ms-2">Back to Products</span>
                </Link>

                {useDummyData && (
                    <div className="alert alert-warning mb-3">
                        <strong>Note:</strong> Using fallback product data. API is unavailable.
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
    );
};

export default ProductFilter;
