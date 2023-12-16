import {useMutation, useQuery, useQueryClient} from "react-query";
import {useParams} from "react-router-dom";
import {addRating, editRating, fetchRatingById} from "../../../api/fetchRatings.js";
import {useAuthContext} from "../../../contexts/auth.jsx";
import ReactStars from "react-rating-stars-component";
import {useNotification} from "../../../hooks/useNotification.js";
import {useState} from "react";
/**
 * Rating component that allows a user to rate a product.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.rating - The initial rating of the product.
 * @returns {JSX.Element} The Rating component.
 */
export const Rating = ({rating}) => {
    const {id} = useParams()
    const {isLogged, token} = useAuthContext()
    const notification = useNotification();
    const queryClient = useQueryClient()
    const [isRated, setIsRated] = useState(false)

    const {
        data: ratingData, isSuccess, isError
    } = useQuery(["rating", id], () => fetchRatingById(id, token), {
        enabled: isLogged(),
        onSuccess: (data) => {
            if (data.rating !== -1) setIsRated(()=>true)
        },
        onError: (data) => {
            console.log(data)
        }
    })

    const ratingMutation = useMutation((newRating) =>
        isRated? editRating(newRating,id,token) :addRating(newRating, id, token), {
        onSuccess: () => {
            setIsRated(true)
            notification.info("Rating added successfully");
            queryClient.invalidateQueries(['product', id])
        }
    })
    return <ReactStars
        count={5}
        size={26}
        edit={false}
        activeColor="#ffd700"
        value={isSuccess && ratingData.rating !== -1 ? ratingData.rating : rating}
    />
};