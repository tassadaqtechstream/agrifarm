import React from "react";
import PreHarvestHero from "../components/pre-harvest/PreHarvestHero";
import PreHarvestTabs from "../components/pre-harvest/PreHarvestTabs";
import HowItWorks from "../components/pre-harvest/HowItWorks";
import FAQ from "../components/pre-harvest/FAQ";

const PreHarvest: React.FC = () => {
    return (
        <main className="container mx-auto py-8 px-4 md:px-6">
            <PreHarvestHero />
            <PreHarvestTabs />
            <HowItWorks />
            <FAQ />
        </main>
    );
};

export default PreHarvest;
