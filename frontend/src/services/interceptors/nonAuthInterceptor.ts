import { InternalAxiosRequestConfig } from "axios";

const nonAuthRoutes = process.env.REACT_APP_NON_AUTH_ROUTES;

export const InterceptorAuth = (config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig> => {
    const token = localStorage.getItem('accessToken');
    const currentRoute = config.url?.split('?')[0];

    if (nonAuthRoutes?.split(',')?.includes(currentRoute!)) {
        return config;
    }

    if (!token) {
        return Promise.reject('Rota não permitida sem token!')
    }

    config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
    return config;
} 

export const InterceptorAuthHandleError = (error: Error) => new Error('Ocorreu um erro no interceptor.')