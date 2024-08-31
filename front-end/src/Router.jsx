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
            }
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
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])

export default router;