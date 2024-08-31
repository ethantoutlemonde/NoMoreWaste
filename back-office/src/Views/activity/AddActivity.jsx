import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios-client';
import { useTranslation } from 'react-i18next';

export default function AddActivity() {
    const { t } = useTranslation('global');
    const [activityTypes, setActivityTypes] = useState([]);
    const [volunteers, setVolunteers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        max_participants: '',
        start_datetime: '',
        end_datetime: '',
        adress: '',
        city: '',
        country: '',
        postal_code: '',
        activity_type_id: '',
        creator_id: '', // Utilisé pour le bénévole sélectionné
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [filter, setFilter] = useState(''); // Pour la recherche des bénévoles
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().slice(0, 16); // Formater en YYYY-MM-DDTHH:MM
        setCurrentDate(formattedDate);
    }, []);

    useEffect(() => {
        async function fetchActivityTypes() {
            try {
                const response = await axiosClient.get('/api/activityType');
                setActivityTypes(response.data.activityTypes);
            } catch (error) {
                setError(t('An error occurred while fetching activity types.'));
                console.error('Error:', error);
            }
        }

        fetchActivityTypes();
    }, [t]);

    useEffect(() => {
        async function fetchVolunteers() {
            try {
                const response = await axiosClient.get('/api/volunteerAdmin');
                console.log('Volunteers Response:', response.data);
                setVolunteers(response.data); // Assurez-vous que c'est un tableau d'objets
            } catch (error) {
                setError(t('An error occurred while fetching volunteers.'));
                console.error('Error:', error);
            }
        }

        fetchVolunteers();
    }, [t]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleVolunteerChange = (e) => {
        // Mettre à jour creator_id avec l'identifiant du bénévole sélectionné
        setFormData({ ...formData, creator_id: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        // Validation des dates
        const startDateTime = new Date(formData.start_datetime);
        const endDateTime = new Date(formData.end_datetime);

        if (startDateTime >= endDateTime) {
            setError(t('End date must be after start date.'));
            return;
        }

        const now = new Date();
        if (startDateTime < now || endDateTime <= now) {
            setError(t('Activity cannot be scheduled for today.'));
            return;
        }

        if ((endDateTime - startDateTime) < 60 * 60 * 1000) { // Moins de 1 heure
            setError(t('End date must be at least 1 hour after start date.'));
            return;
        }

        try {
            const response = await axiosClient.post('/api/activity', formData);
            setSuccessMessage(t('Activity created successfully.'));
            setFormData({
                name: '',
                description: '',
                max_participants: '',
                start_datetime: '',
                end_datetime: '',
                adress: '',
                city: '',
                country: '',
                postal_code: '',
                activity_type_id: '',
                creator_id: '', // Réinitialiser le champ creator_id
            });
        } catch (error) {
            setError(t(error.response?.data?.error || 'An error occurred while creating the activity.'));
            console.error('Error:', error);
        }
    };

    const filteredVolunteers = (volunteers || []).filter(volunteer =>
        `${volunteer.first_name} ${volunteer.last_name}`.toLowerCase().includes(filter.toLowerCase()) ||
        (volunteer.email || '').toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center mb-8">
                {t('Add New Activity')}
            </h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">{error}</strong>
                </div>
            )}

            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">{successMessage}</strong>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">{t('Activity Name')}</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700">{t('Description')}</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="max_participants" className="block text-gray-700">{t('Max Participants')}</label>
                    <input
                        type="number"
                        id="max_participants"
                        name="max_participants"
                        value={formData.max_participants}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="start_datetime" className="block text-gray-700">{t('Start Date and Time')}</label>
                    <input
                        type="datetime-local"
                        id="start_datetime"
                        name="start_datetime"
                        value={formData.start_datetime}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                        min={currentDate} // Empêche la sélection d'une date antérieure à aujourd'hui
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="end_datetime" className="block text-gray-700">{t('End Date and Time')}</label>
                    <input
                        type="datetime-local"
                        id="end_datetime"
                        name="end_datetime"
                        value={formData.end_datetime}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                        min={currentDate} // Empêche la sélection d'une date antérieure à aujourd'hui
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="adress" className="block text-gray-700">{t('Address')}</label>
                    <input
                        type="text"
                        id="adress"
                        name="adress"
                        value={formData.adress}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="city" className="block text-gray-700">{t('City')}</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="country" className="block text-gray-700">{t('Country')}</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="postal_code" className="block text-gray-700">{t('Postal Code')}</label>
                    <input
                        type="text"
                        id="postal_code"
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="activity_type_id" className="block text-gray-700">{t('Activity Type')}</label>
                    <select
                        id="activity_type_id"
                        name="activity_type_id"
                        value={formData.activity_type_id}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="">{t('Select an activity type')}</option>
                        {activityTypes.map(activityType => (
                            <option key={activityType.id} value={activityType.id}>
                                {activityType.name}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="flex mb-4 space-x-4">
                    <div className="flex-1">
                        <label htmlFor="volunteer_search" className="block text-gray-700">{t('Search Volunteer')}</label>
                        <input
                            type="text"
                            id="volunteer_search"
                            placeholder={t('Search by name or email')}
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="flex-1">
                        <label htmlFor="creator_id" className="block text-gray-700">{t('Select Volunteer')}</label>
                        <select
                            id="creator_id"
                            name="creator_id"
                            value={formData.creator_id}
                            onChange={handleVolunteerChange}
                            className="block w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="">{t('Select a volunteer')}</option>
                            {filteredVolunteers.length > 0 ? (
                                filteredVolunteers.map(volunteer => (
                                    <option key={volunteer.id} value={volunteer.id}>
                                        {`${volunteer.first_name} ${volunteer.last_name}`} ({volunteer.email})
                                    </option>
                                ))
                            ) : (
                                <option value="">{t('No volunteers found')}</option>
                            )}
                        </select>
                    </div>
                </div>

                <button type="submit" className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded">
                    {t('Add Activity')}
                </button>
            </form>
        </div>
    );
}
