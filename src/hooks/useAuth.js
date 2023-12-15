import {useState} from "react";
import {useQueryClient} from "react-query";
/**
 * useAuth is a custom hook that provides authentication-related data and operations.
 * @hook
 * @returns {Object} An object containing user data, token, and authentication-related functions.
 */
export const useAuth = () => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [following,setFollowing] = useState([]);
    const queryClient = useQueryClient();

    const login = (user,token) => {
        setUser(user);
        setFollowing(user.following)
        setToken(token);
    }

    const logout = () => {
        setUser(null);
        setFollowing([]);
        setToken(null);
        queryClient.clear();
        localStorage.removeItem("token");
    }

    const isLogged = () => {
        return user !== null && token !== null;
    }

    return {login,user, logout, isLogged, token,setToken,setUser,following,setFollowing};
};