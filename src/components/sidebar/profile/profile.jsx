import {useAuthContext} from "../../../contexts/auth.jsx";
import {Link} from "react-router-dom";
/**
 * Profile component that displays user's profile information if the user is logged in.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} User's profile information or nothing.
 */
export const Profile = (props) => {
    const {isLogged, user} = useAuthContext();
    return <div>

        {isLogged() && <Link to={`/profile/${user.id}`}>
            <div className="p-3 flex space-x-4 hover:bg-gray-300 rounded-md">

                <div className="avatar ">
                    <div className="w-24 rounded-full ">
                        <img src={user.photo || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
                             alt="profile picture"/>
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="text-lg">{user.name}</h1>
                    <h3 className="text-md">@{user.username}</h3>
                    {user.role === "Premium" &&<div className={"badge badge-lg badge-accent badge-outline mt-2"}>Premium</div>}
                </div>
            </div>
        </Link>
        }
    </div>;
};