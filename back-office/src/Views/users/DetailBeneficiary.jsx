import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../axios-client';
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import CircularProgress from '@mui/material/CircularProgress';

export default function DetailBeneficiary() {
    const { id } = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        axiosClient.get(`/api/users/${id}`)
        .then(response => {
            console.log(response.data)
            setData(response.data)
            setLoading(false)
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
       <Link className="bg-slate-50 rounded py-1 px-2 hover:bg-slate-100 border-slate-100 border " to={'./..'}>Return</Link>
        <div className='mt-4'>

        
        {loading ? <CircularProgress />
            :
            
            <div className="flex flex-col w-80 bg-slate-50 p-10 rounded-xl">
                <div className='flex justify-between mb-2'>
                    <Link className='text-2xl hover:text-gray-700' to={'update'}><HiOutlinePencilSquare /></Link>
                    <button className='text-2xl text-red-500 hover:text-red-400' onClick={onDelete}><HiOutlineTrash /></button>
                </div>
                
                <h1 className='text-xl font-bold'>Detail :</h1>
                <h2 className='text-lg font-semibold'>Name</h2>
                <p className='mb-4'>{data?.name}</p>
                <h2 className='text-lg font-semibold'>Email</h2>
                <p className='mb-4'>{data?.email}</p>
            </div>
        }
        </div>
        </>
    )
}