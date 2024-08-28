import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function TabbedPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const {t} = useTranslation("global");
    
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="md:flex">
            <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                <li>
                    <NavLink to="show" className={({ isActive }) => 
                        isActive 
                        ? 'inline-flex items-center px-4 py-3 rounded-lg text-white bg-teal-600 hover:bg-teal-500 w-full' 
                        : 'inline-flex items-center px-4 py-3 rounded-lg text-white bg-teal-400 hover:bg-teal-300 w-full'
                    }>{t("Recipes")}</NavLink>
                </li>
                <li>
                    <NavLink to="add" className={({ isActive }) => 
                        isActive 
                        ? 'inline-flex items-center px-4 py-3 rounded-lg text-white bg-teal-600 hover:bg-teal-500 w-full' 
                        : 'inline-flex items-center px-4 py-3 rounded-lg text-white bg-teal-400 hover:bg-teal-300 w-full'
                    }>{t("Add Recipes")}</NavLink>
                </li>
            </ul>
            <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                <Outlet />
            </div>
        </div>
    );
}
