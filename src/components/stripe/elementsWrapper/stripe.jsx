import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";


export const Stripe = ({ children }) => {

    const stripePromise = loadStripe(
        "pk_test_51OIyIFFzcOhoVJrZQMUYqI90GBxj5IRQv3Z1zBOHFnuZ80F8mwjso6MKPrr2dowyjX5YLtz31WsBCkf6L5Hq8svh00ZYTaMBpA"
    );
    return(
        <Elements stripe={stripePromise}>
            { children }
        </Elements>
    )
}