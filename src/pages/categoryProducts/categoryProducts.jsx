import {fetchProductsByCategory} from "../../api/fetchProducts.js";
import {useQuery} from "react-query";
import {Loading} from "../../components/common/loading/index.js";
import {ErrorMessage} from "../../components/common/error/index.js";
import {Link, useParams} from "react-router-dom";
/**
 * CategoryProducts component is used to display the products of a specific category.
 * It uses react-query for server state management and react-router-dom for navigation.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered JSX element.
 */
export const CategoryProducts = (props) => {
    const {id} = useParams()
    const {
        data: category,
        isLoading,
        isError,
        isSuccess
    } = useQuery(['productsByCategory',id], () => fetchProductsByCategory(id))

    return <div>
        
        <div className="flex flex-col m-8 space-y-4">

            {isLoading && <Loading/>}
            {isSuccess && <>
                <h1 className={"text-4xl font-bold"}>{category.name}</h1>
                {category.products.map((item) => {
                    return <Link key={item.id} to={`/product/${item.id}`}
                                 className="card lg:card-side bg-base-100 shadow-xl">
                        <figure><img src={item.image} alt={item.name} className={"object-fill w-64 h-64"}/></figure>
                        <div className="card-body">
                            <h2 className="card-title">{item.name}</h2>
                            <p>{item.description}</p>
                            <div className="card-actions justify-between items-center">
                                <div className={"space-x-2"}>
                                    {item.categories.map((category)=> {
                                        return (<div key={category.id} className="badge badge-outline">{category.name}</div>)
                                    })}
                                </div>
                                <button className="btn btn-accent">Buy Now!</button>
                            </div>
                        </div>
                    </Link>
                })}
            </>
            }

            {isError && <ErrorMessage/>}
        </div>
    </div>
};