import {TopCategories} from "../../components/home/topCategories/index.js";
import {Highlights} from "../../components/home/highlights/index.js";

/**
 * Home component is the landing page of the application.
 * It displays the top categories and highlights.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered JSX element.
 */
export const Home = (props) => {
    return <div>
        
        <TopCategories/>
        <Highlights/>
    </div>

};