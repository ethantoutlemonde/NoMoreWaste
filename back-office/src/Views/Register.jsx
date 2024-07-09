import { Link } from "react-router-dom";

export default function Register() {

    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log('Login');
    }
    return (
        <div className="flex justify-center items-center h-screen bg-slate-700">
        <form onSubmit={onSubmit} className="flex flex-col gap-6 bg-slate-800 p-12 text-white rounded-xl shadow-2xl shadow-white">
            <h1 className="text-4xl">LogIn to the BO</h1>
            <input className="bg-slate-700 p-2 rounded focus:bg-slate-600" type="email" placeholder="Email" />
            <input className="bg-slate-700 p-2 rounded focus:bg-slate-600" type="password" placeholder="Password" />
            <button className="bg-blue-600 p-2 rounded hover:bg-blue-500" type="submit">Login</button>
            <p>Already Register ? <Link className="hover:underline text-blue-300" to={'/login'}>Sign in</Link></p>
        </form>
        
    </div>
    )
}
