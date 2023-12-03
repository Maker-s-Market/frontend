import {api} from "./axios.js";

export const fetchBuyerStats = async (token) => {
    const response = await api.get("/statistics/buyer", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const fetchSellerStats = async (token) => {
    const response = await api.get("/statistics/seller", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
