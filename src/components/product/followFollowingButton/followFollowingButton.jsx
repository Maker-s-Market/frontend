import {useAuthContext} from "../../../contexts/auth.jsx";

export const FollowFollowingButton = ({sellerId}) => {

    const {following, followMutation, unfollowMutation} = useAuthContext()
    const isFollowing = following.find(follow => follow.id === sellerId)
    const handleFollow = () => followMutation.mutate(sellerId)
    const handleUnfollow = () => unfollowMutation.mutate(sellerId)
    return <div>
        {isFollowing ?
            <button className={"btn btn-accent btn-block"}
                    onClick={handleUnfollow}
            >Unfollow</button>
            :
            <button className={"btn btn-accent btn-block"}
                    onClick={handleFollow}
            >Follow</button>
        }

    </div>;
};