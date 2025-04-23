import React from "react";

const HowItWorks: React.FC = () => {
    return (
        <div className="bg-white rounded-xl p-8 shadow-sm mb-12">
            <h2 className="text-2xl font-bold text-earth-olive-dark mb-8 text-center">
                How Pre-Harvest Contracts Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                    <div className="bg-earth-terracotta/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                        <span className="text-xl font-bold text-earth-terracotta">1</span>
                    </div>
                    <h3 className="font-semibold text-earth-olive-dark mb-2">Browse & Select</h3>
                    <p className="text-sm text-earth-olive-dark/70">
                        Browse available pre-harvest contracts across different categories and regions. Review yields,
                        prices, and harvest dates.
                    </p>
                </div>
                <div className="text-center">
                    <div className="bg-earth-terracotta/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                        <span className="text-xl font-bold text-earth-terracotta">2</span>
                    </div>
                    <h3 className="font-semibold text-earth-olive-dark mb-2">Reserve & Pay</h3>
                    <p className="text-sm text-earth-olive-dark/70">
                        Secure your allocation with a deposit or full payment. All transactions are secured and
                        protected by our platform.
                    </p>
                </div>
                <div className="text-center">
                    <div className="bg-earth-terracotta/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                        <span className="text-xl font-bold text-earth-terracotta">3</span>
                    </div>
                    <h3 className="font-semibold text-earth-olive-dark mb-2">Receive at Harvest</h3>
                    <p className="text-sm text-earth-olive-dark/70">
                        Track cultivation progress and receive your products when harvested. Choose delivery options or
                        export documentation.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
