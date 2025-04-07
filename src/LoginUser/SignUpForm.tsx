import React, { useState, FormEvent, ChangeEvent } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Define interfaces for form data
interface FormData {
    user_type: string;
    first_name: string;
    last_name: string;
    company: string;
    vatin: string;
    phone_number: string;
    fiscal_address: string;
    zip_code: string;
    country: string;
    company_activity_id: string;
    preferred_language: string;
    preferred_product_ids: string[];
    other_preferred_products: string;
    email: string;
    password: string;
    password_confirmation: string;
    terms_and_conditions: boolean;
}

const SignUpForm: React.FC = () => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    // Form data state
    const [formData, setFormData] = useState<FormData>({
        user_type: "",
        first_name: "",
        last_name: "",
        company: "",
        vatin: "",
        phone_number: "",
        fiscal_address: "",
        zip_code: "",
        country: "",
        company_activity_id: "",
        preferred_language: "en",
        preferred_product_ids: [],
        other_preferred_products: "",
        email: "",
        password: "",
        password_confirmation: "",
        terms_and_conditions: false
    });

    // Handle input change
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        if (type === "checkbox") {
            if (name === "user[terms_and_conditions]") {
                setFormData({
                    ...formData,
                    terms_and_conditions: checked
                });
            } else if (name === "user[preferred_product_ids][]") {
                const updatedProducts = [...formData.preferred_product_ids];
                if (checked) {
                    updatedProducts.push(value);
                } else {
                    const index = updatedProducts.indexOf(value);
                    if (index > -1) {
                        updatedProducts.splice(index, 1);
                    }
                }
                setFormData({
                    ...formData,
                    preferred_product_ids: updatedProducts
                });
            }
        } else if (type === "radio" && name === "user[user_type]") {
            setFormData({
                ...formData,
                user_type: value
            });
        } else {
            // Extract field name from brackets format (e.g., user[email] -> email)
            const fieldNameMatch = name.match(/\[([^\]]+)\]/);
            if (fieldNameMatch) {
                const fieldName = fieldNameMatch[1];

                setFormData(prevData => ({
                    ...prevData,
                    [fieldName]: value
                }));
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        setIsSubmitting(true);
        setErrorMessage("");

        try {
            // Format data for Laravel API
            const apiData = {
                user_type: formData.user_type,
                first_name: formData.first_name,
                last_name: formData.last_name,
                company: formData.company,
                vatin: formData.vatin,
                phone_number: formData.phone_number,
                fiscal_address: formData.fiscal_address,
                zip_code: formData.zip_code,
                country: formData.country,
                company_activity_id: formData.company_activity_id,
                preferred_language: formData.preferred_language,
                preferred_product_ids: formData.preferred_product_ids,
                other_preferred_products: formData.other_preferred_products,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.password_confirmation,
            };

            // Send data to Laravel API
            const response = await axios.post('http://apnafarm.com/api/b2b/register', apiData);

            // Handle successful registration
            console.log('Registration successful:', response.data);

            // Redirect to login page or dashboard
            navigate('/login', {
                state: {
                    message: "Registration successful! Please log in."
                }
            });

        } catch (error) {
            console.error('Registration error:', error);

            // Type assertion for axios error
            type ApiError = {
                response?: {
                    data?: {
                        errors?: Record<string, string[]>;
                        message?: string;
                    }
                };
                message?: string;
            };

            const apiError = error as ApiError;

            // Handle validation errors from Laravel
            if (apiError.response?.data?.errors) {
                const validationErrors = apiError.response.data.errors;
                const firstErrorKey = Object.keys(validationErrors)[0];
                const firstError = firstErrorKey ? validationErrors[firstErrorKey][0] : "";
                setErrorMessage(firstError || "Registration failed. Please check your information.");
            } else {
                setErrorMessage(apiError.response?.data?.message || apiError.message || "An error occurred during registration.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form className="new_user" noValidate validated={validated} onSubmit={handleSubmit}>
            {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
            )}

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
                                onChange={handleChange}
                                required
                            />
                            <Form.Check
                                className="form-group"
                                type="radio"
                                label="Seller"
                                name="user[user_type]"
                                id="user_user_type_seller"
                                value="seller"
                                onChange={handleChange}
                                required
                            />
                            <Form.Check
                                className="form-group"
                                type="radio"
                                label="Both"
                                name="user[user_type]"
                                id="user_user_type_both"
                                value="both"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <hr className="mt-0" />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="user[first_name]"
                            id="user_first_name"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="user[last_name]"
                            id="user_last_name"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Company</Form.Label>
                        <Form.Control
                            type="text"
                            name="user[company]"
                            id="user_company"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label className="required">Company VAT</Form.Label>
                        <Form.Control
                            type="text"
                            name="user[vatin]"
                            id="user_vatin"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label className="required">Mobile Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="user[phone_number]"
                            id="phone-number"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label className="required">Fiscal Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="user[fiscal_address]"
                            id="user_fiscal_address"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label className="required">Zip Code</Form.Label>
                        <Form.Control
                            type="text"
                            name="user[zip_code]"
                            id="user_zip_code"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            as="select"
                            name="user[country]"
                            id="user_country"
                            onChange={handleChange}
                            required
                        >
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
                            onChange={handleChange}
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
                        <Form.Control
                            as="select"
                            name="user[preferred_language]"
                            id="user_preferred_language"
                            onChange={handleChange}
                            defaultValue="en"
                        >
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="user[email]"
                            id="user_email"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Password</Form.Label>
                        <Form.Text>
                            <i className="ms-1">(6 characters minimum)</i>
                        </Form.Text>
                        <Form.Control
                            type="password"
                            name="user[password]"
                            id="user_password"
                            onChange={handleChange}
                            required
                            minLength={6}
                        />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control
                            type="password"
                            name="user[password_confirmation]"
                            id="user_password_confirmation"
                            onChange={handleChange}
                            required
                            minLength={6}
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
                                        Green Oasis AG MarketPlace Terms
                                    </Link>
                                    and
                                    <Link className="link-green ms-1 me-1" to="/" target="_blank">
                                        Privacy Policy
                                    </Link>
                                </>
                            }
                            name="user[terms_and_conditions]"
                            id="user_terms_and_conditions"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button
                        type="submit"
                        className="btn btn-header w-100 ms-0 border-0"
                        style={{ height: "54px" }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Processing..." : "Sign Up"}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default SignUpForm;