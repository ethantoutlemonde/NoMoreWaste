import { useEffect, useState } from "react"
import axiosClient from "../../axios-client"
import { useAuth } from "../../hooks/auth"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function PartnerSupermarkets() {
    const { user } = useAuth({ middleware: 'auth' })
    const [supermarkets, setSupermarkets] = useState([]);
    const { t } = useTranslation('global');

    useEffect(() => {
        console.log('PartnerSupermarkets')
        axiosClient.get(`/api/partner/${user.id}/supermarkets`)
        .then(response => {
            console.log('PartnerSupermarkets, response:', response);
            setSupermarkets(response.data);
        })
        .catch(error => {
            console.log('PartnerSupermarkets, error:', error);
        })
    }, [])
    return (
        <>
        <div className="container-80 flex flex-col">
            <h1 className="mt-6 text-2xl font-semibold mb-6">{t("My Supermarkets")}</h1>
            <div className='flex flex-row flex-wrap gap-4'>
                {supermarkets?.map((supermarket) => (
                    <Link to={`/partner/supermarkets/${supermarket.id}`} key={supermarket.id} className="bg-gray-50 w-fit p-4 rounded-lg shadow hover:shadow-md duration-100">
                        <p className="font-semibold">{supermarket.name}</p>
                        <p>{supermarket.address}</p>
                        <p>{supermarket.email}</p>
                        <p>{supermarket.phone}</p>
                    </Link>
                ))}
                </div>
        </div>
        
        </>
    )
}