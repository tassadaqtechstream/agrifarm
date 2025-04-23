import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Filter, Calendar, DollarSign, Leaf, Users, Map, Tag } from "lucide-react";
import { Image } from "react-bootstrap";

interface Product {
    id: number;
    title: string;
    category: string;
    location: string;
    harvestDate: string;
    price: string;
    yield: string;
    seller: string;
    description: string;
    image: string;
}

const products: Product[] = [
    {
        id: 1,
        title: "Premium Dates Harvest",
        category: "Dates",
        location: "Al-Ahsa, Saudi Arabia",
        harvestDate: "August 2025",
        price: "$15.99 per kg",
        yield: "15,000 kg",
        seller: "Al-Ahsa Date Farms",
        description:
            "Pre-purchase premium Khalas dates from our certified organic palm gardens. These dates will be harvested at peak ripeness and processed according to international standards.",
        image: "https://images.unsplash.com/photo-1583513702439-2e611c58e93d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    },
    {
        id: 2,
        title: "Premium Dates Harvest",
        category: "Fruits",
        location: "Al-Ahsa, Saudi Arabia",
        harvestDate: "August 2025",
        price: "$15.99 per kg",
        yield: "15,000 kg",
        seller: "Al-Ahsa Date Farms",
        description:
            "Pre-purchase premium Khalas dates from our certified organic palm gardens. These dates will be harvested at peak ripeness and processed according to international standards.",
        image: "https://images.unsplash.com/photo-1583513702439-2e611c58e93d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    },
    {
        id: 3,
        title: "Premium Dates Harvest",
        category: "Grains",
        location: "Al-Ahsa, Saudi Arabia",
        harvestDate: "August 2025",
        price: "$15.99 per kg",
        yield: "15,000 kg",
        seller: "Al-Ahsa Date Farms",
        description:
            "Pre-purchase premium Khalas dates from our certified organic palm gardens. These dates will be harvested at peak ripeness and processed according to international standards.",
        image: "https://images.unsplash.com/photo-1583513702439-2e611c58e93d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    },
    {
        id: 4,
        title: "Premium Dates Harvest",
        category: "Vegetables",
        location: "Al-Ahsa, Saudi Arabia",
        harvestDate: "August 2025",
        price: "$15.99 per kg",
        yield: "15,000 kg",
        seller: "Al-Ahsa Date Farms",
        description:
            "Pre-purchase premium Khalas dates from our certified organic palm gardens. These dates will be harvested at peak ripeness and processed according to international standards.",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    // Add other products here...
];

const PreHarvestTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState("all");

    // Filter products based on active tab
    const filteredProducts = products.filter((product) => {
        if (activeTab === "all") return true;
        return product.category.toLowerCase() === activeTab;
    });

    return (
        <div className="mb-8">
            <div className="items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-full max-w-xl mx-auto grid grid-cols-4 h-auto mb-8">
                {["All", "Fruits", "Vegetables", "Grains"].map((tab) => (
                    <button
                        key={tab.toLowerCase()}
                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 text-sm font-medium py-3 ${
                            activeTab === tab.toLowerCase() ? "bg-background text-foreground shadow-sm" : ""
                        }`}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-earth-olive-dark">Available Pre-Harvest Opportunities</h2>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                            <Image
                                src={product.image}
                                alt={product.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5 p-6 pb-2">
                            <div className="flex items-center text-xs font-medium text-earth-terracotta mb-1">
                                <Tag className="h-3 w-3 mr-1" />
                                <span>{product.category}</span>
                            </div>
                            <h3 className="font-semibold tracking-tight text-xl text-earth-olive-dark">
                                {product.title}
                            </h3>
                            <p className="text-muted-foreground flex items-center text-sm">
                                <Map className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                                {product.location}
                            </p>
                        </div>
                        <div className="p-6 pt-0 pb-4">
                            <div className="grid grid-cols-2 gap-y-3 text-sm mb-4">
                                <div className="flex items-start">
                                    <Calendar className="h-4 w-4 mr-2 text-earth-terracotta flex-shrink-0" />
                                    <div>
                                        <div className="font-medium text-earth-olive-dark">Harvest Date</div>
                                        <div className="text-earth-olive-dark/70">{product.harvestDate}</div>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <DollarSign className="h-4 w-4 mr-2 text-earth-terracotta flex-shrink-0" />
                                    <div>
                                        <div className="font-medium text-earth-olive-dark">Price</div>
                                        <div className="text-earth-olive-dark/70">{product.price}</div>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Leaf className="h-4 w-4 mr-2 text-earth-terracotta flex-shrink-0" />
                                    <div>
                                        <div className="font-medium text-earth-olive-dark">Est. Yield</div>
                                        <div className="text-earth-olive-dark/70">{product.yield}</div>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Users className="h-4 w-4 mr-2 text-earth-terracotta flex-shrink-0" />
                                    <div>
                                        <div className="font-medium text-earth-olive-dark">Seller</div>
                                        <div className="text-earth-olive-dark/70">{product.seller}</div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-earth-olive-dark/80 line-clamp-3">{product.description}</p>
                        </div>
                        <div className="items-center p-6 pt-0 flex justify-between">
                            <Link
                                to={`/pre-harvest/${product.id}`}
                                className="text-earth-terracotta text-sm font-medium hover:underline"
                            >
                                View Details
                            </Link>
                            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium text-primary-foreground h-10 px-4 py-2 bg-earth-terracotta hover:bg-earth-terracotta-dark">
                                Reserve Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PreHarvestTabs;
