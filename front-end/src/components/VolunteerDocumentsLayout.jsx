import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";



export default function VolunteerDocumentsLayout() {
    const [activityTypes, setActivityTypes] = useState([]);
    const { t } = useTranslation("global");

    useEffect(() => {
        axiosClient.get('/api/activityType')
        .then(response => {
            console.log(response.data.activityTypes)
            setActivityTypes(response.data.activityTypes)
        })
        .catch(error => {
            console.log(error)
        })
    }, []);
    return (
        <>
        <div className="container-80 p-10 bg-gray-50 rounded-3xl">
            <h1 className="text-2xl mb-2">{t("Volunteer Documents")}</h1>
            <h2 className="mb-2">{t("Choose the aid type")} :</h2>
            <div className="flex gap-2">

                {activityTypes.map(type => (
                    <NavLink to={`/volunteer/documents/${type.id}`} key={type.id} className={({ isActive }) => 
                        isActive 
                        ? 'bg-blue-500 text-white p-2 rounded-lg border hover:shadow' 
                        : 'bg-white p-2 rounded-lg hover:bg-gray-50 hover:shadow'
                    }>{t(type.name)}
                    </NavLink>
                ))}




                <NavLink to="/volunteer/documents/food_collection" className={({ isActive }) => 
                        isActive 
                        ? 'bg-blue-500 text-white p-2 rounded-lg border hover:shadow' 
                        : 'bg-white p-2 rounded-lg hover:bg-gray-50 hover:shadow'
                    }>{t("Food Collection")}
                </NavLink>
                <NavLink to="/volunteer/documents/outreach" className={({ isActive }) => 
                        isActive 
                        ? 'bg-blue-500 text-white p-2 rounded-lg border hover:shadow' 
                        : 'bg-white p-2 rounded-lg hover:bg-gray-50 hover:shadow'
                    }>{t("Outreach")}
                </NavLink>
            </div>

            <div className="mt-4">
                <Outlet />
            </div>

        </div>
            
        </>
    )
}