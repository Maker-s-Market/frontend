import {Hero} from "../../components/home/hero/index.js";
import {useShoppingContext} from "../../contexts/shopping.jsx";

export const Wishlist = (props) => {
    const {wishlist} = useShoppingContext();
    return <div>
        <Hero/>
        <div className="grid grid-cols-1 md:grid-cols-4 m-8 gap-4">
            <div id="item-info" className="md:col-span-2 lg:col-span-3 bg-stone-200 rounded-lg p-4">
                <h1 className="text-4xl font-bold">Wishlist</h1>

                {wishlist.length === 0 && <p className="text-lg">Your wishlist is empty</p>}
                {wishlist.length !== 0 && wishlist.map((item) => {
                    return <div key={item.id} className="flex flex-row justify-between items-center">
                        <div className="flex flex-row justify-between items-center">
                            <img src={item.image} alt={item.name} className="w-24 h-24"/>
                            <div className="flex flex-col ml-4">
                                <h2 className="text-xl font-bold">{item.name}</h2>
                                <p className="text-lg">{item.price}€</p>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>


    </div>;
};