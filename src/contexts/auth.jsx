import React, {createContext, useEffect, useMemo} from "react";
import {useAuth} from "../hooks/useAuth.js";
import {useMutation, useQuery} from "react-query";
import {doSignIn, fetchUser, follow, unfollow} from "../api/fetchAuth.js";
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

    //Do login if token is present in the localStorage
    useEffect(() => {
        const tkn = localStorage.getItem("token")
        if (tkn) {
            setToken(tkn)
        }

    }, [])

    useQuery("user",
        ()=>fetchUser(token), {enabled: !!token,
            onSuccess: (data) => {
                login(data,token)
            },
            onError: () => {
                notification.info("Error")
                localStorage.removeItem("token")
            }
        })

    const notification = useNotification();

    const followMutation = useMutation((id) => follow(token, id), {
        onSuccess: (data) => {
            setFollowing((prevState) => data.following ? data.following : [])
            notification.info("Followed successfully")
        }
    })

    const unfollowMutation = useMutation((id) => unfollow(token, id), {
        onSuccess: (data) => {
            setFollowing((prevState) => data.following ? data.following : [])
            notification.info("Unfollowed successfully")
        }
    })


    const signInMutation = useMutation({
        mutationFn: ({identifier, password}) => doSignIn({identifier, password}),
        onSuccess: (data) => {
            notification.info("Welcome")
            setToken(() => data.token)
            localStorage.setItem("token", data.token)
        },
        onError: () => {
            notification.info("Failed to sign in. Invalid credentials")
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
            setFollowing,
            signInMutation
        }
    }, [user, token, following])

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