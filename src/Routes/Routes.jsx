import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import AllFoods from "../Pages/AllFoods/AllFoods";
import ErrorPage from "../Pages/Error/ErrorPage";
import UserLayout from "../Layouts/UserLayout";
import UserProfile from "../Pages/UserProfile/UserProfile";

import Settings from "../Pages/Settings";
import Blogs from "../Pages/Blogs/Blogs";
import FoodDetails from "../Pages/FoodDetails/FoodDetails";
import Orders from "../Pages/Orders/Orders";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import AddFood from "../Pages/AddFood/AddFood";
import FoodOrder from "../Pages/FoodOrder/FoodOrder";
import ModifyFood from "../Pages/ModifyFood/ModifyFood";
import MenuPage from "../Pages/MenuPage/MenuPage";
import PrivateRoute from "./PrivateRoute";



    const router = createBrowserRouter([
        {
            path: '/',
            element: <MainLayout></MainLayout>,
            errorElement: <ErrorPage></ErrorPage>,
            children:([
                {
                    path: '/',
                    element: <Home></Home>
                },
                {
                    path: '/allFoods',
                    element: <AllFoods></AllFoods>
                },
                {
                    path: '/blogs',
                    element: <Blogs></Blogs>
                },
                {
                    path: '/singleFood/:id',
                    element: <FoodDetails></FoodDetails>
                },
                {
                    path: '/foodOrder/:id',
                    element: <PrivateRoute><FoodOrder></FoodOrder></PrivateRoute>
                },
                {
                    path: '/login',
                    element: <Login></Login>
                },
                {
                    path: '/signUp',
                    element: <SignUp></SignUp>
                },
                {
                    path: '/addfood',
                    element: <PrivateRoute>
                        <AddFood></AddFood>
                    </PrivateRoute>
                },
                {
                    path: '/modifyFood/:id',
                    element: <PrivateRoute>
                        <ModifyFood></ModifyFood>
                    </PrivateRoute>
                },
                {
                    path: '/menus',
                    element: <MenuPage></MenuPage>
                },
                {
                    path: 'user',
                    element: <UserLayout></UserLayout>,
                    children: [
                        {
                           index: true,
                            element: <UserProfile></UserProfile>
                        },
                        {
                            path: 'settings',
                            element: <Settings></Settings>
                        },
                        {
                            path: 'orders',
                            element: <PrivateRoute>
                                 <Orders></Orders>
                            </PrivateRoute>
                        }
                    ]
                }
                
            ])
        },
        
    ])
  
   


export default router;