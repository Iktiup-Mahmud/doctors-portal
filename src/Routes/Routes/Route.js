import { createBrowserRouter } from "react-router-dom"
import Main from "../../layout/Main"
import Appoinment from "../../Pages/Appoinment/Appoinment"
import Dashboard from "../../Pages/Dashboard/Dashboard"
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
        element: <PrivetRoute><Dashboard></Dashboard></PrivetRoute>
    }
])