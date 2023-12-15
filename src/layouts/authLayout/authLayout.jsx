import {Outlet} from "react-router-dom";

/**
 *
 * AuthLayout is a layout component that is used for authentication related routes.
 * @component AuthLayout
 * @param {Object} props The props passed to the component.
 * @returns {JSX.Element} The AuthLayout layout component.
 */
export const AuthLayout = (props) => {
    return <div className={"bg-accent w-screen h-screen flex items-center"}>
        <div className={"card w-3/4 bg-base-100 shadow-xl mx-auto"}>
            <div className="card-body">
                <Outlet/>
            </div>
        </div>
    </div>
};