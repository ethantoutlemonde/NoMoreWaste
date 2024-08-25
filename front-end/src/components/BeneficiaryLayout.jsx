import { useAuth } from "../hooks/auth";
import { Link, Navigate, Outlet } from 'react-router-dom';
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
            
            <Link to={"/home"}>
                <img src={nomorewastePng} className="h-12" alt="" />
            </Link>
            
            <div>
                Actions beneficiary
            </div>
            
        </>
    )
}