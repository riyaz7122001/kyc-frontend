import { useState } from "react";
import Loader from "../../../components/customSpinner";
import { Form, Link } from "react-router-dom";
import CustomButton from "../../../components/customButton";
import CustomInput from "../../../components/customInput";
import CustomLabel from "../../../components/customLabel";
import { registerSchema, RegisterType } from "../../../schemas/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingState } from "../../../types";

export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterType>({
        resolver: yupResolver(registerSchema)
    });
    const [loading, setLoading] = useState<LoadingState>("idle");

    const onSubmit = async (data: RegisterType) => {
        console.log("data", data);
    };

    if (loading === "loading") return <Loader styles={{ position: 'absolute', height: '100%', top: '0', left: '0', backgroundColor: '#fcfcfc50' }} />

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
                <CustomLabel htmlFor="firstName" required>
                    First Name
                </CustomLabel>
                <CustomInput
                    id="firstName"
                    placeholder="First Name"
                    autoComplete="firstName"
                    {...register('firstName')}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
                <CustomLabel htmlFor="lastName" required>
                    Last Name
                </CustomLabel>
                <CustomInput
                    id="lastName"
                    placeholder="Last Name"
                    autoComplete="lastName"
                    {...register('lastName')}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>
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
                <CustomLabel htmlFor="phone" required>
                    Phone
                </CustomLabel>
                <CustomInput
                    id="phone"
                    placeholder="Phone Number"
                    autoComplete="phone"
                    {...register('phone')}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <CustomButton type="submit" className="mt-2 w-full">
                Sign Up
            </CustomButton>

            <Link to="/login" className="text-primary font-semibold text-center text-sm mt-2 underline">
                Already have an account?
            </Link>
        </Form>
    );
}
