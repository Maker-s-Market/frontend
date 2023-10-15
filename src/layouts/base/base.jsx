import {Navbar} from "../../components/navbar/index.js";
import {Outlet} from "react-router-dom";

export const Base = (props) => {
    return <div className={"bg-primary h-screen"}>
        <Navbar/>
        <Outlet/>
    </div>;
};