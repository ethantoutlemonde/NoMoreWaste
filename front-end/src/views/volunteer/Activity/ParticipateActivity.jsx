import { useEffect, useState } from "react"
import axiosClient from "../../../axios-client"


export default function ParticipateActivity() {
    const [data, setData] = useState(null);
    const [activityTypes, setActivityTypes] = useState([]);
    const [selectedActivityType, setSelectedActivityType] = useState(0);
    useEffect(() => {
        fetchActivityTypes();
        fetchActivities();
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
        axiosClient.get('/api/activity')
        .then (response => {
            console.log(response.data)
            setData(response.data.activities)
        })
        .catch (error => {
            console.log(error)
        })
    }
    return (
        <div className="container-80 p-10 bg-gray-50 rounded-3xl">
            <h1>Participate Activity</h1>
            <div className="bg-white rounded p-2 w-fit grid grid-cols-4">
                <input type="text" placeholder="Search" className="col-span-3"/>
                <select name="activityType" id="" className="col-span-1">
                    <option value="">All</option>
                    {activityTypes.length > 0 && activityTypes.map(type => (
                        <option value={type.id} key={type.id}>{type.name}</option>
                    ))}
                </select>
            </div>
            <div>
                {data && data.map(activity => (
                    <div key={activity.id} className="bg-white rounded p-2 m-2">
                        <h1>{activity?.name}</h1>
                        <p>{activity?.description}</p>
                        <div className="flex justify-between">
                            <div ><p className="bg-pink-200 p-1 rounded text-white">{activity.activity_type.name}</p></div>
                            <button className="bg-blue-500 text-white rounded p-2">Participate</button>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    )
}