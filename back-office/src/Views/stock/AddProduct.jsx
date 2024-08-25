import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios-client'; 
import { useTranslation } from 'react-i18next';

export default function AddProduct() {
    const [productTypes, setProductTypes] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const { t } = useTranslation();

    const [data, setData] = useState({
        product_name: "",
        description: "",
        quantity: "",
        product_type_id: "",
        warehouse_id: "",
        expiration_date: "",
        barcode: "",
    });

    useEffect(() => {
        async function fetchProductTypes() {
            try {
                const response = await axiosClient.get('/api/productType');
                setProductTypes(response.data.productTypes);
            } catch (error) {
                setError(t('Product types loading error.'));
                console.error('Error fetching product types:', error);
            }
        }

        async function fetchWarehouses() {
            try {
                const response = await axiosClient.get('/api/warehouse');
                setWarehouses(response.data.warehouses);
            } catch (error) {
                setError(t('Error loading warehouses.'));
                console.error('Error fetching warehouses:', error);
            }
        }

        fetchProductTypes();
        fetchWarehouses();
    }, [t]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosClient.post('/api/product', data);

            if (response.status === 201) {
                setSuccessMessage(t('Product added successfully!'));
                setData({
                    product_name: "",
                    description: "",
                    quantity: "",
                    product_type_id: "",
                    warehouse_id: "",
                    expiration_date: "",
                    barcode: "",
                });
            } else {
                console.error('Failed to add product');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError(t('Error adding product.'));
            }
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {/* Affichage des erreurs */}
            {error && (
                <div className="text-red-500 mb-4 text-center">
                    {t(error)}
                </div>
            )}

            {/* Affichage du message de succès */}
            {successMessage && (
                <div className="text-green-500 mb-4 text-center">
                    {t(successMessage)}
                </div>
            )}

            <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center mb-8">
                {t("Add product")}
            </h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                {/* Product Name Input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        value={data.product_name}
                        onChange={(e) => setData({ ...data, product_name: e.target.value })}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        {t("Product name")}
                    </label>
                </div>
                {/* Description Input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        value={data.description}
                        onChange={(e) => setData({ ...data, description: e.target.value })}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        {t("Description")}
                    </label>
                </div>
                {/* Quantity Input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        value={data.quantity}
                        onChange={(e) => setData({ ...data, quantity: e.target.value })}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        {t("Quantity")}
                    </label>
                </div>
                {/* Product Type Dropdown */}
                <div className="relative z-0 w-full mb-5 group">
                    <select
                        value={data.product_type_id}
                        onChange={(e) => setData({ ...data, product_type_id: e.target.value })}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        required
                    >
                        <option value="">{t("Product Type")}</option>
                        {productTypes.map((type) => (
                            <option key={type.id} value={type.id}>{type.product_type}</option>
                        ))}
                    </select>
                    <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        {t("Product Type")}
                    </label>
                </div>
                {/* Warehouse Dropdown */}
                <div className="relative z-0 w-full mb-5 group">
                    <select
                        value={data.warehouse_id}
                        onChange={(e) => setData({ ...data, warehouse_id: e.target.value })}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        required
                    >
                        <option value="">{t("Warehouse")}</option>
                        {warehouses.map((warehouse) => (
                            <option key={warehouse.id} value={warehouse.id}>{warehouse.warehouse_name}</option>
                        ))}
                    </select>
                    <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        {t("Warehouse")}
                    </label>
                </div>

                {/* Expiration Date Input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="date"
                        value={data.expiration_date}
                        onChange={(e) => setData({ ...data, expiration_date: e.target.value })}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        required
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        {t("Expiration Date")}
                    </label>
                </div>
                {/* Barcode Input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        value={data.barcode}
                        onChange={(e) => setData({ ...data, barcode: e.target.value })}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        {t("Barcode")}
                    </label>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {t("Add Product")}
                </button>
            </form>
        </div>
    );
}
