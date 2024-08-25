import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axiosClient from "../../axios-client";  // Remplace axios par axiosClient

export default function AddWarehouse() {
    const [warehouseName, setWarehouseName] = useState("");
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { t } = useTranslation("global");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await axiosClient.post(
                "/api/warehouse",
                {
                    warehouse_name: warehouseName,
                    location: location,
                }
            );

            if (response.status === 201) {
                // Si le statut est 201 (Created)
                setSuccessMessage(t(response.data.message));
                // Réinitialiser les champs du formulaire après l'envoi réussi
                setWarehouseName("");
                setLocation("");
            } else {
                console.error("Failed to add warehouse");
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.error
            ) {
                setError(t(error.response.data.error));
            } else {
                setError(
                    t("An error occurred while adding the warehouse.")
                );
            }
            console.error("Error:", error);
        }
    };

    return (
        <div>
            {error && (
                <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                    role="alert"
                >
                    <strong className="font-bold">{t("Error")}: </strong>
                    <span className="block sm:inline">
                        {error}
                    </span>
                </div>
            )}
            {successMessage && (
                <div
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                    role="alert"
                >
                    <strong className="font-bold">{t("Success")}: </strong>
                    <span className="block sm:inline">
                        {successMessage}
                    </span>
                </div>
            )}
            <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center mb-8">
                {t("Add Warehouse")}
            </h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        value={warehouseName}
                        onChange={(e) => setWarehouseName(e.target.value)}
                        style={{ color: "#000" }}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        {t("Warehouse Name")}
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        style={{ color: "#000" }}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        {t("Location")}
                    </label>
                </div>
                <button
                    type="submit"
                    className="text-white bg-purple-600 hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                    {t("Add")}
                </button>
            </form>
        </div>
    );
}
