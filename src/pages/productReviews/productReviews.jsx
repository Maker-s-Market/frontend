import {useAuthContext} from "../../contexts/auth.jsx";
import {Loading} from "../../components/common/loading/index.js";
import {useParams} from "react-router-dom";
import {useRef} from "react";
import {useMutation, useQuery} from "react-query";
import {fetchUserById} from "../../api/fetchAuth.js";


export const ProductReviews = () => {
    const {user, isLogged, token} = useAuthContext();
    const {id} = useParams()

    const {data: profile, error, isLoading, isSuccess} = useQuery(['profile', id], () => fetchUserById(id), {
        enabled: !!id,
    })

    const {
        mutate: mutateProductReviews,
        data: productReviews,
        isError: errorReviews,
        isLoading: loadingReviews,
        isSuccess: successReviews
    } = useMutation()

    return (<div>
        {isLoading && <Loading/>}
        {isSuccess ? <div>

            </div>
            : <p>Product Reviews not found</p>}


    </div>);
}