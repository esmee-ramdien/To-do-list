import { createBrowserRouter, Navigate } from "react-router-dom";
import List from './views/List'
import Dashboard from './views/Dashboard'
import NewList from "./views/NewList";

const router = createBrowserRouter([
    {
        path: '/',
        element:< Navigate to='/overview'/>
    },
    {
        path: "/overview",
        element: <Dashboard />
    },
    {
        path: "/new-list",
        element: <NewList />,
    },
    {
        path: '/list/:id',
        element: <List />
    }
]);

export const navigateTo = (to: string) => {
    router.navigate(to);
};

export default router