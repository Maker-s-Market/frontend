import {Sidebar} from "../../components/sidebar/sidebar.jsx";
import {Outlet} from "react-router-dom";
import {Hero} from "../../components/home/hero/index.js";

export const Base = () => {
    return <div>
        <Sidebar>
            <Hero/>
            <Outlet/>
        </Sidebar>
    </div>;
};