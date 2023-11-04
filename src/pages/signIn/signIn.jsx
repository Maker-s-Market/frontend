import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useMutation, useQuery} from "react-query";
import {doSignIn, fetchUser} from "../../api/fetchAuth.js";
import {useNavigate} from "react-router-dom";
import {useNotification} from "../../hooks/useNotification.js";
import {useAuthContext} from "../../contexts/auth.jsx";

export const SignIn = (props) => {
    const navigate = useNavigate();
    const notification = useNotification()
    const {setToken,token,login} = useAuthContext()

    const loginSchema = Yup.object().shape({
        identifier: Yup.string().email().required(),
        password: Yup.string().required(),
    });

    const signInMutation = useMutation({
        mutationFn: ({identifier, password}) => doSignIn({identifier, password}),
        onSuccess: (data) => {
            setToken(()=> data.token)
        },
        onError: () => {
            notification.info("Failed to sign in. Invalid credentials")
        }
    })

    const userData = useQuery("user",
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
                            <label className={"label"}>
                                <span className={"label-text"}>Email or Username</span>
                            </label>
                            <Field type="text" placeholder={"Email or Username"} name={"identifier"}
                                   className={"input input-bordered"}/>

                            <label className={"label"}>
                                <span className={"label-text"}>Password</span>
                            </label>
                            <Field type="password" placeholder={"Password"} name={"password"}
                                   className={"input input-bordered"}/>

                            <button type={"submit"} className={"btn btn-accent"}>Sign In</button>
                            <span className={"mx-auto hover:underline"}>Forgot Password?</span>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>

    </div>;
};