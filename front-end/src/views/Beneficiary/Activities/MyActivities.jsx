import { useState, useEffect } from 'react';
import axiosClient from '../../../axios-client';
import { useAuth } from '../../../hooks/auth';
import { HiOutlineXMark   } from "react-icons/hi2";


export default function MyActivities() {
    const { user } = useAuth({ middleware: 'auth' })
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetchActivities();
    }, [])

    const fetchActivities = () => {
        axiosClient.get(`/api/beneficiary/${user.id}/myActivities`)
        .then (response => {
            console.log(response.data)
            setActivities(response.data)
            setLoading(false)
        })
        .catch (error => {
            console.log(error)
            setError(error)
        })
    }

    const handleCancelParticipate = (activity_id) => {
        setError(null)
        setSuccess(null)
        axiosClient.delete(`/api/activity/${activity_id}/participate`)
        .then(response => {
            console.log(response.data)
            fetchActivities();
            setSuccess(response.data)
        })
        .catch(error => {
            console.log(error)
            setError(error)
        })
    }

    return (
        <div>
            {loading ? <p>Loading...</p> :<>
            {error && <p>Error: {error.message}</p>}
            {activities?.length === 0 && <p>No activities</p>}
            {error && <div className="bg-red-100 text-red-600 border border-red-600 mt-4 p-2 rounded flex justify-between mb-4"><p >{error.message}</p><button onClick={() => setError(null)}><HiOutlineXMark/></button></div>}
            {success && <div className="bg-green-100 text-green-600 border border-green-600 mt-4 p-2 rounded flex justify-between mb-4"><p >{success.message}</p><button onClick={() => setSuccess(null)}><HiOutlineXMark/></button></div>}
            <div className='flex flex-col gap-4'>
                {activities && activities.map(activity => (
                        <div key={activity.id} className="bg-white rounded-lg p-4 shadow-sm">
                            <div className='flex justify-between'>
                                <h2 className='font-medium'>{activity?.name}</h2>
                                <p>{new Date(activity.start_datetime).toLocaleDateString('fr-FR')}</p>
                            </div>
                            
                            <p>{activity?.description}</p>
                            <div className="flex justify-between items-center">
                                <div ><p className="bg-pink-200 p-1 rounded text-white">{activity.activity_type.name}</p></div>
                                <button className="bg-red-500 text-white rounded p-2" onClick={() => handleCancelParticipate(activity.id)}>Cancel Participation</button>
                            </div>
                        </div>
                    ))}
            </div>
            
            </>}
        </div>
    )
}