import {createContext, useContext, useEffect} from "react";
import {useShopping} from "../hooks/useShopping.js";
import {useNotification} from "../hooks/useNotification.js";
import {setLocalStorage} from "../utils/localStorage.js";
import {useAuthContext} from "./auth.jsx";

export const ShoppingContext = createContext({});


export const ShoppingProvider = ({children}) => {

    const {cart, addToCart, removeFromCart, clearCart,setCart} = useShopping();
    const notification = useNotification();
    const {user, isLogged} = useAuthContext();


    useEffect(() => {
        if (isLogged()) {
            const localCart = JSON.parse(localStorage.getItem(`${user.id}_cart`));
            if (localCart) {
                setCart(()=> localCart)
            }
        }
    }, [isLogged])

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
    const shoppingCtx = {
        cart,
        addToCart: addToCartShopping,
        removeFromCart: removeFromCartShopping,
        clearCart
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