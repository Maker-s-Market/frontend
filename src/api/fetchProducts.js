import {api} from "./axios.js";

export const fetchProductById = async (id) => {
    const response = await api.get("/product/" + id);
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const fetchTopProducts = async (limit) => {
    const response = await api.get("/product/top/" + limit);
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const fetchProductsByCategory = async (category) => {
    const response = await api.get("/category/" + category);
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const searchProducts = async (query, categoryId, sort, discount) => {
    const response = await api.get("/product", {
        params: {
            q: query, category_id: categoryId, sort: sort, discount: discount
        }
    });
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const addProduct = async (token, product) => {
    const response = await api.post("/product", product, {
        headers: {
            Authorization: `Bearer ${token}`
        }

    });
    if (response.status !== 201) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const deleteProduct = async (id) => {
    const response = await api.delete("/product/" + id);
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const editProduct = async (id, product) => {
    const response = await api.put("/product/" + id, product);
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const editProductAvailability = async (token, id, availability) => {
    const response = await api.put("/product/" + id + "/available?available=" + availability, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const fetchUserProducts = async (token) => {
    const response = await api.get("/user/products", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const fetchProductsReviewRatings = async (token) => {
    const response = await api.get("/product/seller/review-ratings", {
        headers: {Authorization: `Bearer ${token}`},
    });

    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }

    return response.data;
}