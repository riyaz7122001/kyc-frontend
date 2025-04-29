import React from "react";

type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    styles?: React.CSSProperties;
    invalid?: boolean;
};

function CustomInputComponent({ styles, className, ...props }: CustomInputProps, ref: React.Ref<HTMLInputElement>) {
    return (
        <input
            ref={ref}
            {...props}
            className={`border border-gray-300 rounded-md w-full px-3 py-3 text-sm focus:outline-none focus:border-primary placeholder:text-[1rem] placeholder:font-medium placeholder:text-gray-500 ${className || ''}`}
            style={{ ...styles }}
        />
    );
}

const CustomInput = React.forwardRef(CustomInputComponent);

export default CustomInput;
