import axios from "axios";
import { InterceptorAuth, InterceptorAuthHandleError } from "../interceptors";

const env = process.env.NODE_ENV === 'production'

export const MyApi = axios.create({
    baseURL: env ? process.env.REACT_APP_BACKEND_URL : process.env.REACT_APP_BACKEND_LOCAL,
})

MyApi.interceptors.request.use(InterceptorAuth, InterceptorAuthHandleError);