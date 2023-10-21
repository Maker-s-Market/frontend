import {api} from "./axios.js";

export const fetchProductById = async (id) => {
    const response = await api.get("/product/" + id);
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}



export const fetchTopProducts = async () => {
    const response = await api.get("/top/products");
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}