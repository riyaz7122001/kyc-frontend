import { useState, cloneElement, PropsWithChildren, ReactElement, isValidElement } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type HideShowPasswordProps = {
    style?: React.CSSProperties;
};

type InputElementProps = {
    type?: string;
    className?: string;
    [key: string]: any;
};

const HideShowPassword = ({ children, style }: PropsWithChildren<HideShowPasswordProps>) => {
    const [inputType, setInputType] = useState<'password' | 'text'>('password');

    const handleShowPassword = () => {
        setInputType(prev => (prev === 'password' ? 'text' : 'password'));
    };

    const childArray = Array.isArray(children) ? children : [children];
    const childElement = childArray[0];

    if (!childElement || !isValidElement(childElement)) {
        return null;
    }

    const inputElement = childElement as ReactElement<InputElementProps>;
    const inputProps = inputElement.props || {};

    return (
        <div className="relative w-full" style={style}>
            {cloneElement(inputElement, {
                ...inputProps,
                type: inputType,
                className: `${inputProps.className || ''} pr-10 focus:outline-none focus:border-blue`
            })}
            <button
                type="button"
                onClick={handleShowPassword}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                aria-label={inputType === 'password' ? 'Show password' : 'Hide password'}
            >
                {inputType === 'password' ? (
                    <AiOutlineEyeInvisible className="h-5 w-5" />
                ) : (
                    <AiOutlineEye className="h-5 w-5" />
                )}
            </button>
        </div>
    );
};

export default HideShowPassword;