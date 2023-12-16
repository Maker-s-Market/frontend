import ReactStars from "react-rating-stars-component";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useAuthContext} from "../../../contexts/auth.jsx";
import {useParams} from "react-router-dom";
import {useNotification} from "../../../hooks/useNotification.js";
import {useState} from "react";
import { addUserRating, editUserRating, fetchUserRatingById} from "../../../api/fetchRatings.js";
/**
 * Rating component that allows logged in users to rate and displays the average rating.
 *
 * @component
 * @param {Object} props - The properties passed to the component, including the average rating.
 * @returns {JSX.Element} A star rating component.
 */
export const Rating = ({avgRating}) => {

    const {id} = useParams()
    const {isLogged, token,user} = useAuthContext()
    const notification = useNotification();
    const [isRated, setIsRated] = useState(false)
    const queryClient = useQueryClient()

    const {        data: ratingData, isSuccess, isError
    } = useQuery(["user_rating", id], () => fetchUserRatingById(id, token), {
        enabled: isLogged(),
        onSuccess: (data) => {
            if (data.rating !== -1) setIsRated(() => true)
        },
        onError: (data) => {
            console.log(data)
        }
    })


    const ratingMutation = useMutation((newRating) =>
        isRated? editUserRating(newRating,id,token) :addUserRating(newRating, id, token), {
        onSuccess: () => {
            setIsRated(true)
            notification.info("Rating added successfully");
            queryClient.invalidateQueries(['user', id])
        }
    })

    const ratingChanged = (newRating) => {
        if (isLogged()) {
            ratingMutation.mutate(newRating)
        }
    }

    return <ReactStars
        count={5}
        onChange={ratingChanged}
        size={26}
        edit={user.id !== id}
        activeColor="#ffd700"
        value={isSuccess && ratingData.rating !== -1 ? ratingData.rating : avgRating}
    />
};