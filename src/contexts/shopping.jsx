import {createContext, useContext} from "react";
import {useShopping} from "../hooks/useShopping.js";
import {useNotification} from "../hooks/useNotification.js";

export const ShoppingContext = createContext({});


export const ShoppingProvider = ({children}) => {

    const {cart, addToCart, removeFromCart, clearCart} = useShopping();
    const notification = useNotification();

    const addToCartShopping = (product) => {
        addToCart(product);
        notification.info("Product added to cart");
    }

    const removeFromCartShopping = (product) => {
        removeFromCart(product);
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