import React, { useState, useEffect } from 'react';
import axiosClient from '../../../axios-client';
import { useAuth } from '../../../hooks/auth';


export default function MyActivities() {
    const { user } = useAuth({ middleware: 'auth' })
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActivities();
    }, [])

    const fetchActivities = () => {
        axiosClient.get(`/api/beneficiary/${user.id}/activities`)
        .then (response => {
            console.log(response.data)
            setActivities(response.data.activities)
            setLoading(false)
        })
        .catch (error => {
            console.log(error)
            setError(error)
        })
    }

    return (
        <div>
            <h1>My Activities</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {activities.length === 0 && <p>No activities</p>}
            {activities.map(activity => (
                <div key={activity.id}>
                    <h2>{activity.name}</h2>
                    <p>{activity.description}</p>
                </div>
            ))}
        </div>
    )
}