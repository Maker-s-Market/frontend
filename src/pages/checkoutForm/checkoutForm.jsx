import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {
    CardElement,
    useElements,
    useStripe
} from '@stripe/react-stripe-js';
import {useShoppingContext} from "../../contexts/shopping.jsx";
import {useState} from "react";
import {getPaymentIntent} from "../../api/fetchOrder.js";
import {useAuthContext} from "../../contexts/auth.jsx";
import {Hero} from "../../components/home/hero/index.js";
import {useNotification} from "../../hooks/useNotification.js";
import {Link, useNavigate} from "react-router-dom";
import {FormError} from "../../components/common/formError/index.js";

export const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const {token} = useAuthContext();
    const notification = useNotification()
    const navigate = useNavigate()

    const [isProcessing, setProcessingTo] = useState(false);

    const {cart} = useShoppingContext();

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

    // TO-DO: get cart value
    const amount = 1;

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
            const {data: clientSecret} = getPaymentIntent(token, amount);

            console.log(clientSecret)

            const paymentMethodReq = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
                billing_details: billingDetails
            });

            if (paymentMethodReq.error) {
                notification.error(paymentMethodReq.error.message)
                setProcessingTo(false);
                return;
            }

            const {error} = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethodReq.paymentMethod.id
            });

            if (error) {
                notification.error(paymentMethodReq.error.message)
                setProcessingTo(false);
                return;
            }

            notification.success("Pagamento bem sucedido.")
            navigate("/")
        } catch (error) {
            notification.error(error.message)
        }
    };

    const handleCardDetailsChange = ev => {
        ev.error ? console.log("error") : console.log("error");
    };

    return (
        <div>
            <Hero/>
            <h1 className="text-4xl font-bold">Checkout</h1>
            <div className={"flex flex-row "}>
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
                                <ErrorMessage component={FormError}  name={"name"} />
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
                                <ErrorMessage component={FormError}  name={"email"} />
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
                                <ErrorMessage component={FormError}  name={"address"} />
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
                                <ErrorMessage component={FormError}  name={"city"} />
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
                                <ErrorMessage component={FormError}  name={"zip"} />
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

                <div className={"flex-grow bg-stone-200 p-3 rounded-md"}>
                    <h1 className="text-2xl font-bold">Detalhes de Compra</h1>
                    {cart.map((item) => {
                        return <div key={item.product.id} className="flex flex-row justify-between items-center p-4">
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
                        <p className="text-lg">Total price: {cart.reduce((acc, item) => acc + item.product.price, 0)}€</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
