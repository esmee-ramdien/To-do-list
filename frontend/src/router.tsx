import { createBrowserRouter, Navigate } from "react-router-dom";
import List from './views/List'
import Dashboard from './views/Dashboard'
import NewList from "./views/NewList";

const router = createBrowserRouter([
    {
        path: '/',
        element:< Navigate to='/overzicht'/>
    },
    {
        path: "/overzicht",
        element: <Dashboard />
    },
    {
        path: "/nieuwe-lijst",
        element: <NewList />,
    },
    {
        path: "/list",
        element: <List />,
    }
]);

export default router