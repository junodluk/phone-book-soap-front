import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error?.response?.status === 403) {
            alert("Você não possui permissão para acessar este recurso.");
        }
        return Promise.reject(error);
    }
);
