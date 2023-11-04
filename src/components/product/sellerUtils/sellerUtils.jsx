import {Link, useNavigate, useParams} from "react-router-dom";
import {useMutation, useQueryClient} from "react-query";
import {deleteProduct} from "../../../api/fetchProducts.js";
import {useNotification} from "../../../hooks/useNotification.js";

export const SellerUtils = (props) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const notification = useNotification();
    const queryClient = useQueryClient();


    const deleteProductMutation = useMutation((id) => deleteProduct(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(['product', id])
            notification.info("Product deleted")
            navigate('/')
        }, onError: () => {
            notification.error("Error deleting product")
        }
    })

    const handleDelete = () => deleteProductMutation.mutate(id)

    return <div>
        <div className={"border-4 border-stone-500 rounded-lg p-3 space-y-2 flex flex-col items-center"}>
            <h3 className="text-lg font-bold">Seller Options</h3>
            <Link replace={true} to={"/product/edit/" + id} className={"btn btn-accent btn-block"}>Edit
                Product</Link>
            <button className={"btn btn-error btn-block"} onClick={handleDelete}>Delete Product</button>
        </div>
    </div>
};