import { useEffect, useState } from 'react';
import axiosClient from '../../../axios-client';
import { HiOutlineXMark   } from "react-icons/hi2";

export default function Activities() {
    const [data, setData] = useState(null);
    const [activityTypes, setActivityTypes] = useState([]);
    const [selectedActivityType, setSelectedActivityType] = useState(0);
    const [search, setSearch] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    useEffect(() => {
        fetchActivities();
    }, [search, selectedActivityType])

    useEffect(() => {
        fetchActivityTypes();
    }, [])

    const fetchActivityTypes = () => {
        axiosClient.get('/api/activityType')
        .then (response => {
            console.log(response.data.activityTypes)
            setActivityTypes(response.data.activityTypes)
        })
        .catch (error => {
            console.log(error)
        })
    }

    const fetchActivities = () => {
        axiosClient.get(`/api/searchActivities?s=${search}&t=${selectedActivityType}`)
        .then (response => {
            console.log(response.data)
            setData(response.data.activities)
        })
        .catch (error => {
            console.log(error)
        })
    }

    const handleParticipate = (id) => {
        setError(null)
        setSuccess(null)

        axiosClient.post(`/api/activity/${id}/participate`)
        .then(response => {
            console.log(response.data)
            fetchActivities();
            setSuccess(response.data)
        })
        .catch(error => {
            console.log(error)
            setError(error.response.data)
        })
    }
    return (
        <div>
            <div className="bg-white rounded-lg p-4 w-full grid grid-cols-4 shadow-sm">
                <input name='s' type="text" placeholder="Search" className="col-span-3 border-r-2 mr-4" value={search} onChange={(e) => setSearch(e.target.value)}/>
                <select name="activityType" id="" className="col-span-1" onChange={(e) => setSelectedActivityType(e.target.value)}>
                    <option value="">All</option>
                    {activityTypes.length > 0 && activityTypes.map(type => (
                        <option value={type.id} key={type.id} >{type.name}</option>
                    ))}
                </select>
            </div>
            
            <div className='flex flex-col gap-4 mt-6'>
                {error && <div className="bg-red-100 text-red-600 border border-red-600 mt-4 p-2 rounded flex justify-between"><p >{error.message}</p><button onClick={() => setError(null)}><HiOutlineXMark/></button></div>}
                {success && <div className="bg-green-100 text-green-600 border border-green-600 mt-4 p-2 rounded flex justify-between"><p >{success.message}</p><button onClick={() => setSuccess(null)}><HiOutlineXMark/></button></div>}
                {data && data.map(activity => (
                    <div key={activity.id} className="bg-white rounded-lg p-4 shadow-sm">
                        <div className='flex justify-between'>
                            <h2 className='font-medium'>{activity?.name}</h2>
                            <p>{new Date(activity.start_datetime).toLocaleDateString('fr-FR')}</p>
                        </div>
                        
                        <p>{activity?.description}</p>
                        <div className="flex justify-between items-center">
                            <div ><p className="bg-pink-200 p-1 rounded text-white">{activity.activity_type.name}</p></div>
                            <button className="bg-blue-500 text-white rounded p-2" onClick={() => handleParticipate(activity.id)}>Participate</button>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    )
}