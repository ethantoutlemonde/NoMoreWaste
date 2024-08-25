import React, { useState } from 'react';
import AddProduct from '../Views/stock/AddProduct';
import ShowProduct from '../Views/stock/ShowStock';
import ShowFoodAidProduct from '../Views/stock/ShowFoodAidProduct';
import { useTranslation } from "react-i18next";

export default function TabbedPage() {
    const [activeTab, setActiveTab] = useState('add'); // Initialisez l'onglet actif ici pour voir directement l'onglet Add Product au démarrage
    const { t } = useTranslation("global");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="md:flex">
            <ul className="flex-column space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                <li>
                    <a
                        href="#"
                        className={`inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white ${activeTab === 'add' ? 'bg-gray-100 text-gray-900' : ''}`}
                        onClick={() => handleTabClick('add')}
                    >
                        {t("Add Product")}
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className={`inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white ${activeTab === 'modify' ? 'bg-gray-100 text-gray-900' : ''}`}
                        onClick={() => handleTabClick('modify')}
                    >
                        {t("Manage Product")}
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className={`inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white ${activeTab === 'aid' ? 'bg-gray-100 text-gray-900' : ''}`}
                        onClick={() => handleTabClick('aid')}
                    >
                        {t("Food Aid Product")}
                    </a>
                </li>
            </ul>
            <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                {activeTab === 'modify' && (
                    <ShowProduct />
                )}
                {activeTab === 'add' && (
                    <AddProduct />
                )}
                {activeTab === 'aid' && (
                    <ShowFoodAidProduct />
                )}
            </div>
        </div>
    );
}
