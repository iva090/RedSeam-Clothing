import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://api.redseam.redberryinternship.ge/api', 
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const token = userData?.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);