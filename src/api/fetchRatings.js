import {api} from "./axios.js";
/**
 * Fetch the rating of a product by id.
 * @param {string} id - The id of the product.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200 or 204.
 */
export const fetchRatingById = async (id, token) => {
    const response = await api.get("/rating-product/" + id,
        {headers: {Authorization: `Bearer ${token}`}});

    if (response.status === 204) {
        return {rating: -1};
    }


    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
/**
 * Add a rating for a product.
 * @param {number} rating - The rating value.
 * @param {string} product - The id of the product.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 201.
 */
export const addRating = async (rating, product, token) => {
    const response = await api.post("/rating-product", {
        rating: rating,
        product_id: product
    }, {headers: {Authorization: `Bearer ${token}`}});
    if (response.status !== 201) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
/**
 * Edit a rating for a product.
 * @param {number} rating - The new rating value.
 * @param {string} product - The id of the product.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 201.
 */
export const editRating = async (rating, product, token) => {
    const response = await api.put("/rating-product", {
        rating: rating,
        id: product
    }, {headers: {Authorization: `Bearer ${token}`}});
    if (response.status !== 201) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
/**
 * Fetch the user's rating by id.
 * @param {string} id - The id of the user.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200 or 204.
 */
export const fetchUserRatingById = async (id, token) => {
    const response = await api.get("/rating-user/" + id,
        {headers: {Authorization: `Bearer ${token}`}});

    if (response.status === 204) {
        return {rating: -1};
    }

    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }

    return response.data;
}
/**
 * Add a rating for a user.
 * @param {number} rating - The rating value.
 * @param {string} seller - The id of the seller.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 201.
 */
export const addUserRating = async (rating, seller, token) => {
    const response = await api.post("/rating-user", {
        rating: rating,
        seller_id: seller
    }, {headers: {Authorization: `Bearer ${token}`}});
    if (response.status !== 201) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
/**
 * Edit a rating for a user.
 * @param {number} rating - The new rating value.
 * @param {string} seller - The id of the seller.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 201.
 */
export const editUserRating = async (rating, seller, token) => {
    const response = await api.put("/rating-user", {
        rating: rating,
        id: seller
    }, {headers: {Authorization: `Bearer ${token}`}});
    if (response.status !== 201) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}