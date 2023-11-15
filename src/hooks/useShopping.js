import { useState } from 'react';

export const useShopping = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (productToAdd) => {
        setCart(currentCart => {
            // Find the index of the existing product in the cart
            const productIndex = currentCart.findIndex(item => item.product.id === productToAdd.id);
            if (productIndex !== -1) {
                // If the product exists, create a new array with updated quantity
                return currentCart.map((item, index) =>
                    index === productIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // If it doesn't exist, add the new product with quantity 1
                return [...currentCart, { product: productToAdd, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productToRemove) => {
        setCart(currentCart => {
            // Find the index of the product to remove
            const productIndex = currentCart.findIndex(item => item.product.id === productToRemove.id);
            if (productIndex !== -1) {
                // If the product exists, create a new array with updated quantity
                return currentCart.map((item, index) =>
                    index === productIndex
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ).filter(item => item.quantity > 0);
            } else {
                // If it doesn't exist, return the current cart
                return currentCart;
            }
        });
    }

    const clearCart = () => {
        setCart([]);
    };

    return { cart, addToCart, removeFromCart, clearCart };
};
