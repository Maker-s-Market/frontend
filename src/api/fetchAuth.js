import {api} from "./axios.js";
/**
 * Sign in a user.
 * @param {Object} user - The user data.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const doSignIn = async (user) => {

    const response = await api.post("/auth/sign-in", user)

    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
/**
 * Sign up a new user.
 * @param {Object} user - The user data.
 * @param {File} photo - The user's photo.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 201.
 */
export const doSignUp = async (user,photo) => {
    const formData = new FormData();
    if (photo !== null) formData.append('file', photo)

    const photoResponse = await api.post("/uploadfile", formData);

    if (photoResponse.status !== 201) {
        throw new Error("Something went wrong!");
    }


    const response = await api.post("/auth/sign-up", {...user,photo:photoResponse.data.url});

    if (response.status !== 201) {
        throw new Error("Something went wrong!");
    }
    return response.data;

}
/**
 * Confirm the verification code.
 * @param {string} username - The username of the user.
 * @param {string} code - The verification code.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const confirmCode = async (username, code) => {
    const response = await api.post("/auth/verify-email", {
        username: username, code: code
    });

    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
/**
 * Resend the verification code.
 * @param {string} email - The email of the user.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const resendCode = async (email) => {
    const response = await api.post("/auth/resend-email-code", {
        identifier: email
    });

    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
/**
 * Fetch the user data.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const fetchUser = async (token) => {
    const response = await api.get("/auth/me", {headers: {Authorization: `Bearer ${token}`}});
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;

}
/**
 * Recover the password via email.
 * @param {string} email - The email of the user.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const recoverPasswordEmail = async (email) => {
    const response = await api.post("/auth/forgot-password", {
        identifier: email
    });

    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
/**
 * Recover the password.
 * @param {string} email - The email of the user.
 * @param {string} code - The verification code.
 * @param {string} password - The new password.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const recoverPassword = async (email, code, password) => {
    const response = await api.post("/auth/confirm-forgot-password", {
        identifier: email, code: code, password: password
    });

    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
/**
 * Edit the user profile.
 * @param {string} token - The authorization token.
 * @param {string} id - The id of the user.
 * @param {string} name - The new name of the user.
 * @param {string} username - The new username of the user.
 * @param {string} email - The new email of the user.
 * @param {string} city - The new city of the user.
 * @param {string} region - The new region of the user.
 * @param {File} photo - The new photo of the user.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const editProfile = async (token, id, name, username, email, city, region, photo) => {

    const formData = new FormData();
    if (photo !== null) formData.append('file', photo)

    const photoResponse = await api.post("/uploadfile", formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (photoResponse.status !== 201) {
        throw new Error("Something went wrong!");
    }

    const response = await api.put("/user", {
        id: id, name: name, username: username, email: email, city: city, region: region, photo: photoResponse.data.url
    }, {
        headers: {Authorization: `Bearer ${token}`}
    });

    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
/**
 * Fetch a user by id.
 * @param {string} id - The id of the user.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const fetchUserById = async (id) => {
    const response = await api.get(`/user/${id}`);
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
/**
 * Follow a user.
 * @param {string} token - The authorization token.
 * @param {string} id - The id of the user to follow.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const follow = async (token, id) => {
    const response = await api.post("/user/follow-user/" + id, {}, {
        headers: {Authorization: `Bearer ${token}`}
    });
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
/**
 * Unfollow a user.
 * @param {string} token - The authorization token.
 * @param {string} id - The id of the user to unfollow.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const unfollow = async (token, id) => {
    const response = await api.delete("/user/following/" + id, {
        headers: {Authorization: `Bearer ${token}`}
    });
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
/**
 * Fetch followers by id.
 * @param {string} token - The authorization token.
 * @param {string} sort - The sort order.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const fetchFollowersById = async (token, sort) => {
    const response = await api.get(`/user/followers`, {
        headers: {Authorization: `Bearer ${token}`}, params: {sort: sort}
    });
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
/**
 * Fetch following by id.
 * @param {string} token - The authorization token.
 * @param {string} sort - The sort order.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const fetchFollowingById = async (token, sort) => {
    const response = await api.get(`/user/following`, {
        headers: {Authorization: `Bearer ${token}`}, params: {sort: sort}
    });
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
/**
 * Change the role status of a user.
 * @param {string} token - The authorization token.
 * @param {string} role - The new role of the user.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 200.
 */
export const changeRoleStatus = async (token, role) => {
    const response = await api.put(`/user/role/${role}`, {}, {
        headers: {Authorization: `Bearer ${token}`}
    });

    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
/**
 * Sign up a user with an identity provider.
 * @param {string} name - The name of the user.
 * @param {string} username - The username of the user.
 * @param {string} email - The email of the user.
 * @param {string} city - The city of the user.
 * @param {string} region - The region of the user.
 * @param {string} photo - The photo of the user.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the response status is not 201.
 */
export const signUpIdp = async (name,username,email,city,region,photo) => {
    const response = await api.post("/auth/sign-up-idp", {
        name: name, username: username, email: email, city: city, region: region, photo: photo
    });

    if (response.status !== 201) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}