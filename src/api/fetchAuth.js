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

    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;

}

export const confirmCode = async (username,code) => {
    const response = await api.post("/auth/verify-email", {
        username: username,
        code: code
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
    const response = await api.get("/auth/current-user",
        {headers: {Authorization: `Bearer ${token}`}}
    );
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;

}