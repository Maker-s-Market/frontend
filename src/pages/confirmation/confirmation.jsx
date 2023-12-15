import {useMutation} from "react-query";
import {useNotification} from "../../hooks/useNotification.js";
import {useLocation, useNavigate} from "react-router-dom";
import {confirmCode, resendCode} from "../../api/fetchAuth.js";
import {useState} from "react";
/**
 * Confirmation component is used to handle the email confirmation process.
 * It uses react-query for server state management and react-router-dom for navigation.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered JSX element.
 */
export const Confirmation = (props) => {

    const navigate = useNavigate();
    const notification = useNotification()

    //Get username and email from url username=...&email=... without useParams
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const username = params.get("username")
    const email = params.get("email")


    const [confirmationCode, setConfirmationCode] = useState("")

    const confirmCodeMutation = useMutation({
        mutationFn: ({username, confirmationCode}) => confirmCode(username, confirmationCode),
        onSuccess: (data) => {
            notification.info("Success")
            navigate("/signIn")
        },
        onError: (error) => {
            notification.info("Failed to confirm")
        }
    })

    const resendCodeMutation = useMutation({
        mutationFn: ({email}) => resendCode(email),
        onSuccess: () => {
            notification.info("Email Sent. Please check your email")
        },
        onError: () => {
            notification.info("Failed to sign up")
        }
    })

    const handleSubmit = () => confirmCodeMutation.mutate({username, confirmationCode})


    return <>
        <h2 className="text-4xl font-bold">Confirm email</h2>

        <p className={"text-xl"}>We have sent you an email with a confirmation link. Please click on the link to
            activate your account.</p>


        <div className={"form-control space-y-2"}>
            <label className={"label"}>
                <span className={"label-text"}>Confirmation Code</span>
            </label>
            <input type="text" placeholder={"Confirmation Code"} name={"confirmationCode"}
                   className={"input input-bordered"}
                   onChange={(e) => setConfirmationCode(e.target.value)}
            />
            <button type={"submit"} className={"btn btn-accent"} onClick={handleSubmit}>Confirm</button>
            <span className={"text-sm text-center"}>Didn&apos;t receive the email? <span
                onClick={() => resendCodeMutation.mutate({email})}
                className={"text-accent cursor-pointer"}>Resend</span></span>
        </div>
    </>
};