import { Sidebar } from "../../components/sidebar/sidebar.jsx";
import {Outlet} from "react-router-dom";

export const Base = () => {
    return <div>
        <Sidebar>
            <Outlet />
        </Sidebar>
    </div>;
};