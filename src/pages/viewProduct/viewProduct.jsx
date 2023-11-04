import {Hero} from "../../components/home/hero/index.js";
import {useQuery} from "react-query";
import {fetchProductById} from "../../api/fetchProducts.js";
import {Loading} from "../../components/common/loading/index.js";
import {ErrorMessage} from "../../components/common/error/index.js";
import {Rating} from "../../components/product/rating/index.js";
import {useParams} from "react-router-dom";
import {useAuthContext} from "../../contexts/auth.jsx";
import {SellerInformation} from "../../components/product/sellerInformation/index.js";
import {SellerUtils} from "../../components/product/sellerUtils/index.js";

export const ViewProduct = (props) => {

    const {id} = useParams();
    const {user, isLogged} = useAuthContext();


    const {
        data: productData, isLoading, isError, isSuccess
    } = useQuery(['product', id], () => fetchProductById(id), {
        refetchOnWindowFocus: false
    })

    return <div>
        <Hero/>
        {isLoading && <Loading/>}

        {isSuccess && <div className="grid grid-cols-1 md:grid-cols-4 m-8 gap-4">
            <div id="item-info" className="md:col-span-2 lg:col-span-3 bg-stone-200 rounded-lg p-4">
                <div className={"flex flex-row justify-between items-center"}>
                    <h1 className="text-4xl font-bold">{productData.product.name}
                    </h1>
                    <Rating/>
                </div>
                <span>{productData.product.number_views} views</span>

                <img src={productData.product.image} alt={productData.product.name}
                     className={"mx-auto object-scale-down w-1/2"}
                />

                <h3 className="text-lg font-bold">Description</h3>
                <p>{productData.product.description}</p>

                <div id="item-categories" className="flex flex-row space-x-2 pt-2">
                    {productData.product.categories.map((item) => {
                        return <div key={item.name} className="badge badge-secondary badge-outline">{item.name}</div>
                    })}
                </div>
            </div>
            {isLogged() && user.id === productData.user.id ? <SellerInformation seller={productData.user}/> :
                <SellerUtils/>}

            <div className={"md:col-span-2 lg:col-span-3 bg-stone-200 rounded-lg p-4"}>
                <div className={"flex flex-row justify-between items-center"}>
                    <p className={"text-3xl font-bold"}>Reviews</p>
                    <button className={"btn btn-accent"}>Add Review</button>
                </div>
            </div>
        </div>}
        {isError && <ErrorMessage/>}
    </div>;
};