import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Base} from "../layouts/base";
import {Home} from "../pages/home";
import {ViewProduct} from "../pages/viewProduct/viewProduct";
import {Search} from "../pages/search/index.js";
import {ProductForm} from "../pages/productForm/index.js";


export default function Router() {

    const router = createBrowserRouter([
        {
            path: "/", element: <Base/>, children: [
                {path: "/", element: <Home/>},
                {
                    path: "/product", children: [
                        {index: true, element: <Home/>},
                        {path: ":id", element: <ViewProduct/>},
                        {path: "add", element: <ProductForm/>}
                    ]
                },
                {path: "/search", element: <Search/>},

            ]
        }
    ])

    return <RouterProvider router={router}/>

}