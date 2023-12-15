import {Sidebar} from "../../components/sidebar/sidebar.jsx";
import {Outlet} from "react-router-dom";
import {Hero} from "../../components/home/hero/index.js";
/**
 * Base is a layout component that includes the Sidebar and Hero components.
 * @component Base
 * @returns {JSX.Element} The Base layout component.
 */
export const Base = () => {
    return <div>
        <Sidebar>
            <Hero/>
            <Outlet/>
        </Sidebar>
    </div>;
};