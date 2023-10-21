import {Hero} from "../../components/home/hero/index.js";
import {FaSearch} from "react-icons/fa";
import {useMutation, useQuery} from "react-query";
import {useRef} from "react";
import {searchProducts} from "../../api/fetchProducts.js";
import {Loading} from "../../components/common/loading/index.js";
import {fetchCategories} from "../../api/fetchCategories.js";

export const Search = (props) => {

    const queryRef = useRef(null);
    const categoryRef = useRef(null);
    const searchMutation = useMutation({
        mutationFn: ({query,categoryId}) => searchProducts(query, categoryId),
    })

    const handleSearch = () => {
        searchMutation.mutate({query: queryRef.current.value, categoryId: categoryRef.current.value})
    }

    const {
        data: categories,
        isLoading: categoriesIsLoading,
        isSuccess: categoriesIsSuccess,
        isError: categoriesIsError
    } = useQuery("categories", fetchCategories);


    return <div>
        <Hero/>
        <div className={"flex flex-col w-3/4 mx-auto"}>
            <div className={"join mx-auto mt-3"}>
                <input type="text" placeholder="What will you buy today?"
                       className="input input-bordered join-item input-accent min-w-full"
                       ref={queryRef}
                />
                <button className="btn join-item btn-accent"
                        onClick={handleSearch}
                >Search <FaSearch size={"20"}/></button>
            </div>

            <div className={"flex flex-row justify-between align-middle"}>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Categories</span>
                    </label>
                    <select className="select select-bordered" ref={categoryRef}>
                        <option disabled selected>Pick one</option>
                        {categoriesIsLoading && <Loading/>}
                        {categoriesIsSuccess && categories.map((category) => {
                                return <option key={category.id} value={category.id}>{category.name}</option>
                            }
                        )}

                    </select>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">District</span>
                    </label>
                    <select className="select select-bordered select-accent">
                        <option disabled selected>Pick one</option>
                        <option>Porto</option>
                        <option>Aveiro</option>
                        <option>Braga</option>
                        <option>Vila Real</option>
                        <option>Porto</option>
                    </select>
                </div>


                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Price Range</span>
                    </label>
                    <input type="range" min="0" max="100" className="range range-accent" step="25"/>
                    <div className="w-full flex justify-between text-xs px-2">
                        <span>0€</span>
                        <span>100€</span>
                        <span>200€</span>
                        <span>300€</span>
                        <span>400€</span>
                    </div>
                </div>

            </div>
        </div>
        <div className="flex flex-col m-8 space-y-4">
            <h1 className={"text-4xl font-bold"}>Search Results</h1>
            {searchMutation.isLoading && <Loading/>}
            {searchMutation.isSuccess && searchMutation.data.map((item) => {
                return <div key={item.id} className="card lg:card-side bg-base-100 shadow-xl">
                    <figure><img src={"https://picsum.photos/200"} alt={item.name}/></figure>
                    <div className="card-body">
                        <h2 className="card-title">{item.name}</h2>
                        <p>{item.description}</p>
                        <div className="card-actions justify-between items-center">
                            <div className={"space-x-2"}>
                                {item.categories.map((category) => {
                                    return (
                                        <div key={category.id} className="badge badge-outline">{category.name}</div>)
                                })}
                            </div>
                            <button className="btn btn-accent">Buy Now!</button>
                        </div>
                    </div>
                </div>
            })}
        </div>
    </div>
};