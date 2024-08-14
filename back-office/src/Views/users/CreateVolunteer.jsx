import { useState } from "react"
import axiosClient from "../../axios-client"
import { Link } from 'react-router-dom';

export default function CreateVolunteer() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState({});

    const submit = (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess({});
        const volunteer = {
            name: name,
            email: email,
            password: password
        }

        axiosClient.post('/api/volunteer', volunteer)
        .then((response) => {
            // Reset le formulaire et les erreurs si la soumission réussit
            setName('');
            setEmail('');
            setPassword('');
            console.log(response)
            setSuccess(response.data)
        })
        .catch(error => {
            if (error.response && error.response.status === 400) {
                
                console.log(error)
                setErrors(error.response.data.error);
            }
        });

        console.log(volunteer)
    }
    return (
        <>
        <Link className="bg-slate-50 rounded py-1 px-2 hover:bg-slate-100 border-slate-100 border" to={'./..'}>Return</Link>
        <div className="flex flex-col justify-center items-center">
            
            <form onSubmit={submit} className="flex flex-col w-80 bg-slate-50 p-10 rounded-xl">
            <h1 className="text-2xl">Create Volunteer</h1>
                <label className="mt-2">Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="bg-slate-100 rounded p-1"/>
                {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
                <label className="mt-2">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-slate-100 rounded p-1"/>
                {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
                <label className="mt-2">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="bg-slate-100 rounded p-1"/>
                {errors.password && <p className="text-red-500">{errors.password[0]}</p>}
                <button type="submit" className='rounded bg-blue-600 text-white p-1 hover:bg-blue-500 mt-4'>Create</button>
                {success.success && <p className="text-green-500">{success.success}</p>}
            </form>
        </div>
        
        </>
    )
}