import { ElementType } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

interface FormInputProps {
    label: string;
    type?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
    as?: string;
    rows?: number;
}

const FormInput = ({ label, type = "text", required, options, as, rows }: FormInputProps) => {
    const { t } = useTranslation();
    const isSelect = type === "select";

    return (
        <Form.Group className="mb-3">
            <Form.Label>
                {label}
                {required && (
                    <span className="text-danger ms-1" title={t("components.formInput.required")}>
                        *
                    </span>
                )}
            </Form.Label>
            {isSelect ? (
                <Form.Select className="form-control">
                    <option>{t("components.formInput.selectOne")}</option>
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
