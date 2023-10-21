import {fetchTopCategories} from "../../../api/fetchCategories.js";
import {useQuery} from "react-query";
import {Loading} from "../../common/loading/index.js";
import {ErrorMessage} from "../../common/error/index.js";
import {Link} from "react-router-dom";

export const TopCategories = (props) => {


    const {data: topCategories, error, isLoading, isSuccess} = useQuery("categories", fetchTopCategories)

    return <>
        <h1 className={"text-5xl font-bold text-center py-12"}>Top Categories</h1>
        {isLoading && <Loading/>}
        <div className={"grid grid-cols-2  lg:grid-cols-4 place-items-center gap-y-4 md:mx-auto md:w-3/4"}>
            {isSuccess && topCategories.map((item) => {
                return (<Link to={`/category/${item.id}`} key={item.id}>
                    <div key={item.id} className={"w-full md:w-48 flex flex-col place-items-center space-y-4"}>
                        <div className="avatar">
                            <div className="w-40 rounded-full">
                                <img src={"https://picsum.photos/200"} alt={"Temp"}/>
                            </div>
                        </div>
                        <p className={"text-3xl font-semibold"}>{item.name}</p>
                    </div>
                </Link>)
            })}
        </div>
        {error && <ErrorMessage/>}
    </>
};