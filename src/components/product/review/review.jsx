import {useAuthContext} from "../../../contexts/auth.jsx";
import {useMutation, useQueryClient} from "react-query";
import {deleteReview} from "../../../api/fetchReviews.js";
import {useParams} from "react-router-dom";
import {useNotification} from "../../../hooks/useNotification.js";
import moment from "moment";
export const Review = ({review, userData}) => {
    const {user, isLogged, token} = useAuthContext();
    const {id} = useParams();
    const queryClient = useQueryClient();
    const notification = useNotification();

    const deleteReviewMutation = useMutation((id) => deleteReview(id, token), {
        onSuccess: () => {
            notification.info("Review deleted successfully");
            queryClient.invalidateQueries(['reviews', id])
        }
    })

    const handleSubmit = () => deleteReviewMutation.mutate(review.id);
    return <div key={review.id} className={"flex flex-row justify-between items-center bg-stone-200 rounded-lg p-4"}>
        <div className={"flex flex-col w-full"}>
            <div className={"flex flex-row items-center justify-between w-full"}>
                <div className={"flex flex-row items-center space-x-2"}>
                    <img src={userData.photo || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
                         alt="profile picture"
                         className={"rounded-full w-10 h-10 object-cover"}
                    />
                    <div className={"flex flex-col"}>
                        <p className={"text-xl font-bold"}>@{userData.username} </p>
                        <p className={"text-sm font-light"}>{moment(review.create_at).format('MMMM Do YYYY')}</p>
                    </div>
                </div>
                {isLogged() && user.id === review.user_id &&
                    <button className={"btn btn-error btn-xs"} onClick={() => handleSubmit()}>Remove</button>

                }
            </div>
            <p className={"text-lg font-light"}>{review.text}</p>
        </div>
    </div>;
};