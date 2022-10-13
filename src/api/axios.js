import axios from 'axios';
const BASE_URL = "https://21eu98s4bi.execute-api.ap-south-1.amazonaws.com/dev/";

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});