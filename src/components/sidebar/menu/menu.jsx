import {useAuth} from "../../../hooks/useAuth.js";

export const Menu = (props) => {
    const {isLogged} = useAuth();
    return <div>
        {!isLogged() &&
            <li className="font-bold"><a>Sign In</a></li>
        }
        {isLogged() && <>
            <li className="font-bold">
                <a>Chat</a>
            </li>

            <li className="font-bold"><a>Definições</a></li>

            <li className="font-bold"><a>Sign Out</a></li>
        </>
        }
    </div>
};