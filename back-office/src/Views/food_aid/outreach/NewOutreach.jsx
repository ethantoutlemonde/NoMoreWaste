import { useState } from "react"
import axiosClient from "../../../axios-client";

export default function NewOutreach() {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState({});

    const submit = (e) => {
        e.preventDefault()
        setErrors({});
        setSuccess({});
        const outreach = {
            date: date,
            start_time: time
        }

        axiosClient.post('/api/outreach',outreach)
        .then((response) => {
            setSuccess(response.data)
            setDate('')
            setTime('')
        })
        .catch((error) => {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.error)
            }
            
        })
    }

    return(
        <>
        <form className="flex flex-col w-96 bg-white p-10 rounded-lg mt-4 m-auto shadow" onSubmit={submit}>
            <h1 className="text-2xl mb-4">Create a new Outreach</h1>
            <label htmlFor="start_time" className="mb-2">Time</label>
            <input type="time" name="start_time" className="mb-2 bg-slate-50 p-2 rounded" value={time} onChange={e => setTime(e.target.value)}/>
            {errors.start_time && <p className="text-red-500">{errors.start_time}</p>}
            <label htmlFor="date" className="mb-2 mt-2">Date</label>
            <input type="date" name="date" className="mb-2 bg-slate-50 p-2 rounded" value={date} onChange={e => setDate(e.target.value)}/>
            {errors.date && <p className="text-red-500">{errors.date}</p>}
            <button className='rounded bg-blue-600 text-white p-1 hover:bg-blue-500 mt-4' type="submit">Create</button>
            {success.success && <p className="text-green-500">{success.success}</p>}
            {errors.after && <p className="text-red-500">{errors.after}</p>}
        </form>
        
        </>
    )
}