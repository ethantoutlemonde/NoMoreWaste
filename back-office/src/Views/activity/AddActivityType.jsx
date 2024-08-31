import React, { useState } from 'react';
import axiosClient from '../../axios-client';
import { useTranslation } from 'react-i18next';

export default function AddActivityType() {
    const [name, setName] = useState(''); // Utilisation de la colonne 'name'
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { t } = useTranslation('global');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        try {
            console.log('name:', name);
            const response = await axiosClient.post("/api/activityType", {
                name: name // Envoi de 'name' dans la requête
            });

            if (response.status === 201) { 
                setSuccessMessage(t(response.data.message));
                setName(''); // Réinitialisation de l'input après succès
            } else {
                console.error('Failed to add activity type');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setError(t(error.response.data.error));
            } else {
                setError(t("An error occurred while adding the Activity type."));
            }
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{successMessage}</span>
                </div>
            )}
            <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center mb-8">
                {t('Add Activity Type')}
            </h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="relative z-0 w-full mb-5 group">
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        style={{ color: '#000' }} 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" " 
                        required 
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        {t('Activity Type')}
                    </label>
                </div>
                <button 
                    type="submit" 
                    className="text-white bg-rose-600 hover:bg-rose-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                    {t('Add')}
                </button>
            </form>
        </div>
    );
}
