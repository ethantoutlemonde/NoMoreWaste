import {createBrowserRouter, Navigate} from 'react-router-dom';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout'
import NotFound from './views/NotFound';
import Home from './views/Home';
import ConnexionChooser from './views/connexion/ConnexionChooser';
import RegisterChooser from './views/connexion/RegisterChooser';
import RegisterVolunteer from './views/connexion/RegisterVolunteer';
import RegisterBeneficiary from './views/connexion/RegisterBeneficiary';
import VolunteerDocumentsLayout from './components/VolunteerDocumentsLayout';
import DocumentsFoodCollection from './views/volunteer/documents/DocumentsFoodCollection';
import RegisterPartner from './views/connexion/RegisterPartner';
import Login from './views/connexion/Login';
import PartnerSupermarkets from './views/partner/PartnerSupermarkets';
import PartnerSupermarketDetail from './views/partner/PartnerSupermarketDetail';
import PartnerSupermarketAdd from './views/partner/PartnerSupermarketAdd';
import PartnerSupermarketUpdate from './views/partner/PartnerSupermarketUpdate';
import DocumentsOutreach from './views/volunteer/documents/DocumentsOutreach';
import ShowActivity from './views/volunteer/Activity/ShowActivity';
import AddActivity from './views/volunteer/Activity/AddActivity';
import ParticipateActivity from './views/volunteer/Activity/ParticipateActivity';
import FoodAidLayout from './components/FoodAidLayout';
import FoodCollection from './views/volunteer/food_aid/FoodCollection';
import Outreach from './views/volunteer/food_aid/Outreach';
import FoodCollectionDetail from './views/volunteer/food_aid/FoodCollectionDetail';
import Donation from './views/donation/Donation';
import Profil from './views/Profil';
import OutreachDetail from './views/volunteer/food_aid/OutreachDetail';
import DetailActivity from './views/volunteer/Activity/DetailActivity';
import Activities from './views/Beneficiary/Activities/Activities';
import BeneficiaryActivityLayout from './components/BeneficiaryActivityLayout';
import MyActivities from './views/Beneficiary/Activities/MyActivities';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/profil',
                element: <Profil/>
            },
            {
                path: '/volunteer',
            },
            {
                path: '/volunteer/documents',
                element: <VolunteerDocumentsLayout />,
                children: [
                    {
                        path: '/volunteer/documents/food_collection',
                        element: <DocumentsFoodCollection />
                    },
                    {
                        path: '/volunteer/documents/outreach',
                        element: <DocumentsOutreach />
                    }
                ]
            },
            {
                path: '/volunteer/foodAid',
                element: <FoodAidLayout />,
                children: [
                    {
                        path: '/volunteer/foodAid',
                        element: <Navigate to={'/volunteer/foodAid/food_collection'} />
                    },
                    {
                        path: '/volunteer/foodAid/food_collection',
                        element: <FoodCollection />
                    },
                    {
                        path: '/volunteer/foodAid/food_collection/:id',
                        element: <FoodCollectionDetail />
                    },
                    {
                        path: '/volunteer/foodAid/outreach',
                        element: <Outreach />
                    },
                    {
                        path: '/volunteer/foodAid/outreach/:id',
                        element: <OutreachDetail />
                    },
                ]
            },
            {
                path: '/partner',

            },
            {
                path: '/partner/supermarkets',
                element: <Navigate to={'/partner/supermarkets/show'} />
            },
            {
                path: '/partner/supermarkets/show',
                element: <PartnerSupermarkets />
            },
            {
                path: '/partner/supermarkets/:id',
                element: <PartnerSupermarketDetail />
            },
            {
                path: '/partner/supermarkets/:id/update',
                element: <PartnerSupermarketUpdate />
            },
            {
                path: '/partner/supermarkets/add',
                element: <PartnerSupermarketAdd />
            },
            {
                path: '/volunteer/Activity',
                element: <Navigate to='/volunteer/Activity/show'/>
            },
            {
                path: '/volunteer/Activity/show',
                element: <ShowActivity/>
            },
            {
                path: '/volunteer/Activity/add',
                element: <AddActivity/>
            },
            {
                path: '/volunteer/Activity/participate',
                element: <ParticipateActivity/>
            },
            {
                path: '/volunteer/Activity/:id',
                element: <DetailActivity/>
            },
            {
                path: '/beneficiary/activities',
                element: <BeneficiaryActivityLayout />,
                children: [
                    {
                        path: '/beneficiary/activities/all',
                        element: <Activities />
                    },
                    {
                        path: '/beneficiary/activities/myActivities',
                        element: <MyActivities />
                    }
                ]
            },
            {
                path: '/beneficiary',
                element: <Navigate to='/beneficiary/activities'/>
            },
            
                
            
        ]
        
    },

    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/home' />
            },
            {
                path: '/home',
                element: <Home />
            },

            {
                path: '/connexion',
                element: <ConnexionChooser />
            },
            {
                path: '/connexion/login',
                element: <Login />
            },
            {
                path: '/connexion/register',
                element: <RegisterChooser />
            },
            {
                path: '/connexion/register/volunteer',
                element: <RegisterVolunteer />
            },
            {
                path: '/connexion/register/beneficiary',
                element: <RegisterBeneficiary />
            },
            {
                path: '/connexion/register/partner',
                element: <RegisterPartner />
            },
            {
                path: '/donation',
                element: <Donation />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])

export default router;