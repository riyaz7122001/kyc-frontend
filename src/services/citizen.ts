import { CreateCitizenDetails } from "../components/AddCitizenModal";
import api from "../helpers/api";

export const createCitizen = async (data: CreateCitizenDetails) => {
    const response = api.post(`/api/admin/protected/citizen/create`, data);
    return response;
}

export const deleteCitizen = async (userId: string) => {
    const response = api.delete(`/api/admin/protected/citizen/delete/${userId}`);
    return response;
}

export const editCitizen = async (userId: string, data: CreateCitizenDetails) => {
    const response = api.put(`/api/admin/protected/citizen/edit/${userId}`, data);
    return response;
}