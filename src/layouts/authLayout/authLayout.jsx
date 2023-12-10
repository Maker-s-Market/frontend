import {Outlet} from "react-router-dom";

export const AuthLayout = (props) => {
    return <div className={"bg-accent w-screen h-screen flex items-center"}>
        <div className={"card w-3/4 bg-base-100 shadow-xl mx-auto"}>
            <div className="card-body">
                <Outlet/>
            </div>
        </div>
    </div>
};