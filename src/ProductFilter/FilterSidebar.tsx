import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Image } from "react-bootstrap";
import grains1 from "../assets/grans-1.png";
import { commoditiesAPI } from "../utility/Apis";

// Import types from API
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

interface FilterSidebarProps {
    category: string | null;
    sub_category: string | null; // Changed from 'product' to match URL param name
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ category, sub_category }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>(category || "");
    const [selectedProduct, setSelectedProduct] = useState<string>(sub_category || ""); // Updated to use sub_category
    const [commodities, setCommodities] = useState<Commodity[]>([]);
    const [productTypes, setProductTypes] = useState<CommodityProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [categoryImage, setCategoryImage] = useState<string>(grains1);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Dummy data for fallback
    const dummyCommodities: Commodity[] = [
        {
            id: 1,
            name: "Grains",
            slug: "grains",
            image_url: grains1,
            products: [
                {
                    id: 1,
                    name: "Medium Grain",
                    slug: "medium-grain",
                    commodity_id: 1
                },
                {
                    id: 2,
                    name: "Japonica / Long A",
                    slug: "japonica-long-a",
                    commodity_id: 1
                },
                {
                    id: 3,
                    name: "Basmati Rice",
                    slug: "basmati-rice",
                    commodity_id: 1
                }
            ]
        },
        {
            id: 2,
            name: "Wheat",
            slug: "wheat",
            image_url: grains1,
            products: [
                {
                    id: 4,
                    name: "Durum Wheat",
                    slug: "durum-wheat",
                    commodity_id: 2
                },
                {
                    id: 5,
                    name: "Soft Wheat",
                    slug: "soft-wheat",
                    commodity_id: 2
                }
            ]
        }
    ];

    // Fetch all commodities on initial load
    useEffect(() => {
        const fetchCommodities = async (): Promise<void> => {
            try {
                setLoading(true);
                setError(null);
                const data = await commoditiesAPI.getAll();

                // Validate API response
                if (Array.isArray(data) && data.length > 0) {
                    setCommodities(data);
                } else {
                    console.warn("API returned empty or invalid data, using fallback");
                    setCommodities(dummyCommodities);
                }
            } catch (error) {
                console.error("Error fetching commodities:", error);
                setError("Failed to load categories");
                // Set dummy commodities if API fails
                setCommodities(dummyCommodities);
            } finally {
                setLoading(false);
            }
        };

        fetchCommodities();
    }, []);

    // When category changes, fetch product types for that category
    useEffect(() => {
        if (selectedCategory) {
            fetchProductTypes(selectedCategory);
        } else {
            setProductTypes([]);
        }
    }, [selectedCategory, commodities]); // Added commodities as dependency

    // Initial load - if category and product are provided via props
    useEffect(() => {
        if (category) {
            setSelectedCategory(category);
        }
        if (sub_category) { // Updated to use sub_category
            setSelectedProduct(sub_category);
        }
    }, [category, sub_category]);

    const fetchProductTypes = async (categoryName: string): Promise<void> => {
        try {
            setLoading(true);
            setError(null);

            // Find the commodity by name or slug from our local state first
            const commodity = commodities.find(
                c => c.slug === categoryName.toLowerCase() ||
                    c.name.toLowerCase() === categoryName.toLowerCase()
            );

            if (commodity && Array.isArray(commodity.products) && commodity.products.length > 0) {
                setProductTypes(commodity.products);

                // Set category image if available
                if (commodity.image_url) {
                    setCategoryImage(commodity.image_url);
                }
            } else {
                // If no matching commodity is found or has no products, try to fetch it directly
                try {
                    // Updated to match the signature in the API client
                    // Add a dummy sub_category parameter to avoid errors
                    const commodityData = await commoditiesAPI.getBySlug(
                        categoryName.toLowerCase(),
                        "" // Empty string as a placeholder for sub_category
                    );

                    if (commodityData && Array.isArray(commodityData.products)) {
                        setProductTypes(commodityData.products);

                        if (commodityData.image_url) {
                            setCategoryImage(commodityData.image_url);
                        }
                    } else {
                        // Fallback to dummy data if API response is invalid
                        throw new Error("Invalid API response structure");
                    }
                } catch (err) {
                    console.error(`Error fetching commodity by slug ${categoryName}:`, err);

                    // Find a matching dummy commodity to use as fallback
                    const dummyCommodity = dummyCommodities.find(
                        c => c.slug === categoryName.toLowerCase() ||
                            c.name.toLowerCase() === categoryName.toLowerCase()
                    );

                    if (dummyCommodity) {
                        setProductTypes(dummyCommodity.products);
                        setCategoryImage(dummyCommodity.image_url);
                    } else {
                        // If no matching dummy commodity, use the first one's products
                        setProductTypes(dummyCommodities[0].products);
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching product types:", error);
            setError("Failed to load product types");

            // Default to first dummy commodity's products as fallback
            const firstDummyCommodity = dummyCommodities[0];
            setProductTypes(firstDummyCommodity.products);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (): void => {
        // Build query parameters
        const params = new URLSearchParams();
        if (selectedCategory) {
            params.set("category", selectedCategory);
        }
        if (selectedProduct) {
            params.set("sub_category", selectedProduct); // Changed to sub_category to match API
        }

        // Navigate to the filter page with updated query parameters
        navigate(`/filter?${params.toString()}`);
    };

    const handleClear = (): void => {
        setSelectedCategory("");
        setSelectedProduct("");
        navigate("/filter");
    };

    return (
        <>
            <div className="filter-sdiebar">
                <h3 className="text-uppercase font-weight-bold mb-2">Characteristics</h3>
                {error && (
                    <div className="alert alert-danger mb-3">
                        {error}
                    </div>
                )}
                <div className="filter-wrappper">
                    <div className="prodcutheader d-flex align-items-center mb-3">
                        <Image src={categoryImage} alt="product" />
                        <h5>{selectedCategory || "All Categories"}</h5>
                    </div>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Type</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedProduct}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedProduct(e.target.value)}
                            disabled={loading}
                        >
                            <option value="">All</option>
                            {productTypes.map((product) => (
                                <option key={product.id} value={product.slug}>
                                    {product.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Status</Form.Label>
                        <Form.Control as="select" disabled={loading}>
                            <option value="">All</option>
                            <option value="24">Broken</option>
                            <option value="2">Husked / Brown</option>
                            <option value="1">Paddy</option>
                            <option value="23">Bleached / Semi-bleached</option>
                            <option value="314">Seed</option>
                            <option value="924">Parboiled</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Variety</Form.Label>
                        <Form.Control as="select" disabled={loading}>
                            <option value="">All</option>
                            <option value="24">Husked / Brown</option>
                            <option value="24">Broken</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Production Mode</Form.Label>
                        <Form.Control as="select" disabled={loading}>
                            <option value="">All</option>
                            <option value="24">Conventional Production </option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Packaging for Shipment</Form.Label>
                        <Form.Control as="select" disabled={loading}>
                            <option value="">All</option>
                            <option value="24">Conventional Production </option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price per weight unit (€)</Form.Label>
                        <div className="d-flex justify-content-between align-items-center">
                            <Form.Control type="text" disabled={loading} />
                            <span className="mx-2">to</span>
                            <Form.Control type="text" disabled={loading} />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Total Weight</Form.Label>
                        <div className="d-flex justify-content-between align-items-center">
                            <Form.Control type="text" disabled={loading} />
                            <span className="mx-2">to</span>
                            <Form.Control type="text" disabled={loading} />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Certifications</Form.Label>
                        <Form.Control as="select" disabled={loading}>
                            <option value="">All</option>
                            <option value="24">Conventional Production </option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Final Delivery Date</Form.Label>
                        <div className="d-flex justify-content-between align-items-center">
                            <Form.Control type="text" disabled={loading} />
                            <span className="mx-2">to</span>
                            <Form.Control type="text" disabled={loading} />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Logistics</Form.Label>
                        <Form.Control as="select" disabled={loading}>
                            <option value="">All</option>
                            <option value="24">Conventional Production </option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Country of destination</Form.Label>
                        <Form.Control as="select" disabled={loading}>
                            <option value="">All</option>
                            <option value="24">Uk </option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Country of Origin</Form.Label>
                        <Form.Control as="select" disabled={loading}>
                            <option value="">All</option>
                            <option value="24">Uk </option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check
                            className="form-group"
                            type="checkbox"
                            label="Immediate Delivery "
                            name="user[user_type]"
                            id="user_user_type_buyer"
                            value="Immediate Delivery"
                            disabled={loading}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <span className="font-weight-bold form-label">
                            <b>Select more characteristics</b>
                        </span>
                    </Form.Group>
                    <div className="d-flex align-items-center btnsgroup">
                        <Button
                            className="btn btn-header ms-0 border-0 btn btn-primary"
                            style={{ height: "42px" }}
                            onClick={handleSearch}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Search"}
                        </Button>
                        <Button
                            className="btn btn-primary outlinebtn"
                            onClick={handleClear}
                            disabled={loading}
                        >
                            Clear
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FilterSidebar;