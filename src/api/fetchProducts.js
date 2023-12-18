import {api} from "./axios.js";
/**
 * Fetch a product by id.
 * @param {string} id - The id of the product.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const fetchProductById = async (id) => {
    const response = await api.get("/product/" + id);
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

/**
 * Fetch a product by id with token.
 * @param id
 * @param token
 * @returns {Promise<any>}
 */
export const fetchProductByIdWithToken = async (id,token) => {
    const response = await api.get("/product/" + id,{
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
 * Fetch top products.
 * @param {number} limit - The number of top products to fetch.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const fetchTopProducts = async (limit) => {
    const response = await api.get("/product/top/" + limit);
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
/**
 * Fetch products by category.
 * @param {string} category - The category of the products.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const fetchProductsByCategory = async (category) => {
    const response = await api.get("/category/" + category);
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
/**
 * Search products.
 * @param {string} query - The search query.
 * @param {string} categoryId - The id of the category.
 * @param {string} sort - The sort order.
 * @param {boolean} discount - Whether to include discounted products.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
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
/**
 * Add a product.
 * @param {string} token - The authorization token.
 * @param {Object} product - The product data.
 * @param {File} photo - The product photo.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 201.
 */
export const addProduct = async (token, product,photo) => {

    const formData = new FormData();
    if (photo !== null) formData.append('file', photo)

    const photoResponse = await api.post("/uploadfile/", formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (photoResponse.status !== 201) {
        throw new Error("Something went wrong!");
    }

    const response = await api.post("/product", {...product,image:photoResponse.data.url}, {
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
 * Delete a product by id.
 * @param {string} id - The id of the product.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const deleteProduct = async (id) => {
    const response = await api.delete("/product/" + id);
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
/**
 * Edit a product.
 * @param {string} token - The authorization token.
 * @param {string} id - The id of the product.
 * @param {Object} product - The new product data.
 * @param {File} photo - The new product photo.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const editProduct = async (token,id, product,photo) => {

    const formData = new FormData();
    if (photo !== null) formData.append('file', photo)

    const photoResponse = await api.post("/uploadfile/", formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (photoResponse.status !== 201) {
        throw new Error("Something went wrong!");
    }

    const response = await api.put("/product/"+id, {...product,image:photoResponse.data.url}, {
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
 * Edit product availability.
 * @param {string} token - The authorization token.
 * @param {string} id - The id of the product.
 * @param {boolean} availability - The new availability status.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
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
/**
 * Fetch user's products.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
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
/**
 * Fetch products review ratings.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const fetchProductsReviewRatings = async (token) => {
    const response = await api.get("/product/seller/review-ratings", {
        headers: {Authorization: `Bearer ${token}`},
    });

    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }

    return response.data;
}