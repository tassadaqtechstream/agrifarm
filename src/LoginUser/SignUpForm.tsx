import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignUpForm = () => {
    return (
        <Form className="new_user">
            <Row>
                <Col md={6} className="user-registration__col mt-1">
                    <Form.Group className="form-group">
                        <Form.Label className="required">I am</Form.Label>
                        <hr className="mt-0" />
                        <div className="d-flex justify-content-between">
                            <Form.Check
                                className="form-group"
                                type="radio"
                                label="Buyer"
                                name="user[user_type]"
                                id="user_user_type_buyer"
                                value="buyer"
                                required
                            />
                            <Form.Check
                                className="form-group"
                                type="radio"
                                label="Seller"
                                name="user[user_type]"
                                id="user_user_type_seller"
                                value="seller"
                                required
                            />
                            <Form.Check
                                className="form-group"
                                type="radio"
                                label="Both"
                                name="user[user_type]"
                                id="user_user_type_both"
                                value="both"
                                required
                            />
                        </div>
                        <hr className="mt-0" />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="user[first_name]" id="user_first_name" required />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="user[last_name]" id="user_last_name" required />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Company</Form.Label>
                        <Form.Control type="text" name="user[company]" id="user_company" required />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label className="required">Company VAT</Form.Label>
                        <Form.Control type="text" name="user[vatin]" id="user_vatin" />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label className="required">Mobile Number</Form.Label>
                        <Form.Control type="text" name="user[phone_number]" id="phone-number" required />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label className="required">Fiscal Address</Form.Label>
                        <Form.Control type="text" name="user[fiscal_address]" id="user_fiscal_address" required />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label className="required">Zip Code</Form.Label>
                        <Form.Control type="text" name="user[zip_code]" id="user_zip_code" required />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Country</Form.Label>
                        <Form.Control as="select" name="user[country]" id="user_country" required>
                            <option value="">Select one</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Spain">Spain</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label className="required">Company Activity</Form.Label>
                        <Form.Control
                            as="select"
                            name="user[company_activity_id]"
                            id="user_company_activity_id"
                            required
                        >
                            <option value="">Select one</option>
                            <option value="1">Farming Production</option>
                            <option value="2">Imports/Exports</option>
                            <option value="3">Food industry</option>
                            <option value="4">Retail</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Preferred Language</Form.Label>
                        <Form.Control as="select" name="user[preferred_language]" id="user_preferred_language">
                            <option value="en">English (EN)</option>
                            <option value="pt">Portuguese (PT)</option>
                            <option value="es">Spanish (ES)</option>
                            <option value="fr">French (FR)</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={6} className="user-registration__col mt-3">
                    <Form.Group className="form-group">
                        <Form.Label>Preferred Product(s)</Form.Label>
                        <hr className="mt-0" />
                        <Row className="form-group">
                            <Col lg={4} md={6} sm={12}>
                                <Form.Check
                                    className="form-group"
                                    type="checkbox"
                                    label="Corn"
                                    name="user[preferred_product_ids][]"
                                    id="user_preferred_product_ids_2"
                                    value="2"
                                />
                            </Col>
                            <Col lg={4} md={6} sm={12}>
                                <Form.Check
                                    className="form-group"
                                    type="checkbox"
                                    label="Almond"
                                    name="user[preferred_product_ids][]"
                                    id="user_preferred_product_ids_7"
                                    value="7"
                                />
                            </Col>
                            <Col lg={4} md={6} sm={12}>
                                <Form.Check
                                    className="form-group"
                                    type="checkbox"
                                    label="Hazelnut"
                                    name="user[preferred_product_ids][]"
                                    id="user_preferred_product_ids_11"
                                    value="11"
                                />
                            </Col>
                            {/* Add more product options here */}
                        </Row>
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Other Preferred Product(s)</Form.Label>
                        <Form.Control
                            type="text"
                            name="user[other_preferred_products]"
                            id="user_other_preferred_products"
                        />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="user[email]" id="user_email" required />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Password</Form.Label>
                        <Form.Text>
                            <i className="ms-1">(6 characters minimum)</i>
                        </Form.Text>
                        <Form.Control type="password" name="user[password]" id="user_password" required />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control
                            type="password"
                            name="user[password_confirmation]"
                            id="user_password_confirmation"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Check
                            className="form-group"
                            type="checkbox"
                            label={
                                <>
                                    I agree with the
                                    <Link className="link-green ms-1 me-1" to="/" target="_blank">
                                        Agri Marketplace Terms
                                    </Link>
                                    and
                                    <Link className="link-green ms-1 me-1" to="/" target="_blank">
                                        Privacy Policy
                                    </Link>
                                </>
                            }
                            name="user[terms_and_conditions]"
                            id="user_terms_and_conditions"
                            required
                        />
                    </Form.Group>
                    <Button type="submit" className="btn btn-header w-100 ms-0 border-0" style={{ height: "54px" }}>
                        Sign Up
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default SignUpForm;
