import { useAuth } from "../hooks/auth";
import { Link, Navigate, NavLink } from 'react-router-dom';
import '../css/header.css';
import nomorewastePng from '../assets/img/nomorewastePng.png';
import { useTranslation } from 'react-i18next';


export default function VolunteerLayout() {
    const { user } = useAuth({ middleware: 'auth' })
    const { t } = useTranslation("global");
    if(!user) {
        return <Navigate to='/home' />
    }

    if(user.type === 2) {
        console.log('Beneficiary');
        return <Navigate to='/beneficiary' />
    }






    return (
        <>
            <div className="flex gap-4">
                <NavLink to={'/volunteer/documents'} className={({ isActive }) => 
                        isActive 
                        ? ' p-2 rounded-lg bg-gray-50 hover:shadow' 
                        : 'bg-white p-2 rounded-lg hover:bg-gray-50 hover:shadow'
                    } >{t("Documents")}
                </NavLink>
                <NavLink to={'/volunteer/foodAid'} className={({ isActive }) => 
                        isActive 
                        ? ' p-2 rounded-lg bg-gray-50 hover:shadow' 
                        : 'bg-white p-2 rounded-lg hover:bg-gray-50 hover:shadow'
                    } >{t("Food Aid")}
                </NavLink>
            </div>
            
        </>
    )
}