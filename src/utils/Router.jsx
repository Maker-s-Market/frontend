import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {Base} from "../layouts/base";
import {Home} from "../pages/home";



export default function Router() {

    const router = createBrowserRouter([
        {
            path: "/", element: <Base/>, children: [
                {path: "/", element: <Home/>},
            ]
        }
    ])

    return <RouterProvider router={router} />
    
}