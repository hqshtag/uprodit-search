import axios from "axios";
import config from "./config.json";
import { generateAuthSignature } from "./helpers";

export const AxiosClient = axios.create({
    baseURL: config.endpoints.baseURL,
    headers: {
        "Content-Type": "application/json"
    }
});

AxiosClient.interceptors.request.use(
    async (config) =>{
        if(config.url) {
            const token = generateAuthSignature(config.url);
            config.headers = { ...config.headers, Authorization: token };
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
)