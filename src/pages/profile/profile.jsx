import {useAuthContext} from "../../contexts/auth.jsx";
import {Hero} from "../../components/home/hero/index.js";
import {Link, useParams} from "react-router-dom";
import moment from "moment";

export const Profile = (props) => {

    const {user, isLogged} = useAuthContext();
    const {id} = useParams()

    return <div>
        <Hero/>

        {id && isLogged() ? <div className="flex flex-col m-8 space-y-4">
            <img src={user.photo || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
                 alt="profile picture"
                className={"rounded-full w-48 h-48 mx-auto"}
            />
            <text className={"text-5xl font-bold"}>Profile</text>
            <text><span className={"font-semibold text-2xl"}>Name: </span><span
                className={"font-light text-xl"}>{user.name}</span></text>
            <text><span className={"font-semibold text-2xl"}>Email: </span> <span
                className={"font-light text-xl"}>{user.name}</span></text>
            <text><span className={"font-semibold text-2xl"}>Username: </span><span
                className={"font-light text-xl"}> @{user.username}</span></text>
            <text><span className={"font-semibold text-2xl"}>Location: </span><span
                className={"font-light text-xl"}> {user.city}, {user.region}</span></text>
            <text><span className={"font-semibold text-2xl"}>Member Since: </span><span
                className={"font-light text-xl"}>{moment(user.created_at).format('MMMM Do YYYY')}</span></text>

            {id === user.id && <Link to={"/profile/edit"} className={"btn btn-accent"}>Edit Profile</Link>}

        </div> : <p>Error Profile not found</p>}
    </div>;
};