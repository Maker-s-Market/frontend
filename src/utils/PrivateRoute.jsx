import {useAuthContext} from "../contexts/auth.jsx";
import {Navigate} from "react-router-dom";

/**
 * PrivateRoute component.
 * This component is used to protect routes that require authentication.
 * If the user is authenticated, it renders the passed component.
 * If the user is not authenticated, it redirects to the signIn page.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {React.Component} props.component - The component to render if the user is authenticated.
 * @param {Object} props.rest - The rest of the properties passed to the component.
 *
 * @returns {React.Component} - The Component if the user is authenticated, otherwise a Navigate component to the signIn page.
 */
export const PrivateRoute = ({component: Component, ...rest}) => {
    const {isLogged} = useAuthContext();

    return isLogged() ? <Component {...rest}/> : <Navigate to={"/signIn"}/>
}