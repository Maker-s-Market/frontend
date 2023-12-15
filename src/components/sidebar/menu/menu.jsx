import {
    BsBagFill,
    BsBarChartFill,
    BsBox2Fill,
    BsCartFill, BsCurrencyEuro,
    BsFillHeartFill,
    BsFillPlusCircleFill,
    BsSearch
} from "react-icons/bs";
import {BiSolidExit} from "react-icons/bi";
import {Link} from "react-router-dom";
import {useAuthContext} from "../../../contexts/auth.jsx";
/**
 * Menu component that displays different navigation options based on the user's login status and role.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} A list of navigation options.
 */
export const Menu = (props) => {
    const {isLogged, logout,user} = useAuthContext();
    return <>
        <li className="font-bold"><Link to={"/search"}><BsSearch/>Search</Link></li>
        {isLogged() ? <>
            <li className={"font-bold"}><Link to={"/product/add"}><BsFillPlusCircleFill/>Announce Product</Link></li>
            <li className={"font-bold"}><Link to={"/cart"}><BsCartFill />Cart</Link></li>
            <li className="font-bold"><Link to={"/orders"}><BsBox2Fill/>Orders</Link></li>
            <li className="font-bold"><Link to={"/wishlist"}><BsFillHeartFill/>Wishlist</Link></li>
            <li className="font-bold"><Link to={"/adverts"}><BsBagFill/>My Products</Link></li>
            {user.role === "Premium" && <li className="font-bold"><Link to={"/stats"}><BsBarChartFill/>Analytics</Link></li>}
            {user.role !== "Premium" && <li className="font-bold"><Link to={"/premium"}><BsCurrencyEuro/>Buy Premium</Link></li>}
            <li className="font-bold"><a onClick={() => logout()}><BiSolidExit/>Sign Out</a></li>
        </> : <li className="font-bold"><Link to={"/signin"}>Sign In</Link></li>
        }
    </>
};