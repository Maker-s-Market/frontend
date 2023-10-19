import { Sidebar } from "../../components/navbar/sidebar.jsx";
import {Outlet} from "react-router-dom";

export const Base = () => {
    return <div>
        <Sidebar>
            <Outlet />
        </Sidebar>
    </div>;
};