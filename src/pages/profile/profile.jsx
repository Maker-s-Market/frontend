import {useAuthContext} from "../../contexts/auth.jsx";
import {Hero} from "../../components/home/hero/index.js";
import {Link, useParams} from "react-router-dom";
import moment from "moment";
import {fetchFollowersById, fetchFollowingById, fetchUserById} from "../../api/fetchAuth.js";
import {useQuery} from "react-query";
import {Loading} from "../../components/common/loading/index.js";
import {FollowFollowingButton} from "../../components/product/followFollowingButton/index.js";
import {Rating} from "../../components/profile/rating/index.js";

export const Profile = (props) => {

        const {user, isLogged, token} = useAuthContext();
        const {id} = useParams()

        const {data: profile, error, isLoading, isSuccess} = useQuery(['profile', id], () => fetchUserById(id), {
            enabled: !!id,
        })

        const {
            data: followers,
            isError:errorFollowers,
            isLoading:isLoadingFollowers,
            isSuccess:isSuccessFollowers
        } = useQuery(['followers'], () => fetchFollowersById(token), {
            enabled: isLogged(),
        })

        const {
            data: following,
            isError:errorFollowing,
            isLoading:isLoadingFollowing,
            isSuccess:isSuccessFollowing
        } = useQuery(['following'], () => fetchFollowingById(token), {
            enabled: isLogged(),
        })


        return <div>
            <Hero/>
            {isLoading && <Loading/>}
            {isSuccess ? <div className="flex flex-col m-8 space-y-4">
                <img src={profile.photo || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
                     alt="profile picture"
                     className={"rounded-full w-48 h-48 mx-auto"}
                />
                <p className={"text-5xl font-bold"}>Profile</p>
                <p><span className={"font-semibold text-2xl"}>Name: </span><span
                    className={"font-light text-xl"}>{profile.name}</span></p>
                <p><span className={"font-semibold text-2xl"}>Email: </span> <span
                    className={"font-light text-xl"}>{profile.email}</span></p>
                <p><span className={"font-semibold text-2xl"}>Username: </span><span
                    className={"font-light text-xl"}> @{profile.username}</span></p>
                <p><span className={"font-semibold text-2xl"}>Location: </span><span
                    className={"font-light text-xl"}> {profile.city}, {profile.region}</span></p>
                <p><span className={"font-semibold text-2xl"}>Member Since: </span><span
                    className={"font-light text-xl"}>{moment(profile.created_at).format('MMMM Do YYYY')}</span></p>
                <div className={"flex flex-row items-center gap-2"}><span
                    className={"font-semibold text-2xl"}>Rating: </span><span
                    className={"font-light text-xl"}><Rating avgRating={profile.average_rating}/></span></div>


                {isLoadingFollowers && <Loading/>}
                {isSuccessFollowers && user.id === id && <>
                <p className={"text-4xl font-bold"}>Followers</p>

                <div className={"grid grid-cols-6 gap-4"}>

                    {followers.map((follower) => {
                            return <Link to={`/profile/${follower.id}`} key={follower.id}>
                                <div className="card bg-base-100 shadow-xl">
                                    <figure><img
                                        src={follower.photo || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
                                        alt="profile picture"
                                        className={"rounded-full w-24 h-24 mx-auto"}
                                    /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{follower.name}</h2>
                                        <p> {profile.city}, {profile.region}</p>
                                    </div>
                                </div>
                            </Link>
                        }
                    )}
                </div></>}


                {isLoadingFollowing && <Loading/>}
                {isSuccessFollowing && user.id === id && <>
                <p className={"text-4xl font-bold"}>Following</p>
                <div className={"grid grid-cols-6 gap-4"}>
                    {following.map((follow) => {
                            return <Link to={`/profile/${follow.id}`} key={follow.id}>
                                <div className="card bg-base-100 shadow-xl">
                                    <figure><img
                                        src={follow.photo || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
                                        alt="profile picture"
                                        className={"rounded-full w-24 h-24 mx-auto"}
                                    /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{follow.name}</h2>
                                        <p> {profile.city}, {profile.region}</p>
                                    </div>
                                </div>
                            </Link>
                        }
                    )}
                </div></>}


                {isLogged() && <>
                    {id === user.id ? <Link to={"/profile/edit"} className={"btn btn-accent"}>Edit Profile</Link> :
                        <FollowFollowingButton userId={id}/>}
                </>
                }

            </div> : <p>Error Profile not found</p>}
        </div>;
    }
;