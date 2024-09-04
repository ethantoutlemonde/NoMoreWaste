import { useEffect, useState } from "react"
import axiosClient from "../../../axios-client"
import { Link } from "react-router-dom"
import { useAuth } from "../../../hooks/auth";

export default function ShowActivity() {
    const [data, setData] = useState({});
    const { user } = useAuth({ middleware: 'auth' })
    useEffect(() => {
        fetchActivities();
    }, [])

    const fetchActivities = () => {
        axiosClient.get(`/api/volunteer/${user.id}/myActivities`)
        .then (response => {
            console.log(response.data)
            setData(response.data)
        })
        .catch (error => {
            console.log(error)
        })
    }
    const handleDelete = (id) => {
        axiosClient.delete(`/api/activity/${id}`)
        .then(response => {
            console.log(response.data)
            fetchActivities();
        })
        .catch(error => {
            console.log(error)
        })
    }
    return (
        <div className="container-80 p-10 bg-gray-50 rounded-3xl ">
            <h1>Show Activity</h1>
            <Link to={'/volunteer/Activity/add'} className="fixed bottom-6 right-6 bg-blue-500 text-white p-2 rounded-lg shadow-xl hover:shadow-lg hover:bg-blue-600 duration-100">Add Activity</Link>
                <div>
                    <h2>My activities</h2>
                    <div>
                    {data.length > 0 && data.map(activity => (
                        <div key={activity.id} className="bg-white rounded p-2 m-2">
                            <div className="flex justify-between">
                                <h1>{activity?.name}</h1>
                                <div ><p className="bg-pink-200 p-1 rounded text-white">{activity.activity_type.name}</p></div>
                            </div>
                            
                            <p>{activity?.description}</p>
                            <div className="flex justify-between">
                                <button className="bg-red-500 text-white rounded p-2" onClick={() => handleDelete(activity.id)}>Delete</button>
                                <Link to={`/volunteer/Activity/${activity.id}`} className="bg-blue-500 text-white rounded p-2">Update</Link>
                            </div>
                        </div>
                    ))}
                </div>
                </div>

            </div>

    )
}