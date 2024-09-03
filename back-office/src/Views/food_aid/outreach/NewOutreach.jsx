import { useState } from "react"
import axiosClient from "../../../axios-client";

export default function NewOutreach() {
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState({});
    const [data, setData] = useState({});

    const submit = (e) => {
        e.preventDefault()
        setErrors({});
        setSuccess({});

        axiosClient.post('/api/outreach',data)
        .then((response) => {
            setSuccess(response.data)
            setData({});
        })
        .catch((error) => {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.error)
            }
            
        })
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    return(
        <>
        <form className="flex flex-col w-96 bg-white p-10 rounded-lg mt-4 m-auto shadow" onSubmit={submit}>
            <h1 className="text-2xl mb-4">Create a new Outreach</h1>
            <label htmlFor="start_time" className="mb-2">Time</label>
            <input type="time" name="start_time" className="mb-2 bg-slate-50 p-2 rounded" value={data.time} onChange={handleChange}/>
            {errors.start_time && <p className="text-red-500">{errors.start_time}</p>}
            <label htmlFor="date" className="mb-2 mt-2">Date</label>
            <input type="date" name="date" className="mb-2 bg-slate-50 p-2 rounded" value={data.date} onChange={handleChange}/>
            {errors.date && <p className="text-red-500">{errors.date}</p>}
            <label htmlFor="address" className="mb-2 mt-2">Address</label>
            <input type="text" name="address" className="mb-2 bg-slate-50 p-2 rounded" value={data.address} onChange={handleChange}/>
            {errors.address && <p className="text-red-500">{errors.address}</p>}
            <label htmlFor="city" className="mb-2 mt-2">City</label>
            <input type="text" name="city" className="mb-2 bg-slate-50 p-2 rounded" value={data.city} onChange={handleChange}/>
            {errors.city && <p className="text-red-500">{errors.city}</p>}
            <label htmlFor="country" className="mb-2 mt-2">Country</label>
            <input type="text" name="country" className="mb-2 bg-slate-50 p-2 rounded" value={data.country} onChange={handleChange}/>
            {errors.country && <p className="text-red-500">{errors.country}</p>}
            <label htmlFor="postal_code" className="mb-2 mt-2">Postal code</label>
            <input type="number" name="postal_code" className="mb-2 bg-slate-50 p-2 rounded" value={data.postal_code} onChange={handleChange}/>
            {errors.postal_code && <p className="text-red-500">{errors.postal_code}</p>}
            <button className='rounded bg-blue-600 text-white p-1 hover:bg-blue-500 mt-4' type="submit">Create</button>
            {success.success && <p className="text-green-500">{success.success}</p>}
            {errors.after && <p className="text-red-500">{errors.after}</p>}
        </form>
        
        </>
    )
}