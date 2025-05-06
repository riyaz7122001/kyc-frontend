import { CreateCitizenDetails } from "../components/AddCitizenModal";
import api from "../helpers/api";

export const createCitizen = async (data: CreateCitizenDetails) => {
    const response = api.post(`/api/admin/protected/citizen/create`, data);
    return response;
}