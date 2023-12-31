import {fetchTopProducts} from "../../../api/fetchProducts.js";
import {useQuery} from "react-query";
import {Loading} from "../../common/loading/index.js";
import {ErrorMessage} from "../../common/error/index.js";
import {Link} from "react-router-dom";
/**
 * Highlights component fetches and displays the top products.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} The Highlights component.
 */
export const Highlights = (props) => {

    const {data: higlightedProducts, isLoading, isError, isSuccess} = useQuery('higlightedProducts', ()=>fetchTopProducts(4))

    return <>
        <h1 className={"text-5xl font-bold text-center py-12"}>Highlighted Products</h1>
        {isLoading && <Loading/>}
        <div
            className={"grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-y-4 gap-4 w-3/4 mx-auto"}>
            {isSuccess && higlightedProducts.map((item, index) => {
                return <Link key={item.id} to={`/product/${item.id}`}>
                    <div  className="card bg-base-100 shadow-xl max-h-96  hover:shadow-2xl">
                        <figure><img src={item.image} alt="Shoes" className={"object-cover w-full min-h-32"}/></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                {item.name}
                            </h2>
                            <p className={"line-clamp-5"}>{item.description}</p>
                            <div className="card-actions justify-end">
                                {item.categories.map((category, index) => {
                                    return (
                                        <div key={category.id} className="badge badge-outline line-clamp-1">{category.name}</div>)
                                })}
                            </div>
                        </div>
                    </div>
                </Link>
            })}
        </div>
        {isError && <ErrorMessage/>}
    </>
};