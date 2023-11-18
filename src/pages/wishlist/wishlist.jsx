import {Hero} from "../../components/home/hero/index.js";
import {useShoppingContext} from "../../contexts/shopping.jsx";
import {WishlistButton} from "../../components/product/wishlistButton/index.js";
import {Link} from "react-router-dom";

export const Wishlist = (props) => {
    const {wishlist} = useShoppingContext();
    return <div>
        <Hero/>
        <div className="grid grid-cols-1 md:grid-cols-4 m-8 gap-4">
            <div id="item-info" className="col-span-4 bg-stone-200 rounded-lg p-4">
                <h1 className="text-4xl font-bold">Wishlist</h1>

                {wishlist.length === 0 && <p className="text-lg">Your wishlist is empty</p>}
                <div
                    className={"grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-y-4 gap-4"}>

                    {wishlist.length !== 0 && wishlist.map((item) => {
                        return <div key={item.id} className="card bg-base-100 shadow-xl max-h-96">
                            <figure><img src={item.image} alt="Shoes" className={"object-cover w-full min-h-32"}/>
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {item.name}
                                </h2>
                                <p className={"line-clamp-2"}>{item.description}</p>

                                <div className="card-actions justify-between">
                                    <WishlistButton productId={item.id}/>
                                    <Link to={`/product/${item.id}`} className={"btn btn-accent"}>Buy Now</Link>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>


    </div>;
};