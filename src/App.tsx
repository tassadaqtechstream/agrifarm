import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Commodities from "./Commodities";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="commodities" element={<Commodities />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
