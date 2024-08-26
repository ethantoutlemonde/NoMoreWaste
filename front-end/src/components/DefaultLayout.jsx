import { useAuth } from "../hooks/auth";
import { Link, Navigate, Outlet } from 'react-router-dom';
import '../css/header.css';
import VolunteerLayout from "./VolunteerLayout";
import BeneficiaryLayout from "./BeneficiaryLayout";
import { useState, useRef, useEffect } from 'react';
import { HiChevronDown, HiChevronRight } from 'react-icons/hi';
import Flag from 'react-world-flags'
import { useTranslation } from 'react-i18next';
import PartnerLayout from "./PartnerLayout";
import nomorewastePng from '../assets/img/nomorewastePng.png';


export default function DefaultLayout() {
    const { user } = useAuth({ middleware: 'auth' })
    

    const { t, i18n } = useTranslation("global");
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const dropdownLangRef = useRef(null);
    const dropdownUserRef = useRef(null);

    const langDropdownHandler = () => {
        // console.log('langDropdownHandler');
        setIsLangDropdownOpen(!isLangDropdownOpen);
    };

    const userDropdownHandler = () => {
        // console.log('userDropdownHandler');
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    // Fermer le dropdown si un clic est détecté à l'extérieur
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownLangRef.current && !dropdownLangRef.current.contains(event.target)) {
                setIsLangDropdownOpen(false);

            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownLangRef]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownUserRef.current && !dropdownUserRef.current.contains(event.target)) {

                setIsUserDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownUserRef]);

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setSelectedLanguage(language);
        setIsLangDropdownOpen(false);
    };


    const { logout } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/home'
    })


    const onLogout = (ev) => {
        ev.preventDefault();
        console.log('Logout');
        logout()

    }

    if(!user) {
        return <Navigate to='/home' />
    }


    return (
        <>
        <header className="fixed top-0 w-full h-24 bg-white shadow flex items-center">
            <div className="header_container w-full">
                <Link to={"/home"}>
                    <img src={nomorewastePng} className="h-12" alt="" />
                </Link>
            
                {user.type === 2 &&
                    <BeneficiaryLayout />
                }
                {user.type === 3 && 
                    <VolunteerLayout />
                }
                {user.type === 4 &&
                    <PartnerLayout />
                }
                 

                <div className="flex items-center gap-4">
                    <div className="relative"  ref={dropdownUserRef}>
                        <button onClick={userDropdownHandler} className="p-2 flex justify-between items-center rounded hover:bg-gray-50 duration-100">
                            <div className="mr-2">
                                {user.first_name} {user.last_name}
                                
                            </div>
                            {isUserDropdownOpen ? (
                                <HiChevronDown className="items-center"/>
                            ) : (
                                <HiChevronRight className="items-center"/>
                            )}
                        </button>

                        {isUserDropdownOpen && (
                            <div className="absolute mt-2 bg-white p-3 rounded shadow w-auto min-w-fit z-50 flex flex-col gap-2">
                                <Link className="hover:underline">Profil</Link>
                                <button className="hover:underline" onClick={onLogout}>{t("Logout")}</button>
                            </div>
                        )}
                    </div>

                    <div className="relative"  ref={dropdownLangRef}>
                        <button onClick={langDropdownHandler} className="flex justify-between items-center rounded border border-white p-2 w-full hover:border-gray-300 duration-100">
                            <div className="mr-2">
                                {/* {t("Language")} */}
                                {selectedLanguage === 'en' ? <Flag code="GB" className='w-6'/> : selectedLanguage === 'fr' ?  <Flag code="FR" className='w-6'/> : t("Language")}
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
                </div>
            </div>
            
            
        </header>
        <main className="mt-24 ">
            <Outlet />
        </main>
        </>
    )
}