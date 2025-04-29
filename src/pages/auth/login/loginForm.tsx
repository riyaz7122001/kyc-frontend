import { useState } from "react";
import Loader from "../../../components/customSpinner";
import { Form, Link } from "react-router-dom";
import CustomButton from "../../../components/customButton";
import CustomInput from "../../../components/customInput";
import CustomLabel from "../../../components/customLabel";
import { LoginFormType, loginSchema } from "../../../schemas/auth";
import HideShowPassword from "../../../components/hideShowPassword";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingState } from "../../../types";

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormType>({
        resolver: yupResolver(loginSchema)
    });
    const [loading, setLoading] = useState<LoadingState>("idle");

    const onSubmit = async (data: LoginFormType) => {
        console.log("data", data);
    };

    if (loading === "loading") return <Loader styles={{ position: 'absolute', height: '100%', top: '0', left: '0', backgroundColor: '#fcfcfc50' }} />

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
                <CustomLabel htmlFor="email" required>
                    Email
                </CustomLabel>
                <CustomInput
                    id="email"
                    placeholder="Email Address"
                    autoComplete="email"
                    {...register('email')}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
                <CustomLabel htmlFor="password" required>
                    Password
                </CustomLabel>
                <HideShowPassword>
                    <CustomInput
                        id="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        {...register('password')}
                    />
                </HideShowPassword>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <CustomButton type="submit" className="mt-2 w-full">
                Sign In
            </CustomButton>

            <Link to="/forgot-password" className="text-primary font-semibold text-center text-sm mt-2 underline">
                Forgot your password?
            </Link>
        </Form>
    );
}
