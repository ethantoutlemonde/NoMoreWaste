import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../axios-client';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function PartnerSupermarketAdd() {
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        name: '',
        address: '',
        city: '',
        postal_code: '',
        country: '',
        email: '',
        phone: '',
        siret: '',
        password: ''

    });
    const [success, setSuccess] = useState({});
    // const { id } = useParams();
    const { t } = useTranslation("global");

    const navigate = useNavigate();

    // useEffect(() => {
    //     axiosClient.get(`/api/users/${id}`)
    //     .then(response => {
    //         console.log(response.data)
    //         setData(response.data)
    //     })
    //     .catch(error => {
    //         if (error.response && error.response.status === 400) {
    //             setErrors(error.response.data.error);
    //         }
    //     })

        
    // }, [])

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

        axiosClient.post('/api/supermarket', data)
        .then((response) => {
            console.log(response)
            setData((prevData) => ({
                ...prevData,
                password: ''
            }));
            setSuccess(response.data)
            // navigate('./..')
        })
        .catch((error) => {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.error);
            }
        })

    }
    return (
        <> 
         
            <div className='flex justify-center'>   

            <form onSubmit={submit} className="bg-slate-50 p-10 rounded-xl  mt-12" style={{maxWidth: 500 + "px"}}>
                
                <h1 className='font-semibold text-2xl mb-4'>{t("Add a Supermarket")}</h1>
                <div className='grid grid-cols-2 gap-6'>
                    <div className='flex flex-col'>
                        <label className="mt-2">{t("Name")}</label>
                        <input name="name" type="text" value={data.name} onChange={handleChange} className="p-2 rounded-lg border shadow" placeholder={t("Name")} />
                        {errors.name && <p className="text-red-500">{errors.name[0]}</p>}

                        <label className="mt-2">{t("Email")}</label>
                        <input name="email" type="email" value={data.email} onChange={handleChange} className="p-2 rounded-lg border shadow" placeholder={t("Email")} />
                        {errors.email && <p className="text-red-500">{errors.email[0]}</p>}

                        <label className="mt-2">{t("Phone")}</label>
                        <input name="phone" type="text" value={data.phone} onChange={handleChange} className="p-2 rounded-lg border shadow" placeholder={t("Phone")} />
                        {errors.phone && <p className="text-red-500">{errors.phone[0]}</p>}

                        <label className="mt-2">{t("SIRET Number")}</label>
                        <input name="siret" type="text" value={data.siret} onChange={handleChange} className="p-2 rounded-lg border shadow" placeholder={t("SIRET Number")} />
                        {errors.siret && <p className="text-red-500">{errors.siret[0]}</p>}
                    </div>
                    <div className='flex flex-col'>
                        <label className="mt-2">{t("Address")}</label>
                        <input name="address" type="text" value={data.address} onChange={handleChange} className="p-2 rounded-lg border shadow" placeholder={t("Address")} />
                        {errors.address && <p className="text-red-500">{errors.address[0]}</p>}

                        <label className="mt-2">{t("City")}</label>
                        <input name="city" type="text" value={data.city} onChange={handleChange} className="p-2 rounded-lg border shadow" placeholder={t("City")} />
                        {errors.city && <p className="text-red-500">{errors.city[0]}</p>}

                        <label className="mt-2">{t("Postal Code")}</label>
                        <input name="postal_code" type="text" value={data.postal_code} onChange={handleChange} className="p-2 rounded-lg border shadow" placeholder={t("Postal Code")} />
                        {errors.postal_code && <p className="text-red-500">{errors.postal_code[0]}</p>}

                        <label className="mt-2">{t("Country")}</label>
                        <input name="country" type="text" value={data.country} onChange={handleChange} className="p-2 rounded-lg border shadow" placeholder={t("Country")} />
                        {errors.country && <p className="text-red-500">{errors.country[0]}</p>}
                    </div>
                    

                    
                </div>
                

                <button className="mt-4 bg-blue-500 text-white p-2 rounded-lg border shadow hover:bg-blue-600 hover:shadow-md duration-100">
                    {t('Add')}
                </button>
                {success.success && <p className="text-green-500">{success.success}</p>}
            </form>
        </div>
        </>
    )
}