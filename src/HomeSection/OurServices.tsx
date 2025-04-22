import { Container } from "react-bootstrap";

const OurServices = () => {
    return (
        <section id="global-reach" className="py-16 md:py-24 bg-earth-sand-light">
            <Container className="mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2 animate-slide-in-left">
                        <div className="inline-block bg-earth-gold/20 px-4 py-1 rounded-full text-earth-gold-dark font-medium mb-4">
                            GLOBAL NETWORK
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-earth-olive-dark mb-6">
                            Connecting GCC Agriculture with Global Markets
                        </h2>
                        <p className="text-lg text-earth-olive-dark/80 mb-8">
                            Our marketplace brings together buyers and sellers from across the GCC region and beyond,
                            creating opportunities for international trade and discovery of unique agricultural
                            products.
                        </p>
                        <div className="space-y-4">
                            {[
                                { flag: "🇦🇪", country: "UAE", percent: 80 },
                                { flag: "🇸🇦", country: "Saudi Arabia", percent: 70 },
                                { flag: "🇶🇦", country: "Qatar", percent: 60 },
                                { flag: "🇰🇼", country: "Kuwait", percent: 50 },
                                { flag: "🇧🇭", country: "Bahrain", percent: 40 },
                                { flag: "🇴🇲", country: "Oman", percent: 45 },
                                { flag: "🇯🇴", country: "Jordan", percent: 35 },
                                { flag: "🇪🇬", country: "Egypt", percent: 30 },
                            ].map((item) => (
                                <div key={item.country} className="flex items-center">
                                    <span className="text-2xl mr-3">{item.flag}</span>
                                    <span className="w-32 text-earth-olive-dark">{item.country}</span>
                                    <div className="flex-1 h-2 bg-earth-sand-dark/20 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-earth-olive rounded-full animate-slide-in-left"
                                            style={{ width: `${item.percent}%`, animationDelay: "0.5s" }}
                                        />
                                    </div>
                                    <span className="ml-3 text-earth-olive-dark font-medium">{item.percent}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 animate-fade-in">
                        <div className="relative">
                            <div className="w-full h-96 bg-earth-olive/5 rounded-full flex items-center justify-center">
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
                                    className="lucide lucide-globe h-48 w-48 text-earth-olive animate-pulse"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                                    <path d="M2 12h20" />
                                </svg>

                                {[
                                    {
                                        size: 4,
                                        color: "earth-terracotta",
                                        position: "top-1/4 left-1/3",
                                        delay: "0.2s",
                                        duration: "3s",
                                    },
                                    {
                                        size: 3,
                                        color: "earth-gold",
                                        position: "top-1/2 right-1/4",
                                        delay: "1s",
                                        duration: "2.5s",
                                    },
                                    {
                                        size: 2,
                                        color: "earth-olive",
                                        position: "bottom-1/4 left-1/3",
                                        delay: "0.5s",
                                        duration: "4s",
                                    },
                                ].map((ping, i) => (
                                    <div
                                        key={i}
                                        className={`absolute w-${ping.size} h-${ping.size} bg-${ping.color} rounded-full ${ping.position} animate-ping`}
                                        style={{ animationDuration: ping.duration, animationDelay: ping.delay }}
                                    />
                                ))}

                                {[
                                    { position: "top-1/5 left-1/3", text: "UAE 🇦🇪" },
                                    { position: "bottom-1/4 right-1/3", text: "Saudi Arabia 🇸🇦" },
                                    { position: "top-1/2 right-1/5", text: "Qatar 🇶🇦" },
                                ].map((label, i) => (
                                    <div
                                        key={i}
                                        className={`absolute ${label.position} bg-white px-2 py-1 rounded-md shadow-md text-xs text-earth-olive-dark`}
                                    >
                                        {label.text}
                                    </div>
                                ))}
                            </div>

                            <div
                                className="absolute -left-5 top-1/3 bg-white rounded-lg shadow-lg p-3 animate-slide-up"
                                style={{ animationDelay: "0.6s" }}
                            >
                                <p className="font-semibold text-earth-olive-dark">20+ Countries</p>
                                <p className="text-xs text-earth-olive-dark/70">Reach global markets</p>
                            </div>

                            <div
                                className="absolute -right-5 bottom-1/3 bg-white rounded-lg shadow-lg p-3 animate-slide-up"
                                style={{ animationDelay: "0.8s" }}
                            >
                                <p className="font-semibold text-earth-olive-dark">1000+ Traders</p>
                                <p className="text-xs text-earth-olive-dark/70">International network</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default OurServices;
