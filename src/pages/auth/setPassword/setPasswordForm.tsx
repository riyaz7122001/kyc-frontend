import { Form, useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../../../components/customButton";
import CustomInput from "../../../components/customInput";
import CustomLabel from "../../../components/customLabel";
import Loader from "../../../components/customSpinner";
import HideShowPassword from "../../../components/hideShowPassword";
import { resetPasswordSchema, ResetPasswordType } from "../../../schemas/auth";
import { LoadingState } from "../../../types";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleApiError, showToast } from "../../../helpers";
import { setPassword } from "../../../services/auth";

export default function SetPasswordForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordType>({
        resolver: yupResolver(resetPasswordSchema)
    });
    const [loading, setLoading] = useState<LoadingState>("idle");
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location?.search);
    const token = queryParams.get('token');

    const onSubmit = async (data: ResetPasswordType) => {
        try {
            if (!token) {
                showToast('error', 'Invalid token');
                return
            }
            const password = data.password;
            setLoading("loading");
            const response = await setPassword(token, password);
            setLoading("idle");
            showToast('success', response.data.message);
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (error) {
            setLoading("error");
            handleApiError(error, "Error while setting password")
        }
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
                        autoComplete="confirmPassword"
                        {...register("confirmPassword")}
                    />
                </HideShowPassword>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>
            <CustomButton type='submit' className='mt-2 w-full'>
                Set Password
            </CustomButton>
        </Form>
    )
}