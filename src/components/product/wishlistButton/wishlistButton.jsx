import {useParams} from "react-router-dom";
import {useShoppingContext} from "../../../contexts/shopping.jsx";
import {BsFillHeartFill} from "react-icons/bs";
import {useAuthContext} from "../../../contexts/auth.jsx";

export const WishlistButton = (props) => {

    const {id} = useParams()
    const {isProductInWishlist,addToWishlistMutation, removeFromWishlistMutation} = useShoppingContext();
    const {isLogged} = useAuthContext();

    const addToWishlist = () => addToWishlistMutation.mutate(id);

    const removeFromWishlist = () => removeFromWishlistMutation.mutate(id);

    return <>
        {isLogged() && <>
            {isProductInWishlist(id) ?
                <button onClick={removeFromWishlist} className={"btn btn-error"}><BsFillHeartFill/></button> :
                <button onClick={addToWishlist} className={"btn btn-error btn-outline"}><BsFillHeartFill/></button>}
        </>}
    </>;
};