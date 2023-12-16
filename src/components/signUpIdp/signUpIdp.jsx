import {ErrorMessage, Field, Form, Formik} from "formik";
import {useAuthContext} from "../../contexts/auth.jsx";
import {useState} from "react";
import {useMutation, useQuery} from "react-query";
import {fetchTokenAuth, signUpIdp} from "../../api/fetchAuth.js";
import {FormError} from "../common/formError/index.js";
import {useNavigate, useParams} from "react-router-dom";
import {Loading} from "../common/loading/index.js";
/**
 * SignUpIdp component handles the sign up process for the user.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} A form for the user to fill in missing values to conclude the sign up.
 */
export const SignUpIdp = (props) => {
    //Get variable from GET url ?
    const urlParameters = new URLSearchParams(window.location.search);
    const signType = urlParameters.get('signType');
    const {setToken, user} = useAuthContext();
    const [tempToken, setTempToken] = useState("");
    const navigate = useNavigate();

    const {data: signUpData,isSuccess, isError} = useQuery("token-auth",()=>fetchTokenAuth(), {
        onSuccess: (data) => {
            if (signType === "signIn") {
                setToken(data.authorization);
                localStorage.setItem("token", data.authorization);
                navigate("/")
            } else {
                setTempToken(data.authorization);
            }
        }
    });

    const signUpIdpMutation = useMutation({
        mutationFn: async ({
                               city,
                               region
                           }) => signUpIdp(signUpData.name, signUpData.username, signUpData.email, city, region, signUpData.picture),
        onSuccess: () => {
            setToken(tempToken);
            localStorage.setItem("token", tempToken);
            navigate("/")
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