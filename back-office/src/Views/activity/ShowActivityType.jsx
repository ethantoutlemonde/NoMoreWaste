import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios-client';
import { useTranslation } from 'react-i18next';

export default function ActivityTypeShow() {
    const [activityTypes, setActivityTypes] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [editingActivityType, setEditingActivityType] = useState(null);
    const [formData, setFormData] = useState({});
    const [filter, setFilter] = useState('');
    const { t } = useTranslation('global');
    const [documentTypes, setDocumentTypes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axiosClient.get("/api/activityType");
                setActivityTypes(response.data.activityTypes);
            } catch (error) {
                setError(error.message || t('An error occurred while fetching activity types.'));
                console.error('Error:', error);
            }
        }

        fetchData();
        fetchDocumentTypes();
    }, [t]);

    const fetchDocumentTypes = async () => {
        try {
            const response = await axiosClient.get("/api/documentType");
            setDocumentTypes(response.data);
        } catch (error) {
            setError(error.message || t('An error occurred while fetching document types.'));
            console.error('Error:', error);
        }
    };

    const handleDelete = async (id) => {
        setError('');
        setSuccessMessage('');
        const confirmDelete = window.confirm(t('Are you sure you want to delete this activity type?'));
        if (confirmDelete) {
            try {
                await axiosClient.delete(`/api/activityType/${id}`);
                setActivityTypes(activityTypes.filter(activityType => activityType.id !== id));
                setSuccessMessage(t('Activity type deleted successfully.'));
            } catch (error) {
                setError(error.message || t('An error occurred while deleting the activity type.'));
                console.error('Error:', error);
                if (error.response.status === 500) {
                    setError(t("This Activity Type is used in a stock, you can't delete it"));
                }
            }
        }
    };

    const handleEdit = (activityType) => {
        const documentIds = activityType.required_documents.map(doc => doc.id);
        setEditingActivityType(activityType);
        setFormData({ ...activityType, documentTypes: documentIds });
    };

    const handleCloseModal = () => {
        setEditingActivityType(null);
        setFormData({});
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDocumentChange = (e) => {
        const documentId = parseInt(e.target.value);
        if (e.target.checked) {
            setFormData({
                ...formData,
                documentTypes: [...(formData.documentTypes || []), documentId],
            });
        } else {
            setFormData({
                ...formData,
                documentTypes: formData.documentTypes.filter(id => id !== documentId),
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await axiosClient.put(`/api/activityType/${editingActivityType.id}`, formData);

            if (response.status === 200) {
                setSuccessMessage(t('Activity type updated successfully.'));
                setEditingActivityType(null);
                const updatedActivityTypes = activityTypes.map(activityType => {
                    if (activityType.id === editingActivityType.id) {
                        return {
                            ...activityType,
                            name: formData.name,
                            required_documents: documentTypes.filter(doc => formData.documentTypes.includes(doc.id)),
                        };
                    } else {
                        return activityType;
                    }
                });
                setActivityTypes(updatedActivityTypes);
            } else {
                console.error('Failed to update activity type');
            }
        } catch (error) {
            setError(t(error.response?.data?.error || 'This activity type already exists.'));
            console.error('Error:', error);
        }
    };

    const filteredActivityTypes = activityTypes.filter(activityType =>
        activityType.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
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

            <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center mb-8">
                {t('Activity Type List')}
            </h2>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder={t('Search activity type')}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredActivityTypes.map((activityType) => (
                    <div key={activityType.id} className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="font-semibold text-lg mb-2">{activityType.name}</h3>
                        <button onClick={() => handleEdit(activityType)} className="m-2 bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 rounded mt-2">
                            {t('Edit')}
                        </button>
                        <button onClick={() => handleDelete(activityType.id)} className="m-2 bg-red-500 text-white px-4 py-2 rounded mt-2">
                            {t('Delete')}
                        </button>
                    </div>
                ))}
            </div>

            {editingActivityType && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-full">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            onClick={handleCloseModal}
                        >
                            &times;
                        </button>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4 text-center">{t('Edit Activity Type')}</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">{t('Activity Type')}</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                                className="block w-full p-2 border border-gray-300 rounded mt-2 mb-4"
                            />
                            <label htmlFor="">Documents Required</label>
                            {documentTypes.map(documentType => (
                                <div key={documentType.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={documentType.id}
                                        name="documentTypes"
                                        value={documentType.id}
                                        checked={formData.documentTypes?.includes(documentType.id) || false}
                                        onChange={handleDocumentChange}
                                    />
                                    <label htmlFor={documentType.id} className="ml-2">{documentType.name}</label>
                                </div>
                            ))}
                            <button type="submit" className="m-2 bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 rounded mt-2">
                                {t('Validate')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
