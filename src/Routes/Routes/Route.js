import { createBrowserRouter } from "react-router-dom"
import DashBoardLayout from "../../layout/DashBoardLayout"
import Main from "../../layout/Main"
import Appoinment from "../../Pages/Appoinment/Appoinment"
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers"
import MyAppoientment from "../../Pages/Dashboard/MyAppoinment/MyAppoientment"
import Home from "../../Pages/Home/Home/Home"
import Login from "../../Pages/Login/Login"
import Signup from "../../Pages/Signup/Signup"
import PrivetRoute from "../PrivetRoute/PrivetRoute"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/appoinment',
                element: <Appoinment></Appoinment>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivetRoute><DashBoardLayout></DashBoardLayout></PrivetRoute>,
        children: [
            {
                path: '/dashboard',
                element: <MyAppoientment></MyAppoientment> 
            },
            {
                path: '/dashboard/all-users',
                element: <AllUsers></AllUsers>
            }
        ]
    }
])