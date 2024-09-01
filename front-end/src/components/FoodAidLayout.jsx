import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function FoodAidLayout() {
    const { t } = useTranslation("global");
    return (
        <div className="container-80 p-10 bg-gray-50 rounded-3xl">
            <h1 className="text-2xl mb-2">{t("Food Aid")}</h1>
            <div className="flex gap-2">
                <NavLink to="/volunteer/foodAid/food_collection" className={({ isActive }) => 
                        isActive 
                        ? 'bg-blue-500 text-white p-2 rounded-lg border hover:shadow' 
                        : 'bg-white p-2 rounded-lg hover:bg-gray-50 hover:shadow'
                    }>{t("Food Collections")}
                </NavLink>
                <NavLink to="/volunteer/foodAid/outreach" className={({ isActive }) => 
                        isActive 
                        ? 'bg-blue-500 text-white p-2 rounded-lg border hover:shadow' 
                        : 'bg-white p-2 rounded-lg hover:bg-gray-50 hover:shadow'
                    }>{t("Outreachs")}
                </NavLink>
            </div>

            <div className="mt-4">
                <Outlet />
            </div>

        </div>
    )
}