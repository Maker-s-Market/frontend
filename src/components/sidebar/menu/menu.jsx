import {BsBox2Fill, BsCartFill, BsFillHeartFill, BsFillPlusCircleFill, BsSearch} from "react-icons/bs";
import {BiSolidExit} from "react-icons/bi";
import {Link} from "react-router-dom";
import {useAuthContext} from "../../../contexts/auth.jsx";

export const Menu = (props) => {
    const {isLogged, logout} = useAuthContext();
    return <>
        <li className="font-bold"><Link to={"/search"}><BsSearch/>Search</Link></li>
        {isLogged() ? <>
            <li className={"font-bold"}><Link to={"/product/add"}><BsFillPlusCircleFill/>Announce Product</Link></li>
            <li className={"font-bold"}><Link to={"/cart"}><BsCartFill />Cart</Link></li>
            <li className="font-bold"><Link to={"/orders"}><BsBox2Fill/>Orders</Link></li>
            <li className="font-bold"><Link to={"/wishlist"}><BsFillHeartFill/>Wishlist</Link></li>


            <li className="font-bold"><a onClick={() => logout()}><BiSolidExit/>Sign Out</a></li>
        </> : <li className="font-bold"><Link to={"/signin"}>Sign In</Link></li>
        }
    </>
};