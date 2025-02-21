import { Button, Image } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { Link } from "react-router-dom";
import grains1 from "../assets/grans-1.png";
import grains2 from "../assets/grans-2.png";
import grains3 from "../assets/grans-3.png";
import grains4 from "../assets/grans-4.png";

const commodities = [
    { key: "grains", name: "Grains", image: grains1, products: ["Rice", "Wheat", "Corn", "Barley"] },
    { key: "nuts", name: "Nuts", image: grains2, products: ["Almonds", "Cashews", "Walnuts", "Pistachios", "Peanuts"] },
    { key: "coffee", name: "Green Coffee", image: grains3, products: ["Arabica", "Robusta", "Liberica", "Excelsa"] },
    {
        key: "oils",
        name: "Olive Oil & Other Oils",
        image: grains4,
        products: ["Olive Oil", "Coconut Oil", "Sunflower Oil", "Canola Oil", "Sesame Oil"],
    },
];

function CommoditiesTabs() {
    return (
        <Tab.Container id="commodities-tabs" defaultActiveKey={commodities[0].key}>
            <Row>
                <Col sm={12}>
                    <Nav variant="pills" className="commodities-tabs justify-content-center">
                        {commodities.map((commodity) => (
                            <Nav.Item key={commodity.key}>
                                <Nav.Link eventKey={commodity.key}>
                                    <Image src={commodity.image} alt={commodity.name} />
                                    {commodity.name}
                                </Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                    <hr className="hr_separator" />
                </Col>
                <Col sm={12}>
                    <Tab.Content>
                        {commodities.map((commodity) => (
                            <Tab.Pane key={commodity.key} eventKey={commodity.key}>
                                <Row className="justify-content-center">
                                    {commodity.products.map((product, index) => (
                                        <Col key={index} md={2} className="p-3">
                                            <Link to="/" className="commodities-card d-block text-center">
                                                <Image src={commodity.image} alt={product} />
                                                <p>{product}</p>
                                            </Link>
                                        </Col>
                                    ))}
                                </Row>
                            </Tab.Pane>
                        ))}
                    </Tab.Content>
                </Col>
                <Col sm={12}>
                    <div className="text-center commodities-text-wrapper" style={{ marginTop: "40px" }}>
                        <h6 className="mb-3 text-white text-center">Can't find the Product you are looking for?</h6>
                        <Button className="btn btn-header btn-white px-5 m-0">Talk to us</Button>
                    </div>
                </Col>
            </Row>
        </Tab.Container>
    );
}

export default CommoditiesTabs;
