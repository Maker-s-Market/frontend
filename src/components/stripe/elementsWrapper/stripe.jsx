import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

/**
 * Stripe component wraps the children components with Stripe Elements.
 *
 * @component
 * @param {Object} props - The properties passed to the component, including children components.
 * @returns {JSX.Element} Stripe Elements wrapping the children components.
 */
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