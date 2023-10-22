import {api} from "./axios.js";

export const fetchProductById = async (id) => {
    const response = await api.get("/product/" + id);
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const fetchTopProducts = async () => {
    const response = await api.get("/top/product");
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

export const searchProducts = async (query,categoryId,sort,discount) => {
    const response = await api.get("/products/", {
        params: {
            q: query,
            category_id: categoryId,
            sort: sort,
            discount: discount
        }
    });
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const addProduct = async (product) => {
    console.log(product);
    const response = await api.post("/product", product);
    if (response.status !== 201) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}