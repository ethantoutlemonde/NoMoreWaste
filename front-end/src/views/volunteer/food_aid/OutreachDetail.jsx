import React from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import { useEffect } from 'react';
import { useState } from 'react';

export default function OutreachDetail() {
    const { id } = useParams();
    const [outreach, setOutreach] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        axiosClient.get(`/api/outreach/${id}`)
            .then(response => {
                console.log("Fetched food collection:", response.data);
                setOutreach(response.data);
            })
            .catch(error => {
                console.error("Error fetching food collection:", error.response.data.message);
                
            });
    }, [id]);

    const handleParticipate = () => {
        console.log("Participating in food collection", id);
        axiosClient.post(`/api/outreach/${id}/participate`)
            .then(response => {
                console.log("Participation successful:", response.data);
                setOutreach(prevOutreach => ({
                    ...prevOutreach,
                    participants: [...prevOutreach.participants, response.data]
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
            <h1>Food Collection Detail {id}</h1>
            <p>Number of participants : <span>{outreach?.participants?.length}</span></p>
            <button onClick={handleParticipate} className="bg-blue-400 text-white p-2 rounded-lg border shadow hover:bg-blue-500 hover:shadow-md duration-100">Participate</button>
            {error.message && <p className="text-red-500">{error.message}</p>}
            {successMessage.message && <p className="text-green-500">{successMessage.message}</p>}
        </div>
    )
}