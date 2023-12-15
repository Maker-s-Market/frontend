import {useShoppingContext} from "../../../contexts/shopping.jsx";
import {BsFillHeartFill} from "react-icons/bs";
import {useAuthContext} from "../../../contexts/auth.jsx";
/**
 * WishlistButton component that allows a user to add or remove a product from their wishlist.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.productId - The id of the product.
 * @returns {JSX.Element} The WishlistButton component.
 */
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