import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useAuth } from "../hooks/auth";
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next'; 

export default function SupermarketConv({supermarket_id}) {
    const chatDiv = useRef(null);
    const [messages, setMessages] = useState([]);
    const inputMessage = useRef(null);
    const { user } = useAuth({ middleware: 'auth' })
    const [loading, setLoading] = useState(true)
    const { t } = useTranslation("global");

    
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
        axiosClient.post(`/api/supermarket/${supermarket_id}/messages`, {message})
        .then(response => {
            console.log(response.data)
            setMessages(prevMessages => [...prevMessages, response.data.message])
            inputMessage.current.value = "";
        })
    }
    return (
        <>
        <h1 className='text-2xl font-semibold'>Chat :</h1>
        <div ref={chatDiv} className="w-full h-full max-h-96 bg-white rounded-t-lg overflow-y-scroll p-4 overflow-x-hidden scroll-smooth">
            {loading &&  <CircularProgress />}
            <div className="h-full flex flex-col gap-2">
                {messages.map((message, index) => (
                    message.admin_id === null ? (
                        <div key={index} className="bg-green-200 p-2 rounded-md self-end ml-20">
                            <h3 className="font-semibold">{message.supermarket.name}</h3>
                            <p>{message.message}</p>
                        </div>
                    ) : (
                        <div key={index} className="bg-blue-200 p-2 rounded-md self-start mr-20">
                            <h3 className="font-semibold">Admin {message.admin.first_name}</h3>
                            <p>{message.message}</p>
                        </div>
                    )
                ))}
            </div>
        </div>
        <form onSubmit={send} className="bg-blue-100 w-full flex gap-2 p-2 rounded-b-lg">
            <textarea ref={inputMessage} type="text" className="w-full bg-white rounded p-1" />
            <button type="submit" className="bg-blue-500 p-1 text-white rounded hover:bg-blue-400">{t("Send")}</button>
        </form>
        </>
    )
}