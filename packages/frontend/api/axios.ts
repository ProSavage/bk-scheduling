import axios, { AxiosInstance } from "axios";
export const axiosClient: AxiosInstance = axios.create({
    baseURL: "http://localhost:5001",
    // transformResponse: [(data) => {
    // }]

})

export const setToken = (token: string) => {
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axiosClient.interceptors.response.use((res) => {

        return res
    }, (err) => {
        console.log(err)
        if (err.response.status === 401) {
            // Unauthorized go to login.
            window.location.href = "/auth/login"
        }
        return err;
    })
}