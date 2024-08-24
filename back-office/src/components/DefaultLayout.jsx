import { Outlet } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from "../hooks/auth";
import { HiChevronDown, HiChevronRight } from "react-icons/hi2";

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

    const dropdownHandler = (type) => {
        var element = document.getElementById(`${type}`);
        element.classList.toggle("hidden");
        var down = document.getElementById(`arrrow-down-${type}`);
        down.classList.toggle("hidden");
        var right = document.getElementById(`arrrow-right-${type}`);
        right.classList.toggle("hidden");
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
                    <button onClick={() => dropdownHandler('users')} className="rounded px-4 py-2 hover:bg-slate-800 hover:text-white text-left flex justify-between items-center">
                        <div className="">
                            Users
                        </div>
                        <HiChevronDown id="arrrow-down-users" className="items-center hidden"/>
                        <HiChevronRight id="arrrow-right-users" className="items-center"/>
                        
                    </button>
                    <div  id="users" className="hidden pl-4">
                        <Link to='/users/admin'>
                            <div className="rounded px-4 py-2 hover:bg-slate-800 hover:text-white">
                            Admins
                            </div>
                        </Link>
                        <Link to='/users/beneficiary'>
                            <div className="rounded px-4 py-2 hover:bg-slate-800 hover:text-white">
                            Beneficiary
                            </div>
                        </Link>
                        <Link to='/users/volunteer'>
                            <div className="rounded px-4 py-2 hover:bg-slate-800 hover:text-white">
                            Volunteer
                            </div>
                        </Link>
                    </div>
                    <button onClick={() => dropdownHandler('food_aid')} className="rounded px-4 py-2 hover:bg-slate-800 hover:text-white text-left flex justify-between items-center">
                        <div className="">
                            Food Aid
                        </div>
                        <HiChevronDown id="arrrow-down-food_aid" className="items-center hidden"/>
                        <HiChevronRight id="arrrow-right-food_aid" className="items-center"/>
                        
                    </button>
                    <div  id="food_aid" className="hidden pl-4">
                        <Link to='/food_aid/food_collections'>
                            <div className="rounded px-4 py-2 hover:bg-slate-800 hover:text-white">
                            Food Collections
                            </div>
                        </Link>
                        <Link to='/food_aid/outreach'>
                            <div className="rounded px-4 py-2 hover:bg-slate-800 hover:text-white">
                            Outreach
                            </div>
                        </Link>
                        <Link to='/food_aid/partner_supermarket'>
                            <div className="rounded px-4 py-2 hover:bg-slate-800 hover:text-white">
                            Partner Supermarkets
                            </div>
                        </Link>
                    </div>
                    
                    <Link to='/dashboard'>
                        <div className="rounded px-4 py-2 hover:bg-slate-800 hover:text-white">
                        Dashboard
                        </div>
                    </Link>

                    <button onClick={() => dropdownHandler('Stock')} className="rounded px-4 py-2 hover:bg-slate-800 hover:text-white text-left flex justify-between items-center">
                        <div className="">
                            Stock
                        </div>
                        <HiChevronDown id="arrrow-down-Stock" className="items-center hidden"/>
                        <HiChevronRight id="arrrow-right-Stock" className="items-center"/>
                        
                    </button>
                    <div  id="Stock" className="hidden pl-4">
                        <Link to='/stock/Product'>
                            <div className="rounded px-4 py-2 hover:bg-slate-800 hover:text-white">
                            Product
                            </div>
                        </Link>
                        <Link to='/stock/Warehouse'>
                            <div className="rounded px-4 py-2 hover:bg-slate-800 hover:text-white">
                            Warehouse
                            </div>
                        </Link>
                        <Link to='/stock/ProductType'>
                            <div className="rounded px-4 py-2 hover:bg-slate-800 hover:text-white">
                            Product Type
                            </div>
                        </Link>
                    </div>

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
                    <button onClick={() => dropdownHandler('login')} className="flex justify-between items-center hover:border-gray-500 p-2 rounded border border-gray-400">
                        <div className="mr-2">
                            {user.name}
                        </div>
                        <HiChevronDown id="arrrow-down-login" className="items-center hidden"/>
                        <HiChevronRight id="arrrow-right-login" className="items-center"/>
                        
                    </button>
                    
                    <div  id="login" className="hidden pl-4 absolute mt-2 bg-white p-3 rounded shadow flex flex-col gap-2">
                        <Link to={`/users/admin/${user.id}`} className="hover:underline">Profil</Link>
                        <button className="logout-btn hover:underline" onClick={onLogout}>Logout</button>
                    </div>
                    
                </div>
                
            </header>
            <main className="ml-64 mt-20 p-6">
                <Outlet />
            </main>
            
        </div>
    )
}
