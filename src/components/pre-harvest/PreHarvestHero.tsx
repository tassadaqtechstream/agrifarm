import React from "react";
import { Calendar, TrendingUp, Users } from "lucide-react";

const PreHarvestHero: React.FC = () => {
    return (
        <div className="py-8 md:py-12 text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-earth-olive-dark mb-4">Pre-Harvest Marketplace</h1>
            <p className="text-lg text-earth-olive-dark/80 mb-8">
                Secure agricultural produce before it's harvested. Lock in prices, secure supply, and build direct
                relationships with producers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="bg-earth-terracotta/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                        <Calendar className="h-6 w-6 text-earth-terracotta" />
                    </div>
                    <h3 className="font-semibold text-earth-olive-dark mb-2">Future Harvests</h3>
                    <p className="text-sm text-earth-olive-dark/70">
                        Secure produce that will be harvested in the coming months at pre-agreed prices.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="bg-earth-terracotta/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                        <TrendingUp className="h-6 w-6 text-earth-terracotta" />
                    </div>
                    <h3 className="font-semibold text-earth-olive-dark mb-2">Price Stability</h3>
                    <p className="text-sm text-earth-olive-dark/70">
                        Lock in prices now to avoid market fluctuations and ensure budget predictability.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="bg-earth-terracotta/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                        <Users className="h-6 w-6 text-earth-terracotta" />
                    </div>
                    <h3 className="font-semibold text-earth-olive-dark mb-2">Direct Relationships</h3>
                    <p className="text-sm text-earth-olive-dark/70">
                        Build direct connections with producers and influence cultivation practices.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PreHarvestHero;
