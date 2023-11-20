import {useAuthContext} from "../../../contexts/auth.jsx";

export const FollowFollowingButton = ({userId}) => {

    const {following, followMutation, unfollowMutation} = useAuthContext()
    const isFollowing = following.find(follow => follow.id === userId)
    const handleFollow = () => followMutation.mutate(userId)
    const handleUnfollow = () => unfollowMutation.mutate(userId)
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