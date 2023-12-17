import {useShoppingContext} from "../../contexts/shopping.jsx";
import {useEffect, useState} from "react";
import moment from "moment";
import {Rating} from "../../components/orders/rating/index.js";

/**
 * Orders component is used to display the user's orders.
 * It uses the shopping context to fetch the orders.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered JSX element.
 */
export const Orders = (props) => {
    const {orders} = useShoppingContext();
    const [statusRating, setStatusRating] = useState(-1);

    const checkStatus = (status, order_status) => {
        const statusIndex = status.indexOf(order_status);

        return statusIndex !== -1 ? statusIndex : 0;
    }

    return <div>


        <div className="flex flex-col m-8 gap-4 w-full">
            <div id="item-info" className="col-span-4 bg-stone-200 rounded-lg p-4">
                <h1 className="text-4xl font-bold">Orders</h1>
            </div>

            {orders.length === 0 && <p className="text-lg">You have no orders</p>}

            {orders.length !== 0 && orders.map((order, index) => {
                return <div key={order.id} className={"flex flex-row gap-2 w-1/2 justify-between"}>
                    <div className={"flex flex-col gap-x-3"}>
                        <h1 className="text-3xl font-bold">Order #{index + 1}</h1>

                        <p className="text-lg"><span
                            className={"font-bold"}>Total price:</span> {Number.parseFloat(order.total_price).toFixed(2)}€
                        </p>
                        <p className={"text-lg"}><span
                            className={"font-bold"}>Last Update:</span> {moment(order.updated_at).format("DD/MM/YYYY HH:mm")}
                        </p>
                        <div className={"divider"}></div>
                        <div className={"flex flex-col gap-2"}>
                            {order.order_items.map((item) => {
                                return <div className="flex flex-row" key={item.id}>
                                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16"/>
                                    <div className="flex flex-col ml-4">
                                        <h2 className="text-md font-bold">{item.product.name}</h2>
                                        <p className="text-md">{Number.parseFloat(item.product.price).toFixed(2)}€</p>
                                        <p className="text-md">Quantity: {item.quantity}</p>
                                        {order.status === "Delivered" && statusRating === order.id && <Rating id={item.product.id}/>}
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className={"divider-horizontal"}></div>
                    <div className={"flex flex-col gap-x-3"}>
                        <ul className="steps steps-vertical">
                            <li className={`step ${checkStatus("Accepted", order.status) === 0 ? "step-accent" : ""}`}>Accepted</li>
                            <li className={`step ${checkStatus("In Expedition", order.status) === 0 ? "step-accent" : ""}`}>In
                                Expedition
                            </li>
                            <li className={`step ${checkStatus("Delivered", order.status) === 0 ? "step-accent" : ""}`}>Delivered</li>
                        </ul>

                        {order.status === "Delivered" && statusRating !== order.id &&
                            <button className={"btn btn-accent"}
                                    onClick={() => setStatusRating(order.id)}
                            >
                                Rate Products!
                            </button>}

                        {order.status === "Delivered" && statusRating === order.id &&
                            <button className={"btn btn-content"}
                                    onClick={() => setStatusRating(-1)}
                            >
                                Cancel
                            </button>}
                    </div>
                </div>
            })}
        </div>
    </div>

};