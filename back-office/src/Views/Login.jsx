import axios from "axios";
import axiosClient from "../axios-client";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../hooks/auth'
import { useTranslation } from "react-i18next";
import logo from '../assets/img/nomorewastePng1.png'

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const {t} = useTranslation("global");

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/users/admin'
    })

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        login( {email, password ,setErrors, setStatus})
        console.log('errors :',errors);
        // recover the errors from login and put them in the state
        passwordRef.current.value = '';
        
    }
    return (
        
            <form onSubmit={onSubmit} className="w-96 flex flex-col gap-6 bg-slate-800 p-12 text-white rounded-xl shadow-xl">
                <img src={logo} alt="" className='h-14'/>
                <h1 className="text-4xl text-center">{t("Login to the BO")}</h1>
                <input ref={emailRef} className="bg-slate-700 p-2 rounded focus:bg-slate-600" type="email" placeholder={t("Email")} />
                <input ref={passwordRef} className="bg-slate-700 p-2 rounded focus:bg-slate-600" type="password" placeholder={t("Password")} />
                {errors.length > 0 && <div className="bg-red-600 bg-opacity-40 p-2 rounded">{errors.map((error, index) => <p key={index}>{error}</p>)}</div>}
                <button className="bg-blue-600 p-2 rounded hover:bg-blue-500" type="submit">{t("Login")}</button>
                {/* <p>Not Register ? <Link className="hover:underline text-blue-300" to={'/register'}>Create an account</Link></p> */}
            </form>
    )
}
