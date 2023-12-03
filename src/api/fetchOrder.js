import {api} from "./axios.js";

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

export const getPaymentIntent = async (token, amount) => {
    const response = await api.post(`/payment/process-payment?amount=${amount}`,
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