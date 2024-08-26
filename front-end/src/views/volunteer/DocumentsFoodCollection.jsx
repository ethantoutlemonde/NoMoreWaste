import { useEffect, useState } from "react"
import axiosClient from "../../axios-client";
import { useAuth } from "../../hooks/auth";

export default function DocumentsFoodCollection() {
    const { user } = useAuth({ middleware: 'auth' })
    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        console.log('DocumentsFoodCollection, user:', user);
        axiosClient.get(`/api/volunteer/${user.id}/documents`)
        .then(response => {
            console.log('DocumentsFoodCollection, response:', response);
        })
    }, []);
    return (
        <>
        <div>DocumentsFoodCollection</div>
        <ul className="w-96 bg-white p-4 rounded-lg">
            <li className="w-full bg-gray-50 rounded-md p-2">Permis</li>
            <li></li>
        </ul>
            
        </>
    )
}