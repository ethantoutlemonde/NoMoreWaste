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
import CreateAdmin from './Views/users/CreateAdmin';
import CreateBeneficiary from './Views/users/CreateBeneficiary';
import CreateVolunteer from './Views/users/CreateVolunteer';
import DetailAdmin from './Views/users/DetailAdmin';
import UpdateAdmin from './Views/users/UpdateAdmin';
import DetailBeneficiary from './Views/users/DetailBeneficiary';
import UpdateBeneficiary from './Views/users/UpdateBeneficiary';

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
                path: '/users/admin/:id',
                element: <DetailAdmin />,
            },
            {
                path: '/users/admin/:id/update',
                element: <UpdateAdmin />,
            },
            {
                path: '/users/admin/create',
                element: <CreateAdmin />,
            },
            {
                path: '/users/beneficiary',
                element: <Beneficiary />,
            },
            {
                path: '/users/beneficiary/:id',
                element: <DetailBeneficiary />,
            },
            {
                path: '/users/beneficiary/:id/update',
                element: <UpdateBeneficiary />,
            },
            {
                path: '/users/beneficiary/create',
                element: <CreateBeneficiary />,
            },
            {
                path: '/users/volunteer',
                element: <Volunteer />,
            },
            
            {
                path: '/users/beneficiary/create',
                element: <CreateBeneficiary />,
            },
            {
                path: '/users/volunteer/create',
                element: <CreateVolunteer />,
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