import {createBrowserRouter, Navigate} from 'react-router-dom';
import Login from './Views/Login';
import NotFound from './Views/NotFound';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import Users from './Views/users/Users';
import Dashboard from './Views/Dashboard';
import Register from './Views/Register';
import UpdateUser from './Views/users/UpdateUser';
import CreateUser from './Views/users/CreateUser';

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
                path: '/users/:id',
                element: <UpdateUser />,
            },
            {
                path: '/users/create',
                element: <CreateUser />,
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