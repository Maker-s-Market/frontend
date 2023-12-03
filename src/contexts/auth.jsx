import React, {createContext, useMemo} from "react";
import {useAuth} from "../hooks/useAuth.js";
import {useMutation} from "react-query";
import {follow, unfollow} from "../api/fetchAuth.js";
import {useNotification} from "../hooks/useNotification.js";


export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const {
        login,
        logout,
        user,
        isLogged,
        setUser,
        setToken,
        token,
        setFollowing,
        following
    } = useAuth();

    const notification = useNotification();

    const followMutation = useMutation((id) => follow(token,id), {
        onSuccess: (data) => {
            setFollowing((prevState) => data.following ? data.following : [])
            notification.info("Followed successfully")
        }
    })

    const unfollowMutation = useMutation((id) => unfollow(token,id), {
        onSuccess: (data) => {
            setFollowing((prevState) => data.following ? data.following : [])
            notification.info("Unfollowed successfully")
        }
    })


    const authCtx = useMemo(() => {
        return {
            login,
            logout,
            user,
            isLogged,
            setUser,
            setToken,
            token,
            unfollowMutation,
            followMutation,
            following,
            setFollowing
        }
    }, [user,token,following])

    return (<AuthContext.Provider value={authCtx}>
        {children}
    </AuthContext.Provider>)
}

export const useAuthContext = () => {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuthContext must be used within a AuthProvider')
    }
    return context
}