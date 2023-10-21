import {useAuth} from "../../../hooks/useAuth.js";
import {BsFillChatFill, BsSearch} from "react-icons/bs";
import {IoMdSettings} from "react-icons/io";
import {BiSolidExit} from "react-icons/bi";
import {Link} from "react-router-dom";
import {CommingSoon} from "../../common/commingSoon/index.js";

export const Menu = (props) => {
    const {isLogged} = useAuth();
    return <>
        <li className="font-bold"><Link to={"/search"}><BsSearch/>Search</Link></li>
        {!isLogged() && <>
            <li className="font-bold"><a>Sign In</a></li>
        </>}
        {isLogged() && <>
            <li className="font-bold"><a><BsFillChatFill/>Chat<CommingSoon/></a></li>

            <li className="font-bold"><a><IoMdSettings/>Definições<CommingSoon/></a></li>

            <li className="font-bold"><a><BiSolidExit/>Sign Out</a></li>
        </>}
    </>
};