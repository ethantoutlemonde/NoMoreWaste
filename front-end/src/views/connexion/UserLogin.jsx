import { useRef, useState } from "react";
import { useAuth } from "../../hooks/auth";
import { useTranslation } from "react-i18next";

export default function UserLogin() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard'
    })
    const {t} = useTranslation('global')



    const handleSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        login( {email, password ,setErrors, setStatus})
        console.log('errors :',errors);
        // recover the errors from login and put them in the state
        passwordRef.current.value = '';
    }
    return (
        <div className="container-80 flex justify-center">
            <div className="bg-gray-50 w-96 p-14 rounded-2xl mt-14 shadow-md">
                <h1 className="text-2xl font-semibold">{t("Login")}</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                    <input type="email" ref={emailRef} className="p-2 rounded-lg border shadow" placeholder="Email" />
                    <input type="password" ref={passwordRef} className="p-2 rounded-lg border shadow" placeholder="Password" />
                    {errors.length > 0 && <div className="bg-red-300 border-2 border-red-400  bg-opacity-80 p-2 rounded-md">{errors.map((error, index) => <p key={index}>{error}</p>)}</div>}
                    <button className="bg-blue-400 text-white p-2 rounded-lg border shadow hover:bg-blue-500 hover:shadow-md duration-100">
                        {t("Login")}
                    </button>
                </form>

            </div>
        </div>
    )
}