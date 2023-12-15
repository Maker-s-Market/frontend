import {useState} from 'react';
/**
 * useShopping is a custom hook that provides shopping-related data and operations.
 * @hook
 * @returns {Object} An object containing cart, wishlist, orders data and related functions.
 */
export const useShopping = () => {
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [orders, setOrders] = useState([]);

    const addToCart = (productToAdd) => {
        let newCart = [...cart]
            // Find the index of the existing product in the cart
        const productIndex = newCart.findIndex(item => item.product.id === productToAdd.id);
        if (productIndex !== -1) {
            // If the product exists, create a new array with updated quantity
            newCart =  newCart.map((item, index) =>
                index === productIndex
                    ? {...item, quantity: item.quantity + 1}
                    : item
            );
        } else {
            // If it doesn't exist, add the new product with quantity 1
            newCart = [...newCart, {product: productToAdd, quantity: 1}];
        }

        setCart(() => newCart);
        return newCart
    };

    const removeFromCart = (productToRemove) => {
        let newCart = [...cart]
        // Find the index of the product to remove
        const productIndex = newCart.findIndex(item => item.product.id === productToRemove.id);
        if (productIndex !== -1) {
            // If the product exists, create a new array with updated quantity
            newCart = newCart.map((item, index) =>
                index === productIndex
                    ? {...item, quantity: item.quantity - 1}
                    : item
            ).filter(item => item.quantity > 0, []);
        }
        setCart(() => newCart);
        return newCart
    }

    const clearCart = () => {
        setCart([]);
    };

    const isProductInWishlist = (productId) => {
        return wishlist.findIndex(item => item.id === productId) !== -1;
    };

    return {cart, addToCart, removeFromCart, clearCart, setCart, wishlist, setWishlist, isProductInWishlist, orders,setOrders};
};
