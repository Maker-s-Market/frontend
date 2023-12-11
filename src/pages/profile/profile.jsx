import {useAuthContext} from "../../contexts/auth.jsx";
import {Hero} from "../../components/home/hero/index.js";
import {Link, useParams} from "react-router-dom";
import moment from "moment";
import {fetchFollowersById, fetchFollowingById, fetchUserById} from "../../api/fetchAuth.js";
import {useMutation, useQuery} from "react-query";
import {Loading} from "../../components/common/loading/index.js";
import {FollowFollowingButton} from "../../components/product/followFollowingButton/index.js";
import {Rating} from "../../components/profile/rating/index.js";
import {useEffect, useRef, useState} from "react";

export const Profile = (props) => {

        const {user, isLogged, token} = useAuthContext();
        const {id} = useParams()
        const sortFollowersRef = useRef()
        const sortFollowingRef = useRef()
        const [toggleFollow, setToggleFollow] = useState(true)

        const {data: profile, error, isLoading, isSuccess} = useQuery(['profile', id], () => fetchUserById(id), {
            enabled: !!id,
        })

        const {
            mutate: mutateFollowing, data: following,
            isError: errorFollowing,
            isLoading: isLoadingFollowing,
            isSuccess: isSuccessFollowing
        } = useMutation(['following', id], {
            mutationFn: ({sort}) => fetchFollowingById(token, sort),
        })

        const {
            mutate: mutateFollowers, data: followers,
            isError: errorFollowers,
            isLoading: isLoadingFollowers,
            isSuccess: isSuccessFollowers
        } = useMutation(['followers', id], {
            mutationFn: ({sort}) => fetchFollowersById(token, sort),
        })

        const handleSortFollowers = () =>
            mutateFollowers({sort: sortFollowersRef.current.value})

        const handleSortFollowing = () =>
            mutateFollowing({sort: sortFollowingRef.current.value})

        const handleToggleFollow = (state) => {
            setToggleFollow(state)
        }

        useEffect(() => {
            mutateFollowers({sort: ""})
            mutateFollowing({sort: ""})
        }, [])

        return <div>
            <Hero/>
            {isLoading && <Loading/>}
            {isSuccess ? <div className="flex flex-row m-8 space-y-4">
                <div className={"flex flex-col m-8 space-y-4 flex-1"}>
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
                    {id === user.id ? <Link to={"/profile/edit"} className={"btn btn-accent"}>Edit Profile
                        </Link>
                        :
                        <FollowFollowingButton userId={id}/>}
                    {id === user.id ? <Link to={"/profile/reviews"} className={"btn btn-accent"}>See My Product's Reviews
                        </Link>
                        :
                        <></>}
                </div>

                {isLogged() && <div className={"flex-1 space-y-3"}>
                    <div className="join">
                        <button className="btn join-item" onClick={() => handleToggleFollow(false)}>Following</button>
                        <button className="btn join-item" onClick={() => handleToggleFollow(true)}>Followers</button>
                    </div>
                    {toggleFollow ?
                        <>
                            {isLoadingFollowers && <Loading/>}
                            <div className={"flex flex-col flex-1"}>
                                {user.id === id && <>
                                    <div className={"flex flex-col gap-2"}>
                                        <select className="select select-accent w-full max-w-xs" ref={sortFollowersRef}
                                                onChange={handleSortFollowers}>
                                            <option value="">Sort</option>
                                            <option value="asc_name">Name asc</option>
                                            <option value="desc_name">Name desc</option>
                                            <option value="asc_rating">Rating asc</option>
                                            <option value="desc_rating">Rating desc</option>
                                            <option value="asc_num_rating">Number of ratings asc</option>
                                            <option value="desc_num_rating">Number of ratings desc</option>
                                        </select>
                                    </div>

                                    <div className={"grid grid-cols-6 gap-4"}>
                                        <p className={"text-4xl font-bold"}>Followers</p>
                                        {isSuccessFollowers && followers.map((follower) => {
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
                                        {errorFollowers && <p>Error loading followers</p>}
                                    </div>
                                </>}
                            </div>
                        </> :
                        <>
                            {isLoadingFollowing && <Loading/>}
                            <div className={"flex flex-col flex-1 space-y-2"}>
                                {user.id === id && <>
                                    <div className={"flex flex-col gap-2"}>
                                        <select className="select select-accent w-full max-w-xs" ref={sortFollowingRef}
                                                onChange={handleSortFollowing}>
                                            <option value="">Sort</option>
                                            <option value="asc_name">Name asc</option>
                                            <option value="desc_name">Name desc</option>
                                            <option value="asc_rating">Rating asc</option>
                                            <option value="desc_rating">Rating desc</option>
                                            <option value="asc_num_rating">Number of ratings asc</option>
                                            <option value="desc_num_rating">Number of ratings desc</option>
                                        </select>
                                    </div>

                                    <div className={"grid grid-cols-3 gap-4"}>
                                        {isSuccessFollowing && following.map((follow) => {
                                                return <Link to={`/profile/${follow.id}`} key={follow.id}>
                                                    <p className={"text-4xl font-bold"}>Following</p>
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
                                        {errorFollowing && <p>Error loading following users</p>}
                                    </div>
                                </>}
                            </div>
                        </>
                    }
                </div>
                }

            </div> : <p>Error Profile not found</p>}
        </div>;
    }
;