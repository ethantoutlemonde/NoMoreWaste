import {createBrowserRouter, Navigate} from 'react-router-dom';
import Login from './Views/Login';
import NotFound from './Views/NotFound';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import Users from './Views/Users';
import Dashboard from './Views/Dashboard';
import Register from './Views/Register';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/users' />,
            },
            {
                path: '/users',
                element: <Users />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
    

])

export default router;