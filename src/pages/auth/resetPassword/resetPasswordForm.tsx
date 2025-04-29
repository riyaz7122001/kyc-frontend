import { Form } from "react-router-dom";
import { FormFeedback } from "reactstrap";
import CustomButton from "../../../components/customButton";
import CustomInput from "../../../components/customInput";
import CustomLabel from "../../../components/customLabel";
import Loader from "../../../components/customSpinner";
import HideShowPassword from "../../../components/hideShowPassword";
import { resetPasswordSchema, ResetPasswordType } from "../../../schemas/auth";
import { LoadingState } from "../../../types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

export default function ResetPasswordForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordType>({
        resolver: yupResolver(resetPasswordSchema)
    });
    const [loading, setLoading] = useState<LoadingState>("idle");

    const onSubmit = async (data: ResetPasswordType) => {
        console.log(data)
    };

    if (loading === "loading") return <Loader />

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
            <div>
                <CustomLabel htmlFor="confirmPassword" required>
                    Confirm New Password
                </CustomLabel>
                <HideShowPassword>
                    <CustomInput
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        invalid={!!errors.confirmPassword}
                        autoComplete="confirmPassword"
                        {...register("confirmPassword")}
                    />
                    <FormFeedback>{errors.confirmPassword?.message}</FormFeedback>
                </HideShowPassword>
            </div>
            <CustomButton type='submit' className='mt-2 w-full'>
                Reset
            </CustomButton>
        </Form>
    )
}

