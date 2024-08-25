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

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        
    },
    // {
    //     path: '/',
    //     element: <VolunteerLayout />,
    //     children: [
    //         {
    //             path: '/volunteer',
    //             element: <Home />   
    //         }
    //     ]
    // },
    // {
    //     path: '/',
    //     element: <BeneficiaryLayout />,
    //     children: [
    //         {
    //             path: '/beneficiary',
    //             element: <Home />   
    //         }
    //     ]
    // },

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
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])

export default router;