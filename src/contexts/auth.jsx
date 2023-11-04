import React, {createContext, useMemo} from "react";
import {useAuth} from "../hooks/useAuth.js";


export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const {login,logout,user,isLogged,setUser,setToken,token} = useAuth();

    const authCtx = useMemo(() => {
        return {
            login,
            logout,
            user,
            isLogged,
            setUser,
            setToken,
            token
        }
    }, [user,token])

    return (
        <AuthContext.Provider value={authCtx}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuthContext must be used within a AuthProvider')
    }
    return context
}