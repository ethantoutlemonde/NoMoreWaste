import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from "../hooks/auth";
import axiosClient from "../axios-client";
import { useNavigate } from 'react-router-dom';

export default function Profil() {
    const { t } = useTranslation("global");
    const { user, logout } = useAuth({ middleware: 'auth' });
    const [firstName, setFirstName] = useState(user.first_name || '');
    const [lastName, setLastName] = useState(user.last_name || '');
    const [email, setEmail] = useState(user.email || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState('');
    const [error, setError] = useState({});
    const [success, setSuccess] = useState({});

    // Fonction pour mettre à jour le profil utilisateur
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({});
        setSuccess({});

        if (password !== confirmPassword) {
            setError({'password': t('Passwords do not match!')});
            return;
        }

        const updatedUser = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            ...(password && { password: password, password_confirmation: confirmPassword })
        };

        try {
            const response = await axiosClient.patch(`/api/users/${user.id}`, updatedUser);
            setSuccess(response.data.success);
        } catch (error) {
            console.error(error);
            setError(error.response.data.error);
        }
    };

    const handleDeleteAccount = async () => {
        setError({});
        setSuccess({});
    
        if (deleteConfirmation === `Delete${user.email}`) {
            try {
                const response = await axiosClient.delete(`/api/users/${user.id}`);
                setSuccess(response.data.success ? response.data.success.toString() : 'Account deleted successfully');
                logout();
                useNavigate('/');
            } catch (error) {
                console.error(error);
                const errorMessage = error.response?.data?.error;
    
                // Handle the error message appropriately depending on its type
                if (typeof errorMessage === 'string') {
                    setError(errorMessage);
                } else if (typeof errorMessage === 'object') {
                    // Join object values to a string or handle as needed
                    setError(Object.values(errorMessage).join(', '));
                } else {
                    setError('An unexpected error occurred.');
                }
            }
        } else {
            setError(`Incorrect confirmation. Please type "Delete${user.email}" to confirm.`);
        }
    };
    

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6">{t('Profile')}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
            {typeof error.error === 'string' && <div className="text-red-500">{error.error}</div>}
            {typeof success === 'string' && <div className="text-green-500">{success}</div>}

                <div>
                    <label className="block text-sm font-medium text-gray-700">{t('First Name')}</label>
                    <input 
                        type="text" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                    />
                    {error.first_name && <p className="text-red-500">{error.first_name}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t('Last Name')}</label>
                    <input 
                        type="text" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                    />
                    {error.last_name && <p className="text-red-500">{error.last_name}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t('Email')}</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                    />
                    {error.email && <p className="text-red-500">{error.email}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t('Phone')}</label>
                    <input 
                        type="tel" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                    />
                    {error.phone && <p className="text-red-500">{error.phone}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t('New Password')}</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                    />
                    {error.password && <p className="text-red-500">{error.password}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t('Confirm New Password')}</label>
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                    />
                </div>
                <div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        {t('Update Profile')}
                    </button>
                </div>
            </form>

            <div className="mt-6">
                <button 
                    onClick={() => setShowDeleteModal(true)} 
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                    {t('Delete Account')}
                </button>
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">{t('Confirm Account Deletion')}</h2>
                        <p className="mb-4">{t('Please type "Delete')}{ user.email} {t('to confirm.')}</p>
                        <input 
                            type="text" 
                            value={deleteConfirmation} 
                            onChange={(e) => setDeleteConfirmation(e.target.value)} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-4"
                        />
                        {error && typeof error === 'string' && <p className="text-red-500 mb-4">{error}</p>}

                        <div className="flex justify-end space-x-2">
                            <button 
                                onClick={() => setShowDeleteModal(false)} 
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                                {t('Cancel')}
                            </button>
                            <button 
                                onClick={handleDeleteAccount} 
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                                {t('Delete Account')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
