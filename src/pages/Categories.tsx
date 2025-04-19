import React from "react";
import { Container } from "react-bootstrap";
import SearchBar from "../components/categories/SearchBar";
import CategoryFilters from "../components/categories/CategoryFilters";
import ProductGrid from "../components/categories/ProductGrid";
import FilterSidebar from "../components/categories/FilterSidebar";

const Categories: React.FC = () => {
    return (
        <main className="flex-grow">
            <div className="bg-earth-sand-light py-10 md:py-16">
                <Container className="px-4 md:px-6">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-earth-olive-dark mb-4 text-center">
                        Browse Agricultural Products
                    </h1>
                    <p className="text-lg text-earth-olive-dark/80 max-w-3xl mx-auto text-center mb-8">
                        Discover fresh, quality agricultural products from trusted suppliers across the GCC region
                    </p>
                    <SearchBar />
                </Container>
            </div>

            <div className="py-6 bg-white border-b">
                <Container className="px-4 md:px-6">
                    <CategoryFilters />
                </Container>
            </div>

            <div className="py-8 md:py-12 bg-gray-50">
                <Container className="px-4 md:px-6">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/4 lg:w-1/5 ">
                            <FilterSidebar />
                        </div>
                        <div className="md:w-3/4 lg:w-4/5">
                            <ProductGrid />
                        </div>
                    </div>
                </Container>
            </div>
        </main>
    );
};

export default Categories;
