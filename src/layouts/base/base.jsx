import { Sidebar } from "../../components/navbar/sidebar.jsx";
import {Hero} from "../../components/home/hero/index.js";
import {Outlet} from "react-router-dom";

export const Base = () => {
    return <div>
        <Sidebar>
            <Hero/>
            <Outlet />
        </Sidebar>
    </div>;
};