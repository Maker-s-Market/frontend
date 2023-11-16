import {editProduct, fetchProductById} from "../../api/fetchProducts.js";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "react-query";
import {useState} from "react";
import {Hero} from "../../components/home/hero/index.js";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {AiOutlineClose} from "react-icons/ai";
import {fetchCategories} from "../../api/fetchCategories.js";
import * as Yup from "yup";
import {useNotification} from "../../hooks/useNotification.js";
import {FormError} from "../../components/common/formError/index.js";

export const ProductEdit = (props) => {

    const {id} = useParams()
    const notification = useNotification()
    const navigate = useNavigate()
    const [categoryOption, setCategoryOption] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);

    const {
        data: productData, isLoading: productIsLoading, isSuccess: productIsSuccess, isError: productIsError
    } = useQuery(["product", id], () => fetchProductById(id), {
        refetchOnWindowFocus: false,
        enabled: id !== undefined, onSuccess: (data) => {
            setSelectedCategories(data.product.categories.map((item) => item.id))
        }
    })


    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        price: Yup.number().required("Required"),
        discount: Yup.number().required("Required"),
        description: Yup.string().required("Required"),
        image: Yup.string(),
        categories: Yup.array().required("Required"),
        stockable: Yup.boolean().required("Required"),
    })

    const {
        data: categories, isLoading: categoriesIsLoading, isSuccess: categoriesIsSuccess, isError: categoriesIsError
    } = useQuery("categories", fetchCategories);


    const jsonizeCategories = (categories) => {
        return categories.map((item) => {
            return {id: item}
        })
    }

    const editProductMutation = useMutation({
        mutationFn: ({name, price, discount, description, image, categories, stockable, stock}) => editProduct(id, {
            name,
            price,
            discount,
            description,
            image: "https://picsum.photos/200",
            categories: jsonizeCategories(selectedCategories),
            stockable,
            stock
        }), onSuccess: () => {
            notification.info("Product Edited")
            navigate("/")
        }, onError: () => {
            notification.error("Error")
        }
    })


    const findCategory = (id) => categories.find((item) => item.id === id).name


    const addCategory = (e) => {
        e.preventDefault();
        setSelectedCategories((prevState) => {
            if (!prevState.some(category => category === categoryOption) && categoryOption !== "") return [...prevState, categoryOption]
            return prevState
        })
    }

    const handleSubmit = (values) => editProductMutation.mutate(values)
    const removeCategory = (category) => setSelectedCategories((prevState) => {
        return prevState.filter(item => item !== category)
    })

    return <div>
        <Hero/>
        <div className="flex flex-col m-8 space-y-4 max-w-2xl mx-auto">

            <h1 className={"text-4xl font-bold"}>Announce Product</h1>

            {productIsSuccess && <Formik initialValues={{
                name: productData.product.name,
                price: productData.product.price,
                discount: productData.product.discount,
                description: productData.product.description,
                image: "",
                categories: productData.product.categories,
                stockable: productData.product.stockable,
                stock: productData.product.stock
            }}
                                         validationSchema={validationSchema}
                                         onSubmit={(values) => {
                                             handleSubmit(values)
                                         }}
            >
                <Form>
                    <div className="form-control w-full">
                        <div>
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <ErrorMessage component={FormError}  name={"name"} />
                        </div>
                        <Field name={"name"} type={"text"} placeholder={"Majestic Unicorn"}
                               className={"input input-bordered input-accent w-full max-w-md"}/>

                        <div>
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <ErrorMessage component={FormError}  name={"price"} />
                        </div>
                        <Field name={"price"} type={"number"} placeholder={"00.00€"}
                               className={"input input-bordered input-accent w-full max-w-fit"}/>

                        <div>
                            <label className="label">
                                <span className="label-text">Discount</span>
                            </label>
                            <ErrorMessage component={FormError}  name={"discount"} />
                        </div>

                        <Field name={"discount"} type={"number"} placeholder={"00.00€"}
                               className={"input input-bordered input-accent w-full max-w-fit"}/>

                        <label className="label cursor-pointer max-w-fit">
                            <span className="label-text pr-2">Stockable</span>
                            <Field name={"stockable"} type={"checkbox"} className={"toggle toggle-accent"}/>
                        </label>

                        <div>
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <ErrorMessage component={FormError}  name={"description"} />
                        </div>

                        <Field as={"textarea"} name={"description"}
                               placeholder={"Give us a majestic descrition about your wonderfult product"}
                               className={"textarea textarea-bordered h-24 textarea-accent"}/>

                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <Field name={"image"} type={"file"}
                               className={"file-input file-input-bordered file-input-accent w-full max-w-xs"}/>

                        <label className="label">
                            <span className="label-text">Categories</span>
                        </label>
                        <div className={"join"}>
                            <select className="select select-accent max-w-xs join-item"
                                    onChange={(e) => setCategoryOption(e.target.value)}>
                                <option disabled selected>Select the Categories</option>
                                {categoriesIsLoading && <option>Loading...</option>}
                                {categoriesIsSuccess && categories.map((item) => {
                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                })}
                            </select>
                            <button className="btn btn-accent join-item" onClick={addCategory}>Add</button>
                        </div>

                        <div className={"flex flex-row space-x-2 mt-2"}>
                            {selectedCategories.map((item, index) => {
                                return <div key={index} className="badge badge-accent badge-lg gap-2">
                                    <AiOutlineClose onClick={() => removeCategory(item)}/>
                                    {findCategory(item)}
                                </div>
                            })}
                        </div>
                        <button type={"submit"} className="btn btn-accent btn-block mt-2">Submit!</button>
                    </div>
                </Form>
            </Formik>}
        </div>
    </div>;
};