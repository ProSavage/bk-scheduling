import { axiosClient } from "./axios";

export const auth = {
    login: async (email: string) => {
       return (await axiosClient.post("/auth/login", { email })).data;
    },
    redeem: async (token: string) => {
        return (await axiosClient.get("/auth/redeem/" + token)).data;
    }
}