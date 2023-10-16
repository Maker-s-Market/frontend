import {TopCategories} from "../../components/home/topCategories/index.js";
import {Hero} from "../../components/home/hero/index.js";
import {Highlights} from "../../components/home/highlights/index.js";

export const Home = (props) => {
    return <div>
        <Hero/>
        <TopCategories/>
        <Highlights/>
    </div>

};