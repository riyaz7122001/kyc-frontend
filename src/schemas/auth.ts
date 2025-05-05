import * as yup from 'yup';
import { EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX } from '../helpers/config';
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

export const changePasswordSchema = yup.object().shape({
    currentPassword: yup.string()
        .required('Current password is required'),
    newPassword: yup.string()
        .required('New password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password cannot be more than 20 characters')
        .matches(PASSWORD_REGEX, 'Password must contain at least one lowercase, uppercase, number, and special character'),
    confirmPassword: yup.string()
        .required('Please confirm your new password')
        .oneOf([yup.ref('newPassword')], 'Passwords must match'),
})

export type ChangePasswordType = InferType<typeof changePasswordSchema>;

export const registerSchema = yup.object().shape({
    firstName: yup
        .string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be less than 50 characters'),
    lastName: yup
        .string()
        .required('Last name is required')
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be less than 50 characters'),
    email: yup
        .string()
        .required('Email is required')
        .email('Must be a valid email'),
    phone: yup
        .string()
        .required('Phone number is required')
        .matches(PHONE_REGEX, 'Phone number must be exactly 10 digits'),
})

export type RegisterType = InferType<typeof registerSchema>;
