import { useParams } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import { useEffect } from 'react';
import { useState } from 'react';

export default function FoodCollectionDetail() {
    const { id } = useParams();
    const [foodCollection, setFoodCollection] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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
            <p>Number of participants : <span>{foodCollection?.participants?.length}</span></p>
            <p>Date : <span>{new Date (foodCollection?.date).toLocaleDateString('fr-FR')}</span></p>
            <p>Start Time : <span>{new Date (foodCollection?.date).toLocaleTimeString('fr-FR')}</span></p>
            <button onClick={handleParticipate} className="bg-blue-400 text-white p-2 rounded-lg border shadow hover:bg-blue-500 hover:shadow-md duration-100">Participate</button>
            {error.message && <p className="text-red-500">{error.message}</p>}
            {successMessage.message && <p className="text-green-500">{successMessage.message}</p>}
        </div>
    )
}