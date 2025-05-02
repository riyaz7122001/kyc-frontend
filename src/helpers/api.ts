import axios from "axios";
import { API_BASE_URL } from "./config";
import { showToast } from ".";

const Axios = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

Axios.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        if (err.response) {
            if (
                (err.response.status === 401 &&
                    (err.response.data.message === "Invalid token" ||
                        err.response.data.message === "Please login to continue" ||
                        err.response.data.message === "Missing Session Token")) ||
                (err.response.status === 403 &&
                    (err.response.data.message === "Invalid user" ||
                        err.response.data.message === "Your account has been disabled, please contact system administrator" ||
                        err.response.data.message === "Please login to continue" ||
                        err.response.data.message === "Missing Session Token")) ||
                (err.response.status === 400 &&
                    err.response.data.message === "User logged out due to inactivity")
            ) {
                showToast('error', err.response.data.message);
                window.location.href = `/login`;
                sessionStorage.clear();
                localStorage.clear();
                return Promise.reject("");
            }
        }
        return Promise.reject(err);
    }
);
export default Axios;

