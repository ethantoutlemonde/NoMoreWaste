import { Outlet } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from "../hooks/auth";

export default function DefaultLayout() {
    const { user } = useAuth({ middleware: 'auth' })
    const { logout } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/login'
    })

    if(!user) {
        return <Navigate to='/login' />
    }

    const onLogout = (ev) => {
        ev.preventDefault();
        console.log('Logout');
        logout()

    }

    return (
        <div>
            <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-slate-900 shadow-xl text-gray-200 p-6"> 
                <h1 className="text-3xl mb-4 text-white">Back Office</h1>
                <nav className="flex flex-col gap-2">
                    <Link to='/'>
                        <div className="rounded px-4 py-2 hover:bg-slate-800 hover:text-white">
                            Home
                        </div>
                    </Link>
                    <Link to='/users'>
                        <div className="rounded px-4 py-2 hover:bg-slate-800 hover:text-white">
                        Users
                        </div>
                    </Link>
                    <Link to='/dashboard'>
                        <div className="rounded px-4 py-2 hover:bg-slate-800 hover:text-white">
                        Dashboard
                        </div>
                    </Link>
                    {/* <Link to='/logout'>
                        <div className="rounded px-4 py-2 hover:bg-slate-800 hover:text-white">
                        Logout
                        </div>
                    </Link> */}
                    
                    
                    
                    
                </nav>
            </aside>
            <header className="fixed left-0 right-0 top-0 h-20 ml-64 bg-gray-100 flex justify-between items-center p-4">
                <div>
                    <h1 className="text-3xl">Header</h1>
                </div>
                <div>
                    {user.name}
                    <button className="logout-btn" onClick={onLogout}>Logout</button>
                </div>
                
            </header>
            <main className="ml-64 mt-20 p-6">
                <Outlet />
            </main>
            
        </div>
    )
}
