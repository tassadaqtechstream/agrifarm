import Award from "./HomeSection/Award";
import FeedBack from "./HomeSection/FeedBack";
import Get from "./HomeSection/Get";
import Hero from "./HomeSection/Hero";
import HowitWorks from "./HomeSection/HowitWorks";
import Key from "./HomeSection/Key";
import OurServices from "./HomeSection/OurServices";
import OurSolution from "./HomeSection/OurSolution";
import OurValue from "./HomeSection/OurValue";
import PremiumPartners from "./HomeSection/PremiumPartners";
import Pricing from "./HomeSection/Pricing";

export default function Home() {
    return (
        <>
            <Hero />
            <OurSolution />
            <OurValue />
            <HowitWorks />
            <Get />
            <OurServices />
            <PremiumPartners />
            <Pricing />
            <Key />
            <Award />
            <FeedBack />

        </>
    );
}
