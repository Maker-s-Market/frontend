import {createContext, useContext, useEffect} from "react";
import {useShopping} from "../hooks/useShopping.js";
import {useNotification} from "../hooks/useNotification.js";
import {setLocalStorage} from "../utils/localStorage.js";
import {useAuthContext} from "./auth.jsx";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {addToWishlist, deleteFromWishlist, fetchWishlist} from "../api/fetchWishlist.js";

export const ShoppingContext = createContext({});


export const ShoppingProvider = ({children}) => {

    const {cart, addToCart, removeFromCart, clearCart,setCart, wishlist,setWishlist,isProductInWishlist} = useShopping();
    const notification = useNotification();
    const {user, isLogged,token} = useAuthContext();
    const queryClient = useQueryClient()


    useEffect(() => {
        if (isLogged()) {
            const localCart = JSON.parse(localStorage.getItem(`${user.id}_cart`));
            if (localCart) {
                setCart(()=> localCart)
            }
        }
    }, [isLogged])


    const {data} = useQuery(["wishlist"], () => fetchWishlist(token), {
        refetchOnWindowFocus: false,enabled:isLogged(), onSuccess: (data) => {
            setWishlist(() => data.products)
        }
    })

    const addToCartShopping = (product,user) => {
        const newCart = addToCart(product);
        setLocalStorage(`${user}_cart`, newCart)
        notification.info("Product added to cart");
    }

    const removeFromCartShopping = (product,user) => {
        const newCart = removeFromCart(product);
        setLocalStorage(`${user}_cart`, newCart)
        notification.info("Product removed from cart");
    }

    const addToWishlistMutation = useMutation((id) => addToWishlist(id, token), {
        onSuccess: (data) => {
            notification.info("Product added to wishlist");
            setWishlist((prevState)=> data.products)
            queryClient.invalidateQueries(['wishlist'])
        }
    })

    const removeFromWishlistMutation = useMutation((id) => deleteFromWishlist(id, token), {
        onSuccess: (data) => {
            notification.info("Product removed from wishlist");
            setWishlist((prevState)=> data.products ? data.products : [])
            queryClient.invalidateQueries(['wishlist'])
        }
    })

    const shoppingCtx = {
        cart,
        addToCart: addToCartShopping,
        removeFromCart: removeFromCartShopping,
        clearCart,
        wishlist,
        setWishlist,
        isProductInWishlist,
        addToWishlistMutation,
        removeFromWishlistMutation
    }

    return (
        <ShoppingContext.Provider value={shoppingCtx}>
            {children}
        </ShoppingContext.Provider>
    )
}

export const useShoppingContext = () => {
    const context = useContext(ShoppingContext)
    if (context === undefined) {
        throw new Error('useShoppingContext must be used within a ShoppingProvider')
    }
    return context
}