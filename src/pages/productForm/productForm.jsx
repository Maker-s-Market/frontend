import {Hero} from "../../components/home/hero/index.js";
import {useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import {useQuery} from "react-query";
import {fetchCategories} from "../../api/fetchCategories.js";

export const ProductForm = (props) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categoryOption, setCategoryOption] = useState("");

    const {
        data: categories,
        isLoading: categoriesIsLoading,
        isSuccess: categoriesIsSuccess,
        isError: categoriesIsError
    } = useQuery("categories", fetchCategories);

    const addCategory = () => setSelectedCategories((prevState) => {
        if (!prevState.some(category => category === categoryOption)) return [...prevState, categoryOption]
        return prevState
    })

    const removeCategory = (category) => setSelectedCategories((prevState) => {
        return prevState.filter(item => item !== category)
    })


    return <div>
        <Hero/>
        <div className="flex flex-col m-8 space-y-4 max-w-2xl mx-auto">

            <h1 className={"text-4xl font-bold"}>Announce Product</h1>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="Majestic Unicorn"
                       className="input input-bordered input-accent w-full max-w-md"/>

                <label className="label">
                    <span className="label-text">Price</span>
                </label>
                <input type="number" placeholder="00.00€"
                       className="input input-bordered input-accent w-full max-w-fit"/>

                <label className="label">
                    <span className="label-text">Discount</span>
                </label>
                <input type="number" placeholder="00.00€" className="input input-bordered input-accent w-full max-w-fit"
                       min="1" max="100"/>

                <label className="label cursor-pointer max-w-fit">
                    <span className="label-text pr-2">Stockable</span>
                    <input type="checkbox" className="toggle toggle-accent"/>
                </label>

                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                <textarea className="textarea textarea-bordered h-24 textarea-accent"
                          placeholder="Give us a majestic descrition about your wonderfult product"></textarea>

                <label className="label">
                    <span className="label-text">Image</span>
                </label>
                <input type="file" className="file-input file-input-bordered file-input-accent w-full max-w-xs"/>

                <label className="label">
                    <span className="label-text">Categories</span>
                </label>
                <div className={"join"}>
                    <select className="select select-accent max-w-xs join-item"
                            onChange={(e) => setCategoryOption(e.target.value)}>
                        <option disabled selected>Select the Categories</option>
                        {categoriesIsLoading && <option>Loading...</option>}
                        {categoriesIsSuccess && categories.map((item, index) => {
                            return <option key={item.id} value={item.slug}>{item.name}</option>
                        })}
                    </select>
                    <button className="btn btn-accent join-item" onClick={addCategory}>Add</button>
                </div>

                <div className={"flex flex-row space-x-2 mt-2"}>
                    {selectedCategories.map((item, index) => {
                        return <div key={index} className="badge badge-accent badge-lg gap-2">
                            <AiOutlineClose onClick={() => removeCategory(item)}/>
                            {item}
                        </div>
                    })}
                </div>
                <button className="btn btn-accent btn-block mt-2">Submit!</button>
            </div>
        </div>

    </div>;
};