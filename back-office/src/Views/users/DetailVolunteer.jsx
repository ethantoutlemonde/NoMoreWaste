import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../axios-client';
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";

export default function DetailVolunteer() {
    const { id } = useParams();
    const [data, setData] = useState();

    const navigate = useNavigate()

    useEffect(() => {
        axiosClient.get(`/api/users/${id}`)
        .then(response => {
            console.log(response.data)
            setData(response.data)
        })
        .catch(error => {
            console.log(error)
        })

        console.log(data)
    }, [])

    const onDelete = () => {
        console.log('delete', id)
        axiosClient.delete(`/api/users/${id}`)
        .then(() => {
            navigate('./..')
        })
    }


    return (
        <>
        <Link className="bg-slate-50 rounded py-1 px-2 hover:bg-slate-100 border-slate-100 border" to={'./..'}>Return</Link>
        <Link to={'update'}><HiOutlinePencilSquare /></Link>
        <button onClick={onDelete}><HiOutlineTrash /></button>
        <div className='flex flex-col'>
            <h2>Name</h2>
            <p>{data?.name}</p>
            <h2>Email</h2>
            <p>{data?.email}</p>
        </div>
        </>
    )
}