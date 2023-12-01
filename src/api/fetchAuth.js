import {api} from "./axios.js";

export const doSignIn = async (user) => {

    const response = await api.post("/auth/sign-in", user)

    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const doSignUp = async (user) => {
    const response = await api.post("/auth/sign-up", user);

    if (response.status !== 201) {
        throw new Error("Something went wrong!");
    }
    return response.data;

}

export const confirmCode = async (username, code) => {
    const response = await api.post("/auth/verify-email", {
        username: username, code: code
    });

    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const resendCode = async (email) => {
    const response = await api.post("/auth/resend-email-code", {
        identifier: email
    });

    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}
export const fetchUser = async (token) => {
    const response = await api.get("/auth/me", {headers: {Authorization: `Bearer ${token}`}});
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;

}

export const recoverPasswordEmail = async (email) => {
    const response = await api.post("/auth/forgot-password", {
        identifier: email
    });

    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const recoverPassword = async (email, code, password) => {
    const response = await api.post("/auth/confirm-forgot-password", {
        identifier: email, code: code, password: password
    });

    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const editProfile = async (token, id, name, username, email, city, region, photo) => {

    const response = await api.put("/user", {
        id: id, name: name, username: username, email: email, city: city, region: region, photo: photo
    }, {
        headers: {Authorization: `Bearer ${token}`}
    });

    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const fetchUserById = async (id) => {
    const response = await api.get(`/user/${id}`);
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const follow = async (token, id) => {
    const response = await api.post("/user/follow-user/" + id, {}, {
        headers: {Authorization: `Bearer ${token}`}
    });
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const unfollow = async (token, id) => {
    const response = await api.delete("/user/remove-following/" + id, {
        headers: {Authorization: `Bearer ${token}`}
    });
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const fetchFollowersById = async (token,sort) => {
    const response = await api.get(`/user/followers`, {
        headers: {Authorization: `Bearer ${token}`},
        params: {sort: sort}
    });
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}

export const fetchFollowingById = async (token,sort) => {
    const response = await api.get(`/user/following`,{
        headers: {Authorization: `Bearer ${token}`},
        params: {sort: sort}
    });
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}