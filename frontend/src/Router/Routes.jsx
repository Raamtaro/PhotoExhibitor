import { createBrowserRouter } from "react-router-dom";

//Import my components
import App from "../App";
import Home from "../Components/Home/Home";
import Login from "../Components/Login/Login"
import Register from "../Components/Register/Register";

//User Routes
import UserOutlet from "../Components/User/UserOutlet";
import UserDashboard from "../Components/User/UserDashboard/UserDashboard"
import CollectionsOutlet from "../Components/User/Collections/CollectionsOutlet";
import CollectionsEditor from "../Components/User/Collections/CollectionsEditor/CollectionsEditor";
import CollectionsCreator from "../Components/User/Collections/CollectionsCreator/CollectionsCreator";
import CollectionsViewer from "../Components/User/Collections/CollectionsViewer/CollectionsViewer";
import AllCollections from "../Components/User/Collections/AllCollections/AllCollections";



import ProtectedRoute from "./ProtectedRoute"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {   //Home
                path: "/",
                element: <Home />
            },
            {   //Sign-up
                path: "register",
                element: <Register />
            },
            {   //Login
                path: "login",
                element: <Login />
            },
            {   //UserPath
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
                        element: <CollectionsOutlet />,
                        children: [
                            {
                                path: ":id/edit",
                                element: <CollectionsEditor />
                            },
                            {
                                path: ":id/view",
                                element: <CollectionsViewer />
                            },
                            {
                                path: "create",
                                element: <CollectionsCreator />
                            }, 
                            {
                                path: "all",
                                element: <AllCollections />

                            }
                        ]
                    }
                ]
            }
        ]
    }
])

export default router