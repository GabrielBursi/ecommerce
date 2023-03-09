import axios from 'axios';

export const ApiTest = axios.create({
    baseURL: 'http://localhost:3333/'
})