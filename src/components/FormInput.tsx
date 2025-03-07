import { ElementType } from "react";
import { Form } from "react-bootstrap";

interface FormInputProps {
    label: string;
    type?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
    as?: string;
    rows?: number;
}

const FormInput = ({ label, type = "text", required, options, as, rows }: FormInputProps) => {
    const isSelect = type === "select";

    return (
        <Form.Group className="mb-3">
            <Form.Label>
                {label}
                {required && "*"}
            </Form.Label>
            {isSelect ? (
                <Form.Select className="form-control">
                    <option>Select one</option>
                    {options?.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Form.Select>
            ) : (
                <Form.Control type={type} as={as as ElementType} rows={rows} />
            )}
        </Form.Group>
    );
};

export default FormInput;
