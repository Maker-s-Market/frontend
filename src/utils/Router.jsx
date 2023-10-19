import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {Base} from "../layouts/base";
import {Home} from "../pages/home";
import { ViewProduct } from "../pages/viewProduct/viewProduct";



export default function Router() {

    const router = createBrowserRouter([
        {
            path: "/", element: <Base/>, children: [
                {path: "/", element: <Home/>},
                {path: "/product", element: <ViewProduct />}
            ]
        }
    ])

    return <RouterProvider router={router} />
    
}