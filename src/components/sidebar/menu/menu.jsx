import {useAuth} from "../../../hooks/useAuth.js";
import {BsFillChatFill} from "react-icons/bs";
import {IoMdSettings} from "react-icons/io";
import {BiSolidExit} from "react-icons/bi";

export const Menu = (props) => {
    const {isLogged} = useAuth();
    return <div>
        {!isLogged() &&
            <li className="font-bold"><a>Sign In</a></li>
        }
        {isLogged() && <>
            <li className="font-bold"><a><BsFillChatFill/>Chat</a></li>

            <li className="font-bold"><a><IoMdSettings/>Definições</a></li>

            <li className="font-bold"><a><BiSolidExit/>Sign Out</a></li>
        </>
        }
    </div>
};