import {api} from "./axios.js";

export const fetchCategories = async () => {
    const response = await api.get("/categories");
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}


export const fetchTopCategories = async () => {
    const response = await api.get("/top/category");
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}