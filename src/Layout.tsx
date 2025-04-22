import { Outlet } from "react-router-dom";
// import TopHeader from "./header/TopHeader.tsx";
import MainHeader from "./header/MainHeader.tsx";
import Footer from "./HomeSection/Footer.tsx";

const Layout = () => {
    return (
        <>
            {/* <TopHeader /> */}
            <MainHeader />
            <main>
                <Outlet /> {/* This renders child components */}
            </main>
            <Footer />
        </>
    );
};

export default Layout;
