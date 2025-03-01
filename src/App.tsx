import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="commodities" element={<Commodities />} />
                    <Route path="tools" element={<CropConverter />} />
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
    );
}

export default App;
