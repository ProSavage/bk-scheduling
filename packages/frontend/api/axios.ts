import axios, { AxiosInstance } from "axios";
export const axiosClient: AxiosInstance = axios.create({
    baseURL: "http://localhost:5001",
    // transformResponse: [(data) => {
    // }]

})

export const setToken = (token: string) => {
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}