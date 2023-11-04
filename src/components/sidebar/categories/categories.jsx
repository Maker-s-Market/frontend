import {useQuery} from "react-query";
import {fetchCategories} from "../../../api/fetchCategories.js";
import {Loading} from "../../common/loading/index.js";
import {ErrorMessage} from "../../common/error/index.js";
import {Link} from "react-router-dom";

export const Categories = (props) => {

    const {data: categories, isLoading, isError, isSuccess} = useQuery('categories', fetchCategories);

    return <div id="drawer-categories" className="overscroll-contain flex-1">
        <h1 className="text-start font-semibold">Categories</h1>
        {isLoading && <Loading/>}
        {isSuccess && categories.map((category) => {
            return <li key={category.id} className="justify-center p-2">
                <Link key={category.id} to={`/category/${category.id}`}>
                    <div className="rounded-full bg-gray-500 p-2">
                        {/*<FontAwesomeIcon icon={category.icon}/>*/}
                    </div>
                    <h2 className="grow">{category.name}</h2>
                </Link>
            </li>
        })}
        {isError && <ErrorMessage/>}
    </div>
};