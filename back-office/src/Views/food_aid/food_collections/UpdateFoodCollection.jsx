import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axiosClient from "../../../axios-client"


export default function UpdateFoodCollection() {
    const { id } = useParams();
    const [data, setData] = useState({
        date: '',
        start_time: '',
    })
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState({});

    useEffect(() => {
        axiosClient.get(`/api/foodCollection/${id}`)
        .then(response => {
            console.log(response.data);
            setData(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setErrors(error.response.data);
        });
    }, [id]);

    const submit = (e) => {
        e.preventDefault();
        setErrors({});
        console.log(data);
        axiosClient.put(`/api/foodCollection/${id}`, data)
        .then(response => {
            console.log(response.data);
            setSuccess(response.data)
        })
        .catch(error => {
            console.error(error);
            setErrors(error.response.data.error);
        });
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    return (
        <>
        <div className="mt-4">
            <Link className="bg-white rounded py-1 px-2 hover:bg-slate-50 border-gray-100 border " to={'./..'}>Return</Link>
            <form className="flex flex-col w-96 bg-white p-10 rounded-lg mt-4 m-auto shadow" onSubmit={submit}>
            <h1 className="text-2xl mb-4">Update Food Collection</h1>
            <label htmlFor="start_time" className="mb-2">Time</label>
            <input type="time" name="start_time" className="mb-2 bg-slate-50 p-2 rounded" value={data.start_time} onChange={handleChange}/>
            {errors.start_time && <p className="text-red-500">{errors.start_time}</p>}
            <label htmlFor="date" className="mb-2 mt-2">Date</label>
            <input type="date" name="date" className="mb-2 bg-slate-50 p-2 rounded" value={data.date} onChange={handleChange}/>
            {errors.date && <p className="text-red-500">{errors.date}</p>}
            <button className='rounded bg-blue-600 text-white p-1 hover:bg-blue-500 mt-4' type="submit">Update</button>
            {success.success && <p className="text-green-500">{success.success}</p>}
            {errors.after && <p className="text-red-500">{errors.after}</p>}
        </form>
        </div>
        </>
    )
}