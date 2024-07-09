import axios from "axios";
import axiosClient from "../axios-client";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        axiosClient.post('/login', payload)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.error(err);
        })
    }
    return (
        
            <form onSubmit={onSubmit} className="flex flex-col gap-6 bg-slate-800 p-12 text-white rounded-xl shadow-xl">
                <h1 className="text-4xl">Login to the BO</h1>
                <input ref={emailRef} className="bg-slate-700 p-2 rounded focus:bg-slate-600" type="email" placeholder="Email" />
                <input ref={passwordRef} className="bg-slate-700 p-2 rounded focus:bg-slate-600" type="password" placeholder="Password" />
                <button className="bg-blue-600 p-2 rounded hover:bg-blue-500" type="submit">Login</button>
                {/* <p>Not Register ? <Link className="hover:underline text-blue-300" to={'/register'}>Create an account</Link></p> */}
            </form>
    )
}
