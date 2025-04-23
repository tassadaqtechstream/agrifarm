import React, { useState, useEffect } from "react";
import { Button, Image } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { commoditiesAPI } from "../utility/Apis.ts"; // Import the API service

// Fallback images
import grains1 from "../assets/grans-1.png";
import grains2 from "../assets/grans-2.png";
import grains3 from "../assets/grans-3.png";
import grains4 from "../assets/grans-4.png";

// Interface definitions
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

interface FormattedCommodity {
    key: string;
    id: number;
    name: string;
    image: string;
    products: CommodityProduct[];
}

// Fallback data in case API fails
const fallbackCommodities: FormattedCommodity[] = [
    {
        key: "grains",
        id: 1,
        name: "Grains",
        image: grains1,
        products: [
            { id: 1, name: "Rice", slug: "rice", commodity_id: 1 },
            { id: 2, name: "Wheat", slug: "wheat", commodity_id: 1 },
            { id: 3, name: "Corn", slug: "corn", commodity_id: 1 },
            { id: 4, name: "Barley", slug: "barley", commodity_id: 1 },
        ],
    },
    {
        key: "nuts",
        id: 2,
        name: "Nuts",
        image: grains2,
        products: [
            { id: 5, name: "Almonds", slug: "almonds", commodity_id: 2 },
            { id: 6, name: "Cashews", slug: "cashews", commodity_id: 2 },
            { id: 7, name: "Walnuts", slug: "walnuts", commodity_id: 2 },
            { id: 8, name: "Pistachios", slug: "pistachios", commodity_id: 2 },
            { id: 9, name: "Peanuts", slug: "peanuts", commodity_id: 2 },
        ],
    },
    {
        key: "coffee",
        id: 3,
        name: "Green Coffee",
        image: grains3,
        products: [
            { id: 10, name: "Arabica", slug: "arabica", commodity_id: 3 },
            { id: 11, name: "Robusta", slug: "robusta", commodity_id: 3 },
            { id: 12, name: "Liberica", slug: "liberica", commodity_id: 3 },
            { id: 13, name: "Excelsa", slug: "excelsa", commodity_id: 3 },
        ],
    },
    {
        key: "oils",
        id: 4,
        name: "Olive Oil & Other Oils",
        image: grains4,
        products: [
            { id: 14, name: "Olive Oil", slug: "olive-oil", commodity_id: 4 },
            { id: 15, name: "Coconut Oil", slug: "coconut-oil", commodity_id: 4 },
            { id: 16, name: "Sunflower Oil", slug: "sunflower-oil", commodity_id: 4 },
            { id: 17, name: "Canola Oil", slug: "canola-oil", commodity_id: 4 },
            { id: 18, name: "Sesame Oil", slug: "sesame-oil", commodity_id: 4 },
        ],
    },
];

const CommoditiesTabs: React.FC = () => {
    const { t } = useTranslation();
    const [commodities, setCommodities] = useState<FormattedCommodity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activeKey, setActiveKey] = useState<string>("");

    useEffect(() => {
        // Fetch commodities data from API
        const fetchCommodities = async () => {
            try {
                setLoading(true);

                // Use your existing API utility to get the tree data
                const treeData: TreeResponse = await commoditiesAPI.getCategoryTree();

                if (treeData && treeData.tree && treeData.tree.length > 0) {
                    // Format the tree data to match the component's expected structure
                    const formattedData: FormattedCommodity[] = treeData.tree.map((item) => {
                        // Convert children to products format
                        const products: CommodityProduct[] = item.children.map((child) => ({
                            id: child.id,
                            name: child.name,
                            slug: child.slug,
                            description: child.description,
                            image_url: child.image || undefined,
                            commodity_id: item.id,
                        }));

                        return {
                            key: item.slug,
                            id: item.id,
                            name: item.name,
                            image: item.image || getFallbackImage(item.slug),
                            products: products,
                        };
                    });

                    setCommodities(formattedData);

                    // Set default active key to first item
                    setActiveKey(formattedData[0].key);
                } else {
                    throw new Error("No commodities data received");
                }
            } catch (err) {
                console.error("Error fetching commodities:", err);
                setError(t("common.error"));

                // Use fallback data if API fails
                setCommodities(fallbackCommodities);
                setActiveKey(fallbackCommodities[0].key);
            } finally {
                setLoading(false);
            }
        };

        fetchCommodities();
    }, [t]);

    // Helper function to get fallback image based on commodity slug
    const getFallbackImage = (slug: string): string => {
        switch (slug) {
            case "grains":
            case "Grains":
                return grains1;
            case "nuts":
            case "Nuts":
                return grains2;
            case "coffee":
            case "Coffee":
            case "Green Coffee":
                return grains3;
            case "oils":
            case "Oils":
            case "Olive Oil & Other Oils":
                return grains4;
            default:
                return grains1;
        }
    };

    // Helper function to get translated name for a commodity
    const getTranslatedName = (key: string): string => {
        const translationKey = `commodities.${key}`;
        const translation = t(translationKey);
        return translation === translationKey ? key : translation;
    };

    if (loading) {
        return (
            <div className="text-center p-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">{t("common.loading")}</span>
                </div>
                <p className="mt-2">{t("common.loading")}</p>
            </div>
        );
    }

    return (
        <>
            {error && <div className="alert alert-warning">{error}</div>}

            <Tab.Container id="commodities-tabs" activeKey={activeKey} onSelect={(k) => k && setActiveKey(k)}>
                <Row>
                    <Col sm={12}>
                        <Nav variant="pills" className="commodities-tabs justify-content-center">
                            {commodities.map((commodity) => (
                                <Nav.Item key={commodity.key}>
                                    <Nav.Link eventKey={commodity.key}>
                                        <Image src={commodity.image} alt={getTranslatedName(commodity.key)} />
                                        {getTranslatedName(commodity.key)}
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                        <hr className="hr_separator" />
                    </Col>
                    <Col sm={12}>
                        <Tab.Content>
                            {commodities.map((commodity) => (
                                <Tab.Pane key={commodity.key} eventKey={commodity.key}>
                                    <Row className="justify-content-center">
                                        {commodity.products.map((product) => (
                                            <Col key={product.id} md={2} className="p-3">
                                                <Link
                                                    to={`/filter?category=${commodity.key}&sub_category=${product.slug}`}
                                                    className="commodities-card d-block text-center"
                                                >
                                                    <Image
                                                        src={product.image_url || commodity.image}
                                                        alt={getTranslatedName(product.slug)}
                                                    />
                                                    <p>{getTranslatedName(product.slug)}</p>
                                                </Link>
                                            </Col>
                                        ))}
                                    </Row>
                                </Tab.Pane>
                            ))}
                        </Tab.Content>
                    </Col>
                    <Col sm={12}>
                        <div className="text-center commodities-text-wrapper" style={{ marginTop: "40px" }}>
                            <h6 className="mb-3 text-white text-center">{t("commodities.cantFind")}</h6>
                            <Button className="btn btn-header btn-white px-5 m-0">{t("commodities.talkToUs")}</Button>
                        </div>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    );
};

export default CommoditiesTabs;
