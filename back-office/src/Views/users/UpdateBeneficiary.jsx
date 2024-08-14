import { useState, useEffect } from "react"
import axiosClient from "../../axios-client"
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function UpdateBeneficiary() {
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [success, setSuccess] = useState({});
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get(`/api/users/${id}`)
        .then(response => {
            console.log(response.data)
            setData(response.data)
        })
        .catch(error => {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.error);
            }
        })

        
    }, [])

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const submit = (e) => {
        e.preventDefault()
        setErrors({});
        console.log('submit')
        console.log(data)

        axiosClient.patch(`/api/beneficiary/${id}`, data)
        .then((response) => {
            console.log(response)
            setData((prevData) => ({
                ...prevData,
                password: ''
            }));
            setSuccess(response.data)
            navigate('./..')
        })
        .catch((error) => {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.error);
            }
        })

    }
    return (
        <>
        <Link className="bg-slate-50 rounded py-1 px-2 hover:bg-slate-100 border-slate-100 border" to={'./..'}>Return</Link>
        <div className="flex flex-col justify-center items-center">
            <form onSubmit={submit} className="flex flex-col w-80 bg-slate-50 p-10 rounded-xl">
                <h1 className="text-2xl">Update Admin</h1>
                <label className="mt-2">Name</label>
                <input name="name" type="text" value={data.name} onChange={handleChange} className="bg-slate-100 rounded p-1"/>
                {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
                <label className="mt-2">Email</label>
                <input name="email" type="email" value={data.email} onChange={handleChange} className="bg-slate-100 rounded p-1"/>
                {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
                <label className="mt-2">Password</label>
                <input name="password" type="password" value={data.password} onChange={handleChange} className="bg-slate-100 rounded p-1"/>
                {errors.password && <p className="text-red-500">{errors.password[0]}</p>}
                <button type="submit" className='rounded bg-blue-600 text-white p-1 hover:bg-blue-500 mt-4'>Update</button>
                {success.success && <p className="text-green-500">{success.success}</p>}
            </form>
        </div>
        </>
    )
}