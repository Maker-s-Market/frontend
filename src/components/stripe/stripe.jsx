import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {CheckoutForm} from "./checkoutForm/index.js";

export const Stripe = () => {

    const stripePromise = loadStripe(
        "pk_test_51OIqpEH77Yi7PjLJXyx4jzRsQ2geagYHw92MLeiWLJlxTuLuelEYzeHX8sMtB993kYpJ1IBNa5yhoCoxmsg4lN4A00CWDHUzXV"
    );
    return(
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    )
}