import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../axios-client';
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import CircularProgress from '@mui/material/CircularProgress';
import SupermarketConv from "../../components/SupermarketConv";
import { useTranslation } from "react-i18next";
import AddSupermarketDisponibility from '../../components/AddSupermarketDisponibility';
import SupermarketDisponibilityCalendar from '../../components/SupermarketDisponibilityCalendar';

export default function PartnerSupermarketDetail({ content }) {
    const { id } = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true)
    const [loadingBan, setLoadingBan] = useState(false)
    const chatDiv = useRef(null);
    const [disponibilities, setDisponibilities] = useState([]);
    const { t } = useTranslation("global");

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
        fetchDisponibilities();
    }, [content])

    const fetchDisponibilities = () => {
        axiosClient.get(`/api/supermarket/${id}/disponibilities`)
            .then(response => {
                setDisponibilities(response.data);
            })
            .catch(error => {
                console.error("Error fetching disponibilites:", error);
            });
    };

    const onDelete = () => {
        console.log('delete', id)
        axiosClient.delete(`/api/supermarket/${id}`)
        .then(() => {
            navigate('./..')
        })
    }

    const handleAddDisponibility = (newDisponibility) => {
        // Ajoute la nouvelle disponibilité à la liste existante
        setDisponibilities(prevDisponibilities => [...prevDisponibilities, newDisponibility]);
    };


    return (
        <div className='container-80'>
            <Link className="bg-slate-50 rounded py-1 px-2 hover:bg-slate-100 border-slate-100 border " to={'./..'}>Return</Link>
            <div className='mt-4 flex flex-col md:grid md:grid-cols-3 gap-6'>

            
            {loading ? <CircularProgress />
                :
                <>
                <div className="flex flex-col bg-slate-50 p-10 rounded-xl col-span-1">
                    <h1 className='text-2xl font-semibold'>{t("Detail :")}</h1>
                    <div className='flex justify-between mb-2'>
                        <Link className='text-2xl hover:text-gray-700' to={'update'}><HiOutlinePencilSquare /></Link>
                        <button className='text-2xl text-red-500 hover:text-red-400' onClick={onDelete}><HiOutlineTrash /></button>
                    </div>
                    
                    <h2 className='text-lg font-semibold'>{t("Name")}</h2>
                    <p className='mb-4'>{data?.name}</p>
                    <h2 className='text-lg font-semibold'>{t("Address")}</h2>
                    <p className='mb-4'>{data?.address}</p>
                    <h2 className='text-lg font-semibold'>{t("City")}</h2>
                    <p className='mb-4'>{data?.city}</p>
                    <h2 className='text-lg font-semibold'>{t("Postal Code")}</h2>
                    <p className='mb-4'>{data?.postal_code}</p>
                    <h2 className='text-lg font-semibold'>{t("Country")}</h2>
                    <p className='mb-4'>{data?.country}</p>
                    <h2 className='text-lg font-semibold'>{t("SIRET Number")}</h2>
                    <p className='mb-4'>{data?.siret}</p>
                    <h2 className='text-lg font-semibold'>{t("Email")}</h2>
                    <p className='mb-4'>{data?.email}</p>
                    <h2 className='text-lg font-semibold'>{t("Phone")}</h2>
                    <p className='mb-4'>{data?.phone}</p>
                </div>
                <div className="flex flex-col bg-slate-50 p-10 rounded-xl col-span-1 md:col-span-2">
                    <SupermarketConv supermarket_id={id} />
                </div>
                <div className="col-span-3 grid grid-cols-1 mb-6 md:grid-cols-2 gap-6">
                    <div className='flex flex-col bg-slate-50 p-10 rounded-xl'>
                        <AddSupermarketDisponibility supermarket_id={id} onAddDisponibility={handleAddDisponibility}  />
                    </div>
                    <div className='flex flex-col bg-slate-50 p-10 rounded-xl'>
                        <h1 className='text-2xl font-semibold mb-4'>{t("Disponibilities")}</h1>
                        <SupermarketDisponibilityCalendar supermarket_id={id} disponibilities={disponibilities} fetchDisponibilities={fetchDisponibilities}/>
                    </div>
                    
                </div>
                </>
            }
                
            </div>
        </div>
    )
}