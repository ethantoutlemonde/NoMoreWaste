import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../axios-client';
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import CircularProgress from '@mui/material/CircularProgress';

export default function DetailVolunteer() {
    const { id } = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true)
    const [loadingBan, setLoadingBan] = useState(false)

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

    const onBanned = (bool) => {
        setLoadingBan(true)
        console.log('ban', id)
        axiosClient.patch(`/api/users/${id}`, {banned: bool})
        .then(() => {
            setData(prevData => ({
                ...prevData,
                banned: bool
            }));
            setLoadingBan(false)
        }
        )
    }


    return (
        <>
        <Link className="bg-slate-50 rounded py-1 px-2 hover:bg-slate-100 border-slate-100 border " to={'./..'}>Return</Link>
        <div className='mt-4 flex flex-row gap-6'>

        
        {loading ? <CircularProgress />
            :
            <>
            <div className="flex flex-col w-80 bg-slate-50 p-10 rounded-xl">
                
                
                <h1 className='text-2xl font-semibold mb-6'>Detail :</h1>
                <div className='flex justify-between mb-2'>
                    <Link className='text-2xl hover:text-gray-700' to={'update'}><HiOutlinePencilSquare /></Link>
                    <button className='text-2xl text-red-500 hover:text-red-400' onClick={onDelete}><HiOutlineTrash /></button>
                </div>
                <h2 className='text-lg font-semibold'>First Name</h2>
                <p className='mb-4'>{data?.first_name}</p>
                <h2 className='text-lg font-semibold'>Last Name</h2>
                <p className='mb-4'>{data?.last_name}</p>
                <h2 className='text-lg font-semibold'>Phone</h2>
                <p className='mb-4'>{data?.phone}</p>
                <h2 className='text-lg font-semibold'>Email</h2>
                <p className='mb-4'>{data?.email}</p>
                <div className='flex'>
                    {data?.banned ?  <button className='bg-green-500 rounded-md py-1 px-2 text-white w-fit' onClick={() => onBanned(false)}>Unban</button> : <button className='bg-red-500 rounded-md py-1 px-2 text-white w-fit' onClick={() => onBanned(true)}>Ban</button>}
                    {loadingBan && <CircularProgress />}
                </div>
            </div>
            <div className="flex flex-col w-80 bg-slate-50 p-10 rounded-xl">
                <h1 className='text-2xl font-semibold mb-6'>Documents :</h1>
            </div>
            </>
        }
        </div>
        </>
    )
}