import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function PartnerLayout() {
    const { t } = useTranslation("global");
    return (
        <>
        <div className='flex gap-4'>
            <NavLink to={'/partner/supermarkets/show'} className={({ isActive }) => 
                    isActive 
                    ? 'bg-white p-2 rounded-lg border hover:bg-gray-50 hover:shadow' 
                    : 'bg-white p-2 rounded-lg hover:bg-gray-50 hover:shadow'
                } >{t("My Supermarkets")}
            </NavLink>
            <NavLink to={'/partner/supermarkets/add'} className={({ isActive }) => 
                    isActive 
                    ? 'bg-white p-2 rounded-lg border hover:bg-gray-50 hover:shadow' 
                    : 'bg-white p-2 rounded-lg hover:bg-gray-50 hover:shadow'
                } >{t("Add Supermarket")}
            </NavLink>
        </div>
        </>
    )
}