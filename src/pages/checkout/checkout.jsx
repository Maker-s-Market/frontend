import {useShoppingContext} from "../../contexts/shopping.jsx";
import {CheckoutForm} from "../../components/stripe/checkoutForm/index.js";
import {Stripe} from "../../components/stripe/elementsWrapper/index.js";
/**
 * Checkout component is used to handle the checkout process.
 * It uses react-query for server state management, Yup for form validation, and react-router-dom for navigation.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered JSX element.
 */
export const Checkout = () => {
    const {cart, placeOrderMutation} = useShoppingContext();

    // TO-DO: get cart value
    const amount = cart.reduce((acc, item) => acc + item.product.price, 0);

    const handleSucessfulCheckout = () => {
        const orders = cart.map((item) => {
            return {product_id: item.product.id, quantity: item.quantity}
        })
        placeOrderMutation.mutate(orders)
    }


    return (
        <Stripe>
            <div>
                
                <h1 className="text-4xl font-bold">Checkout</h1>
                <div className={"flex flex-row "}>
                    <CheckoutForm amount={amount} handleSucessfulCheckout={handleSucessfulCheckout}/>

                    <div className={"flex-grow bg-stone-200 p-3 rounded-md"}>
                        <h1 className="text-2xl font-bold">Detalhes de Compra</h1>
                        {cart.map((item) => {
                                return <div key={item.product.id}
                                            className="flex flex-row justify-between items-center p-4">
                                    <div className="flex flex-row justify-between items-center">
                                        <img src={item.product.image} alt={item.product.name} className="w-24 h-24"/>
                                        <div className="flex flex-col ml-4">
                                            <h2 className="text-xl font-bold">{item.product.name}</h2>
                                            <p className="text-lg">{item.product.price}€</p>
                                            <p className="text-lg">Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            }
                        )}
                        <div className={"md:col-span-2 lg:col-span-1 bg-stone-200 rounded-lg p-4"}>
                            <h1 className="text-4xl font-bold">Total</h1>
                            <p className="text-lg">Total price: {amount}€</p>
                        </div>
                    </div>
                </div>
            </div>
        </Stripe>

    );
};
