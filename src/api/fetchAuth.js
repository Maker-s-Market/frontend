import {api} from "./axios.js";

export const doSignIn = async (user) => {

    const response = await api.post("/auth/sign-in", user)

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