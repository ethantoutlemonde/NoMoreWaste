import React, { useState, useEffect } from 'react';
import axiosClient from '../../../axios-client';
import { useAuth } from '../../../hooks/auth';


export default function AddActivity() {
    const [activity, setActivity] = useState({});
    const [activityTypes, setActivityTypes] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth({ middleware: 'auth' })

    useEffect(() => {
        fetchActivityTypes();
    }, [])

    // const fetchActivities = () => {
    //     axiosClient.get(`/api/activity/${id}`)
    //     .then (response => {
    //         console.log(response.data)
    //         setActivity(response.data.activity)
    //         setLoading(false)
    //     })
    //     .catch (error => {
    //         console.log(error)
    //         setError(error)
    //     })
    // }

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

    const submit = (e) => {
        e.preventDefault();
        setError(null)
        setSuccess(null)
        console.log("submit")
        // set creator_id in activity object
        activity.creator_id = user.id
        axiosClient.post(`/api/activity`, activity)
        .then(response => {
            console.log(response.data)
            setSuccess(response.data)
        })
        .catch(error => {
            console.log(error)
            setError(error.response.data.errors)
        })
    }

    const handleChange = (e) => {
        setActivity({
            ...activity,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <div className='container-80 p-10 bg-gray-50 rounded-3xl'>
                <h1>Add Activity</h1>
                <form onSubmit={submit} className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" value={activity.name} className="p-2 rounded-lg border read-only:bg-gray-50 read-only:text-gray-500" onChange={handleChange}/>
                    {error?.name && <p className="text-red-500">{error.name}</p>}
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" value={activity.description} className="p-2 rounded-lg border read-only:bg-gray-50 read-only:text-gray-500" onChange={handleChange}></textarea>
                    {error?.description && <p className="text-red-500">{error.description}</p>}
                    <label htmlFor="activity_type">Activity Type</label>
                    <select name="activity_type_id" id="" className="p-2 rounded-lg border bg-white read-only:bg-gray-50" readOnly={false} onChange={handleChange}>
                        <option value="" disabled selected>Select an option</option>
                        {activityTypes.length > 0 && activityTypes.map(type => (
                            <option value={type.id} key={type.id} selected={activity.activity_type_id === type.id}>{type.name}</option>
                        ))}
                    </select>
                    {error?.activity_type_id && <p className="text-red-500">{error.activity_type_id}</p>}
                    <label htmlFor="max_participants">Max participants</label>
                    <input type="number" name="max_participants" id="max_participants" value={activity.max_participants} className="p-2 rounded-lg border read-only:bg-gray-50 read-only:text-gray-500" onChange={handleChange}/>
                    {error?.max_participants && <p className="text-red-500">{error.max_participants}</p>}
                    <label htmlFor="start_datetime">Start Date</label>
                    <input type="datetime-local" name="start_datetime" id="start_datetime" value={activity.start_datetime} className="p-2 rounded-lg border read-only:bg-gray-50 read-only:text-gray-500" onChange={handleChange}/>
                    {error?.start_datetime && <p className="text-red-500">{error.start_datetime}</p>}
                </div>
                <div className="flex flex-col gap-2">
                    
                    <label htmlFor="end_datetime">End Date</label>
                    <input type="datetime-local" name="end_datetime" id="end_datetime" value={activity.end_datetime} className="p-2 rounded-lg border read-only:bg-gray-50 read-only:text-gray-500"  onChange={handleChange}/>
                    {error?.end_datetime && <p className="text-red-500">{error.end_datetime}</p>}

                    <label htmlFor="adress">Address</label>
                    <input type="text" name="adress" value={activity.adress} className="p-2 rounded-lg border read-only:bg-gray-50 read-only:text-gray-500"  onChange={handleChange}/>
                    {error?.adress && <p className="text-red-500">{error.adress}</p>}
                    <label htmlFor="city">City</label>
                    <input type="text" name="city" value={activity.city} className="p-2 rounded-lg border read-only:bg-gray-50 read-only:text-gray-500" onChange={handleChange}/>
                    {error?.city && <p className="text-red-500">{error.city}</p>}
                    <label htmlFor="country">Country</label>
                    <input type="text" name="country" value={activity.country} className="p-2 rounded-lg border read-only:bg-gray-50 read-only:text-gray-500" onChange={handleChange}/>
                    {error?.country && <p className="text-red-500">{error.country}</p>}
                    <label htmlFor="postal_code">Postal Code</label>
                    <input type="text" name="postal_code" value={activity.postal_code} className="p-2 rounded-lg border read-only:bg-gray-50 read-only:text-gray-500" onChange={handleChange}/>
                    {error?.postal_code && <p className="text-red-500">{error.postal_code}</p>}
                </div>
                
                <button type="submit" className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600">Create</button>

                {success?.success && <p className="text-green-500">{success?.success}</p>}
            </form>
            </div>
        </>
    )
}