import { FC } from "react";

const Get: FC = () => {
    return (
        <section className="py-16 md:py-20 bg-earth-olive">
            <div className="container mx-auto px-4 md:px-6 text-white">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Built on Trust & Safety</h2>
                    <p className="text-lg text-white/80 max-w-3xl mx-auto">
                        We've created a secure ecosystem for agricultural trade with strict verification and quality
                        assurance at every step.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center animate-fade-in">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-shield-check h-8 w-8"
                            >
                                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                                <path d="m9 12 2 2 4-4"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Verified Sellers</h3>
                        <p className="text-white/80">
                            Every seller undergoes a thorough verification process before joining our marketplace.
                        </p>
                    </div>
                    <div
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center animate-fade-in"
                        style={{ animationDelay: "0.2s" }}
                    >
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-award h-8 w-8"
                            >
                                <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                                <circle cx="12" cy="8" r="6"></circle>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Quality Assurance</h3>
                        <p className="text-white/80">
                            Products must meet our stringent quality standards with regular inspections and reviews.
                        </p>
                    </div>
                    <div
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center animate-fade-in"
                        style={{ animationDelay: "0.4s" }}
                    >
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-truck h-8 w-8"
                            >
                                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                                <path d="M15 18H9"></path>
                                <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                                <circle cx="17" cy="18" r="2"></circle>
                                <circle cx="7" cy="18" r="2"></circle>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Logistics Support</h3>
                        <p className="text-white/80">
                            Streamlined logistics solutions to ensure your produce arrives fresh and on time.
                        </p>
                    </div>
                    <div
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center animate-fade-in"
                        style={{ animationDelay: "0.6s" }}
                    >
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-file-check h-8 w-8"
                            >
                                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                                <path d="m9 15 2 2 4-4"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Export Compliance</h3>
                        <p className="text-white/80">
                            Full support for documentation and compliance with international trade regulations.
                        </p>
                    </div>
                </div>
                <div className="mt-16 text-center animate-slide-up">
                    <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                        <div className="flex items-center space-x-4 text-sm md:text-base">
                            <span className="flex items-center">
                                <svg
                                    className="w-5 h-5 mr-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                                Secure Payments
                            </span>
                            <span className="hidden md:flex items-center">
                                <svg
                                    className="w-5 h-5 mr-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                                Dispute Resolution
                            </span>
                            <span className="flex items-center">
                                <svg
                                    className="w-5 h-5 mr-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                                24/7 Support
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Get;
