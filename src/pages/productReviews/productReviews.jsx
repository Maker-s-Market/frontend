import {useAuthContext} from "../../contexts/auth.jsx";
import {Loading} from "../../components/common/loading/index.js";
import {Link, useParams} from "react-router-dom";
import {useMutation, useQuery} from "react-query";
import {fetchUserById} from "../../api/fetchAuth.js";
import {Review} from "../../components/product/review/index.js";
import {ErrorMessage} from "../../components/common/error/index.js";
import moment from "moment/moment.js";
import {fetchProductsReviewRatings} from "../../api/fetchProducts.js";
import {WishlistButton} from "../../components/product/wishlistButton/index.js";
import {Rating} from "../../components/product/rating/index.js";
import ReactStars from "react-rating-stars-component";


export const ProductReviews = () => {
    const {isLogged, token} = useAuthContext();
    const {id} = useParams()

    const {data: profile, error, isLoading, isSuccess} = useQuery(['profile', id], () => fetchUserById(id), {
        enabled: !!id,
    })

    const {
        data: products,
        isLoading: isLoadingProducts,
        isError: isErrorProducts,
        isSuccess: isSuccessProducts
    } = useQuery(['products', id], () => fetchProductsReviewRatings(token), {})

    return (<div className={"p-4"}>
        <div id="item-info" className="col-span-4 bg-stone-200 rounded-lg p-4 mx-4">
            <h1 className="text-4xl font-bold">My Product's Reviews</h1>
        </div>
        {isLoadingProducts && <Loading/>}
        {isSuccessProducts &&
            <div>
                <div className={"mt-5 flex flex-col space-y-5"}>
                    {products.map((item) => {
                        return <div key={item.id} className={"flex flex-col justify-between bg-stone-200 rounded-lg p-4"}>
                            <Link to={`/product/${item.id}`} className={"grid grid-cols-3 items-center bg-gray-100 rounded-lg p-4 w-full"}>
                                <div className={"p-3"}>
                                    <h1 className="text-2xl font-bold">{item.name}</h1>
                                    <img src={item.image} alt={item.name}
                                         className={"object-scale-down w-1/3"}
                                    />
                                </div>
                                <div className={"col-span-2"}>
                                    <p>{moment(item.created_at).format("DD/MM/YYYY")}</p>
                                    <h3 className="text-lg font-bold">Description</h3>
                                    <p>{item.description}</p>
                                </div>
                            </Link>

                            <h2 className="text-2xl font-bold">Reviews</h2>
                            {item.reviews.length !==0? item.reviews.map((review) => {
                                return <div key={review.id} className={"flex flex-col w-full mx-4 mt-3 "}>
                                    <div className={"flex flex-row items-center justify-between w-full"}>
                                        <div className={"flex flex-row items-center space-x-2"}>
                                            <img src={review.user.photo || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
                                                 alt="profile picture"
                                                 className={"rounded-full w-10 h-10 object-cover"}
                                            />
                                            <div className={"flex flex-col"}>
                                                <p className={"text-xl font-bold"}>@{review.user.username} </p>
                                                <p className={"text-sm font-light"}>{moment(review.created_at).format('MMMM Do YYYY')}</p>
                                            </div>
                                            {/*<ReactStars
                                                count={5}
                                                size={26}
                                                activeColor="#ffd700"
                                                value={item.ratings.rating}
                                            />*/}
                                        </div>
                                    </div>
                                    <p className={"text-lg font-light"}>{review.text}</p>
                                </div>
                            }) :
                                <p>No reviews available yet</p>
                            }
                        </div>
                    })}
                </div>
            </div>
        }
        {isErrorProducts && <ErrorMessage/>}

    </div>);
}