import { useAuth } from "../hooks/auth";
import { Link, Navigate, Outlet } from 'react-router-dom';
// import '../css/home.css';
import '../css/header.css';
import homePageImg from '../assets/img/homepage.png';
import DevenezBenevoleImg from '../assets/img/DevenezBenevoleImg.png';
import nomoreWasteHomepageImg from '../assets/img/nomorewasteHomepage.png';
import nomorewastePng from '../assets/img/nomorewastePng.png';

export default function GuestLayout() {
    const { user } = useAuth({ middleware: 'auth' })
    console.log('user :',user);

    if(user) {
        return <Navigate to='/' />
    }

    return(
        <>
        <header className="fixed top-0 w-full h-24 bg-white shadow flex items-center">
            <div className="header_container w-full">
                <Link to={"/home"}>
                    <img src={nomorewastePng} className="h-12" alt="" />
                </Link>
                
                <div>
                    Actions
                </div>
                <div>
                    <Link to={"/connexion"} className='rounded-lg bg-blue-600 text-white p-2 shadow hover:shadow-lg hover:bg-blue-700 duration-100'>
                        Connexion / Inscription
                    </Link>
                </div>
            </div>
            
        </header>
        <main className="mt-24 ">
            <Outlet />
        </main>
        
        </>
    )
}