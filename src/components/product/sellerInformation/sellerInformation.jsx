import {FaMapMarkerAlt} from "react-icons/fa";

export const SellerInformation = ({seller}) => {
    return <div id="seller-info" className="space-y-3 p-3">
        <div id="seller-specific" className="border-4 border-stone-500 rounded-lg p-3">
            <h3 className="text-lg font-bold">Seller</h3>
            <img src={seller.photo || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            } alt={seller.name}
                 className={"mx-auto object-scale-down w-full"}
            />
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-lg font-bold">{seller.name}</h1>
                <h3 className="text-md">@{seller.username}</h3>
            </div>
            <button className="btn btn-neutral items-center" disabled>Send Message</button>
        </div>

        <div id="seller-rating" className="border-4 border-stone-500 rounded-lg p-3">
            <div className={"flex flex-row items-center mx-auto"}>
                <FaMapMarkerAlt/>
                <h3 className="text-lg font-bold">Location</h3>
            </div>
            <h5 className="text-lg">{seller.city}-{seller.region}</h5>
        </div>
    </div>
};