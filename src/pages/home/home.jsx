import {TopCategories} from "../../components/home/topCategories/index.js";
import {Highlights} from "../../components/home/highlights/index.js";
import {Hero} from "../../components/home/hero/index.js";
import {useNotification} from "../../hooks/useNotification.js";

export const Home = (props) => {
    return <div>
        
        <TopCategories/>
        <Highlights/>
    </div>

};