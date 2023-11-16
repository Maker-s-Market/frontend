import {useAuthContext} from "../contexts/auth.jsx";
import {Navigate} from "react-router-dom";


export const PrivateRoute = ({component: Component, ...rest}) => {
    const {isLogged} = useAuthContext();

    return isLogged() ? <Component {...rest}/> : <Navigate to={"/signIn"}/>
}