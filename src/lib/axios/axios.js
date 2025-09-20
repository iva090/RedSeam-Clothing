import axios from 'axios';
export const api = axios.create({
    baseURL: 'https://api.redseam.redberryinternship.ge/api', 
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
    },
});
