import {api} from "./axios.js";

export const addReview = async (id, review,token) => {

    const response = await api.post("/review/",{
            product_id: id,
            text: review
        },
        {headers: {Authorization: `Bearer ${token}`}});
    if (response.status !== 201) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const fetchReviewsById = async (id) => {
    const response = await api.get("/review/" + id);
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const deleteReview = async (id,token) => {
    const response = await api.delete("/review/" + id,
        {headers: {Authorization: `Bearer ${token}`},
        });
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}