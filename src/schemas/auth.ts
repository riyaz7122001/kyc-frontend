import * as yup from 'yup';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../helpers/config';
import { InferType } from 'yup'; // <-- import this

export const loginSchema = yup.object({
    email: yup
        .string()
        .required('Email is required')
        .matches(EMAIL_REGEX, 'Enter a valid email')
        .trim(),
    password: yup
        .string()
        .required('Password is required')
        .max(20, 'Max. length is 20')
        .min(8, 'Min. length is 8')
        .matches(PASSWORD_REGEX, 'Password must contain atleast one upperCase, lowercase, number and special characters')
});

export type LoginFormType = InferType<typeof loginSchema>;

export const forgotPasswordSchema = yup.object().shape({
    email: yup
        .string()
        .required('Email is required')
        .matches(EMAIL_REGEX, 'Enter a valid email')
        .trim()
});

export type ForgotPasswordType = InferType<typeof forgotPasswordSchema>;

export const resetPasswordSchema = yup.object().shape({
    password: yup
        .string()
        .required('Password is required')
        .max(20, 'Max. length is 20')
        .min(8, 'Min. length is 8')
        .matches(PASSWORD_REGEX, 'Password must contain atleast one upperCase, lowercase, number and special characters'),
    confirmPassword: yup
        .string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('password')], 'Passwords must match'),
});

export type ResetPasswordType = InferType<typeof resetPasswordSchema>;
