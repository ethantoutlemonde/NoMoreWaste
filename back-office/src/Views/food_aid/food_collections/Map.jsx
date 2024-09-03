import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";
import CircularProgress from '@mui/material/CircularProgress';
import { HiOutlineTrash } from "react-icons/hi";
import { useTranslation } from 'react-i18next';
import GeneratePdfButton from "./GeneratedPdfButton";

export default function Map({formattedAddresses}) {
    const { id } = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [mapLoading, setMapLoading] = useState(false);
    // const [formattedAddresses, setFormattedAddresses] = useState([]);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [showIframe, setShowIframe] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setMapLoading(true);
        setMessage('');
        setMessageType('');
        setShowIframe(false);

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
            <div className="">
                <div className="mt-4">
                    <button 
                        onClick={handleSubmit} 
                        className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
                        {t('Generate Map')}
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
                                className=" bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75 transition-colors duration-300 ease-in-out"
                            >
                                Télécharger le fichier
                            </a>
                            <GeneratePdfButton />
                            <iframe src="/trajet.html" frameBorder="0" className="w-full h-96" ></iframe>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
