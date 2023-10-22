import {useState} from "react";
import {useQueryClient} from "react-query";

export const useAuth = () => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const queryClient = useQueryClient();

    const login = (user,token) => {
        setUser(user);
        setToken(token);
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        queryClient.clear();
    }

    const isLogged = () => {
        return true
    }

    return {user, login, logout, isLogged};
};