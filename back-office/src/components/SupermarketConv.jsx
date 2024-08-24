import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useAuth } from "../hooks/auth";
import CircularProgress from '@mui/material/CircularProgress';

export default function SupermarketConv({supermarket_id}) {
    const chatDiv = useRef(null);
    const [messages, setMessages] = useState([]);
    const inputMessage = useRef(null);
    const { user } = useAuth({ middleware: 'auth' })
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        axiosClient.get(`/api/supermarket/${supermarket_id}/messages`)
        .then(response => {
            console.log(response.data)
            setMessages(response.data)
            setLoading(false)
        })
        if (chatDiv.current) {
            const div = chatDiv.current;
            console.log('scroll',div.scrollHeight)
            div.scrollTop = div.scrollHeight;
        }
    }
    , [])

    useEffect(() => {
        if (chatDiv.current) {
            const div = chatDiv.current;
            div.scrollTop = div.scrollHeight;
        }
    }, [messages]);

    const send = (e) => {
        e.preventDefault()
        const message = inputMessage.current.value
        console.log(message)
        axiosClient.post(`/api/supermarket/${supermarket_id}/messages`, {message, admin_id: user.id})
        .then(response => {
            console.log(response.data)
            setMessages(prevMessages => [...prevMessages, response.data.message])
            inputMessage.current.value = "";
        })
    }
    return (
        <>
        <h1 className='text-2xl font-semibold'>Chat :</h1>
        <div ref={chatDiv} className="w-full h-full max-h-96 bg-white rounded-md overflow-y-scroll p-4 overflow-x-hidden">
            {loading &&  <CircularProgress />}
            <div className="h-full flex flex-col gap-2">
                {messages.map((message, index) => (
                    message.admin_id === null ? (
                        <div key={index} className="bg-blue-200 p-2 rounded-md self-start mr-20">
                            <h3 className="font-semibold">{message.supermarket.name}</h3>
                            <p>{message.message}</p>
                        </div>
                    ) : (
                        <div key={index} className="bg-green-200 p-2 rounded-md self-end ml-20">
                            <h3 className="font-semibold">Admin {message.admin.name}</h3>
                            <p>{message.message}</p>
                        </div>
                    )
                ))}
            </div>
        </div>
        <form onSubmit={send} className="bg-blue-100 w-full flex gap-2 p-2 rounded-md">
            <textarea ref={inputMessage} type="text" className="w-full bg-white rounded p-1" />
            <button type="submit" className="bg-blue-500 p-1 text-white rounded hover:bg-blue-400">Send</button>
        </form>
        </>
    )
}