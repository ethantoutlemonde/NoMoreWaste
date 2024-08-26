import {createBrowserRouter, Navigate} from 'react-router-dom';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout'
import NotFound from './views/NotFound';
import LoginLayout from './components/LoginLayout';
import Home from './views/Home';
import ConnexionChooser from './views/connexion/ConnexionChooser';
import LoginChooser from './views/connexion/LoginChooser';
import RegisterChooser from './views/connexion/RegisterChooser';
import UserLogin from './views/connexion/UserLogin';
import PartnerLogin from './views/connexion/PartnerLogin';
import VolunteerLayout from './components/VolunteerLayout';
import BeneficiaryLayout from './components/BeneficiaryLayout';
import RegisterVolunteer from './views/connexion/RegisterVolunteer';
import RegisterBeneficiary from './views/connexion/RegisterBeneficiary';
import VolunteerDocumentsLayout from './components/VolunteerDocumentsLayout';
import DocumentsFoodCollection from './views/volunteer/DocumentsFoodCollection';
import RegisterPartner from './views/connexion/RegisterPartner';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
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
                    }
                ]
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
                element: <LoginChooser />
            },
            {
                path: '/connexion/login/user',
                element: <UserLogin />
            },
            {
                path: '/connexion/login/partner',
                element: <PartnerLogin />
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