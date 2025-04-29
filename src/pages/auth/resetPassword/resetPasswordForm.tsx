import { Form } from "react-router-dom";
import { FormGroup, FormFeedback } from "reactstrap";
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
            <FormGroup>
                <CustomLabel htmlFor="password" required>
                    New Password
                </CustomLabel>
                <HideShowPassword>
                    <CustomInput
                        id="password"
                        placeholder="New Password"
                        invalid={!!errors.password}
                        className="hide-show-password-input"
                        autoComplete="new-password"
                        {...register("password")}
                    />
                    <FormFeedback>{errors.password?.message}</FormFeedback>
                </HideShowPassword>
            </FormGroup>
            <FormGroup>
                <CustomLabel htmlFor="confirmPassword" required>
                    Confirm New Password
                </CustomLabel>
                <HideShowPassword>
                    <CustomInput
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        invalid={!!errors.confirmPassword}
                        className="hide-show-password-input"
                        autoComplete="new-password"
                        {...register("confirmPassword")}
                    />
                    <FormFeedback>{errors.confirmPassword?.message}</FormFeedback>
                </HideShowPassword>
            </FormGroup>
            <CustomButton type='submit' className='mt-2 w-full'>
                Reset
            </CustomButton>
        </Form>
    )
}

