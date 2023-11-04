import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {useNotification} from "../../hooks/useNotification.js";
import {useMutation} from "react-query";
import {doSignUp} from "../../api/fetchAuth.js";
import {useState} from "react";

export const SignUp = (props) => {

    const signUpSchema = Yup.object().shape({
        name: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
        city: Yup.string().required(),
        region: Yup.string().required(),
        photo: Yup.string().required(),
    });
    const navigate = useNavigate();
    const notification = useNotification()
    const [identifier, setIdentifier] = useState("")

    const signUpMutation = useMutation({
        mutationFn: ({name, username, email, password, city, region,photo}) => {
            doSignUp({name, username, email, password, city, region,photo})
            setIdentifier(username)
        },
        onSuccess: (data) => {
            notification.info("Success")
            navigate("/confirmEmail?username="+identifier+"&email="+data.email)
        },
        onError: () => {
            notification.info("Failed to sign up")
        }
    })


    const handleSubmit = (values) => signUpMutation.mutate(values)

    return <div className={"bg-accent w-screen h-screen"}>
        <div className={"card w-3/4 bg-base-100 shadow-xl mx-auto"}>
            <div className="card-body">
                <h2 className="text-4xl font-bold">Sign Up</h2>
                <Formik initialValues={{
                    name: "", username: "", email: "", password: "", city: "", region: "", photo: "",
                }} onSubmit={(values) => handleSubmit(values)} validationSchema={signUpSchema}>
                    <Form>
                        <div className={"form-control space-y-2"}>
                            <label className={"label"}>
                                <span className={"label-text"}>Name</span>
                            </label>
                            <Field type="text" placeholder={"Name"} name={"name"}
                                   className={"input input-bordered"}/>
                            <label className={"label"}>
                                <span className={"label-text"}>Username</span>
                            </label>
                            <Field type="text" placeholder={"Username"} name={"username"}
                                   className={"input input-bordered"}/>
                            <label className={"label"}>
                                <span className={"label-text"}>Email</span>
                            </label>
                            <Field type="text" placeholder={"Email"} name={"email"}
                                   className={"input input-bordered"}/>
                            <label className={"label"}>
                                <span className={"label-text"}>Password</span>
                            </label>
                            <Field type="password" placeholder={"Password"} name={"password"}
                                   className={"input input-bordered"}/>
                            <label className={"label"}>
                                <span className={"label-text"}>City</span>
                            </label>
                            <Field type="text" placeholder={"City"} name={"city"}
                                   className={"input input-bordered"}/>
                            <label className={"label"}>
                                <span className={"label-text"}>Region</span>
                            </label>
                            <Field type="text" placeholder={"Region"} name={"region"}
                                   className={"input input-bordered"}/>
                            <label className={"label"}>
                                <span className={"label-text"}>Photo</span>
                            </label>
                            <Field name={"photo"} type={"file"}
                                   className={"file-input file-input-bordered file-input-accent w-full max-w-xs"}/>
                            <button type={"submit"} className={"btn btn-accent"}>Sign Up</button>
                        </div>

                    </Form>
                </Formik>
            </div>
        </div>
    </div>
};