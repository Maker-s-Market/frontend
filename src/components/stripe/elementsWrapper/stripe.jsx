import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";


export const Stripe = ({ children }) => {

    const stripePromise = loadStripe(
        import.meta.env.VITE_STRIPE_KEY
    );
    return(
        <Elements stripe={stripePromise}>
            { children }
        </Elements>
    )
}