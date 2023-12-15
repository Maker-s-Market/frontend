import {Hero} from "../../components/home/hero/index.js";
import {useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import {useMutation, useQuery} from "react-query";
import {fetchCategories} from "../../api/fetchCategories.js";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {addProduct} from "../../api/fetchProducts.js";
import {useNavigate} from "react-router-dom";
import {useNotification} from "../../hooks/useNotification.js";
import {FormError} from "../../components/common/formError/index.js";
import {useAuthContext} from "../../contexts/auth.jsx";

export const ProductForm = (props) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categoryOption, setCategoryOption] = useState("");
    const {token} = useAuthContext();
    const navigate = useNavigate();
    const notification = useNotification()
    const [photo, setPhoto] = useState("");

    const {
        data: categories,
        isLoading: categoriesIsLoading,
        isSuccess: categoriesIsSuccess,
        isError: categoriesIsError
    } = useQuery("categories", fetchCategories);

    const addCategory = (e) => {
        e.preventDefault();
        setSelectedCategories((prevState) => {
            if (!prevState.some(category => category === categoryOption) && categoryOption !== "") return [...prevState, categoryOption]
            return prevState
        })

    }

    const removeCategory = (category) => setSelectedCategories((prevState) => {
        return prevState.filter(item => item !== category)
    })

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        price: Yup.number().required("Required"),
        discount: Yup.number().required("Required"),
        description: Yup.string().required("Required"),
        image:Yup.mixed(),
        categories: Yup.array().required("Required"),
        stockable: Yup.boolean().required("Required"),
    })

    const jsonizeCategories = (categories) => {
        return categories.map((item) => {
            return {id: item}
        })
    }

    const findCategory = (id) => categories.find((item) => item.id === id).name

    const addProductMutation = useMutation({
        mutationFn: ({name, price, discount, description, image, categories,stockable, stock}) => addProduct(token,{name, price, discount, description, categories:jsonizeCategories(selectedCategories),stockable,stock},photo),
        onSuccess: () => {
            notification.info("Product Added")
            navigate("/")
        },
        onError: (data) => {
            console.log(data)
            notification.error(data.response.data.detail)
        }
    })

    const handleSubmit = (values) => addProductMutation.mutate(values)


    return <div>
        <Hero/>
        <div className="flex flex-col m-8 space-y-4 max-w-2xl mx-auto">

            <h1 className={"text-4xl font-bold"}>Announce Product</h1>
            <Formik initialValues={{
                name: "",
                price: "",
                discount: "",
                description: "",
                image: "",
                categories: [],
                stockable: false,
                stock: 0
            }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleSubmit(values)}
            >
                <Form>
                    <div className="form-control w-full">
                        <div>
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <ErrorMessage name={"name"} component={FormError}/>
                        </div>
                        <Field name={"name"} type={"text"} placeholder={"Majestic Unicorn"}
                               className={"input input-bordered input-accent w-full max-w-md"}/>

                        <div>
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <ErrorMessage name={"price"} component={FormError}/>
                        </div>
                        <Field name={"price"} type={"number"} placeholder={"00.00€"}
                               className={"input input-bordered input-accent w-full max-w-fit"}/>

                        <div>
                            <label className="label">
                                <span className="label-text">Discount</span>
                            </label>
                            <ErrorMessage name={"discount"} component={FormError}/>
                        </div>
                        <Field name={"discount"} type={"number"} placeholder={"00.00€"}
                               className={"input input-bordered input-accent w-full max-w-fit"}/>

                        <div>
                            <label className="label cursor-pointer max-w-fit">
                                <span className="label-text pr-2">Stockable</span>
                                <Field name={"stockable"} type={"checkbox"} className={"toggle toggle-accent"}/>
                            </label>
                            <ErrorMessage name={"stockable"} component={FormError}/>
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <ErrorMessage name={"description"} component={FormError}/>
                        </div>

                        <Field as={"textarea"} name={"description"}
                               placeholder={"Give us a majestic descrition about your wonderfult product"}
                               className={"textarea textarea-bordered h-24 textarea-accent"}/>

                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input id="photo" name="photo" type="file"
                               className={"file-input file-input-bordered file-input-accent w-full"}
                               onChange={(event) => {
                                   setPhoto(event.currentTarget.files[0]);
                               }}/>
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
            </Formik>
        </div>
    </div>
};