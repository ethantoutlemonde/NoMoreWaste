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
import DetailVolunteer from './Views/users/DetailVolunteer';
import UpdateVolunteer from './Views/users/UpdateVolunteer';
import Outreach from './Views/food_aid/outreach/Outreach';
import PartnerSupermarket from './Views/food_aid/partner_supermarket/PartnerSupermarker';
import AddSupermarket from './Views/food_aid/partner_supermarket/AddSupermarket';
import FoodCollectionsLayout from './components/FoodCollectionsLayout';
import FoodCollections from './Views/food_aid/food_collections/FoodCollections';
import NewFoodCollection from './Views/food_aid/food_collections/NewFoodCollection';
// import Product from './Views/stock/Product';
// import Warehouse from './Views/stock/Warehouse';
// import ProductType from './Views/stock/ProductType';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/users/admin' />,
            },

            // -------------- USER MANAGEMENT -------------- //

            // Admin
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


            // Beneficiary

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


            // Volunteer
            
            {
                path: '/users/volunteer',
                element: <Volunteer />,
            },
            {
                path: '/users/volunteer/:id',
                element: <DetailVolunteer />,
            },
            {
                path: '/users/volunteer/:id/update',
                element: <UpdateVolunteer />,
            },
            {
                path: '/users/volunteer/create',
                element: <CreateVolunteer />,
            },



            // ---------------- FOOD AID ------------------- //

            // Food Collections
            {
                path: '/food_aid',
                element: <Navigate to='/food_aid/food_collections'/>
            },

            {
                path: '/food_aid/food_collections',
                element: <FoodCollectionsLayout />,
                children: [
                    {
                        path: '/food_aid/food_collections',
                        element: <Navigate to='/food_aid/food_collections/index'/>
                    },
                    {
                        path: '/food_aid/food_collections/index',
                        element: <FoodCollections />,
                    },
                    {
                        path: '/food_aid/food_collections/new',
                        element: <NewFoodCollection />
                    }
                ]
            },


            // Outreach

            {
                path: '/food_aid/outreach',
                element: <Outreach />,
            },


            // Partner Supermarket

            {
                path: '/food_aid/partner_supermarket',
                element: <PartnerSupermarket />
            },
            {
                path: '/food_aid/partner_supermarket/add',
                element: <AddSupermarket />
            },


            // DASHBOARD

            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            // {
            //     path: '/stock',
            //     element: <Stock />,
            // },


            // Stock
            // {
            //     path: '/stock/Product',
            //     element: <Product/>,
            // },
            // {
            //     path: '/stock/Warehouse',
            //     element: <Warehouse />,
            // },
            // {
            //     path: '/stock/ProductType',
            //     element: <ProductType />,
            // },
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