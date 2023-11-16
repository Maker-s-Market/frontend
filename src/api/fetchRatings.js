import {api} from "./axios.js";

export const fetchRatingById = async (id, token) => {
    const response = await api.get("/rating-product/" + id,
        {headers: {Authorization: `Bearer ${token}`}});

    if (response.status === 204) {
        return {rating: -1};
    }


    if (response.status !== 201) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

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