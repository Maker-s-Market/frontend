import {api} from "./axios.js";
/**
 * Fetch all categories.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const fetchCategories = async () => {
    const response = await api.get("/category");
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

/**
 * Fetch top categories.
 * @param {number} limit - The number of top categories to fetch.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const fetchTopCategories = async (limit) => {
    const response = await api.get("/category/top/"+ limit);
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}