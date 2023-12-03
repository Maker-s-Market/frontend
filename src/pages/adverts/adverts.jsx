import {useAuthContext} from "../../contexts/auth.jsx";
import {Hero} from "../../components/home/hero/index.js";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {editProductAvailability, fetchUserProducts} from "../../api/fetchProducts.js";
import {useNotification} from "../../hooks/useNotification.js";
import {Loading} from "../../components/common/loading/index.js";

export const Adverts = (props) => {

    const {user, token,setUser} = useAuthContext()
    const notification = useNotification()
    const queryClient = useQueryClient()

    const editProductAvailabilityMutation = useMutation(({
                                                             availability,
                                                             id
                                                         }) => editProductAvailability(token, id, availability), {
        onSuccess: () => {
            queryClient.invalidateQueries('user-products')
            notification.info("Product availability edited successfully")
        }, onError: () => {
            notification.error("Error editing product availability")
        }
    })

    const {data: products, isLoading: productsIsLoading, isError: productsIsError, isSuccess: productsIsSuccess} = useQuery('user-products', () => fetchUserProducts(token))

    return <div>
        <Hero/>

        <div className="grid grid-cols-1 md:grid-cols-4 m-8 gap-4">
            <div id="item-info" className="col-span-4 bg-stone-200 rounded-lg p-4">
                <h1 className="text-4xl font-bold">My Advertisements</h1>

                <div
                    className={"grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-y-4 gap-4"}>
                    {productsIsLoading && <Loading/>}
                    {productsIsSuccess && products.length !== 0 && products.map((item) => {
                        return <div key={item.id} className="card bg-base-100 shadow-xl max-h-96">
                            <figure><img src={item.image} alt="Shoes" className={"object-cover w-full min-h-32"}/>
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {item.name}
                                    {item.available ?
                                        <div className="badge badge-accent badge-outline">Available</div> :
                                        <div className="badge badge-error badge-outline">Unavailable</div>}

                                </h2>
                                <p className={"line-clamp-2"}>{item.description}</p>
                                <div className="card-actions justify-between">
                                    {item.available ? <button className={"btn btn-accent btn-block"}
                                                              onClick={() => editProductAvailabilityMutation.mutate({
                                                                  availability: false,
                                                                  id: item.id
                                                              })}
                                        >Disable Announcement</button> :
                                        <button className={"btn btn-accent btn-block"}
                                                onClick={() => editProductAvailabilityMutation.mutate({
                                                    availability: true,
                                                    id: item.id
                                                })}
                                        >Enable Announcement</button>}
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>;
};