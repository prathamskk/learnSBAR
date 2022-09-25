import axios from 'axios';
const BASE_URL = 'https://jsfu2dh5ie.execute-api.ap-south-1.amazonaws.com/dev';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});