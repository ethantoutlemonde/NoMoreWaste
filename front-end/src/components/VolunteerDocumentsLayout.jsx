import { useTranslation } from "react-i18next";
import { Link, NavLink, Outlet } from "react-router-dom";


export default function VolunteerDocumentsLayout() {
    const { t } = useTranslation("global");
    return (
        <>
        <div className="container-80 p-10 bg-gray-50 rounded-3xl">
            <h1 className="text-2xl mb-2">{t("Volunteer Documents")}</h1>
            <h2 className="mb-2">{t("Choose the aid type")} :</h2>
            <div className="flex gap-2">
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