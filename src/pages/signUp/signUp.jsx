import * as Yup from "yup";
import {Field, Form, Formik, ErrorMessage} from "formik";
import {useNavigate} from "react-router-dom";
import {useNotification} from "../../hooks/useNotification.js";
import {useMutation} from "react-query";
import {doSignUp} from "../../api/fetchAuth.js";
import {useState} from "react";
import {FormError} from "../../components/common/formError/index.js";

export const SignUp = (props) => {

    const signUpSchema = Yup.object().shape({
        name: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
        city: Yup.string().required(),
        region: Yup.string().required(),
        image: Yup.mixed(),
    });
    const navigate = useNavigate();
    const notification = useNotification()
    const [identifier, setIdentifier] = useState("")
    const [email, setEmail] = useState("")
    const [photo, setPhoto] = useState("")

    const signUpMutation = useMutation({
        mutationFn: ({name, username, email, password, city, region,image}) => doSignUp({name, username, email, password, city, region,image},photo),
        onSuccess: () => {
            notification.info("Success")
            navigate("/confirmEmail?username="+identifier+"&email="+email)
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
                }} onSubmit={(values) => {
                    handleSubmit(values)

                }} validationSchema={signUpSchema}>
                    <Form>
                        <div className={"form-control space-y-2"}>
                            <div>
                                <label className={"label"}>
                                    <span className={"label-text"}>Name</span>
                                </label>
                                <ErrorMessage component={FormError} name={"name"}/>
                            </div>
                            <Field type="text" placeholder={"Name"} name={"name"}
                                   className={"input input-bordered"}/>

                            <div>
                                <label className={"label"}>
                                    <span className={"label-text"}>Username</span>
                                </label>
                                <ErrorMessage component={FormError} name={"username"}/>
                            </div>
                            <Field type="text" placeholder={"Username"} name={"username"}
                                   className={"input input-bordered"}
                                   onKeyUp={(e) => setIdentifier(e.target.value)}
                            />

                            <div>
                                <label className={"label"}>
                                    <span className={"label-text"}>Email</span>
                                </label>
                                <ErrorMessage component={FormError} name={"email"}/>
                            </div>
                            <Field type="text" placeholder={"Email"} name={"email"}
                                   onKeyUp={(e) => setEmail(e.target.value)}
                                   className={"input input-bordered"}/>

                            <div>
                                <label className={"label"}>
                                    <span className={"label-text"}>Password</span>
                                </label>
                                <ErrorMessage component={FormError} name={"password"}/>
                            </div>
                            <Field type="password" placeholder={"Password"} name={"password"}
                                   className={"input input-bordered"}/>

                            <div>
                                <label className={"label"}>
                                    <span className={"label-text"}>City</span>
                                </label>
                                <ErrorMessage component={FormError} name={"city"}/>
                            </div>
                            <Field type="text" placeholder={"City"} name={"city"}
                                   className={"input input-bordered"}/>

                            <div>
                                <label className={"label"}>
                                    <span className={"label-text"}>Region</span>
                                </label>
                                <ErrorMessage component={FormError} name={"region"}/>
                            </div>
                            <Field type="text" placeholder={"Region"} name={"region"}
                                   className={"input input-bordered"}/>

                            <div>
                                <label className={"label"}>
                                    <span className={"label-text"}>Photo</span>
                                </label>
                                <ErrorMessage component={FormError} name={"photo"}/>
                            </div>
                            <input id="photo" name="photo" type="file"
                                   className={"file-input file-input-bordered file-input-accent w-full"}
                                   onChange={(event) => {
                                       setPhoto(event.currentTarget.files[0]);
                                   }}/>

                            <button type={"submit"} className={"btn btn-accent"}>Sign Up</button>
                        </div>

                    </Form>
                </Formik>
            </div>
        </div>
    </div>
};