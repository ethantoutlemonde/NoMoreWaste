import Flag from 'react-world-flags'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { HiChevronDown, HiChevronRight } from 'react-icons/hi'
import { useAuth } from '../hooks/auth'
import { useState } from "react";

export default function Header() {
    
    const { logout } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/login'
    })
    const { user } = useAuth({ middleware: 'auth' })
    const { t, i18n } = useTranslation("global")
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const onLogout = (ev) => {
        ev.preventDefault();
        console.log('Logout');
        setIsUserDropdownOpen(false);
        logout()

    }

    const dropdownHandler = (type) => {
        var element = document.getElementById(`${type}`);
        element.classList.toggle("hidden");
        var down = document.getElementById(`arrrow-down-${type}`);
        down.classList.toggle("hidden");
        var right = document.getElementById(`arrrow-right-${type}`);
        right.classList.toggle("hidden");
    }


    const langDropdownHandler = () => {
        setIsLangDropdownOpen(!isLangDropdownOpen);
    };

    const userDropdownHandler = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setSelectedLanguage(language);
        setIsLangDropdownOpen(false);
    };

    const handleProfileClick = () => {
        setIsUserDropdownOpen(false); // Close dropdown
    };



    return (
        <>
            <header className="fixed left-0 right-0 top-0 h-20 ml-64 bg-gray-100 flex justify-between items-center p-4">
                <div>
                    <h1 className="text-3xl">No More Waste</h1>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <button onClick={langDropdownHandler} className="flex justify-between items-center hover:border-gray-500 p-2 rounded border border-gray-400 w-full">
                            <div className="mr-2">
                                {t("Language")}
                            </div>
                            {isLangDropdownOpen ? (
                                <HiChevronDown className="items-center"/>
                            ) : (
                                <HiChevronRight className="items-center"/>
                            )}
                        </button>

                        {isLangDropdownOpen && (
                            <div className="absolute mt-2 bg-white p-3 rounded shadow w-auto min-w-fit z-50">
                                <div onClick={() => changeLanguage('en')} className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-200 rounded px-2">
                                    <Flag code="GB" className='w-6'/>
                                    <span className='pr-6'>English</span>
                                </div>
                                <div onClick={() => changeLanguage('fr')} className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-200 rounded px-2">
                                    <Flag code="FR" className='w-6'/>
                                    <span className='pr-6'>Français</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <button onClick={userDropdownHandler} className="flex justify-between items-center hover:border-gray-500 p-2 rounded border border-gray-400 w-full">
                            <div className="mr-2">
                                {user.name}
                            </div>
                            {isUserDropdownOpen ? (
                                <HiChevronDown className="items-center"/>
                            ) : (
                                <HiChevronRight className="items-center"/>
                            )}
                        </button>
                        {isUserDropdownOpen && (
                        <div className="pl-4 absolute mt-2 bg-white p-3 rounded shadow flex flex-col gap-2">
                            <Link onClick={handleProfileClick} to={`/users/admin/${user.id}`} className="hover:underline">Profil</Link>
                            <button className="logout-btn hover:underline" onClick={onLogout}>Logout</button>
                        </div>
                        )}
                        
                    </div>
                </div>
                
                
            </header>
        </>
    )
}