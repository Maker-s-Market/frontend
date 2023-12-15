import {api} from "./axios.js";
/**
 * Fetch the wishlist.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const fetchWishlist = async (token) => {
    const response = await api.get("/wishlist", {headers: {Authorization: `Bearer ${token}`}});

    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
/**
 * Add a product to the wishlist.
 * @param {string} product - The id of the product.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const addToWishlist = async (product, token) => {
    const response = await api.post("/wishlist/" + product, {},{headers: {Authorization: `Bearer ${token}`}});
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
/**
 * Delete a product from the wishlist.
 * @param {string} product - The id of the product.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const deleteFromWishlist = async (product, token) => {
    const response = await api.delete("/wishlist/" + product, {headers: {Authorization: `Bearer ${token}`}});
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}