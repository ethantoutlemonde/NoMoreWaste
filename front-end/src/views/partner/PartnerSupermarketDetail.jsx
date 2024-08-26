import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../axios-client';
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import CircularProgress from '@mui/material/CircularProgress';
import SupermarketConv from "../../components/SupermarketConv";


export default function PartnerSupermarketDetail({ content }) {
    const { id } = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true)
    const [loadingBan, setLoadingBan] = useState(false)
    const chatDiv = useRef(null);

    const navigate = useNavigate()

    useEffect(() => {
        
        axiosClient.get(`/api/supermarket/${id}`)
        .then(response => {
            console.log(response.data)
            setData(response.data)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
        })

        console.log(data)

        if (chatDiv.current) {
            
            const div = chatDiv.current;
            console.log('scroll',div.scrollHeight)
            div.scrollTop = div.scrollHeight;
        }
    }, [content])

    const onDelete = () => {
        console.log('delete', id)
        axiosClient.delete(`/api/supermarket/${id}`)
        .then(() => {
            navigate('./..')
        })
    }


    return (
        <div className='container-80'>
        <Link className="bg-slate-50 rounded py-1 px-2 hover:bg-slate-100 border-slate-100 border " to={'./..'}>Return</Link>
        <div className='mt-4 grid grid-cols-3 gap-6'>

        
        {loading ? <CircularProgress />
            :
            <>
            <div className="flex flex-col bg-slate-50 p-10 rounded-xl col-span-1">
                <h1 className='text-2xl font-semibold'>Detail :</h1>
                <div className='flex justify-between mb-2'>
                    <Link className='text-2xl hover:text-gray-700' to={'update'}><HiOutlinePencilSquare /></Link>
                    <button className='text-2xl text-red-500 hover:text-red-400' onClick={onDelete}><HiOutlineTrash /></button>
                </div>
                
                <h2 className='text-lg font-semibold'>Name</h2>
                <p className='mb-4'>{data?.name}</p>
                <h2 className='text-lg font-semibold'>Address</h2>
                <p className='mb-4'>{data?.address}</p>
                <h2 className='text-lg font-semibold'>City</h2>
                <p className='mb-4'>{data?.city}</p>
                <h2 className='text-lg font-semibold'>Postal Code</h2>
                <p className='mb-4'>{data?.postal_code}</p>
                <h2 className='text-lg font-semibold'>Country</h2>
                <p className='mb-4'>{data?.country}</p>
                <h2 className='text-lg font-semibold'>SIRET Number</h2>
                <p className='mb-4'>{data?.siret}</p>
                <h2 className='text-lg font-semibold'>Email</h2>
                <p className='mb-4'>{data?.email}</p>
                <h2 className='text-lg font-semibold'>Phone</h2>
                <p className='mb-4'>{data?.phone}</p>
            </div>
            <div className="flex flex-col   bg-slate-50 p-10 rounded-xl col-span-2">
                <SupermarketConv supermarket_id={id} />
            </div>
            </>
        }
            
        </div>
        </div>
    )
}