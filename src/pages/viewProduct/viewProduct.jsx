import {useMutation, useQuery, useQueryClient} from "react-query";
import {fetchProductById, fetchProductByIdWithToken} from "../../api/fetchProducts.js";
import {Loading} from "../../components/common/loading/index.js";
import {ErrorMessage} from "../../components/common/error/index.js";
import {Rating} from "../../components/product/rating/index.js";
import {useParams} from "react-router-dom";
import {useAuthContext} from "../../contexts/auth.jsx";
import {SellerInformation} from "../../components/product/sellerInformation/index.js";
import {SellerUtils} from "../../components/product/sellerUtils/index.js";
import {useRef} from "react";
import {useNotification} from "../../hooks/useNotification.js";
import {addReview, fetchReviewsById} from "../../api/fetchReviews.js";
import {Review} from "../../components/product/review/index.js";
import {useShoppingContext} from "../../contexts/shopping.jsx";
import {WishlistButton} from "../../components/product/wishlistButton/index.js";

/**
 * ViewProduct component is responsible for rendering the product details page.
 * It fetches the product data and reviews by product id using react-query.
 * It also handles adding a review for the product.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} The ViewProduct component.
 */
export const ViewProduct = (props) => {

    const {id} = useParams();
    const {user, isLogged} = useAuthContext();
    const reviewRef = useRef();
    const notification = useNotification();
    const {token} = useAuthContext();
    const queryClient = useQueryClient()
    const {addToCart} = useShoppingContext();


    const {
        data: productData, isLoading, isError, isSuccess
    } = useQuery(['product', id], () => isLogged() ? fetchProductByIdWithToken(id,token) : fetchProductById(id), {
        refetchOnWindowFocus: false
    })

    const {
        data: reviews,
        isLoading: isLoadingReviews,
        isError: isErrorReviews,
        isSuccess: isSuccessReviews
    } = useQuery(['reviews', id], () => fetchReviewsById(id), {
        refetchOnWindowFocus: false
    })

    const addReviewMutation = useMutation(() => addReview(id, reviewRef.current.value, token), {
        onSuccess: () => {
            reviewRef.current.value = "";
            notification.info("Review added successfully");
            queryClient.invalidateQueries(['reviews', id])
        }
    })

    const calculatePrice = (price, discount) => {
        return price - (price * discount / 100)
    }

    const handleSubmit = () => addReviewMutation.mutate();
    return <div>
        
        {isLoading && <Loading/>}

        {isSuccess && <div className="grid grid-cols-1 md:grid-cols-4 m-8 gap-4">
            <div id="item-info" className="md:col-span-2 lg:col-span-3 bg-stone-200 rounded-lg p-4">
                <div className={"flex flex-row justify-between items-center"}>
                    <h1 className="text-4xl font-bold">{productData.product.name}
                        {isLogged() && user.id !== productData.user.id && <WishlistButton productId={id}/>}
                    </h1>
                    <Rating rating={productData.product.avg_rating}/>
                </div>
                <p className={"text-3xl"}>{calculatePrice(productData.product.price, productData.product.discount)}€
                    {productData.product.discount > 0 &&
                    <span className={"text-sm text-gray-500 line-through"}>{Number.parseFloat(productData.product.price).toFixed(2)}€</span>}
                </p>
                <span>{productData.product.number_views} views</span>

                <img src={productData.product.image} alt={productData.product.name}
                     className={"mx-auto object-scale-down w-1/2"}
                />

                <h3 className="text-lg font-bold">Description</h3>
                <p>{productData.product.description}</p>

                <div className={"flex flex-row items-center"}>
                    <div id="item-categories" className="flex flex-row space-x-2 pt-2 flex-1">
                        {productData.product.categories.map((item) => {
                            return <div key={item.name}
                                        className="badge badge-secondary badge-outline">{item.name}</div>
                        })}
                    </div>
                    {isLogged() && user.id !== productData.user.id &&
                        <button className={"btn btn-accent"} onClick={() => addToCart(productData.product, user.id)}>Add
                            to
                            cart</button>
                    }
                </div>
            </div>
            {isLogged() && user.id === productData.user.id ?
                <SellerUtils isProductAvailable={productData.product.available}/> :
                <SellerInformation seller={productData.user}/>}

            <div className={"md:col-span-2 lg:col-span-3 space-y-2"}>
                <div className={"flex flex-row justify-between items-center bg-stone-200 rounded-lg p-4"}>
                    <p className={"text-3xl font-bold"}>Reviews</p>
                </div>
                {isLogged() && <div className={"join w-full"}>
                    <textarea placeholder="Enter here your awesome review"
                              className={"textarea textarea-bordered join-item w-full"} ref={reviewRef}/>
                    <button className={"btn btn-accent join-item h-24"} onClick={handleSubmit}>Add Review</button>
                </div>}

                {isLoadingReviews && <Loading/>}
                {isSuccessReviews && reviews.map((item) => {
                    return <Review key={item.id} review={item.review} userData={item.user}/>
                })}
            </div>

        </div>}
        {isError && <ErrorMessage/>}
    </div>;
};