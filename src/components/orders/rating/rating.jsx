import ReactStars from "react-rating-stars-component";
import {useAuthContext} from "../../../contexts/auth.jsx";
import {useNotification} from "../../../hooks/useNotification.js";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useState} from "react";
import {addRating, editRating, fetchRatingById} from "../../../api/fetchRatings.js";

export const Rating = ({id}) => {
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

  const ratingChanged = (newRating) => {
    if (isLogged()) {
      ratingMutation.mutate(newRating)
    }
  }
  return <ReactStars
      count={5}
      onChange={ratingChanged}
      size={26}
      activeColor="#ffd700"
      value={isSuccess && ratingData.rating !== -1 ? ratingData.rating : 0}
  />
};