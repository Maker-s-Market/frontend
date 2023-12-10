import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {Link, useNavigate} from "react-router-dom";
import {useAuthContext} from "../../contexts/auth.jsx";
import {FormError} from "../../components/common/formError/index.js";
import {useEffect} from "react";

export const SignIn = (props) => {
    const navigate = useNavigate();
    const {user, token, signInMutation} = useAuthContext()

    const loginSchema = Yup.object().shape({
        identifier: Yup.string().required(),
        password: Yup.string().required(),
    });

    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [token, user])

    const handleSubmit = (values) => signInMutation.mutate(values)

    return <>
        <h2 className="text-4xl font-bold">Sign In</h2>
        <Formik initialValues={{
            identifier: "",
            password: "",
        }} onSubmit={(values) => handleSubmit(values)} validationSchema={loginSchema}>
            <Form>
                <div className={"form-control space-y-2"}>
                    <div>
                        <label className={"label"}>
                            <span className={"label-text"}>Email or Username</span>
                        </label>
                        <ErrorMessage component={FormError} name={"identifier"}/>
                    </div>
                    <Field type="text" placeholder={"Email or Username"} name={"identifier"}
                           className={"input input-bordered"}/>

                    <div>
                        <label className={"label"}>
                            <span className={"label-text"}>Password</span>
                        </label>
                        <ErrorMessage component={FormError} name={"password"}/>
                    </div>
                    <Field type="password" placeholder={"Password"} name={"password"}
                           className={"input input-bordered"}/>

                    <button type={"submit"} className={"btn btn-accent"}>Sign In</button>
                    <span className={"mx-auto"}>Don&apos;t have an acount? <Link to={"/signup"}
                                                                                 className={"text-accent hover:underline"}>Create an Account</Link></span>
                    <Link to={"/forgotPassword"} className={"mx-auto hover:underline"}>Forgot Password?</Link>
                </div>
            </Form>
        </Formik>
    </>
};