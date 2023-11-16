import {useMutation, useQuery, useQueryClient} from "react-query";
import {useParams} from "react-router-dom";
import {addRating, fetchRatingById} from "../../../api/fetchRatings.js";
import {useAuthContext} from "../../../contexts/auth.jsx";
import ReactStars from "react-rating-stars-component/dist/react-stars.js";
import {useNotification} from "../../../hooks/useNotification.js";

export const Rating = ({rating}) => {
    const {id} = useParams()
    const {isLogged, token} = useAuthContext()
    const notification = useNotification();
    const queryClient = useQueryClient()


    const {
        data: ratingData, isSuccess, isError
    } = useQuery(["rating", id, token], () => fetchRatingById(id, token), {enabled: !!isLogged()})

    const ratingMutation = useMutation((newRating) => addRating(newRating, id, token), {
        onSuccess: () => {
            notification.info("Rating added successfully");
            queryClient.invalidateQueries(['rating', id, token])
        }
    })

    const ratingChanged = (newRating) => {
        console.log(newRating)
        if (isLogged()) {
            ratingMutation.mutate(newRating)
        }
    }
    return <ReactStars
        count={5}
        onChange={ratingChanged}
        size={26}
        activeColor="#ffd700"
        value={isSuccess && ratingData.rating !== -1 ? ratingData : rating}
    />
};