import {FaSearch} from "react-icons/fa";

export const Hero = (props) => {
    return <div className="hero h-96"
                style={{backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
            <div className={"join"}>
                <input type="text" placeholder="What will you buy today?"
                       className="input input-bordered join-item input-accent input-lg min-w-full"/>
                <button className="btn join-item rounded-r-full btn-accent btn-lg">Search <FaSearch
                    size={"20"}/></button>
            </div>
        </div>
    </div>;
};