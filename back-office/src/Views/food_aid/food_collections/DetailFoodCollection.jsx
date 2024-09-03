import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";
import CircularProgress from '@mui/material/CircularProgress';
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { DataGrid } from "@mui/x-data-grid";
import FoodCollectionParticipants from "../../../components/FoodCollectionParticipants";
import { useTranslation } from 'react-i18next';
import GeneratePdfButton from "./GeneratedPdfButton";
import Map from "./Map";

export default function DetailFoodCollection() {
    const { id } = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [mapLoading, setMapLoading] = useState(false);
    const [formattedAddresses, setFormattedAddresses] = useState([]);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [showIframe, setShowIframe] = useState(false);
    const { t } = useTranslation("global");
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
            
    }
    , [id]);

    const fetchData = () => {
        axiosClient.get(`/api/foodCollection/${id}`)
            .then(response => {
                setData(response.data);
                setLoading(false);
                const addresses = response.data?.supermarkets.map(supermarket => {
                    const { address, city, postal_code, country } = supermarket;
                    return `${address}, ${postal_code}, ${city}, ${country}`;
                });
                setFormattedAddresses(addresses);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    };

    const onDelete = () => {
        axiosClient.delete(`/api/foodCollection/${id}`)
            .then(() => {
                navigate('./..');
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="mt-4">
            <Link className="bg-white rounded py-1 px-2 hover:bg-slate-50 border-gray-100 border " to={'./..'}>Return</Link>
            <div className="mt-2 grid grid-cols-2 gap-4">
            {loading ? <CircularProgress />
            :
            <>
            <div className="">
                <div className="flex mb-2">
                    <h1 className="text-xl mr-6 font-semibold">{t('Detail of the FoodCollection of the ')}{data?.date}</h1>
                    <div className="flex items-start gap-2">
                        <Link to={'update'} className='text-2xl hover:text-gray-700'><HiOutlinePencilSquare /></Link>
                        <button className='text-2xl text-red-500 hover:text-red-400' onClick={onDelete}><HiOutlineTrash /></button>
                    </div>
                    
                </div>
                
                <p>{t('Date :')}{data?.date}</p>
                <p>{t('Start Time :')} {data?.start_time}</p>
                <h2 className="text-lg mb-4 mt-4">{t('List of collected supermarkets : ')}</h2>
                <div className="flex flex-row flex-wrap gap-4">
                    {data?.supermarkets.map(supermarket => (
                        <Link to={`/food_aid/partner_supermarket/${supermarket.id}`} key={supermarket.id} className="bg-white w-fit p-4 rounded-lg shadow hover:shadow-md duration-100">
                            <p className="font-semibold">{supermarket.name}</p>
                            <p>{supermarket.address}</p>
                            <p>{supermarket.email}</p>
                            <p>{supermarket.phone}</p>
                            

                            
                        </Link>
                    ))}
                </div>
                
            </div>
            <div className="h-5/6">
                <FoodCollectionParticipants foodCollection={data} fetchData={fetchData}/>
                
            </div>
            <div className="col-span-2 h-1/2">
                <Map formattedAddresses={formattedAddresses}/>
            </div>
            </>
            }
            </div>
        </div>
    );
}
