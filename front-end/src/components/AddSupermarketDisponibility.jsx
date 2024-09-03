import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axiosClient from '../axios-client';

export default function AddSupermarketDisponibility({supermarket_id, onAddDisponibility }) {
    const { t } = useTranslation('global');
    const dateRef = useRef();
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
        const data = {
            date: dateRef.current.value,
            supermarket_id: supermarket_id
        }
        axiosClient.post('/api/supermarket/disponibility', data)
        .then((response) => {
            console.log(response)
            setSuccess(response.data)
            onAddDisponibility(response.data.disponibility);
        })
        .catch((error) => {
            
            if (error.response && error.response.status === 400) {
                console.log('error', error)
                setErrors(error.response.data.error);
            }
        })
    }

    return (
        <>
            <h1 className='text-2xl font-semibold'>{t('Add Supermarket Disponibility')}</h1>
            

            <div className="bg-white md:w-96 p-14 rounded-2xl mt-4 shadow">
                <h1 className="text-xl font-semibold">{t("Choose a Date")}</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                    <input type="date" name='date' ref={dateRef} className="p-2 rounded-lg border shadow"  />
                    {errors.date && <p className="text-red-500">{errors.date[0]}</p>}
                    {errors.length > 0 && <div className="bg-red-300 border-2 border-red-400  bg-opacity-80 p-2 rounded-md">{errors.map((error, index) => <p key={index}>{error}</p>)}</div>}
                    <button className="bg-blue-400 text-white p-2 rounded-lg border shadow hover:bg-blue-500 hover:shadow-md duration-100">
                        {t("Add")}
                    </button>
                    {success && <p className="text-green-500">{success.success}</p>}
                </form>

            </div>
        </>
    )
}