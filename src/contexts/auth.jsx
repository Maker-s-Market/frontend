import {createContext, useMemo} from "react";
import {useAuth} from "../hooks/useAuth.js";


export const AuthContext = createContext({
    user: null,
});

export const AuthProvider = ({children}) => {
    const {login,logout,user,isLogged} = useAuth();

    const authCtx = useMemo(() => {
        return {
            login,
            logout,
            user,
            isLogged
        }
    }, [login, logout, user, isLogged]);

    return (
        <AuthContext.Provider value={authCtx}>
            {children}
        </AuthContext.Provider>
    )
}