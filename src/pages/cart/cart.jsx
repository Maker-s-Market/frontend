import {Hero} from "../../components/home/hero/index.js";
import {useShoppingContext} from "../../contexts/shopping.jsx";
import {useAuthContext} from "../../contexts/auth.jsx";

export const Cart = (props) => {

    const {cart, removeFromCart,placeOrderMutation} = useShoppingContext();
    const {user} = useAuthContext();

    const handleCheckout = () => {
        const orders = cart.map((item) => {
            return {product_id: item.product.id, quantity: item.quantity}
        })
        placeOrderMutation.mutate(orders)
    }

    return <div>
        <Hero/>
        <div className="grid grid-cols-1 md:grid-cols-4 m-8 gap-4">
            <div id="item-info" className="md:col-span-2 lg:col-span-3 bg-stone-200 rounded-lg p-4">
                <h1 className="text-4xl font-bold">Cart</h1>

                {cart.map((item) => {
                        return <div key={item.product.id} className="flex flex-row justify-between items-center">
                            <div className="flex flex-row justify-between items-center">
                                <img src={item.product.image} alt={item.product.name} className="w-24 h-24"/>
                                <div className="flex flex-col ml-4">
                                    <h2 className="text-xl font-bold">{item.product.name}</h2>
                                    <p className="text-lg">{item.product.price}€</p>
                                    <p className="text-lg">Quantity: {item.quantity}</p>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <button onClick={() => removeFromCart(item.product, user.id)}
                                        className="bg-red-500 text-white rounded-lg p-2">Remove
                                </button>
                            </div>
                        </div>
                    }
                )}
            </div>

            <div className={"md:col-span-2 lg:col-span-1 bg-stone-200 rounded-lg p-4"}>
                <h1 className="text-4xl font-bold">Total</h1>
                <p className="text-lg">Total price: {cart.reduce((acc, item) => acc + item.product.price, 0)}€</p>
                <button className="btn btn-accent btn-block" onClick={handleCheckout}>Checkout</button>
            </div>
        </div>
    </div>;
};