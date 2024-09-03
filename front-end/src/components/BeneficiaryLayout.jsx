import { useAuth } from "../hooks/auth";
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import '../css/header.css';
import nomorewastePng from '../assets/img/nomorewastePng.png';
import { useTranslation } from 'react-i18next';

export default function BeneficiaryLayout() {
    const { user } = useAuth({ middleware: 'auth' })
    const { t, } = useTranslation("global");
    
    if(!user) {
        return <Navigate to='/home' />
    }

    if(user.type === 3) {
        console.log('Volunteer');
        return <Navigate to='/volunteer' />
    }

    return (
        <>
            <div>
                <NavLink to={'beneficiary/activities'} className={({ isActive }) => 
                        isActive 
                        ? ' p-2 rounded-lg bg-gray-50 hover:shadow' 
                        : 'bg-white p-2 rounded hover:bg-gray-50 hover:shadow'
                    } >{t("Activities")}</NavLink>
            </div>
            
        </>
    )
}