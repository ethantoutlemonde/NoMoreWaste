import React, { useState, useEffect } from 'react';
import axiosClient from "../../axios-client";
import { useTranslation } from "react-i18next";

export default function WarehouseShow() {
    const [warehouses, setWarehouses] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [editingWarehouse, setEditingWarehouse] = useState(null); // État pour l'entrepôt en cours de modification
    const [formData, setFormData] = useState({}); // État pour les données du formulaire de modification
    const { t } = useTranslation("global");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axiosClient.get("/api/warehouse");
                setWarehouses(response.data.warehouses);
            } catch (error) {
                setError(t("An error occurred while fetching warehouses"));
                console.error('Error:', error);
            }
        }

        fetchData();
    }, [t]);

    const handleDelete = async (id) => {
        setError('');
        setSuccessMessage('');
        const confirmDelete = window.confirm(t('Are you sure you want to delete this warehouse?'));
        if (confirmDelete) {
            try {
                const response = await axiosClient.delete(`/api/warehouse/${id}`);
                setWarehouses(warehouses.filter(warehouse => warehouse.id !== id));
                setSuccessMessage(t(response.data.message));
            } catch (error) {
                setError(t("An error occurred while deleting the warehouse"));
                console.error('Error:', error);
            }
        }
    };

    const handleEdit = (warehouse) => {
        if (editingWarehouse && editingWarehouse.id === warehouse.id) {
            setEditingWarehouse(null);
            setFormData({});
        } else {
            setEditingWarehouse(warehouse);
            setFormData({ ...warehouse });
        }
    };
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value }); // Met à jour les données du formulaire lorsqu'un champ est modifié
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccessMessage('');
        try {
            const response = await axiosClient.put(`/api/warehouse/${editingWarehouse.id}`, formData);
            setSuccessMessage(t(response.data.message));
            setEditingWarehouse(null);
            const updatedWarehouses = warehouses.map(warehouse => {
                if (warehouse.id === editingWarehouse.id) {
                    return {
                        ...warehouse,
                        warehouse_name: formData.warehouse_name,
                        location: formData.location
                    };
                } else {
                    return warehouse;
                }
            });
            setWarehouses(updatedWarehouses);
        } catch (error) {
            setError(t("An error occurred while updating the warehouse"));
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">{t('Error')}: </strong>
                    <span>{error}</span>
                </div>
            )}

            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">{t('Success')}: </strong>
                    <span>{successMessage}</span>
                </div>
            )}

            <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center mb-8">
                {t('Warehouse List')}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {warehouses.map((warehouse) => (
                    <div key={warehouse.id} className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="font-semibold text-lg mb-2">{warehouse.warehouse_name}</h3>
                        <p className="text-gray-700">{warehouse.location}</p>
                        <button onClick={() => handleEdit(warehouse)} className=" m-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded mt-2">{t('Edit')}</button>
                        <button onClick={() => handleDelete(warehouse.id)} className=" m-2 bg-red-500 text-white px-4 py-2 rounded mt-2">{t('Delete')}</button>
                    </div>
                ))}
            </div>

            {editingWarehouse && (
                <div className="mt-8">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center mb-4">{t('Edit Warehouse')}</h2>
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                        <label htmlFor="warehouse_name" className="block text-gray-700">{t('Warehouse Name')}</label>
                        <input 
                            type="text" 
                            id="warehouse_name" 
                            name="warehouse_name" 
                            value={formData.warehouse_name || ''} 
                            onChange={handleChange}
                            className="block w-full p-2 border border-gray-300 rounded mt-2 mb-4"
                        />

                        <label htmlFor="location" className="block text-gray-700">{t('Location')}</label>
                        <input 
                            type="text" 
                            id="location" 
                            name="location" 
                            value={formData.location || ''} 
                            onChange={handleChange} 
                            className="block w-full p-2 border border-gray-300 rounded mt-2 mb-4"
                        />

                        <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded mt-2">
                            {t('Validate')}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
