import { useState } from "react"
import axiosClient from "../../../axios-client";

export default function NewFoodCollection() {
    const [date, setDate] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState({});

    const submit = (e) => {
        e.preventDefault()
        const foodColection = {
            date: date
        }

        axiosClient.post('/api/foodAid',foodColection)
        .then((response) => {
            setSuccess(response.data)
        })
        .catch((error) => {
            setErrors(error.response.data.error)
        })
    }

    return(
        <>
        <form className="flex flex-col w-96 bg-white p-10 rounded-lg mt-4" onSubmit={submit}>
            <h1 className="text-2xl mb-4">Create a new Food Collection</h1>
            <input type="date" className="mb-2 bg-slate-50 p-2" value={date} onChange={e => setDate(e.target.value)}/>
            {errors.date && <p className="text-red-500">{errors.date[0]}</p>}
            <button className='rounded bg-blue-600 text-white p-1 hover:bg-blue-500 mt-4' type="submit">Create</button>
            {success.success && <p className="text-green-500">{success.success}</p>}
        </form>
        
        </>
    )
}