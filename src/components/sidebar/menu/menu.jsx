import {BsCartFill, BsFillChatFill, BsFillPlusCircleFill, BsSearch} from "react-icons/bs";
import {BiSolidExit} from "react-icons/bi";
import {Link} from "react-router-dom";
import {CommingSoon} from "../../common/commingSoon/index.js";
import {useAuthContext} from "../../../contexts/auth.jsx";

export const Menu = (props) => {
    const {isLogged, logout} = useAuthContext();
    return <>
        <li className="font-bold"><Link to={"/search"}><BsSearch/>Search</Link></li>
        {isLogged() ? <>
            <li className={"font-bold"}><Link to={"/product/add"}><BsFillPlusCircleFill/>Announce Product</Link></li>
            <li className={"font-bold"}><Link to={"/cart"}><BsCartFill />My Cart</Link></li>
            <li className="font-bold"><a><BsFillChatFill/>Chat<CommingSoon/></a></li>


            <li className="font-bold"><a onClick={() => logout()}><BiSolidExit/>Sign Out</a></li>
        </> : <li className="font-bold"><Link to={"/signin"}>Sign In</Link></li>
        }
    </>
};