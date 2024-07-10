import { Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from 'react-router-dom';
import { useAuth } from "../hooks/auth";

export default function GuestLayout() {
    // const {user} = useStateContext();

    // if(user) {
    //     return <Navigate to='/' />
    // }

    const { user } = useAuth({ middleware: 'auth' })
    console.log('user :',user);

    if(user) {
        return <Navigate to='/dashboard' />
    }
    return (
        <div className="flex justify-center items-center h-screen bg-slate-700">
            <Outlet />
        </div>
    )
}
