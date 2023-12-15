import {api} from "./axios.js";
/**
 * Fetch the order.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const fetchOrder = async (token) => {
    const response = await api.get("/order/",
        {
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
 * Place an order.
 * @param {string} token - The authorization token.
 * @param {Object} order - The order data.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 201.
 */
export const placeOrder = async (token, order) => {
    const response = await api.post("/order/", order,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    if (response.status !== 201) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
/**
 * Get payment intent.
 * @param {string} token - The authorization token.
 * @param {number} amount - The amount to be paid.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 201.
 */
export const getPaymentIntent = async (token, amount) => {
    const response = await api.post(`/payment/process-payment?amount=${amount}`, {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    if(response.status !== 201){
        throw new Error("Something went wrong!");
    }

    return response.data;
}