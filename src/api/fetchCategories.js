import {api} from "./axios.js";

export const fetchCategories = async () => {
    const response = await api.get("/category");
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}


export const fetchTopCategories = async (limit) => {
    const response = await api.get("/category/top/"+ limit);
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}