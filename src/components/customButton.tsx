import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type CustomButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary';
    fullWidth?: boolean;
};

export default function CustomButton({
    children,
    className = '',
    variant = 'primary',
    fullWidth = false,
    ...props
}: PropsWithChildren<CustomButtonProps>) {
    const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variantStyles = {
        primary: "bg-primary hover:bg-primary-dark text-white focus:ring-primary/50",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400"
    };
    const widthStyle = fullWidth ? "w-full" : "";

    return (
        <button
            className={`cursor-pointer ${baseStyles} ${variantStyles[variant]} ${widthStyle} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}