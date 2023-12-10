import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useMutation, useQuery} from "react-query";
import {doSignIn, fetchUser} from "../../api/fetchAuth.js";
import {Link, useNavigate} from "react-router-dom";
import {useNotification} from "../../hooks/useNotification.js";
import {useAuthContext} from "../../contexts/auth.jsx";
import {FormError} from "../../components/common/formError/index.js";

export const SignIn = (props) => {
    const navigate = useNavigate();
    const notification = useNotification()
    const {setToken,token,login,signInMutation} = useAuthContext()

    const loginSchema = Yup.object().shape({
        identifier: Yup.string().required(),
        password: Yup.string().required(),
    });

    useQuery("user",
        ()=>fetchUser(token), {enabled: !!token,
        onSuccess: (data) => {
            login(data,token)
            notification.info("Welcome")
            navigate("/")

        },
        onError: () => {
            notification.info("Error")
        }
    })

    const handleSubmit = (values) => signInMutation.mutate(values)

    return <div className={"bg-accent w-screen h-screen"}>
        <div className={"card w-3/4 bg-base-100 shadow-xl mx-auto"}>
            <div className="card-body">
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
                                <ErrorMessage component={FormError}  name={"identifier"} />
                            </div>
                            <Field type="text" placeholder={"Email or Username"} name={"identifier"}
                                   className={"input input-bordered"}/>

                            <div>
                                <label className={"label"}>
                                    <span className={"label-text"}>Password</span>
                                </label>
                                <ErrorMessage component={FormError}  name={"password"} />
                            </div>
                            <Field type="password" placeholder={"Password"} name={"password"}
                                   className={"input input-bordered"}/>

                            <button type={"submit"} className={"btn btn-accent"}>Sign In</button>
                            <span className={"mx-auto"}>Don&apos;t have an acount? <Link to={"/signup"}  className={"text-accent hover:underline"}>Create an Account</Link></span>
                            <Link to={"/forgotPassword"} className={"mx-auto hover:underline"}>Forgot Password?</Link>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>

    </div>;
};