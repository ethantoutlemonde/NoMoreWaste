import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


export default function TabbedPage() {
    const [activeTab, setActiveTab] = useState('add'); // Initialisez l'onglet actif ici pour voir directement l'onglet Add Product au démarrage
    const { t } = useTranslation("global");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="md:flex">
            <ul className="flex-column space-y-4 text-sm font-medium text-gray-500 md:me-4 mb-4 md:mb-0">
                <li>
                    <NavLink to="show" className={({ isActive }) => 
                        isActive 
                        ? 'inline-flex items-center px-4 py-3 rounded-lg text-white bg-purple-600 hover:bg-purple-500 w-full' 
                        : 'inline-flex items-center px-4 py-3 rounded-lg text-white bg-purple-400 hover:bg-purple-300 w-full'
                    }>{t("Manage Product")}</NavLink>
                </li>
                <li>
                    <NavLink to="Add" className={({ isActive }) => 
                        isActive 
                        ? 'inline-flex items-center px-4 py-3 rounded-lg text-white bg-purple-600 hover:bg-purple-500 w-full' 
                        : 'inline-flex items-center px-4 py-3 rounded-lg text-white bg-purple-400 hover:bg-purple-300 w-full'
                    }>{t("Add Product")}</NavLink>
                </li>
            </ul>
            <div className="p-6 bg-gray-50 text-medium text-gray-500 rounded-lg w-full">
                <Outlet />
            </div>
        </div>
    );
}
