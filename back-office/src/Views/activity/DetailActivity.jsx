import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axiosClient from "../../axios-client"
import { useTranslation } from "react-i18next"
import ActivityParticipants from "./ActivityParticipants"

export default function DetailActivity() {
    const { id } = useParams()
    const [activityTypes, setActivityTypes] = useState([])
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({})
    const [filter, setFilter] = useState('');
    const [volunteers, setVolunteers] = useState([]);
    const [success, setSuccess] = useState(false);


    const { t } = useTranslation('global');


    useEffect(() => {
        console.log("Detail Activity")
        fetchActivities()
        fetchActivityTypes()
        fetchVolunteers()
    }, [])

    const fetchActivities = () => {
        axiosClient.get(`/api/activity/${id}`)
        .then (response => {
            console.log(response.data)
            setFormData(response.data.activity)
            setLoading(false)
            
        })
        .catch (error => {
            console.log(error)
            setErrors(error)
        })
    }

    async function fetchVolunteers() {
        try {
            const response = await axiosClient.get('/api/volunteerAdmin');
            console.log('Volunteers Response:', response.data);
            setVolunteers(response.data); // Assurez-vous que c'est un tableau d'objets
        } catch (error) {
            setErrors(t('An error occurred while fetching volunteers.'));
            console.error('Error:', error);
        }
    }

    // const formatDateTimeWithoutSeconds = (dateTime) => {
    //     console.log("dateTime", dateTime)
    //     const date = new Date(dateTime);
    //     const hours = String(date.getHours()).padStart(2, '0');
    //     const minutes = String(date.getMinutes()).padStart(2, '0');
    //     const formattedDate = date.toISOString().split('T')[0];
    //     return `${formattedDate}T${hours}:${minutes}`;
    // };

    const fetchActivityTypes = async () => {
        try {
            const response = await axiosClient.get('/api/activityType');
            console.log('Activity Types:', response.data.activityTypes); // Log the types
            setActivityTypes(response.data.activityTypes);
        } catch (error) {
            console.error('Error fetching activity types:', error);
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(null);
        setSuccess(false);
        try {
            await axiosClient.put(`/api/activity/${formData.id}`, formData);
            fetchActivities()
            setSuccess(true);
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error updating activity:', error);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosClient.delete(`/api/activity/${id}`);
            fetchActivities();

        } catch (error) {
            console.error('Error deleting activity:', error);
        }
    };

    const handleVolunteerChange = (e) => {
        // Mettre à jour creator_id avec l'identifiant du bénévole sélectionné
        setFormData({ ...formData, creator_id: e.target.value });
    };

    const filteredVolunteers = (volunteers || []).filter(volunteer =>
        `${volunteer.first_name} ${volunteer.last_name}`.toLowerCase().includes(filter.toLowerCase()) ||
        (volunteer.email || '').toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="grid grid-cols-2">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative">
                {loading ? <p>{t('Loading...')} </p> : <>
                <h2 className="text-xl font-semibold mb-4">{formData.name}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="name" className="block text-gray-700">{t('Activity Name')}</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData?.name}
                                onChange={handleChange}
                                className={`block w-full p-2 border ${errors?.name ? 'border-red-500' : 'border-gray-300'} rounded`}
                                required
                            />
                            {errors?.name && <p className="text-red-500 text-sm">{errors?.name[0]}</p>}
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-gray-700">{t('Description')}</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData?.description}
                                onChange={handleChange}
                                className={`block w-full p-2 border ${errors?.description ? 'border-red-500' : 'border-gray-300'} rounded`}
                            />
                            {errors?.description && <p className="text-red-500 text-sm">{errors?.description[0]}</p>}
                        </div>

                        <div>
                            <label htmlFor="start_datetime" className="block text-gray-700">{t('Start Date and Time')}</label>
                            <input
                                type="datetime-local"
                                id="start_datetime"
                                name="start_datetime"
                                value={formData?.start_datetime}
                                onChange={handleChange}
                                className={`block w-full p-2 border ${errors?.start_datetime ? 'border-red-500' : 'border-gray-300'} rounded`}
                                required
                            />
                            {errors?.start_datetime && <p className="text-red-500 text-sm">{errors?.start_datetime[0]}</p>}
                        </div>

                        <div>
                            <label htmlFor="end_datetime" className="block text-gray-700">{t('End Date and Time')}</label>
                            <input
                                type="datetime-local"
                                id="end_datetime"
                                name="end_datetime"
                                value={formData?.end_datetime}
                                onChange={handleChange}
                                className={`block w-full p-2 border ${errors?.end_datetime ? 'border-red-500' : 'border-gray-300'} rounded`}
                                required
                            />
                            {errors?.end_datetime && <p className="text-red-500 text-sm">{errors?.end_datetime[0]}</p>}
                        </div>

                        <div>
                            <label htmlFor="adress" className="block text-gray-700">{t('Address')}</label>
                            <input
                                type="text"
                                id="adress"
                                name="adress"
                                value={formData?.adress}
                                onChange={handleChange}
                                className={`block w-full p-2 border ${errors?.adress ? 'border-red-500' : 'border-gray-300'} rounded`}
                            />
                            {errors?.adress && <p className="text-red-500 text-sm">{errors?.adress[0]}</p>}
                        </div>

                        <div>
                            <label htmlFor="city" className="block text-gray-700">{t('City')}</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData?.city}
                                onChange={handleChange}
                                className={`block w-full p-2 border ${errors?.city ? 'border-red-500' : 'border-gray-300'} rounded`}
                            />
                            {errors?.city && <p className="text-red-500 text-sm">{errors?.city[0]}</p>}
                        </div>

                        <div>
                            <label htmlFor="country" className="block text-gray-700">{t('Country')}</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={formData?.country}
                                onChange={handleChange}
                                className={`block w-full p-2 border ${errors?.country ? 'border-red-500' : 'border-gray-300'} rounded`}
                            />
                            {errors?.country && <p className="text-red-500 text-sm">{errors?.country[0]}</p>}
                        </div>

                        <div>
                            <label htmlFor="postal_code" className="block text-gray-700">{t('Postal Code')}</label>
                            <input
                                type="text"
                                id="postal_code"
                                name="postal_code"
                                value={formData?.postal_code}
                                onChange={handleChange}
                                className={`block w-full p-2 border ${errors?.postal_code ? 'border-red-500' : 'border-gray-300'} rounded`}
                            />
                            {errors?.postal_code && <p className="text-red-500 text-sm">{errors?.postal_code[0]}</p>}
                        </div>

                        <div>
                            <label htmlFor="activity_type_id" className="block text-gray-700">{t('Activity Type')}</label>
                            <select
                                id="activity_type_id"
                                name="activity_type_id"
                                value={formData?.activity_type_id}
                                onChange={handleChange}
                                className={`block w-full p-2 border ${errors?.activity_type_id ? 'border-red-500' : 'border-gray-300'} rounded`}
                                required
                            >
                                <option value="" disabled>{t('Select Activity Type')}</option>
                                {activityTypes.map(type => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            {errors?.activity_type_id && <p className="text-red-500 text-sm">{errors?.activity_type_id[0]}</p>}
                        </div>
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

                    <div className="flex justify-between">
                        <button type="submit" className="bg-rose-500 hover:bg-rose-400 text-white px-4 py-2 rounded">
                            {t('Save Changes')}
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDelete(formData.id)}
                            className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded"
                        >
                            {t('Delete')}
                        </button>
                    </div>
                </form>
                {success && <p className="text-green-500">{t('Activity updated successfully.')}</p>}
                </>}
            </div>
            <div className="h-4/5">
                <ActivityParticipants activity_id={id}/>
            </div>
        </div>
    )
}