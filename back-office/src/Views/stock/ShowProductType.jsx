import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios-client'; // Utilisation de axiosClient
import { useTranslation } from 'react-i18next';

export default function ProductTypeShow() {
    const [productTypes, setProductTypes] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [editingProductType, setEditingProductType] = useState(null);
    const [formData, setFormData] = useState({});
    const [filter, setFilter] = useState('');
    const { t } = useTranslation('global');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axiosClient.get("/api/productType");
                setProductTypes(response.data.productTypes);
            } catch (error) {
                setError(error.message || t('An error occurred while fetching product types.'));
                console.error('Error:', error);
            }
        }

        fetchData();
    }, [t]);

    const handleDelete = async (id) => {
        setError('');
        setSuccessMessage('');
        const confirmDelete = window.confirm(t('Are you sure you want to delete this product type?'));
        if (confirmDelete) {
            try {
                const response = await axiosClient.delete(`/api/productType/${id}`);
                setProductTypes(productTypes.filter(productType => productType.id !== id));
                setSuccessMessage(t(response.data.message));
            } catch (error) {
                setError(error.message || t('An error occurred while deleting the product type.'));
                console.error('Error:', error);
                if(error.response.status === 500){
                    setError(t("This ProductType is used in a stock, you can't delete it"));
                }
            }
        }
    };

    const handleEdit = (productType) => {
        setEditingProductType(productType);
        setFormData({ ...productType });
    };

    const handleCloseModal = () => {
        setEditingProductType(null);
        setFormData({});
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await axiosClient.put(`/api/productType/${editingProductType.id}`, formData);

            if (response.status === 200) {
                setSuccessMessage(t(response.data.message));
                setEditingProductType(null);
                const updatedProductTypes = productTypes.map(productType => {
                    if (productType.id === editingProductType.id) {
                        return {
                            ...productType,
                            product_type: formData.product_type
                        };
                    } else {
                        return productType;
                    }
                });
                setProductTypes(updatedProductTypes);
            } else {
                console.error('Failed to update product type');
            }
        } catch (error) {
            setError(t(error.response?.data?.error || 'This product type already exists.'));
            console.error('Error:', error);
        }
    };

    const filteredProductTypes = productTypes.filter(productType =>
        productType.product_type.toLowerCase().includes(filter.toLowerCase())
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
                {t('Product Type List')}
            </h2>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder={t('Search product type')}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProductTypes.map((productType) => (
                    <div key={productType.id} className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="font-semibold text-lg mb-2">{productType.product_type}</h3>
                        <button onClick={() => handleEdit(productType)} className="m-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded mt-2">
                            {t('Edit')}
                        </button>
                        <button onClick={() => handleDelete(productType.id)} className="m-2 bg-red-500 text-white px-4 py-2 rounded mt-2">
                            {t('Delete')}
                        </button>
                    </div>
                ))}
            </div>

            {editingProductType && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-full">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            onClick={handleCloseModal}
                        >
                            &times;
                        </button>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4 text-center">{t('Edit Product Type')}</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="product_type">{t('Product Type')}</label>
                            <input
                                type="text"
                                id="product_type"
                                name="product_type"
                                value={formData.product_type || ''}
                                onChange={handleChange}
                                className="block w-full p-2 border border-gray-300 rounded mt-2 mb-4"
                            />
                            <button type="submit" className="m-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded mt-2">
                                {t('Validate')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
