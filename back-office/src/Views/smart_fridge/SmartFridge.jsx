import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios-client';
import { useTranslation } from 'react-i18next';

const SmartFridge = () => {
    const { t } = useTranslation();
    const [warehouses, setWarehouses] = useState([]);
    const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [filter, setFilter] = useState(''); // Initialize filter state
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch Warehouses
    useEffect(() => {
        async function fetchWarehouses() {
            try {
                const response = await axiosClient.get("/api/warehouse");
                setWarehouses(response.data.warehouses);
            } catch (error) {
                setError(t("An error occurred while fetching warehouses"));
                console.error('Error:', error);
            }
        }
        fetchWarehouses();
    }, [t]);

    // Fetch Recipes on Warehouse Change
    const handleWarehouseChange = (e) => {
        setError('');
        setSuccessMessage('');
        const warehouseId = e.target.value;
        setSelectedWarehouseId(warehouseId);
        
        axiosClient.get(`/api/recipes/warehouse/${warehouseId}`)
            .then((response) => {
                setRecipes(response.data);
                setFilteredRecipes(response.data); // Initially display all recipes
                console.log('Fetched recipes:', response.data);
            })
            .catch((error) => {
                setError(error.response.data.error || t('An error occurred while fetching recipes.'));
                console.error('Error:', error);
            });
    };

    // Filter Recipes
    useEffect(() => {
        const filtered = recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredRecipes(filtered);
    }, [filter, recipes]);

    return (
        <div>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">{error}</strong>
                </div>
            )}

            {successMessage && (
                <div className="bg-green-100 border bg-teal-400 hover:bg-teal-300 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">{successMessage}</strong>
                </div>
            )}

            <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center mb-8">
                {t('Recipe List')}
            </h2>

            <div className="mb-4">
                <label htmlFor="warehouse" className="block text-gray-700 text-sm font-bold mb-2">
                    {t('Select Warehouse')}
                </label>
                <select
                    id="warehouse"
                    value={selectedWarehouseId || ''}
                    onChange={handleWarehouseChange}
                    className="block w-full p-2 border border-gray-300 rounded mb-4"
                >
                    <option value="" disabled>{t('Select a Warehouse')}</option>
                    {warehouses.map(warehouse => (
                        <option key={warehouse.id} value={warehouse.id}>{warehouse.warehouse_name}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder={t('Search recipe')}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)} // Update filter state on input change
                    className="block w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredRecipes.length === 0 ? (
                    <p>{t('No recipes found')}</p>
                ) : (
                    filteredRecipes.map((recipe) => (
                        <div key={recipe.id} className="bg-white shadow-md rounded-lg p-4">
                            <h3 className="font-semibold text-lg mb-2">{recipe.name}</h3>
                            <h3 className="font-semibold text-lg mb-2">{recipe.ingredients.join(' / ')}</h3>
                            <p>{recipe.instructions}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SmartFridge;
