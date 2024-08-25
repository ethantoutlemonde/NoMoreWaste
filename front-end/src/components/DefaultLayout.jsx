import { useAuth } from "../hooks/auth";
import { Link, Navigate, Outlet } from 'react-router-dom';
// import '../css/home.css';
import '../css/header.css';
import homePageImg from '../assets/img/homepage.png';
import DevenezBenevoleImg from '../assets/img/DevenezBenevoleImg.png';
import nomoreWasteHomepageImg from '../assets/img/nomorewasteHomepage.png';
import nomorewastePng from '../assets/img/nomorewastePng.png';


export default function DefaultLayout() {
    const { user } = useAuth({ middleware: 'auth' })
    if(!user) {
        return <Navigate to='/home' />
    }

    const { logout } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/login'
    })


    const onLogout = (ev) => {
        ev.preventDefault();
        console.log('Logout');
        logout()

    }

    return (
        <>
        <header className="fixed top-0 w-full h-24 bg-white shadow flex items-center">
            <div className="header_container w-full">
                <Link to={"/home"}>
                    <img src={nomorewastePng} className="h-12" alt="" />
                </Link>
                
                <div>
                    Actions
                </div>
                <button onClick={onLogout}>Logout</button>
                <div>
                    {user?.name}
                </div>
            </div>
            
        </header>
        <main className="mt-24 ">
            <Outlet />
        </main>
        </>
    )
}