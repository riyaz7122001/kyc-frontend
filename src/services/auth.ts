import api from "../helpers/api";

export const sendOtp = async (email: string, password: string) => {
    const response = api.post(`/api/admin/auth/otp`, { email, password });
    return response;
}

export const adminLogin = async (email: string, password: string) => {
    const response = api.post(`/api/admin/auth/login`, { email, password });
    return response;
}

export const forgotPassword = async (email: string) => {
    const response = api.post(`/api/auth/forgot-password`, { email });
    return response
}