import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Layout from "./Layout";
import Home from "./Home";
import Commodities from "./Commodities";
import CropConverter from "./CropConverter";
import Login from "./LoginUser/Login";
import ForgetPassword from "./LoginUser/ForgetPassword";
import Confirmation from "./LoginUser/Confirmation";
import SignUp from "./LoginUser/SignUp";
import TopHeader from "./header/TopHeader";
import MainHeader from "./header/MainHeader";
import ProductFilter from "./ProductFilter";
import AddOffer from "./AddOffer";
import AllDeals from "./AllDeals";
import Bidpage from "./Bidpage";
import OurCompany from "./OurCompany";
import OurPeople from "./OurPeople";
import Faq from "./Faq";

const App: React.FC = () => {
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
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/forget" element={<ForgetPassword />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                    <Route
                        path="/signup"
                        element={
                            <>
                                <TopHeader />
                                <MainHeader />
                                <SignUp />
                            </>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;