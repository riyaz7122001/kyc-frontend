import { PropsWithChildren } from "react";

type CustomLabelProps = {
    required?: boolean;
    htmlFor: string;
};

export default function CustomLabel({ children, required, htmlFor }: PropsWithChildren<CustomLabelProps>) {
    return (
        <label
            htmlFor={htmlFor}
            className="block text-sm text-gray-500 font-medium mb-1 dmsans-medium"
        >
            {children}
            {required && <span className="text-red-500"> *</span>}
        </label>
    );
}
