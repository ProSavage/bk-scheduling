import axios, { AxiosInstance } from "axios";
export const axiosClient: AxiosInstance = axios.create({
    baseURL: "http://localhost:5001",
    // transformResponse: [(data) => {
    // }]
})

export const setToken = (token: string) => {
    console.log("Set token");
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}