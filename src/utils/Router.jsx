import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {Base} from "../layouts/base";
import {Home} from "../pages/home";
import {Search} from "../pages/search/index.js";
import {ProductForm} from "../pages/productForm/index.js";
import {CategoryProducts} from "../pages/categoryProducts/index.js";
import {ProductEdit} from "../pages/productEdit/index.js";
import {SignIn} from "../pages/signIn/index.js";
import {SignUp} from "../pages/signUp/index.js";
import {Confirmation} from "../pages/confirmation/index.js";
import {ForgotPassword} from "../pages/forgotPassword/index.js";
import {Profile} from "../pages/profile/index.js";
import {EditProfile} from "../pages/editProfile/index.js";
import {Cart} from "../pages/cart/index.js";
import {PrivateRoute} from "./PrivateRoute.jsx";
import {ViewProduct} from "../pages/viewProduct/index.js";
import {Wishlist} from "../pages/wishlist/index.js";
import {Orders} from "../pages/orders/index.js";
import {PremiumCheckout} from "../pages/premium/index.js";
import {Adverts} from "../pages/adverts/index.js";
import {Stats} from "../pages/stats/index.js";
import {Checkout} from "../pages/checkout/index.js";
import {AuthLayout} from "../layouts/authLayout/index.js";
import {SignUpIdp} from "../components/signUpIdp/index.js";
import {ProductReviews} from "../pages/productReviews/index.js";

/**
 * This component sets up the routes for the application.
 * It uses the createBrowserRouter function from react-router-dom to create the router.
 * It defines routes for various pages like Home, Search, ProductForm, CategoryProducts, ProductEdit, SignIn, SignUp, Confirmation, ForgotPassword, Profile, EditProfile, Cart, PrivateRoute, ViewProduct, Wishlist, Orders, PremiumCheckout, Adverts, Stats, Checkout, AuthLayout, SignUpIdp, ProductReviews.
 * @function Router
 * @returns {JSX.Element} - The RouterProvider component with the created router.
 */
export default function Router() {

    const router = createBrowserRouter([
        {
            path: "/", element: <Base/>, children: [
                {path: "/", element: <Home/>},
                {
                    path: "/product", children: [
                        {index: true, element: <Navigate to={"/"}/>},
                        {path: ":id", element: <ViewProduct/>},
                        {path: "add", element: <PrivateRoute component={ProductForm}/>},
                        {path: "edit/:id", element: <PrivateRoute component={ProductEdit}/>},
                    ]
                },
                {path: "/search", element: <Search/>},
                {
                    path: "category", children: [
                        {index: true, element: <Navigate to={"/"}/>},
                        {path: ":id", element: <CategoryProducts/>},
                    ]
                },
                {path: "/profile/:id", element: <Profile/>},
                {path: "/profile", element: <Navigate to={"/"}/>},
                {path: "/profile/edit", element: <PrivateRoute component={EditProfile}/>},
                {path: "/profile/reviews", element: <PrivateRoute component={ProductReviews}/>},
                {path: "/cart", element: <PrivateRoute component={Cart}/>},
                {path: "/checkout", element: <PrivateRoute component={Checkout}/>},
                {path: "/premium", element: <PrivateRoute component={PremiumCheckout}/>},
                {path: "/wishlist", element: <PrivateRoute component={Wishlist}/>},
                {path: "/orders", element: <PrivateRoute component={Orders}/>},
                {path: "/adverts", element: <PrivateRoute component={Adverts}/>},
                {path: "/stats", element: <PrivateRoute component={Stats}/>},
            ]
        },
        {
            path: "/", element: <AuthLayout/>, children: [
                {path: "/signIn", element: <SignIn/>},
                {path: "/signUp", element: <SignUp/>},
                {path: "/confirmEmail", element: <Confirmation/>},
                {path: "/forgotPassword", element: <ForgotPassword/>},
                {path: "/sign-up-idp", element: <SignUpIdp/>},

            ]
        },
        {path: "*", element: <Navigate to={"/"}/>}
    ])

    return <RouterProvider router={router}/>

}