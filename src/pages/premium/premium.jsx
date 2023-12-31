import {Stripe} from "../../components/stripe/elementsWrapper/index.js";
import {CheckoutForm} from "../../components/stripe/checkoutForm/index.js";
import {useAuthContext} from "../../contexts/auth.jsx";
import {changeRoleStatus} from "../../api/fetchAuth.js";
import {useQueryClient} from "react-query";
/**
 * PremiumCheckout component.
 * @module PremiumCheckout
 * @returns {JSX.Element} PremiumCheckout component.
 */
export const PremiumCheckout = () => {
    const {token,setUser} = useAuthContext();
    const queryClient = useQueryClient();
    // TO-DO: get cart value
    const amount = 199.99;

    const handleSucessfulCheckout = async () => {
        const response = await changeRoleStatus(token, "Premium");
        await queryClient.refetchQueries(["user"],{inactive: true})
        setUser((prevState) => ({...prevState, role: "Premium"}))
    }

    return (
        <Stripe>
            <div>
                
                <h1 className="text-4xl font-bold">Checkout</h1>
                <div className={"flex flex-row "}>
                    <CheckoutForm amount={amount} handleSucessfulCheckout={handleSucessfulCheckout}/>

                    <div className={"flex-grow bg-stone-200 p-3 rounded-md"}>
                        <h1 className="text-2xl font-bold">Detalhes de Compra</h1>
                        <div
                             className="flex flex-row justify-between items-center p-4">
                            <div className="flex flex-row justify-between items-center">
                                <img src={"/logo.png"} alt={"logo"} className="w-24 h-24"/>
                                <div className="flex flex-col ml-4">
                                    <h2 className="text-xl font-bold">Makers Market Lifetime Premium Subscription</h2>
                                    <p className="text-lg">{amount}€</p>
                                </div>
                            </div>
                        </div>
                        <div className={"md:col-span-2 lg:col-span-1 bg-stone-200 rounded-lg p-4"}>
                            <h1 className="text-4xl font-bold">Total</h1>
                            <p className="text-lg">Total price: {Number.parseFloat(amount).toFixed(2)}€</p>
                        </div>
                    </div>
                </div>
            </div>
        </Stripe>

    );
}