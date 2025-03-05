import { Button, Form, Image } from "react-bootstrap";
import grains1 from "../assets/grans-1.png";
const FilterSidebar = () => {
    return (
        <>
            <div className="filter-sdiebar">
                <h3 className="text-uppercase font-weight-bold mb-2">Characteristics</h3>
                <div className="filter-wrappper">
                    <div className="prodcutheader d-flex align-items-center mb-3">
                        <Image src={grains1} alt="product" />
                        <h5>Rice</h5>
                    </div>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Type</Form.Label>
                        <Form.Control as="select" required>
                            <option value="">All</option>
                            <option value="">Medium Grain</option>
                            <option value="">Japonica / Long A</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Status</Form.Label>
                        <Form.Control as="select" required>
                            <option value="">All</option>
                            <option value="24">Broken</option>
                            <option value="2">Husked / Brown</option>
                            <option value="1">Paddy</option>
                            <option value="23">Bleached / Semi-bleached</option>
                            <option value="314">Seed</option>
                            <option value="924">Parboiled</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Variety</Form.Label>
                        <Form.Control as="select" required>
                            <option value="">All</option>
                            <option value="24">Husked / Brown</option>
                            <option value="24">Broken</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Production Mode</Form.Label>
                        <Form.Control as="select" required>
                            <option value="">All</option>
                            <option value="24">Conventional Production </option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Packaging for Shipment</Form.Label>
                        <Form.Control as="select" required>
                            <option value="">All</option>
                            <option value="24">Conventional Production </option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price per weight unit (€)</Form.Label>
                        <div className="d-flex justify-content-between align-items-center">
                            <Form.Control type="text" />
                            <span className="mx-2">to</span>
                            <Form.Control type="text" />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Total Weight</Form.Label>
                        <div className="d-flex justify-content-between align-items-center">
                            <Form.Control type="text" />
                            <span className="mx-2">to</span>
                            <Form.Control type="text" />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Certifications</Form.Label>
                        <Form.Control as="select" required>
                            <option value="">All</option>
                            <option value="24">Conventional Production </option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Final Delivery Date</Form.Label>
                        <div className="d-flex justify-content-between align-items-center">
                            <Form.Control type="text" />
                            <span className="mx-2">to</span>
                            <Form.Control type="text" />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Logistics</Form.Label>
                        <Form.Control as="select" required>
                            <option value="">All</option>
                            <option value="24">Conventional Production </option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Country of destination</Form.Label>
                        <Form.Control as="select" required>
                            <option value="">All</option>
                            <option value="24">Uk </option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Country of Origin</Form.Label>
                        <Form.Control as="select" required>
                            <option value="">All</option>
                            <option value="24">Uk </option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check
                            className="form-group"
                            type="checkbox"
                            label="Immediate Delivery "
                            name="user[user_type]"
                            id="user_user_type_buyer"
                            value="Immediate Delivery"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <span className="font-weight-bold form-label">
                            <b>Select more characteristics</b>
                        </span>
                    </Form.Group>
                    <div className="d-flex  align-items-center btnsgroup">
                        <Button className="btn btn-header  ms-0 border-0 btn btn-primary" style={{ height: "42px" }}>
                            Search
                        </Button>
                        <Button className="btn btn-primary outlinebtn ">Clear</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FilterSidebar;
