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
import Product from './components/ProductLayout';
import Warehouse from './components/WarehouseLayout';
import WarehouseShow from './Views/stock/WarehouseShow';
import AddWarehouse from './Views/stock/AddWarehouse';
import ProductType from './components/ProductTypeLayout';
import AddProductType from './Views/stock/AddProductType';
import ShowProductType from './Views/stock/ShowProductType';
import ShowStock from './Views/stock/ShowStock';
import AddProduct from './Views/stock/AddProduct';
import SmartFridge from './components/SmartFridgeLayout';
import ShowSmartFridge from './Views/smart_fridge/ShowSmartFridge';
import AddSmartFridge from './Views/smart_fridge/AddSmartFridge';
import SmartFridgeRecipes from './Views/smart_fridge/SmartFridge';

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
            {
                path: '/stock/Product',
                element: <Product/>,
            },
            {
                path: '/stock/Product',
                element: <Product />,
                children: [
                    {
                        path: '/stock/Product',
                        element: <Navigate to='/stock/Product/show'/>
                    },
                    {
                        path: '/stock/Product/show',
                        element: <ShowStock/>
                    },
                    {
                        path: '/stock/Product/add',
                        element: <AddProduct/>
                    }
                ]
            },
            {
                path: '/stock/Warehouse',
                element: <Warehouse />,
                children: [
                    {
                        path: '/stock/Warehouse',
                        element: <Navigate to='/stock/Warehouse/show'/>
                    },
                    {
                        path: '/stock/Warehouse/show',
                        element: <WarehouseShow/>
                    },
                    {
                        path: '/stock/Warehouse/add',
                        element: <AddWarehouse/>
                    }
                ]
            },
            {
                path: '/stock/ProductType',
                element: <ProductType />,
                children: [
                    {
                        path: '/stock/ProductType',
                        element: <Navigate to='/stock/ProductType/show'/>
                    },
                    {
                        path: '/stock/ProductType/show',
                        element: <ShowProductType/>
                    },
                    {
                        path: '/stock/ProductType/add',
                        element: <AddProductType/>
                    }
                ]
            },

            //smartFridge
            {
                path: '/SmartFridge',
                element: <SmartFridge />,
                children: [
                    {
                        path: '/SmartFridge',
                        element: <Navigate to='/SmartFridge/recipes'/>
                    },
                    {
                        path: '/SmartFridge/show',
                        element: <ShowSmartFridge/>
                    },
                    {
                        path: '/SmartFridge/add',
                        element: <AddSmartFridge/>
                    },
                    {
                        path: '/SmartFridge/recipes',
                        element: <SmartFridgeRecipes/>
                    }
                ]
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