import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
});

// axiosClient.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
// })

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {

    console.error(error);
    if (error.response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN');
        // window.location.href = '/login';
    }
    if (error.response.status === 403) {
        // if (window.location.pathname !== '/') {
        //     window.location.href = '/';
        // }

        console.log('forbidden');
    }
    // return Promise.reject(error);
    throw error;
})

export default axiosClient;