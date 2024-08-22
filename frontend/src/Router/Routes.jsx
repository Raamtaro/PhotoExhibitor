import { createBrowserRouter } from "react-router-dom";

//Import my components
import App from "../App";
import Home from "../Components/Home/Home";
import Login from "../Components/Login/Login"
import Register from "../Components/Register/Register";

//User Routes
import UserOutlet from "../Components/User/UserOutlet";
import UserDashboard from "../Components/User/UserDashboard"
import UserCollectionsViewer from "../Components/User/Collections/UserCollectionsViewer";
import CollectionsEditor from "../Components/User/Collections/CollectionsEditor";



import ProtectedRoute from "./ProtectedRoute"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "user",
                element: 
                    <ProtectedRoute>
                        <UserOutlet />
                    </ProtectedRoute>,
                children: [
                    {
                        path: "dashboard",
                        element: <UserDashboard />
                    },
                    {
                        path: "collections",
                        element: <UserCollectionsViewer />
                    }
                ]
            }
        ]
    }
])

export default router