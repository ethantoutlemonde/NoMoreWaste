import {createBrowserRouter, Navigate} from 'react-router-dom';
import Login from './Views/Login';
import NotFound from './Views/NotFound';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
// import Users from './Views/users/Users';
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
import OutreachLayout from './components/OutreachLayout';
import PartnerSupermarket from './Views/food_aid/partner_supermarket/PartnerSupermarker';
import AddSupermarket from './Views/food_aid/partner_supermarket/AddSupermarket';
import FoodCollectionsLayout from './components/FoodCollectionsLayout';
import FoodCollections from './Views/food_aid/food_collections/FoodCollections';
import NewFoodCollection from './Views/food_aid/food_collections/NewFoodCollection';
// import Stock from './Views/stock/Stock';
import DetailFoodCollection from './Views/food_aid/food_collections/DetailFoodCollection';
import DetailSupermarket from './Views/food_aid/partner_supermarket/DetailSupermarket';
import UpdateSupermarket from './Views/food_aid/partner_supermarket/UpdateSupermarket';
import Partner from './Views/users/Partner';
import DetailPartner from './Views/users/DetailPartner';
import UpdatePartner from './Views/users/UpdatePartner';
import CreatePartner from './Views/users/CreatePartner';
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
import ShowRecipe from './Views/smart_fridge/ShowRecipe';
import MapPlan from './components/MapPlan';
import ShowActivityType from './Views/activity/ShowActivityType';
import AddActivityType from './Views/activity/AddActivityType';
import ShowActivity from './Views/activity/ShowActivity';
import AddActivity from './Views/activity/AddActivity';
import Activity from './components/ActivityLayout';
import ActivityType from './components/ActivityTypeLayout';
import UpdateFoodCollection from './Views/food_aid/food_collections/UpdateFoodCollection';
import Outreachs from './Views/food_aid/outreach/Outreachs';
import DetailOutreach from './Views/food_aid/outreach/DetailOutreach';
import NewOutreach from './Views/food_aid/outreach/NewOutreach';
import UpdateOutreach from './Views/food_aid/outreach/UpdateOutreach';
import DetailActivity from './Views/activity/DetailActivity';

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

            // Partner

            {
                path: '/users/partner',
                element: <Partner />,
            },
            {
                path: '/users/partner/:id',
                element: <DetailPartner />,
            },
            {
                path: '/users/partner/:id/update',
                element: <UpdatePartner />,
            },
            {
                path: '/users/partner/create',
                element: <CreatePartner />,
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
                    },
                    {
                        path: '/food_aid/food_collections/:id',
                        element: <DetailFoodCollection />
                    },
                    {
                        path: '/food_aid/food_collections/:id/update',
                        element: <UpdateFoodCollection />
                    },
                ]
            },


            // Outreach

            {
                path: '/food_aid/outreachs',
                element: <OutreachLayout />,
                children: [
                    {
                        path: '/food_aid/outreachs',
                        element: <Navigate to='/food_aid/outreachs/index'/>
                    },
                    {
                        path: '/food_aid/outreachs/index',
                        element: <Outreachs />
                    },
                    {
                        path: '/food_aid/outreachs/new',
                        element: <NewOutreach />
                    },
                    {
                        path: '/food_aid/outreachs/:id',
                        element: <DetailOutreach />
                    },
                    {
                        path: '/food_aid/outreachs/:id/update',
                        element: <UpdateOutreach />
                    }
                ]
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
            {
                path: '/food_aid/partner_supermarket/:id',
                element: <DetailSupermarket />
            },
            {
                path: '/food_aid/partner_supermarket/:id/update',
                element: <UpdateSupermarket />
            },



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
                    },
                    {
                        path: '/SmartFridge/recipes/:id',
                        element: <ShowRecipe/>
                    }
                ]
            },
            {
                path: '/MapPlan',
                element: <MapPlan/>,
            },
            {
                path: '/Activity/ActivityType',
                element: <ActivityType />,
                children: [
                    {
                        path: '/Activity/ActivityType',
                        element: <Navigate to='/Activity/ActivityType/show'/>
                    },
                    {
                        path: '/Activity/ActivityType/show',
                        element: <ShowActivityType/>
                    },
                    {
                        path: '/Activity/ActivityType/add',
                        element: <AddActivityType/>
                    }
                ]
            },
            {
                path: '/Activity',
                element: <Activity />,
                children: [
                    {
                        path: '/Activity',
                        element: <Navigate to='/Activity/show'/>
                    },
                    {
                        path: '/Activity/show',
                        element: <ShowActivity/>
                    },
                    {
                        path: '/Activity/:id',
                        element: <DetailActivity/>
                    },
                    {
                        path: '/Activity/add',
                        element: <AddActivity/>
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