import {api} from "./axios.js";

export const fetchWishlist = async (token) => {
    const response = await api.get("/wishlist", {headers: {Authorization: `Bearer ${token}`}});

    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const addToWishlist = async (product, token) => {
    const response = await api.post("/wishlist/" + product, {},{headers: {Authorization: `Bearer ${token}`}});
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const deleteFromWishlist = async (product, token) => {
    const response = await api.delete("/wishlist/" + product, {headers: {Authorization: `Bearer ${token}`}});
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}