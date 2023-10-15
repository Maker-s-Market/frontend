import {api} from "./axios.js";

export default async function fetchTodos() {
    const response = await api.get("/todos");
    if (response.status !== 200) {
        throw new Error("Something went wrong!");
    }
    return response.data;
}