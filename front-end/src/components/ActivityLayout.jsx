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
        <div className="md:flex m-2">
            <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 md:me-4 mb-4 md:mb-0 mt-2">
                <li>
                    <NavLink to="show" className={({ isActive }) => 
                        isActive 
                        ? 'inline-flex items-center px-4 py-3 rounded-lg text-white bg-rose-600 hover:bg-rose-500 w-full' 
                        : 'inline-flex items-center px-4 py-3 rounded-lg text-white bg-rose-400 hover:bg-rose-300 w-full'
                    }>{t("Modify Activity")}</NavLink>
                </li>
                <li>
                    <NavLink to="add" className={({ isActive }) => 
                        isActive 
                        ? 'inline-flex items-center px-4 py-3 rounded-lg text-white bg-rose-600 hover:bg-rose-500 w-full' 
                        : 'inline-flex items-center px-4 py-3 rounded-lg text-white bg-rose-400 hover:bg-rose-300 w-full'
                    }>{t("Add Activity")}</NavLink>
                </li>
            </ul>
            <div className="p-6 bg-gray-50 text-medium text-gray-500 rounded-lg w-full">
                <Outlet />
            </div>
        </div>
    );
}
