import React from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from "react-i18next";

export default function FoodCollectionDetail() {
    const { id } = useParams();
    const [foodCollection, setFoodCollection] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { t } = useTranslation('global');

    useEffect(() => {
        axiosClient.get(`/api/foodCollection/${id}`)
            .then(response => {
                console.log("Fetched food collection:", response.data);
                setFoodCollection(response.data);
            })
            .catch(error => {
                console.error("Error fetching food collection:", error.response.data.message);
                
            });
    }, [id]);

    const handleParticipate = () => {
        console.log("Participating in food collection", id);
        axiosClient.post(`/api/foodCollection/${id}/participate`)
            .then(response => {
                console.log("Participation successful:", response.data);
                setFoodCollection(prevFoodCollection => ({
                    ...prevFoodCollection,
                    participants: [...prevFoodCollection.participants, response.data]
                }));
                setSuccessMessage(response.data);
            })
            .catch(error => {
                console.error("Error participating in food collection:", error.response.data.message);
                setError(error.response.data);
            });
    }
    return (
        <div>
            <h1>{t("Food Collection Detail")} {id}</h1>
            <p>{t("Number of participants :")} <span>{foodCollection?.participants?.length}</span></p>
            <button onClick={handleParticipate} className="bg-blue-400 text-white p-2 rounded-lg border shadow hover:bg-blue-500 hover:shadow-md duration-100">{t("Participate")}</button>
            {error.message && <p className="text-red-500">{error.message}</p>}
            {successMessage.message && <p className="text-green-500">{successMessage.message}</p>}
        </div>
    )
}