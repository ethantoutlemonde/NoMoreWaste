import { useState, useEffect } from "react"
import axiosClient from "../../../axios-client"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export default function UpdateSupermarket() {
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [partners, setPartners] = useState([]);
    const [success, setSuccess] = useState({});
    const { id } = useParams();
    const [loading, setLoading] = useState(true)
    const { t } = useTranslation("global");

    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get(`/api/supermarketAdmin/${id}`)
        .then(response => {
            console.log(response.data)
            setData(response.data)
        })
        .catch(error => {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.error);
            }
        })

        axiosClient.get(`/api/partnerAdmin`)
        .then(response => {
            console.log(response.data)
            setPartners(response.data)
        })
        .catch(error => {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.error);
            }
        })

        
    }, [])

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const submit = (e) => {
        e.preventDefault()
        setErrors({});
        console.log('submit')
        console.log(data)

        axiosClient.patch(`/api/supermarketAdmin/${id}`, data)
        .then((response) => {
            console.log(response)
            setData((prevData) => ({
                ...prevData,
                password: ''
            }));
            setSuccess(response.data)
            navigate('./..')
        })
        .catch((error) => {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.error);
            }
        })

    }
    return (
        <>
        <Link className="bg-slate-50 rounded py-1 px-2 hover:bg-slate-100 border-slate-100 border" to={'./..'}>Return</Link>
        <div className="flex flex-col justify-center items-center">
            <form onSubmit={submit} className="flex flex-col w-80 bg-slate-50 p-10 rounded-xl">
                <h1 className="text-2xl">Update Supermarket</h1>
                <label className="mt-2">Name</label>
                <input name="name" type="text" value={data.name} onChange={handleChange}  className="bg-slate-100 rounded p-1"/>
                {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
                <label className="mt-2">Address</label>
                <input name="address" type="text" value={data.address} onChange={handleChange} className="bg-slate-100 rounded p-1"/>
                {errors.address && <p className="text-red-500">{errors.address[0]}</p>}
                <label className="mt-2">City</label>
                <input name="city" type="text" value={data.city} onChange={handleChange} className="bg-slate-100 rounded p-1"/>
                {errors.city && <p className="text-red-500">{errors.city[0]}</p>}
                <label className="mt-2">Postal Code</label>
                <input name="postal_code" type="text" value={data.postal_code} onChange={handleChange} className="bg-slate-100 rounded p-1"/>
                {errors.postal_code && <p className="text-red-500">{errors.postal_code[0]}</p>}
                <label className="mt-2">Country</label>
                <input name="country" type="text" value={data.country} onChange={handleChange} className="bg-slate-100 rounded p-1"/>
                {errors.country && <p className="text-red-500">{errors.country[0]}</p>}
                <label className="mt-2">SIRET number</label>
                <input name="siret" type="text" value={data.siret} onChange={handleChange} className="bg-slate-100 rounded p-1"/>
                {errors.siret && <p className="text-red-500">{errors.siret[0]}</p>}
                <label className="mt-2">Email</label>
                <input name="email" type="email" value={data.email} onChange={handleChange} className="bg-slate-100 rounded p-1"/>
                {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
                <label className="mt-2">Phone</label>
                <input name="phone" type="text" value={data.phone} onChange={handleChange} className="bg-slate-100 rounded p-1"/>
                {errors.phone && <p className="text-red-500">{errors.phone[0]}</p>}
                <label className="mt-2">{t("Owner")}</label>
                    <select name="user_id" value={data.user_id} onChange={handleChange} className="bg-slate-100 rounded p-2">
                        <option value="" defaultChecked disabled>Choose a Partner</option>
                        {partners.map((partner, index) => (
                            <option key={index} value={partner.id}>{partner.first_name} {partner.last_name}</option>
                        ))}

                    </select>
                    {errors.user_id && <p className="text-red-500">{errors.user_id[0]}</p>}
                <button type="submit" className='rounded bg-blue-600 text-white p-1 hover:bg-blue-500 mt-4'>Update</button>
                {success.success && <p className="text-green-500">{success.success}</p>}
            </form>
        </div>
        </>
    )
}