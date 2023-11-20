import {useShoppingContext} from "../../../contexts/shopping.jsx";
import {BsFillHeartFill} from "react-icons/bs";
import {useAuthContext} from "../../../contexts/auth.jsx";

export const WishlistButton = ({productId}) => {

    const {isProductInWishlist,addToWishlistMutation, removeFromWishlistMutation} = useShoppingContext();
    const {isLogged} = useAuthContext();

    const addToWishlist = () => addToWishlistMutation.mutate(productId);

    const removeFromWishlist = () => removeFromWishlistMutation.mutate(productId);

    return <>
        {isLogged() && <>
            {isProductInWishlist(productId) ?
                <button onClick={removeFromWishlist} className={"btn btn-error"}><BsFillHeartFill/></button> :
                <button onClick={addToWishlist} className={"btn btn-error btn-outline"}><BsFillHeartFill/></button>}
        </>}
    </>;
};