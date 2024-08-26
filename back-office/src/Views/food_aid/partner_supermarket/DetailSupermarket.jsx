import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import CircularProgress from '@mui/material/CircularProgress';
import SupermarketConv from "../../../components/SupermarketConv";
import { useTranslation } from "react-i18next";

export default function DetailSupermarket({ content }) {
    const { id } = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true)
    const [loadingBan, setLoadingBan] = useState(false)
    const chatDiv = useRef(null);
    const { t } = useTranslation("global");

    const navigate = useNavigate()

    useEffect(() => {
        
        axiosClient.get(`/api/supermarketAdmin/${id}`)
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
        axiosClient.delete(`/api/supermarketAdmin/${id}`)
        .then(() => {
            navigate('./..')
        })
    }

    const onBanned = (bool) => {
        setLoadingBan(true)
        console.log('ban', id)
        axiosClient.patch(`/api/supermarketAdmin/${id}/ban`, {banned: bool})
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
        <div className='mt-4 grid grid-cols-3 gap-6'>

        
        {loading ? <CircularProgress />
            :
            <>
            <div className="flex flex-col bg-slate-50 p-10 rounded-xl col-span-1 row-span-1">
                <h1 className='text-2xl font-semibold'>{t("Detail :")}</h1>
                <div className='flex justify-between mb-2'>
                    <Link className='text-2xl hover:text-gray-700' to={'update'}><HiOutlinePencilSquare /></Link>
                    <button className='text-2xl text-red-500 hover:text-red-400' onClick={onDelete}><HiOutlineTrash /></button>
                </div>
                
                <h2 className='text-lg font-semibold'>{t("Name")}</h2>
                <p className='mb-4'>{data?.name}</p>
                <h2 className='text-lg font-semibold'>{t("Owner")}</h2>
                <Link to={`/users/partner/${data?.user.id}`} className='mb-4 text-blue-800 hover:underline'>{data?.user?.first_name} {data?.user?.last_name}</Link>
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
                
                
                <div className='flex'>
                    {data?.banned ?  <button className='bg-green-500 rounded-md py-1 px-2 text-white w-fit' onClick={() => onBanned(false)}>{t("Unban")}</button> : <button className='bg-red-500 rounded-md py-1 px-2 text-white w-fit' onClick={() => onBanned(true)}>{t("Ban")}</button>}
                    {loadingBan && <CircularProgress />}
                </div>
            </div>
            <div className="flex flex-col   bg-slate-50 p-10 rounded-xl col-span-2 row-span-1">
                <SupermarketConv supermarket_id={id} />
            </div>
            </>
        }
            
        </div>
        </>
    )
}