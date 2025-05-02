import api from "../helpers/api";
import { Role } from "../types";

export const getUserDetails = async (role: Role) => {
    const response = api.get(`/api/${role}/protected/auth/profile`);
    return response;
}

export const getDashboardDetails = async (role: Role) => {
    const response = api.get(`/api/${role}/protected/citizen/dashboard`);
    return response;
}

export const getCitizens = async (role: Role, size: number, page: number) => {
    const url = `/api/${encodeURIComponent(role)}/protected/citizen/list?size=${size}&page=${page}`;
    const response = await api.get(url);
    return response;
};
