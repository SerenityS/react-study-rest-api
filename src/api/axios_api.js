import axios from "axios";

const axios_api = axios.create({ baseURL: '' });

axios_api.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("jwt");
        if (!token) {
            config.headers["Authorization"] = null;
        }
        else {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    }
)

export default axios_api;