import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {Base} from "../layouts/base";
import {Home} from "../pages/home";
import {ViewProduct} from "../pages/viewProduct/viewProduct";
import {Search} from "../pages/search/index.js";
import {ProductForm} from "../pages/productForm/index.js";
import {CategoryProducts} from "../pages/categoryProducts/index.js";


export default function Router() {

    const router = createBrowserRouter([
        {
            path: "/", element: <Base/>, children: [
                {path: "/", element: <Home/>},
                {
                    path: "/product", children: [
                        {index: true, element: <Navigate to={"/"}/>},
                        {path: ":id", element: <ViewProduct/>},
                        {path: "add", element: <ProductForm/>}
                    ]
                },
                {path: "/search", element: <Search/>},
                {path: "category", children: [
                        {index: true, element: <Navigate to={"/"}/>},
                        {path: ":id", element: <CategoryProducts/>},
                    ]},

            ]
        }
    ])

    return <RouterProvider router={router}/>

}