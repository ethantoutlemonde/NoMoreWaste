import {createBrowserRouter, Navigate} from 'react-router-dom';
import Login from './Views/Login';
import NotFound from './Views/NotFound';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
// import Users from './Views/users/Users';
import Dashboard from './Views/Dashboard';
import Register from './Views/Register';
// import UpdateUser from './Views/users/UpdateUser';
// import CreateUser from './Views/users/CreateUser';
import Admin from './Views/users/Admin';
import Beneficiary from './Views/users/Beneficiary';
import Volunteer from './Views/users/Volunteer';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/users/admin' />,
            },
            {
                path: '/users/admin',
                element: <Admin />,
            },
            {
                path: '/users/beneficiary',
                element: <Beneficiary />,
            },
            {
                path: '/users/volunteer',
                element: <Volunteer />,
            },
            // {
            //     path: '/users/:id',
            //     element: <UpdateUser />,
            // },
            // {
            //     path: '/users/create',
            //     element: <CreateUser />,
            // },
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