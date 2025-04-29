import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Link } from "react-router-dom";
import { FormGroup, FormFeedback } from "reactstrap";
import CustomButton from "../../../components/customButton";
import CustomInput from "../../../components/customInput";
import CustomLabel from "../../../components/customLabel";
import Loader from "../../../components/customSpinner";
import { forgotPasswordSchema, ForgotPasswordType } from "../../../schemas/auth";
import { LoadingState } from "../../../types";

export default function ForgotPasswordForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordType>({
        resolver: yupResolver(forgotPasswordSchema)
    });
    const [loading, setLoading] = useState<LoadingState>("idle");

    const onSubmit = async (data: ForgotPasswordType) => {
        console.log(data)
    };

    if (loading === "loading") return <Loader />

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
                <CustomLabel htmlFor="email" required>
                    Email
                </CustomLabel>
                <CustomInput
                    id="email"
                    placeholder="Email Address"
                    invalid={!!errors.email}
                    className="w-90"
                    style={{ width: "90%" }}
                    {...register("email")}
                />
                <FormFeedback>{errors.email?.message}</FormFeedback>
            </div>
            <CustomButton type='submit' className='mt-2 w-full'>
                Send
            </CustomButton>
            <Link to='/login' className="dmsans-bold flex-center mt-2 color-primary underline" style={{ fontSize: '0.96rem' }}>
                Back to Login
            </Link>
        </Form>
    )
}
