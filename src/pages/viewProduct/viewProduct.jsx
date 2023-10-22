import {Profile} from "../../components/sidebar/profile/profile";
import {FaMapMarkerAlt} from "react-icons/fa";
import {Hero} from "../../components/home/hero/index.js";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {deleteProduct, fetchProductById} from "../../api/fetchProducts.js";
import {Loading} from "../../components/common/loading/index.js";
import {ErrorMessage} from "../../components/common/error/index.js";
import {Rating} from "../../components/product/rating/index.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import {CommingSoon} from "../../components/common/commingSoon/index.js";
import {useNotification} from "../../hooks/useNotification.js";

export const ViewProduct = (props) => {

    const {id} = useParams();
    const navigate = useNavigate();
    const notification = useNotification();
    const queryClient = useQueryClient();

    const {
        data: product,
        isLoading,
        isError,
        isSuccess
    } = useQuery(['product', id], () => fetchProductById(id))

    const deleteProductMutation = useMutation((id) => deleteProduct(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(['product', id])
            notification.info("Product deleted")
            navigate('/')
        },
        onError: () => {
            notification.error("Error deleting product")
        }
    })

    const handleDelete = () => deleteProductMutation.mutate(id)

    const mockSeller = {
        name: "Name LastName",
        location: "Aveiro"
    }

    return <div>
        <Hero/>
        {isLoading && <Loading/>}

        {isSuccess && <div className="flex flex-row m-8 space-x-4">
            <div id="item-info" className="space-y-2 p-5 grow-0 shrink-0 basis-3/4 grid bg-stone-200 rounded-lg">
                <div className="flex flex-row w-full space-x-2 justify-between">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <div className={"space-x-2"}>
                        <Link replace={true}  to={"/product/edit/" + id} className={"btn btn-accent"}>Edit
                            Product</Link>
                        <button className={"btn btn-error"} onClick={handleDelete}>Delete Product</button>
                    </div>
                </div>


                <div className="justify-self-center m-3 w-80">
                    <img src={product.image} alt={product.name}/>
                </div>

                <div id="item-categories" className="flex flex-row space-x-2">
                    {product.categories.map((item) => {
                        return <div key={item.name} className="badge badge-secondary badge-outline">{item.name}</div>
                    })}
                </div>


                <div className="inline-flex justify-between">
                    <h3 className="text-lg font-bold">Description</h3>
                    <div>
                        <h3 className="text-lg font-bold">Classification</h3>
                        <Rating/>
                    </div>
                </div>
                <p>{product.description}</p>
                <div className="divider"></div>
                <div id="item-stats-info" className="flex flex-row justify-between">
                    <h4>Cliques: {product.number_views}</h4>
                    <h4 className="text-red-400 font-bold">Report<CommingSoon/></h4>
                </div>
                <div id="product-rating">

                </div>
            </div>
            <div id="seller-info" className="space-y-3 p-3">
                <div id="seller-specific" className="grid border-4 border-stone-500 rounded-lg p-3">
                    <h3 className="text-lg font-bold">Seller</h3>
                    <Profile isLoggedIn={true}/>
                    <button className="btn btn-neutral items-center">Send Message<CommingSoon/></button>
                </div>

                <div id="seller-rating" className="border-4 border-stone-500 rounded-lg p-3">
                    <h3 className="text-lg font-bold">Location</h3>
                    <div className="inline-flex">
                        <FaMapMarkerAlt/>
                        <h5 className="text-md">{mockSeller.location}</h5>
                    </div>
                </div>
            </div>
        </div>
        }
        {isError && <ErrorMessage/>}
    </div>;
};