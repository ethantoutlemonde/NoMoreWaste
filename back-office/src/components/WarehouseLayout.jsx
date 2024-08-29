import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";

export default function Warehouse() {
    const [activeTab, setActiveTab] = useState("profile");
    const { t } = useTranslation("global");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="md:flex">
            <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 md:me-4 mb-4 md:mb-0">
                <li>
                    <NavLink to="show" className={({ isActive }) => 
                        isActive 
                        ? 'inline-flex items-center px-4 py-3 rounded-lg text-white bg-purple-600 hover:bg-purple-500 w-full' 
                        : 'inline-flex items-center px-4 py-3 rounded-lg text-white bg-purple-400 hover:bg-purple-300 w-full'
                    }>{t("Modify Warehouse")}</NavLink>
                </li>
                <li>
                    <NavLink to="add" className={({ isActive }) => 
                        isActive 
                        ? 'inline-flex items-center px-4 py-3 rounded-lg text-white bg-purple-600 hover:bg-purple-500 w-full' 
                        : 'inline-flex items-center px-4 py-3 rounded-lg text-white bg-purple-400 hover:bg-purple-300 w-full'
                    }>{t("Add Warehouse")}</NavLink>
                </li>
            </ul>
            <div className="p-6 bg-gray-50 text-medium text-gray-500 rounded-lg w-full">
                <Outlet />
            </div>
        </div>
    );
}
