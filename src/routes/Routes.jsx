import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../layouts/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AddEvent from "../pages/Dashboard/AddEvent";
import EventDetails from "../components/Event/EventDetails";
import ManageEvent from "../pages/Dashboard/ManageEvent";
import UpdateEvent from "../pages/Dashboard/UpdateEvent";


const router = createBrowserRouter ([
    {
        path: '/',
        element: <Main/>,
        children: [
            {
                index: true,
                element: <Home/>,
                loader: () => fetch(`${import.meta.env.VITE_API_URL}/events`)    
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/eventDetails/:id',
                element: <PrivateRoute><EventDetails/></PrivateRoute>,
                loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/event/${params.id}`)
            },
            {
                path: 'dashboard',
                element: <PrivateRoute><Dashboard/></PrivateRoute>,
                children:[
                       {
                        path: 'dashboard/addEvent',
                        element: <AddEvent/>
                       },
                       {
                        path: '/dashboard/manageEvents',
                        element: <ManageEvent/>
                       },
                       {
                        path: '/dashboard/updateEvent/:id',
                        element: <UpdateEvent/>,
                        loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/event/${params.id}`)
                    }
                ]
            }
        ]
    }
])

export default router;