import {api} from "./axios.js";
/**
 * Add a review for a product.
 * @param {string} id - The id of the product.
 * @param {string} review - The review text.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 201.
 */
export const addReview = async (id, review, token) => {

    const response = await api.post("/review", {
            product_id: id,
            text: review
        },
        {headers: {Authorization: `Bearer ${token}`}});
    if (response.status !== 201) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
/**
 * Fetch reviews by product id.
 * @param {string} id - The id of the product.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const fetchReviewsById = async (id) => {
    const response = await api.get("/review" + id);
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
/**
 * Delete a review by id.
 * @param {string} id - The id of the review.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const deleteReview = async (id, token) => {
    const response = await api.delete("/review" + id,
        {
            headers: {Authorization: `Bearer ${token}`},
        });
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}