import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Home from "../pages";
import Done from "../pages/done";
import Waiting from "../pages/waiting";

export const router = createBrowserRouter([
    {
        path: "/",
        element:<Root/>,
        children: [
            {
                path:"",
                element: <Home/>,
            },
            {
                path: "/tamamlananlar",
                element: <Done/>
            },
            {
                path: "/bekleyenler",
                element: <Waiting/>
            }
        ]
    }
]);