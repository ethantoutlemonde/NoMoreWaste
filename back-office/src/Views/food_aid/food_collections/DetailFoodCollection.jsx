import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";
import CircularProgress from '@mui/material/CircularProgress';
import { HiOutlineTrash } from "react-icons/hi";
import { useTranslation } from 'react-i18next';
import GeneratePdfButton from "./GeneratedPdfButton";

export default function DetailFoodCollection() {
    const { id } = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [mapLoading, setMapLoading] = useState(false);
    const [formattedAddresses, setFormattedAddresses] = useState([]);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [showIframe, setShowIframe] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
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
    }, [id]);

    const onDelete = () => {
        axiosClient.delete(`/api/foodCollection/${id}`)
            .then(() => {
                navigate('./..');
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleSubmit = async () => {
        setMapLoading(true);
        setMessage('');
        setMessageType('');
        setShowIframe(false); // Hide iframe initially

        try {
            const response = await fetch('http://localhost:5000/generate-map', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ points: formattedAddresses }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(t('successfullyCreated', { file: data.file }));
                setMessageType('success');
                setShowIframe(true); // Show iframe on success
            } else {
                setMessage(t('errorMessage', { error: data.error }));
                setMessageType('error');
            }
        } catch (error) {
            setMessage(t('errorMessage', { error: error.message }));
            setMessageType('error');
        } finally {
            setMapLoading(false);
        }
    };

    return (
        <div className="mt-4">
            <style>
                {`
                    @keyframes neon {
                        0%, 100% {
                            text-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 40px #ff00ff, 0 0 80px #ff00ff, 0 0 160px #ff00ff;
                            color: #ff00ff;
                        }
                        20% {
                            text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 40px #00ff00, 0 0 80px #00ff00, 0 0 160px #00ff00;
                            color: #00ff00;
                        }
                        40% {
                            text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 80px #00ffff, 0 0 160px #00ffff;
                            color: #00ffff;
                        }
                        60% {
                            text-shadow: 0 0 5px #ff0000, 0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 40px #ff0000, 0 0 80px #ff0000, 0 0 160px #ff0000;
                            color: #ff0000;
                        }
                        80% {
                            text-shadow: 0 0 5px #ffff00, 0 0 10px #ffff00, 0 0 20px #ffff00, 0 0 40px #ffff00, 0 0 80px #ffff00, 0 0 160px #ffff00;
                            color: #ffff00;
                        }
                    }

                    .neon-text {
                        font-size: 1.25rem;
                        font-weight: bold;
                        animation: neon 5s infinite;
                    }

                    .text-red-500 {
                        color: #f56565; /* Couleur rouge pour les messages d'erreur */
                    }
                `}
            </style>
            <Link className="bg-white rounded py-1 px-2 hover:bg-slate-50 border-gray-100 border" to={'./..'}>{t('return')}</Link>
            <div className="mt-2">
                {loading ? <CircularProgress />
                    :
                    <div className="m-auto w-96">
                        <div className="flex justify-between mb-2">
                            <h1 className="text-xl font-semibold">{t('foodCollectionDetail', { date: data?.date })}</h1>
                            <button className='text-2xl text-red-500 hover:text-red-400' onClick={onDelete}><HiOutlineTrash /></button>
                        </div>

                        <p>{t('date', { date: data?.date })}</p>
                        <h2 className="text-lg mb-4 mt-4">{t('listSupermarkets')}</h2>
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

                        <h2 className="text-lg mb-4 mt-4">{t('formattedAddresses')}</h2>
                        <ul className="list-disc ml-5">
                            {formattedAddresses.map((address, index) => (
                                <li key={index}>{address}</li>
                            ))}
                        </ul>

                        <div className="mt-4">
                            <button 
                                onClick={handleSubmit} 
                                className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                {t('generateMap')}
                            </button>
                        </div>
                        {mapLoading && <CircularProgress />}

                        {message && (
                            <p className={`mt-4 ${messageType === 'success' ? 'neon-text' : 'text-red-500'}`}>
                                {message}
                            </p>
                        )}

                        {showIframe && (
                            <div className="mt-4">
                                <div>
                                    <a
                                        href='/trajet.html'
                                        download
                                        className="text-blue-500 hover:underline"
                                    >
                                        Télécharger le fichier
                                    </a>
                                    <iframe src="/trajet.html" frameborder="0" className="w-96 h-96" ></iframe>
                                </div>
                                <GeneratePdfButton />
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    );
}
