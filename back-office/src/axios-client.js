import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    config.headers['Referer'] = import.meta.env.VITE_API_BASE_URL;
    return config;
})

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {

    console.error(error);
    if (error.response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN');
        // window.location.href = '/login';
    }
    // return Promise.reject(error);
    throw error;
})

export default axiosClient;