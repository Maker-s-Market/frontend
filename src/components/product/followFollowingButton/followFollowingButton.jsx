import {useAuthContext} from "../../../contexts/auth.jsx";
/**
 * FollowFollowingButton component that allows a user to follow or unfollow another user.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.userId - The id of the user to follow or unfollow.
 * @returns {JSX.Element} The FollowFollowingButton component.
 */
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