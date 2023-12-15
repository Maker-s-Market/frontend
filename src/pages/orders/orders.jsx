import {useShoppingContext} from "../../contexts/shopping.jsx";
import {useEffect} from "react";
import moment from "moment";
/**
 * Orders component is used to display the user's orders.
 * It uses the shopping context to fetch the orders.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered JSX element.
 */
export const Orders = (props) => {
    const {orders} = useShoppingContext();

    useEffect(() => {
        console.log(orders)
    }, []);
    return <div>
        

        <div className="flex flex-col m-8 gap-4">
            <div id="item-info" className="col-span-4 bg-stone-200 rounded-lg p-4">
                <h1 className="text-4xl font-bold">Orders</h1>
            </div>

            {orders.length === 0 && <p className="text-lg">You have no orders</p>}

            {orders.length !== 0 && orders.map((order) => {
                return <div key={order.id}>
                    <h1 className="text-2xl font-bold">Order {moment(order.created_at).format("DD/MM/YYYY")}</h1>
                    <div className={"flex flex-col gap-x-3"}>

                        <p className="text-lg"><span className={"font-bold"}>Total price:</span> {order.total_price}€
                        </p>
                        <div className="flex flex-row gap-2 text-lg items-center"><span
                            className={"font-bold"}>Status:</span>
                            <div className="badge badge-accent badge-outline">{order.status}</div>
                        </div>
                        <p className={"text-lg"}><span
                            className={"font-bold"}>Last Update:</span> {moment(order.updated_at).format("DD/MM/YYYY HH:mm")}
                        </p>
                        <div className={"flex flex-row gap-4"}>
                            {order.order_items.map((item) => {
                                return <div className="flex flex-row items-center" key={item.id}>
                                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16"/>
                                    <div className="flex flex-col ml-4">
                                        <h2 className="text-md font-bold">{item.product.name}</h2>
                                        <p className="text-md">{item.product.price}€</p>
                                        <p className="text-md">Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className={"divider"}></div>
                </div>
            })}
        </div>
    </div>;
}

