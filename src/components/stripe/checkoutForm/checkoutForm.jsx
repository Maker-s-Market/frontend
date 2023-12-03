import {ErrorMessage, Field, Form, Formik} from "formik";
import {FormError} from "../../common/formError/index.js";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import * as Yup from "yup";
import {getPaymentIntent} from "../../../api/fetchOrder.js";
import {useAuthContext} from "../../../contexts/auth.jsx";
import {useNotification} from "../../../hooks/useNotification.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export const CheckoutForm = ({amount, handleSucessfulCheckout}) => {
    const stripe = useStripe();
    const elements = useElements();
    const {token} = useAuthContext();
    const notification = useNotification()
    const navigate = useNavigate()

    const [isProcessing, setProcessingTo] = useState(false);

    const initialValues = {
        name: "",
        email: "",
        address: "",
        city: "",
        zip: ""
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        email: Yup.string().required("Required"),
        address: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
        zip: Yup.string().required("Required"),
    });


    const handleCardDetailsChange = ev => {

    };

    const handleSubmit = async (values) => {

        const billingDetails = {
            name: values.name,
            email: values.email,
            address: {
                city: values.city,
                line1: values.address,
                state: "",
                postal_code: values.zip
            }
        };

        const cardElement = elements.getElement("card");
        setProcessingTo(true);

        try {
            const data = await getPaymentIntent(token, amount);

            let clientSecret = data.client_secret

            const paymentMethodReq = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
                billing_details: billingDetails
            });

            if (paymentMethodReq.error) {
                console.log(paymentMethodReq.error.message)
                notification.error("Ocorreu um erro na transação.")
                setProcessingTo(false);
                return;
            }

            const {error} = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethodReq.paymentMethod.id
            });

            if (error) {
                console.log(paymentMethodReq.error.message)
                notification.error("Ocorreu um erro na transação.")
                setProcessingTo(false);
                return;
            }

            handleSucessfulCheckout()
            notification.success("Pagamento bem sucedido.")
            setProcessingTo(false)
            navigate("/")
        } catch (error) {
            notification.error(error.message)
            setProcessingTo(false)
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                handleSubmit(values)
            }}>
            <Form className="form-control flex-grow p-3">
                <h1 className="text-2xl font-bold">Billing address</h1>
                <div className="form-control p-5 space-y-2">
                    <div>
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <ErrorMessage component={FormError} name={"name"}/>
                    </div>
                    <Field
                        name={"name"}
                        type={"text"}
                        placeholder={"Mariana Andrade"}
                        className="input input-bordered"
                    />

                    <div>
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <ErrorMessage component={FormError} name={"email"}/>
                    </div>
                    <Field
                        name={"email"}
                        type={"email"}
                        placeholder={"marianaadrande@ua.pt"}
                        className="input input-bordered"
                    />

                    <div>
                        <label className="label">
                            <span className="label-text">Morada</span>
                        </label>
                        <ErrorMessage component={FormError} name={"address"}/>
                    </div>
                    <Field
                        name={"address"}
                        type={"text"}
                        placeholder="Campus Universitário Santiago"
                        className="input input-bordered"
                    />

                    <div>
                        <label className="label">
                            <span className="label-text">Cidade</span>
                        </label>
                        <ErrorMessage component={FormError} name={"city"}/>
                    </div>
                    <Field
                        name={"city"}
                        type={"text"}
                        placeholder={"Aveiro"}
                        className="input input-bordered"
                    />

                    <div>
                        <label className="label">
                            <span className="label-text">Código Postal</span>
                        </label>
                        <ErrorMessage component={FormError} name={"zip"}/>
                    </div>
                    <Field
                        name={"zip"}
                        type={"text"}
                        placeholder={"3810-143"}
                        className="input input-bordered"
                    />
                    <div className="divider"></div>
                    <h1 className="text-xl font-bold">Payment details</h1>
                    <CardElement
                        className={"input input-bordered items-center"}
                        onChange={handleCardDetailsChange}
                    />
                    <button disabled={isProcessing || !stripe} type={"submit"}
                            className="btn btn-accent btn-block mt-2">
                        {isProcessing ? "Processing..." : `Pay`}
                    </button>
                </div>
            </Form>
        </Formik>
    )
}