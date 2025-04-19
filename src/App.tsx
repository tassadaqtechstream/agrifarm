import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Layout from "./Layout";
import Home from "./Home";
import Commodities from "./Commodities";
import CropConverter from "./CropConverter";
import Login from "./LoginUser/Login";
import ForgetPassword from "./LoginUser/ForgetPassword";
// import Confirmation from "./LoginUser/Confirmation";
import SignUp from "./LoginUser/SignUp";
import SignUpBuyer from "./LoginUser/SignUpBuyer";
import SignUpSeller from "./LoginUser/SignUpSeller";
// import TopHeader from "./header/TopHeader";
// import MainHeader from "./header/MainHeader";
import ProductFilter from "./ProductFilter";
import AddOffer from "./AddOffer";
import AllDeals from "./AllDeals";
import Bidpage from "./Bidpage";
import OurCompany from "./OurCompany";
import OurPeople from "./OurPeople";
import Faq from "./Faq";
import TranslationTest from "./components/TranslationTest";
import "./config/i18n"; // Import i18n configuration
import "./App.css";
import "./newtheme.css";

const App: React.FC = () => {
    useEffect(() => {
        // Set initial language and direction
        const savedLang = localStorage.getItem("i18nextLng") || "en";
        document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = savedLang;

        // Log the current language for debugging
        console.log("Current language:", savedLang);
    }, []);

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="commodities" element={<Commodities />} />
                        <Route path="tools" element={<CropConverter />} />
                        <Route path="filter" element={<ProductFilter />} />
                        <Route path="new-offer" element={<AddOffer />} />
                        <Route path="deals" element={<AllDeals />} />
                        <Route path="bid" element={<Bidpage />} />
                        <Route path="comapny" element={<OurCompany />} />
                        <Route path="about" element={<OurPeople />} />
                        <Route path="faq" element={<Faq />} />
                        <Route path="test-translation" element={<TranslationTest />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/forget" element={<ForgetPassword />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/signup/buyer" element={<SignUpBuyer />} />
                        <Route path="/signup/seller" element={<SignUpSeller />} />
                    </Route>

                    {/* <Route path="/confirmation" element={<Confirmation />} /> */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
