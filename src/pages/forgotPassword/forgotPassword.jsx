import {useState} from "react";
import {useMutation} from "react-query";
import {useNotification} from "../../hooks/useNotification.js";
import {recoverPassword, recoverPasswordEmail} from "../../api/fetchAuth.js";
import {useNavigate} from "react-router-dom";

export const ForgotPassword = (props) => {

    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const notification = useNotification()
    const navigate = useNavigate()
    const [step, setStep] = useState(0)

    const recoverPasswordMutation = useMutation({
        mutationFn: ({email}) => recoverPasswordEmail(email),
        onSuccess: () => {
            notification.info("Email with the code to reset the password sent")
            setStep(1)
        },
        onError: () => {
            notification.info("Failed to sign up")
        }
    })

    const handleSubmit = () => recoverPasswordMutation.mutate({email})

    const updatePasswordMutation = useMutation({
        mutationFn: ({email, code, password}) => recoverPassword(email, code, password),
        onSuccess: () => {
            notification.info("Password updated")
            navigate("/signIn")
        },
        onError: () => {
            notification.info("Failed to sign up")
        }
    })


    const handleChangePasswordSubmit = () => {
        if (password === confirmPassword) {
            updatePasswordMutation.mutate({email, code, password})
        } else {
            notification.info("Passwords don't match")
        }
    }


    return <>
        <h2 className="text-4xl font-bold">Forgot Password</h2>
        {step === 0 && <>
            <p>Please enter your email address and we will send you a link to reset your password.</p>
            <div className={"form-control space-y-2"}>
                <label className={"label"}>
                    <span className={"label-text"}>Email</span>
                </label>
                <input type="text" placeholder={"Email"} name={"email"} className={"input input-bordered"}
                       onChange={(e) => setEmail(e.target.value)}
                />
                <button type={"submit"} className={"btn btn-accent"} onClick={handleSubmit}>Send</button>
            </div>
        </>}

        {step === 1 && <>
            <p>We sent a code to change your password please.</p>
            <label className={"label"}>
                <span className={"label-text"}>Code</span>
            </label>
            <input type="text" placeholder={"Code"} name={"code"} className={"input input-bordered"}
                   onChange={(e) => setCode(e.target.value)}
            />
            <label className={"label"}>
                <span className={"label-text"}>Password</span>
            </label>
            <input type="password" placeholder={"Password"} name={"password"} className={"input input-bordered"}
                   onChange={(e) => setPassword(e.target.value)}
            />
            <label className={"label"}>
                <span className={"label-text"}>Confirm Password</span>
            </label>
            <input type="password" placeholder={"Confirm Password"} name={"confirmPassword"}
                   className={"input input-bordered"}
                   onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type={"submit"} className={"btn btn-accent"} onClick={handleChangePasswordSubmit}>Change Password
            </button>
        </>}
    </>
}