import { useState } from "react"
import axiosClient from "../../axios-client"
import { Link } from 'react-router-dom';

export default function CreatePartner() {
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState({});
    const [data, setData] = useState({})

    const submit = (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess({});

        axiosClient.post('/api/partnerAdmin', data)
        .then((response) => {
            // Reset le formulaire et les erreurs si la soumission réussit
            setData({});
            console.log(response)
            setSuccess(response.data)
        })
        .catch(error => {
            if (error.response && error.response.status === 400) {
                
                console.log(error)
                setErrors(error.response.data.error);
            }
        });

        console.log(partner)
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };
    return (
        <>
        <Link className="bg-slate-50 rounded py-1 px-2 hover:bg-slate-100 border-slate-100 border" to={'./..'}>Return</Link>
        <div className="flex flex-col justify-center items-center">
            
            <form onSubmit={submit} className="flex flex-col w-80 bg-slate-50 p-10 rounded-xl">
                <h1 className="text-2xl">Create Partner</h1>
                <label className="mt-2">First Name</label>
                <input name="first_name" type="text" value={data.first_name} onChange={handleChange} className="bg-slate-100 rounded p-1"/>
                {errors.first_name && <p className="text-red-500">{errors.first_name[0]}</p>}
                <label className="mt-2">Last Name</label>
                <input name="last_name" type="text" value={data.last_name} onChange={handleChange} className="bg-slate-100 rounded p-1"/>
                {errors.last_name && <p className="text-red-500">{errors.last_name[0]}</p>}
                <label className="mt-2">Phone</label>
                <input name="phone" type="text" value={data.phone} onChange={handleChange} className="bg-slate-100 rounded p-1"/>
                {errors.phone && <p className="text-red-500">{errors.phone[0]}</p>}
                <label className="mt-2">Email</label>
                <input name="email" type="email" value={data.email} onChange={handleChange} className="bg-slate-100 rounded p-1"/>
                {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
                <label className="mt-2">Password</label>
                <input name="password" type="password" value={data.password} onChange={handleChange} className="bg-slate-100 rounded p-1"/>
                {errors.password && <p className="text-red-500">{errors.password[0]}</p>}
                <button type="submit" className='rounded bg-blue-600 text-white p-1 hover:bg-blue-500 mt-4'>Create</button>
                {success.success && <p className="text-green-500">{success.success}</p>}
            </form>
        </div>
        
        </>
    )
}