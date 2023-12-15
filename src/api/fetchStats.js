import {api} from "./axios.js";
/**
 * Fetch buyer statistics.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
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
/**
 * Fetch seller statistics.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
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
