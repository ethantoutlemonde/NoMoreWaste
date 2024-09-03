import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";

export default function DetailActivity() {
    const { id } = useParams();
    const [activity, setActivity] = useState({});
    const [activityTypes, setActivityTypes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [readOnly, setReadOnly] = useState(true);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchActivities();
        fetchActivityTypes();
    }, [])

    const fetchActivities = () => {
        axiosClient.get(`/api/activity/${id}`)
        .then (response => {
            console.log(response.data)
            setActivity(response.data.activity)
            setLoading(false)
        })
        .catch (error => {
            console.log(error)
            setError(error)
        })
    }

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
        console.log("submit")
        axiosClient.put(`/api/activity/${id}`, activity)
        .then(response => {
            console.log(response.data)
            setReadOnly(true)
            setSuccess(response.data)
        })
        .catch(error => {
            console.log(error)
            setError(error.response.data)
        })
    }

    const handleChange = (e) => {
        setActivity({
            ...activity,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className="container-80 p-10 bg-gray-50 rounded-3xl ">
            <h1 className="text-2xl font-semibold mb-4">Detail Of The Activity</h1>
            <div className="flex gap-4 items-center">
                <label htmlFor="">Update ?</label>
                <button onClick={() => setReadOnly(!readOnly)}><HiOutlinePencilSquare className="text-3xl" /></button>
            </div>
            {loading ? <p>Loading...</p> :
            <form onSubmit={submit} className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" value={activity.name} className="p-2 rounded-lg border read-only:bg-gray-50 read-only:text-gray-500" readOnly={readOnly} onChange={handleChange}/>
                    {error?.name && <p className="text-red-500">{error.name}</p>}
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" value={activity.description} className="p-2 rounded-lg border read-only:bg-gray-50 read-only:text-gray-500" readOnly={readOnly} onChange={handleChange}></textarea>
                    {error?.description && <p className="text-red-500">{error.description}</p>}
                    <label htmlFor="activity_type">Activity Type</label>
                    <select name="activity_type_id" id="" className="p-2 rounded-lg border bg-white read-only:bg-gray-50" readOnly={false} onChange={handleChange}>
                        {activityTypes.length > 0 && activityTypes.map(type => (
                            <option value={type.id} key={type.id} selected={activity.activity_type_id === type.id}>{type.name}</option>
                        ))}
                    </select>
                    {error?.activity_type_id && <p className="text-red-500">{error.activity_type_id}</p>}
                    <label htmlFor="max_participants">Max participants</label>
                    <input type="number" name="max_participants" id="max_participants" value={activity.max_participants} className="p-2 rounded-lg border read-only:bg-gray-50 read-only:text-gray-500" readOnly={readOnly} onChange={handleChange}/>
                    {error?.max_participants && <p className="text-red-500">{error.max_participants}</p>}
                    <label htmlFor="start_datetime">Start Date</label>
                    <input type="datetime-local" name="start_datetime" id="start_datetime" value={activity.start_datetime} className="p-2 rounded-lg border read-only:bg-gray-50 read-only:text-gray-500" readOnly={readOnly} onChange={handleChange}/>
                    {error?.start_datetime && <p className="text-red-500">{error.start_datetime}</p>}
                </div>
                <div className="flex flex-col gap-2">
                    
                    <label htmlFor="end_datetime">End Date</label>
                    <input type="datetime-local" name="end_datetime" id="end_datetime" value={activity.end_datetime} className="p-2 rounded-lg border read-only:bg-gray-50 read-only:text-gray-500" readOnly={readOnly} onChange={handleChange}/>
                    {error?.end_datetime && <p className="text-red-500">{error.end_datetime}</p>}

                    <label htmlFor="adress">Address</label>
                    <input type="text" name="adress" value={activity.adress} className="p-2 rounded-lg border read-only:bg-gray-50 read-only:text-gray-500" readOnly={readOnly} onChange={handleChange}/>
                    {error?.adress && <p className="text-red-500">{error.adress}</p>}
                    <label htmlFor="city">City</label>
                    <input type="text" name="city" value={activity.city} className="p-2 rounded-lg border read-only:bg-gray-50 read-only:text-gray-500" readOnly={readOnly} onChange={handleChange}/>
                    {error?.city && <p className="text-red-500">{error.city}</p>}
                    <label htmlFor="country">Country</label>
                    <input type="text" name="country" value={activity.country} className="p-2 rounded-lg border read-only:bg-gray-50 read-only:text-gray-500" readOnly={readOnly} onChange={handleChange}/>
                    {error?.country && <p className="text-red-500">{error.country}</p>}
                    <label htmlFor="postal_code">Postal Code</label>
                    <input type="text" name="postal_code" value={activity.postal_code} className="p-2 rounded-lg border read-only:bg-gray-50 read-only:text-gray-500" readOnly={readOnly} onChange={handleChange}/>
                    {error?.postal_code && <p className="text-red-500">{error.postal_code}</p>}
                </div>
                
                
                {!readOnly &&<button type="submit" className="bg-blue-500 text-white rounded p-2">Update</button>}

                {success && <p className="text-green-500">{success.message}</p>}
            </form>
            
            }

        </div>
    )
}