import api from "../helpers/api";
import { Role } from "../types";

export const sendOtp = async (email: string, password: string) => {
    const response = api.post(`/api/admin/auth/otp`, { email, password });
    return response;
}

export const adminLogin = async (email: string, password: string, otp: string) => {
    const response = api.post(`/api/admin/auth/login`, { email, password, otp });
    return response;
}

export const forgotPassword = async (email: string) => {
    const response = api.post(`/api/auth/forgot-password`, { email });
    return response
}

export const logout = async (role: Role) => {
    const response = api.get(`/api/${role}/protected/auth/logout`);
    return response;
}

export const changePassword = async (role: Role, password: string, newPassword: string) => {
    const response = api.put(`/api/${role}/protected/auth/change-password`, {
        password,
        newPassword
    });
    return response;
}