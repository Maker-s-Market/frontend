import {useCookies} from "react-cookie";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useAuthContext} from "../../contexts/auth.jsx";
import {useEffect, useState} from "react";
import {useMutation} from "react-query";
import {signUpIdp} from "../../api/fetchAuth.js";
import {FormError} from "../common/formError/index.js";
import {useNavigate, useParams} from "react-router-dom";
import {Loading} from "../common/loading/index.js";

export const SignUpIdp = (props) => {
    const [cookies, setCookies, removeCookies] = useCookies(['name','email', 'username', 'picture', 'Authorization']);
    //Get variable from GET url ?
    const urlParameters = new URLSearchParams(window.location.search);
    const signType = urlParameters.get('signType');
    const {setToken, user} = useAuthContext();
    const [tempToken, setTempToken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (signType === "signIn") {
            setToken(cookies.Authorization);
        } else if (signType === "signUp") {
            setToken(tempToken);
        }
    }, [signType]);

    useEffect(() => {
        setTempToken(cookies.Authorization);
    }, [cookies.Authorization]);

    useEffect(() => {
        if (user) {
            localStorage.setItem("token", tempToken);
            removeCookies('email', {path: '/'});
            removeCookies('username', {path: '/'});
            removeCookies('picture', {path: '/'});
            removeCookies('Authorization', {path: '/'});
            navigate("/");
        }
    }, [user]);

    const signUpIdpMutation = useMutation({
        mutationFn: async ({
                               city,
                               region
                           }) => signUpIdp(cookies.name, cookies.username, cookies.email, city, region, cookies.picture),
        onSuccess: (data) => {
            setToken(tempToken);
        }
    })
    const signUpIdpHandler = (values) => signUpIdpMutation.mutate(values);

    return <div>
        {signType === "signIn" ? <Loading/> :
            <>
                <h2 className="text-4xl font-bold">Please fill this missing values to conclude the sign up</h2>

                <Formik initialValues={{
                    region: "",
                    city: "",
                }} onSubmit={signUpIdpHandler}>
                    <Form>
                        <div className={"form-control space-y-2"}>
                            <label className={"label"}>
                                <span className={"label-text"}>City</span>
                            </label>
                            <ErrorMessage component={FormError} name={"city"}/>
                            <Field type="text" placeholder={"City"} name={"city"}
                                   className={"input input-bordered"}/>

                            <label className={"label"}>
                                <span className={"label-text"}>Region</span>
                            </label>
                            <ErrorMessage component={FormError} name={"region"}/>
                            <Field type="text" placeholder={"Region"} name={"region"}
                                   className={"input input-bordered"}/>
                            <button type={"submit"} className={"btn btn-accent"}>Sign Up</button>
                        </div>
                    </Form>
                </Formik>
            </>
        }
    </div>;
};